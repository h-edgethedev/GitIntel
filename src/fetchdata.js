import axios from "axios"
const url = `https://api.github.com/users/`
export const fetchData = async (username, userData, loading, setUserData, setLoading) => {
    setLoading(true)
    try {
        const response = await axios.get(`${url}${username}`)
        console.log(response.data)
        setUserData(response.data)
    } catch (error) {
        console.error(error.message)
        setUserData(null)
    }
    finally {
        setLoading(false)
    }
}