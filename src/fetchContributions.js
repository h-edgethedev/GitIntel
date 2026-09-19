import axios from "axios"
const token = import.meta.env.VITE_GITHUB_TOKEN

const graphQlUrl = "https://api.github.com/graphql"
export const getContributionData = async (username) => {
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
        const response = await axios.post(
            graphQlUrl,
            {
                query: query,
                variables: variables,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        // console.log(response.data)   
        return response.data
    }
    catch (error) {
        console.error(error.response?.data || error.message)
    }
    console.log("Token exists:", !!token)
    console.log("Token length:", token?.length)
}