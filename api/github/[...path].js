
export default async function handler(req, res) {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
        return res.status(500).json({
            message: "GITHUB_TOKEN is not configured."
        });
    }

    if (!["GET", "POST"].includes(req.method)) {
        res.setHeader("Allow", "GET, POST");
        return res.status(405).json({
            message: "Method not allowed."
        });
    }

    let path = "";
    if (req.query.path) {
        const pathParts = Array.isArray(req.query.path)
            ? req.query.path
            : [req.query.path].filter(Boolean);
        path = pathParts.join("/");
    } else if (req.url) {
        const parsedUrl = req.url.split("?")[0];
        path = parsedUrl.replace(/^\/?(api\/github\/)?/, "");
    }

    // Strip leading and trailing slashes
    path = path.replace(/^\/+|\/+$/g, "");

    // Permit only the GitHub endpoints GitIntel needs.
    const isAllowed =
        /^users\/[A-Za-z0-9-]+$/.test(path) ||
        /^users\/[A-Za-z0-9-]+\/repos$/.test(path) ||
        /^repos\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/languages$/.test(path) ||
        path === "graphql";

    if (!isAllowed) {
        return res.status(400).json({
            message: "GitHub endpoint not allowed."
        });
    }

    // Only allow POST requests to GraphQL.
    if (req.method === "POST" && path !== "graphql") {
        return res.status(405).json({
            message: "POST is only allowed for GraphQL."
        });
    }

    // Limit GraphQL to the contribution-calendar query used by GitIntel.
    if (path === "graphql") {
        const query = req.body?.query;

        if (
            req.method !== "POST" ||
            typeof query !== "string" ||
            !query.includes("contributionsCollection") ||
            !query.includes("contributionCalendar") ||
            !req.body?.variables?.username
        ) {
            return res.status(400).json({
                message: "Invalid contribution query."
            });
        }
    }

    try {
        const url = new URL(`https://api.github.com/${path}`);

        // Forward REST query parameters, such as per_page and sort.
        for (const [key, value] of Object.entries(req.query)) {
            if (key === "path") continue;

            if (Array.isArray(value)) {
                value.forEach(item => url.searchParams.append(key, item));
            } else if (value !== undefined) {
                url.searchParams.set(key, value);
            }
        }

        const githubResponse = await fetch(url, {
            method: req.method,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                ...(req.method === "POST"
                    ? { "Content-Type": "application/json" }
                    : {})
            },
            ...(req.method === "POST"
                ? { body: JSON.stringify(req.body) }
                : {})
        });

        const body = await githubResponse.text();

        // Useful when debugging GitHub rate limits.
        for (const header of [
            "x-ratelimit-limit",
            "x-ratelimit-remaining",
            "x-ratelimit-reset"
        ]) {
            const value = githubResponse.headers.get(header);
            if (value) res.setHeader(header, value);
        }

        if (githubResponse.ok) {
            res.setHeader("Cache-Control", "public, max-age=120, stale-while-revalidate=300");
        } else {
            res.setHeader("Cache-Control", "no-store");
        }
        return res.status(githubResponse.status).send(body);
    } catch (error) {
        console.error("GitHub API proxy error:", error.message);

        return res.status(502).json({
            message: "Unable to reach GitHub."
        });
    }
}
