import { fetchUserProfile } from "./services/githubApi";

export const fetchData = async (username, userData, loading, setUserData, setLoading) => {
    setLoading?.(true);
    try {
        const data = await fetchUserProfile(username);
        setUserData?.(data);
        
        // Save to recent searches in localStorage
        try {
            const recent = JSON.parse(localStorage.getItem("gitintel_recent") || "[]");
            const updated = [username, ...recent.filter((u) => u.toLowerCase() !== username.toLowerCase())].slice(0, 6);
            localStorage.setItem("gitintel_recent", JSON.stringify(updated));
        } catch (e) {
            // Ignore localStorage errors
        }
        return data;
    } catch (error) {
        console.error("fetchData error:", error.message);
        setUserData?.(null);
        return null;
    } finally {
        setLoading?.(false);
    }
};