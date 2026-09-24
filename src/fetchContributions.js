import { fetchContributionCalendar } from "./services/githubApi";

export const getContributionData = async (username, loading, setLoading) => {
    setLoading?.(true);
    try {
        const calendar = await fetchContributionCalendar(username);
        return {
            data: {
                user: {
                    contributionsCollection: {
                        contributionCalendar: calendar,
                    },
                },
            },
        };
    } catch (error) {
        console.error("getContributionData error:", error);
        return null;
    } finally {
        setLoading?.(false);
    }
};