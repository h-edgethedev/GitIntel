import "./App.css"
import { useState } from "react"
import axios from "axios"

function App() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const url = `https://api.github.com/users/`
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${url}${username}`)
      console.log(response.data)
      setUserData(response.data)
    } catch (error) {
      console.error(error.message)
      setUserData(null)
    }
    finally {
      setLoading(false)
    }
  }

  const handleClick = () => {
    if (username.trim() === "") {
      alert("Search Input is empty")
      return;
    }
    fetchData()
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
                <img src={userData.avatar_url} alt={`${userData.username}'s avatar`} id="avatar"/>
                p
              </section>
            )
        }
      </section>
    </main>
  )
}

export default App;