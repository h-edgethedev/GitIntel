import "./App.css"
import { useState } from "react"

function App() {
  const [username, setUsername] = useState("")
  const handleClick = ()=>{
    if(username.trim()===""){
      alert("Search Input is empty")
      return;
    }
    
  }
  return (
    <main className="app-shell">
      <section className="analyzer-card">
        <span className="eyebrow">Developer insights</span>
        <h1>GitHub Profile Analyzer</h1>
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
          <button id="analyze" type="button" onClick={handleClick}>
            Analyze
          </button>
        </div>
      </section>
    </main>
  )
}

export default App;