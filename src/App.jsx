import "./App.css"
import { useState } from "react"
import axios from "axios"
import { fetchData } from "./fetchdata"

function App() {
  const [username, setUsername] = useState("tech-sis123")
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const handleClick = () => {
    if (username.trim() === "") {
      alert("Search Input is empty")
      return;
    }
    fetchData(username, userData, loading, setUserData, setLoading)
    const graphQlUrl = "https://api.github.com/graphql"
    const getContributionData = async () => {
      const query = `
      query()
      `
      const response = await axios.post()
    }
  }

  return (
    <main className="app-shell">
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
            Analyze
          </button>
          <div className={`loader ${loading ? "" : "hidden"}`}></div>
        </div>
        {
          userData && (
            <section className="resultsDiv">
              <img src={userData.avatar_url} alt={`${userData.username}'s avatar`} id="avatar" />
              <p className="user-info" id="name">{userData.name}</p>
              <p id="username" className="user-info">@{username}</p>
              <h3 className="user-info" id="bio">{userData.bio} </h3>
              <p className="user-info" id="location">{userData.location} </p>
              <p className="user-info" id="followers">{userData.followers} followers</p>
              <p className="user-info" id="following">{userData.following} following</p>
              <p className="user-info" id="public_repos">{userData.public_repos} Public Repositories</p>
            </section>
          )
        }
      </section>
    </main>
  )
}

export default App;