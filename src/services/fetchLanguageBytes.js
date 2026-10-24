import axios from "axios";

export const fetchRepositoryLanguageBytes = async (username, repoData, setLoading)=>{
    const url= `https://api.github.com/repos/${username}/${repoData.name}/languages`
    setLoading(true)
    let response;
    try{
        response = await axios.get(url)
    }
    catch(error){
        console.error(error)
        throw error
    }
    finally{
        setLoading(false)
    }
    const languages = response.data
    if(languages){
        const totalBytes = Object.values(languages).reduce(
            (total, bytes)=> total + bytes, 0
        )
        if(totalBytes==0){
            return []
        }
        return Object.entries(languages).map(([name, bytes]) => ({
            name,
            percentage: (bytes / totalBytes) * 100
        }))
    }
}