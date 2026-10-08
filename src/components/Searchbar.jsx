import { useState } from "react";

export function SearchBar({ value, id, placeholder, onchange, buttonfunction, loading, searchHistory = [] }) {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const filteredHistory = searchHistory.filter(username => username.toLowerCase().includes(value.trim().toLowerCase()))
    const handleSuggestionClick = (username) => {
        onchange(username)
        setShowSuggestions(false)
    }
    return (
        <div className="search-container">
            <div className="search-row">
                <input type="search"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => { onchange(e.target.value); setShowSuggestions(true) }}
                    aria-label="Github Username search"
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setShowSuggestions(false)
                        }
                        else if (e.key === "Enter") {
                            setShowSuggestions(false)
                            buttonfunction()
                        }
                    }}
                    autoComplete="off"
                />
                <button type="button" id="analyze" onClick={buttonfunction} disabled={loading}>
                    {loading ? "Analyzing" : "Analyze"}
                </button>
                <div className={`loader ${loading ? "" : "hidden"}`}></div>
            </div>
           {
            showSuggestions && value.trim() !== "" && filteredHistory.length>0 && (
                <ul className="search-suggestions">
                    {
                        filteredHistory.map((username)=>(
                            <li key={username}> <button></button></li>
                        ))
                    }
                </ul>
            )
           } 
        </div>
    )
}