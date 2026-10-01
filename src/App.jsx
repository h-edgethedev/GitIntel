import "./App.css"
import { useState } from "react"
import { fetchData } from "./fetchdata"
import { getContributionData } from "./fetchContributions"
import { ContributionGraph } from "./components/ContributionsGraph"
import { ProfileCard } from "./components/ContributionData"
const CONTRIBUTION_CACHE_TTL = 10 * 60 * 1000
const PROFILE_CACHE_TTL = 60 * 60 * 1000

function App() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [calendar, setCalendar] = useState(null)
  const [toast, setToast] = useState(null)

  const handleClick = async () => {
    if (username.trim() === "") {
      setToast("Please enter a Github username")
      setTimeout(() => {
        setToast("")
      }, 2000)
      return
    }

    setCalendar(null)
    var cacheKey = `github-${username.trim().toLowerCase()}`
    //Fetching Profile Data:
    const storedData = localStorage.getItem(cacheKey)
    const cachedData = storedData ? JSON.parse(storedData) : null

    if (cachedData && cachedData.data && (Date.now() - cachedData.cachedAt) <= CONTRIBUTION_CACHE_TTL) {
      setUserData(cachedData.data)
      console.log(`Data Obtained from local storage`)
      // console.log(userData)
    }
    else {
      await fetchData(username, userData, loading, setUserData, setLoading)
      console.log(`Data obtained from Github API`)
    }
    // Fetching and storing Contribution Data
    const contributionCacheKey = `github-contributions-${username.trim().toLowerCase()}`
    const storedContributionData = localStorage.getItem(contributionCacheKey)
    const contributionCacheData = storedContributionData ? JSON.parse(storedContributionData) : null
    if (contributionCacheData && contributionCacheData.data && (Date.now() - contributionCacheData.cachedAt) <= CONTRIBUTION_CACHE_TTL) {
      setCalendar(contributionCacheData.data)
      console.log(`Contribution Data obtained from Local storage`)
    }

    else {
      const contributionData = await getContributionData(username, loading, setLoading)
      const contributionCalendar = contributionData?.data?.user?.contributionsCollection?.contributionCalendar
      if (contributionCalendar) {
        setCalendar(contributionCalendar)
        localStorage.setItem(
          contributionCacheKey,
          JSON.stringify({
            data: contributionCalendar,
            cachedAt: Date.now()
          })
        )
        console.log(`Contribution obtained from Github GraphQL`)
      }
    }


  }

  const profileName = userData?.name || userData?.login || username
  const profileBio = userData?.bio || "No bio provided yet."
  // console.log(calendar)

  return (
    <main className="app-shell">
      {
        toast && (
          <div className="toast">
            {toast}
          </div>
        )}
      <section className="analyzer-card">
        <span className="eyebrow">Developer insights</span>
        <h1>GitIntel</h1>
        <p className="subtitle">Analyze a GitHub developer&apos;s profile and discover their coding activity.</p>
        <div className="search-row">
          <input
            type="search"
            name="search-input"
            id="search-input"
            placeholder="Input GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="GitHub username"
          />
          <button id="analyze" type="button" onClick={handleClick} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          <div className={`loader ${loading ? "" : "hidden"}`}></div>
        </div>


        {userData && (
          <ProfileCard userData={userData} username={username} />
        )}
        {/* Contribution Graph */}
        {calendar && (
          <ContributionGraph calendar={calendar} />
        )}
      </section>
    </main >
  )
}

export default App;