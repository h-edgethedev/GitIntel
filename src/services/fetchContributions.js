import githubApi from "../api/githubapi"
export const getContributionData = async (username, loading, setLoading) => {
    setLoading(true)
    const query = `
    query($username: String!) {
        user(login: $username) {
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            contributionCount
                            date
                            contributionLevel
                            color
                        }
                    }
                }
            }
        }
    }
`
    const variables = {
        username: username
    }
    try {
        const response= await githubApi.post("/graphql", {
            query,
            variables
        })
        return response.data
    }
    catch (error) {
        console.error(error.response?.data || error.message)
        throw error
    }
    finally {
        setLoading(false)
    }
}