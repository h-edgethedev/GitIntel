import axios from "axios"
import { fetchRepositoryLanguageBytes } from "./fetchLanguageBytes"
import githubApi from "../api/githubapi"

export const fetchRepositoryData = async (username, setLoading, setRepoData) => {
    const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    setLoading(true)
    try {
        const response = await githubApi.get(
            `users/${username}/repos`,
            {
                params:{
                    per_page: 100,
                    sort: "updated"
                }
            }
        )
        const repositories = response.data
        const topRepos = [...repositories]
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 12)
            .map(repo => ({ ...repo, languages: [] }))

        // Instantly display top repositories on screen
        setRepoData(topRepos)

        // Fetch languages in parallel
        const repowithLanguages = await Promise.all(
            topRepos.map(async (repository) => {
                try {
                    const languages = await fetchRepositoryLanguageBytes(username, repository)
                    return {
                        ...repository, 
                        languages: languages
                    }
                } catch {
                    return repository
                }
            })
        )
        const cacheData = {
            data: repowithLanguages,
            cachedAt: Date.now()
        }
        localStorage.setItem(`github-repos-${username.trim().toLowerCase()}`, JSON.stringify(cacheData))
        setRepoData(repowithLanguages)
        return (repowithLanguages)
    }
    catch (error) {
        console.error(error.message)
        setRepoData(null)
        throw error
    }
    finally {
        setLoading(false)
    }
}