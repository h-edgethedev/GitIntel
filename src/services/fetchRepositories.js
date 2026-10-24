import axios from "axios"
import { fetchRepositoryLanguageBytes } from "./fetchLanguageBytes"

export const fetchRepositoryData = async (username, setLoading, setRepoData) => {
    const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    setLoading(true)
    try {
        const response = await axios.get(url)
        const repositories = response.data
        const topRepos = [...repositories].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 12)
        const cacheData = {
            data: response.data,
            cachedAt: Date.now()
        }
        // localStorage.setItem()
        const repowithLanguages = await Promise.all(
            topRepos.map(async(repository)=>{
                const languages = fetchRepositoryLanguageBytes(username, repository, setLoading)
                return{
                    ...repository, 
                    languages: languages
                }
            })
        )
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