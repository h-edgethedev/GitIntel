import axios from "axios";

export const fetchRepositoryLanguageBytes = async (username, repoData, setLoading)=>{
    const url= `https://api.github.com/repos/${username}/${repoData.name}/languages`
    const response = await axios.get(url)
    try
}