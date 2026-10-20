import axios from "axios"

export const fetchRepositoryData = async (username, loading, setLoading, repoData, setRepoData) => {
    const url = `https://api.github.com/users/${username}/repos`
    setLoading(true)
    try{
        const response = await axios.get(url)
        const cacheData = {
            data: response.data,
            cachedAt: Date.now()
        }
        // localStorage.setItem()
        setRepoData(response.data)
        return(response.data)
    }
    catch(error){
        console.error(error.message)
        setRepoData(null)
        throw error
    }
    finally{
        setLoading(false)
    }
}