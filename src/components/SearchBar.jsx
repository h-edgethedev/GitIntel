import React, { useState, useEffect } from "react";
import { Search, Loader2, X, History, Flame } from "lucide-react";

const PRESETS = [
  { name: "torvalds", label: "Linus Torvalds" },
  { name: "gaearon", label: "Dan Abramov" },
  { name: "yyx990803", label: "Evan You" },
  { name: "shadcn", label: "Shadcn" },
  { name: "sundarpichai", label: "Sundar Pichai" },
];

export const SearchBar = ({ username, setUsername, onSearch, loading, label = "Analyze Developer Profile" }) => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    loadRecent();
  }, []);

  const loadRecent = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("gitintel_recent") || "[]");
      setRecentSearches(stored);
    } catch (e) {
      setRecentSearches([]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setTimeout(loadRecent, 300);
    }
  };

  const handleSelectUser = (user) => {
    setUsername(user);
    onSearch(user);
    setTimeout(loadRecent, 300);
  };

  const removeRecent = (e, targetUser) => {
    e.stopPropagation();
    try {
      const updated = recentSearches.filter((u) => u.toLowerCase() !== targetUser.toLowerCase());
      localStorage.setItem("gitintel_recent", JSON.stringify(updated));
      setRecentSearches(updated);
    } catch (err) {}
  };

  return (
    <div className="search-section-wrap">
      <form onSubmit={handleFormSubmit} className="search-input-card">
        <div className="search-input-field">
          <Search className="search-icon" />
          <input
            type="search"
            name="search-input"
            id="search-input"
            placeholder="Search GitHub username (e.g. torvalds, gaearon)..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="GitHub username"
            autoComplete="off"
          />
        </div>
        <button
          id="analyze"
          type="submit"
          disabled={loading || !username.trim()}
          className="search-submit-btn"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2 inline" />
              <span>Analyzing...</span>
            </>
          ) : (
            <span>{label}</span>
          )}
        </button>
      </form>

      {/* Preset Profiles & Recent Searches */}
      <div className="search-quick-tags">
        {recentSearches.length > 0 && (
          <div className="quick-tags-group">
            <span className="quick-group-label">
              <History className="w-3.5 h-3.5 inline mr-1" /> Recent:
            </span>
            {recentSearches.map((u) => (
              <span
                key={u}
                className="chip-tag recent-chip"
                onClick={() => handleSelectUser(u)}
              >
                @{u}
                <button
                  type="button"
                  className="chip-close"
                  onClick={(e) => removeRecent(e, u)}
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="quick-tags-group">
          <span className="quick-group-label">
            <Flame className="w-3.5 h-3.5 inline mr-1 text-amber-400" /> Popular:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              className="chip-tag preset-chip"
              onClick={() => handleSelectUser(p.name)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
