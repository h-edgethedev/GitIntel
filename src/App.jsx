import "./App.css"
import { useState } from "react"
import { fetchData } from "./fetchdata"
import { getContributionData } from "./fetchContributions"


function App() {
  const [username, setUsername] = useState("h-edgethedev")
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [calendar, setCalendar] = useState(null)

  const handleClick = async () => {
    if (username.trim() === "") {
      alert("Search Input is empty")
      return
    }

    setCalendar(null)
    await fetchData(username, userData, loading, setUserData, setLoading)

    const contributionData = await getContributionData(username)
    const contributionCalendar = contributionData?.data?.user?.contributionsCollection?.contributionCalendar

    if (contributionCalendar) {
      setCalendar(contributionCalendar)
    }
  }

  const profileName = userData?.name || userData?.login || username
  const profileBio = userData?.bio || "No bio provided yet."
  console.log(calendar)

  const monthLabels = (() => {
    if (!calendar?.weeks?.length) return []
    const labels = []
    const seen = new Set()

    calendar.weeks.forEach((week, index) => {
      const firstDay = week?.contributionDays?.[0].date
      if (!firstDay) return
      const date = new Date(firstDay)
      const key = `${date.getFullYear()}-${date.getMonth()}`

      if (!seen.has(key)) {
        seen.add(key)
        labels.push({
          index,
          label: date.toLocaleString("en-US", { month: "short" })
        })
      }
    })

    return labels
  })()

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
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          <div className={`loader ${loading ? "" : "hidden"}`}></div>
        </div>

        {userData && (
          <section className="results-card">
            <div className="profile-header">
              <img src={userData.avatar_url} alt={`${profileName}'s avatar`} id="avatar" />
              <div className="profile-copy">
                <p className="profile-label">GitHub profile</p>
                <h2>{profileName}</h2>
                <p className="username">@{userData.login || username}</p>
              </div>
            </div>

            <div className="profile-body">
              <p className="bio">{profileBio}</p>

              <div className="meta-row">
              <span>{`Location: ${userData.location}` || "Location unavailable"}</span>
                <span>{userData.company || "No company listed"}</span>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Followers</span>
                  <strong>{userData.followers}</strong>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Following</span>
                  <strong>{userData.following}</strong>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Repos</span>
                  <strong>{userData.public_repos}</strong>
                </div>
              </div>
            </div>
          </section>
        )}
    {/* Contribution Graph */}
        {calendar && (
          <section className="contribution-panel">
            <div className="panel-head">
              <span className="panel-tag">Contributions</span>
              <span className="contribution-total">{calendar.totalContributions}</span>
            </div>
            <p className="panel-copy">Total contributions recorded in the last year.</p>
            <div className="contribution-graph">
              <div className="month-row">
                {
                  monthLabels.map((month) => (
                    <span key={`${month.label}-${month.index}`}
                      className="month-label"
                      style={{ gridColumn: `${month.index + 1}/span 1` }}>
                      {month.label}
                    </span>
                  ))}
              </div>
              <div className="heatmap">
                {
                  calendar.weeks.flatMap((week, weekIndex) =>
                    week.contributionDays.map((day, dayIndex) => (
                      <span key={`${day.date}-${weekIndex}`}
                        className="day-cell"
                        title={`${day.date}: ${day.contributionCount} contributions`}
                        style={{
                          backgroundColor: day.color === "#ebedf0" ? "#151B23" : day.color,
                          gridColumn: weekIndex + 1,
                gridRow: dayIndex + 1,
                        }}></span>
              ))
              )
                }
            </div>
          </div>
          </section>
        )}
    </section>
    </main >
  )
}

export default App;