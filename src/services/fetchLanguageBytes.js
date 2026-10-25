import githubApi from "../api/githubapi";

export const fetchRepositoryLanguageBytes = async (username, repository) => {
    if (!repository.language || repository.size === 0) {
        return [];
    }

    const response = await githubApi.get(
        `/repos/${username}/${repository.name}/languages`
    )
    const languageBytes = response.data;

    const totalBytes = Object.values(languageBytes).reduce(
        (total, bytes) => total + bytes,
        0
    );

    if (totalBytes === 0) {
        return [];
    }

    return Object.entries(languageBytes).map(([name, bytes]) => ({
        name,
        percentage: (bytes / totalBytes) * 100
    }));
};