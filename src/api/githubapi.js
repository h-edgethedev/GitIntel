
import axios from "axios";

const githubApi = axios.create({
    baseURL: "/api/github",
    headers: {
        Accept: "application/vnd.github+json"
    }
});

export default githubApi;
