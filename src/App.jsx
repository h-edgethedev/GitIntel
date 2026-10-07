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
  const [toasts, setToasts] = useState([])
  const searchHistory = JSON.parse(localStorage.getItem("username-search-history")) || []

  const showToast = (type, message) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2800)
  }

  const handleClick = async () => {
    if (username.trim() === "") {
      showToast("error", "Please enter a Github username")
      return
    }

    setCalendar(null)
    var cacheKey = `github-${username.trim().toLowerCase()}`
    //Fetching Profile Data:
    const storedData = localStorage.getItem(cacheKey)
    const cachedData = storedData ? JSON.parse(storedData) : null

    if (cachedData && cachedData.data && (Date.now() - cachedData.cachedAt) <= PROFILE_CACHE_TTL) {
      setUserData(cachedData.data)
      console.log(`Data Obtained from local storage`)
      // console.log(userData)
      showToast("success", "Profile Data obtained from Local Storage")
    }
    else {
      await fetchData(username, userData, loading, setUserData, setLoading)
      console.log(`Data obtained from Github API`)
      showToast("success", "Profile Data obtained from Github API")
    }
    // Fetching and storing Contribution Data
    const contributionCacheKey = `github-contributions-${username.trim().toLowerCase()}`
    const storedContributionData = localStorage.getItem(contributionCacheKey)
    const contributionCacheData = storedContributionData ? JSON.parse(storedContributionData) : null
    if (contributionCacheData && contributionCacheData.data && (Date.now() - contributionCacheData.cachedAt) <= CONTRIBUTION_CACHE_TTL) {
      setCalendar(contributionCacheData.data)
      console.log(`Contribution Data obtained from Local storage`)
      showToast("success", "Contribution Data obtained from Local Storage")
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
        showToast("success", "Contribution Data obtained from Github API")
      }
    }
    searchHistory.includes(username) ? searchHistory : searchHistory.push(username)
    localStorage.setItem("username-search-history", JSON.stringify(searchHistory))
  }

  const getFreshData = async () => {
    await fetchData(userData.login, userData, loading, setUserData, setLoading)
    console.log(`Data obtained from Github API`)
    showToast("success", "Profile Data obtained from Github API")
    const contributionData = await getContributionData(userData.login, loading, setLoading)
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
          placeholder={"Input Github Username e.g Torvalds"}
          onchange={setUsername}
          buttonfunction={handleClick}
          loading={loading}
          value={username}
        />

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
      </section>
    </main >
  )
}

export default App;