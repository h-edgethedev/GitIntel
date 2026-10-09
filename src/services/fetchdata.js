import axios from "axios"
const url = `https://api.github.com/users/`
export const fetchData = async (username, userData, loading, setUserData, setLoading) => {
    setLoading(true)
    try {
        const response = await axios.get(`${url}${username}`)
        const cacheData = {
            data: response.data,
            cachedAt: Date.now()
        }
        localStorage.setItem(`github-${username.trim().toLowerCase()}`, JSON.stringify(cacheData))
        setUserData(response.data)
        return response.data
    } catch (error) {
        console.error(error.message)
        setUserData(null)
        throw error
    } finally {
        setLoading(false)
    }
}
