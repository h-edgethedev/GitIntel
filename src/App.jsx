import "./App.css"
import { useState } from "react"
import { fetchData } from "./services/fetchdata"
import { getContributionData } from "./services/fetchContributions"
import { ContributionGraph } from "./components/ContributionsGraph"
import { ProfileCard } from "./components/ContributionData"
import { SearchBar } from "./components/Searchbar"
const CONTRIBUTION_CACHE_TTL = 10 * 60 * 1000
const PROFILE_CACHE_TTL = 60 * 60 * 1000

function App() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [calendar, setCalendar] = useState(null)
  const [searchError, setSearchError] = useState(null)
  const [contributionError, setContributionError] = useState(null)
  const [toasts, setToasts] = useState([])
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("username-search-history")) || []
    } catch {
      return []
    }
  })

  const showToast = (type, message) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2800)
  }

  const handleClick = async () => {
    const cleanUsername = username.trim()
    if (cleanUsername === "") {
      showToast("error", "Please enter a Github username")
      return
    }

    setCalendar(null)
    setSearchError(null)
    setContributionError(null)
    var cacheKey = `github-${cleanUsername.toLowerCase()}`
    //Fetching Profile Data:
    const storedData = localStorage.getItem(cacheKey)
    const cachedData = storedData ? JSON.parse(storedData) : null
    let fetchedUser = null

    if (cachedData && cachedData.data && (Date.now() - cachedData.cachedAt) <= PROFILE_CACHE_TTL) {
      fetchedUser = cachedData.data
      setUserData(cachedData.data)
      console.log(`Data Obtained from local storage`)
      showToast("success", "Profile Data obtained from Local Storage")
    }
    else {
      try {
        fetchedUser = await fetchData(cleanUsername, userData, loading, setUserData, setLoading)
        console.log(`Data obtained from Github API`)
        showToast("success", "Profile Data obtained from Github API")
      } catch (err) {
        setUserData(null)
        setCalendar(null)
        const errorMsg = err.response?.status === 404
          ? `User "${cleanUsername}" was not found on GitHub.`
          : `Failed to fetch data for "${cleanUsername}".`
        setSearchError(errorMsg)
        showToast("error", errorMsg)
        return
      }
    }

    // Fetching and storing Contribution Data
    const contributionCacheKey = `github-contributions-${cleanUsername.toLowerCase()}`
    const storedContributionData = localStorage.getItem(contributionCacheKey)
    const contributionCacheData = storedContributionData ? JSON.parse(storedContributionData) : null
    if (contributionCacheData && contributionCacheData.data && (Date.now() - contributionCacheData.cachedAt) <= CONTRIBUTION_CACHE_TTL) {
      setCalendar(contributionCacheData.data)
      console.log(`Contribution Data obtained from Local storage`)
      showToast("success", "Contribution Data obtained from Local Storage")
    }
    else {
      try {
        const contributionData = await getContributionData(cleanUsername, loading, setLoading)
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
          showToast("success", "Contribution Data obtained from Github API")
        } else {
          const contribErrMsg = `Contribution calendar data is currently unavailable for @${cleanUsername}.`
          setContributionError(contribErrMsg)
          showToast("info", contribErrMsg)
        }
      } catch (err) {
        console.error("Contribution fetch error:", err)
        const contribErrMsg = `Unable to retrieve contribution graph for @${cleanUsername}.`
        setContributionError(contribErrMsg)
        showToast("error", contribErrMsg)
      }
    }

    if (fetchedUser) {
      const searchedUsername = cleanUsername.toLowerCase()
      setSearchHistory(previousHistory => {
        const updatedHistory = [
          searchedUsername,
          ...previousHistory.filter((name => name.toLowerCase().trim() !== searchedUsername))
        ].slice(0, 20)
        localStorage.setItem("username-search-history", JSON.stringify(updatedHistory))

        return updatedHistory
      })
    }
  }

  const getFreshData = async () => {
    try {
      setSearchError(null)
      setContributionError(null)
      await fetchData(userData.login, userData, loading, setUserData, setLoading)
      console.log(`Data obtained from Github API`)
      showToast("success", "Profile Data obtained from Github API")
      try {
        const contributionData = await getContributionData(userData.login, loading, setLoading)
        const contributionCalendar = contributionData?.data?.user?.contributionsCollection?.contributionCalendar
        if (contributionCalendar) {
          const contributionCacheKey = `github-contributions-${userData.login.trim().toLowerCase()}`
          setCalendar(contributionCalendar)
          localStorage.setItem(
            contributionCacheKey,
            JSON.stringify({
              data: contributionCalendar,
              cachedAt: Date.now()
            })
          )
          console.log(`Contribution obtained from Github GraphQL`)
          showToast("success", "Contribution Data obtained from Github API")
        } else {
          const contribErrMsg = `Contribution calendar data is currently unavailable for @${userData.login}.`
          setContributionError(contribErrMsg)
          showToast("info", contribErrMsg)
        }
      } catch (contribErr) {
        console.error("Contribution refresh error:", contribErr)
        const contribErrMsg = `Unable to retrieve contribution graph for @${userData.login}.`
        setContributionError(contribErrMsg)
        showToast("error", contribErrMsg)
      }
    } catch (err) {
      const errorMsg = `Failed to refresh data for "${userData?.login}".`
      showToast("error", errorMsg)
      setSearchError(errorMsg)
    }
  }

  return (
    <main className="app-shell">
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type || "info"}`}>
            {toast.message}
          </div>
        ))}
      </div>
      <section className="analyzer-card">
        <span className="eyebrow">Developer insights</span>
        <h1>GitIntel</h1>
        <p className="subtitle">Analyze a GitHub developer&apos;s profile and discover their coding activity.</p>
        <SearchBar
          id={"search-input"}
          placeholder={"Input Github Username e.g h-edgethedev"}
          onchange={(val) => {
            setUsername(val)
            if (searchError) setSearchError(null)
            if (contributionError) setContributionError(null)
          }}
          buttonfunction={handleClick}
          loading={loading}
          value={username}
          searchHistory={searchHistory}
        />

        {searchError && (
          <div className="search-error-card" role="alert">
            <div className="search-error-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="search-error-content">
              <h4>User Not Found</h4>
              <p>{searchError}</p>
            </div>
          </div>
        )}

        {userData && (<div className="fresh-data-action">
          <button type="button" className="btn-force-api" onClick={getFreshData} disabled={loading}>
            {loading ? "🔄 Fetching Fresh Data from GitHub API (Bypass Cache)" : "🔄 Fetch Fresh Data from GitHub API (Bypass Cache)"}
          </button>
        </div>)}

        {userData && (
          <ProfileCard userData={userData} username={username} />
        )}
        {/* Contribution Graph */}
        {calendar && (
          <ContributionGraph calendar={calendar} />
        )}

        {/* Contribution Graph Unavailable Error */}
        {userData && !calendar && contributionError && (
          <div className="contribution-error-card" role="alert">
            <div className="contribution-error-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div className="contribution-error-content">
              <h4>Contribution Graph Unavailable</h4>
              <p>{contributionError}</p>
            </div>
          </div>
        )}
      </section>
    </main >
  )
}

export default App;