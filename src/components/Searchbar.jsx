import { useState, useEffect, useRef } from "react";

function HighlightMatch({ text, query }) {
    if (!query || !query.trim()) {
        return <span>{text}</span>;
    }
    const cleanQuery = query.trim();
    const index = text.toLowerCase().indexOf(cleanQuery.toLowerCase());
    if (index === -1) {
        return <span>{text}</span>;
    }
    const before = text.slice(0, index);
    const match = text.slice(index, index + cleanQuery.length);
    const after = text.slice(index + cleanQuery.length);
    return (
        <span>
            {before}
            <span className="suggestion-highlight">{match}</span>
            {after}
        </span>
    );
}

export function SearchBar({ value, id, placeholder, onchange, buttonfunction, loading, searchHistory = [] }) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef(null);

    const trimmedValue = value.trim();
    const filteredHistory = trimmedValue === ""
        ? searchHistory.slice(0, 6)
        : searchHistory.filter(username => username.toLowerCase().includes(trimmedValue.toLowerCase()));

    // Click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Reset selection index when query changes
    useEffect(() => {
        setSelectedIndex(-1);
    }, [value]);

    const handleSuggestionClick = (username) => {
        onchange(username);
        setShowSuggestions(false);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setShowSuggestions(false);
            setSelectedIndex(-1);
        } else if (e.key === "ArrowDown") {
            if (showSuggestions && filteredHistory.length > 0) {
                e.preventDefault();
                setSelectedIndex((prev) => (prev < filteredHistory.length - 1 ? prev + 1 : 0));
            }
        } else if (e.key === "ArrowUp") {
            if (showSuggestions && filteredHistory.length > 0) {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredHistory.length - 1));
            }
        } else if (e.key === "Enter") {
            if (showSuggestions && selectedIndex >= 0 && selectedIndex < filteredHistory.length) {
                e.preventDefault();
                handleSuggestionClick(filteredHistory[selectedIndex]);
            } else {
                setShowSuggestions(false);
                buttonfunction();
            }
        }
    };

    return (
        <div className="search-container" ref={containerRef}>
            <div className="search-row">
                <input
                    type="search"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        onchange(e.target.value);
                        setShowSuggestions(true);
                    }}
                    aria-label="Github Username search"
                    onFocus={() => {
                        if (filteredHistory.length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />
                <button type="button" id="analyze" onClick={buttonfunction} disabled={loading}>
                    {loading ? "Analyzing" : "Analyze"}
                </button>
                <div className={`loader ${loading ? "" : "hidden"}`}></div>
            </div>

            {showSuggestions && filteredHistory.length > 0 && (
                <div className="search-suggestions-dropdown">
                    <div className="search-suggestions-header">
                        <span className="search-suggestions-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {trimmedValue ? "Matching Profiles" : "Recent Searches"}
                        </span>
                        <span className="search-suggestions-count">
                            {filteredHistory.length} {filteredHistory.length === 1 ? "user" : "users"}
                        </span>
                    </div>

                    <ul className="search-suggestions" role="listbox">
                        {filteredHistory.map((username, index) => {
                            const isSelected = index === selectedIndex;
                            return (
                                <li key={username} role="option" aria-selected={isSelected}>
                                    <button
                                        type="button"
                                        className={`suggestion-item-btn ${isSelected ? "is-selected" : ""}`}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSuggestionClick(username);
                                        }}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        <div className="suggestion-user-info">
                                            <div className="suggestion-avatar-wrapper">
                                                <img
                                                    src={`https://github.com/${username}.png?size=48`}
                                                    alt=""
                                                    className="suggestion-avatar"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = "none";
                                                        const fallback = e.currentTarget.parentElement?.querySelector(".suggestion-avatar-fallback");
                                                        if (fallback) fallback.style.display = "flex";
                                                    }}
                                                />
                                                <span className="suggestion-avatar-fallback">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                        <circle cx="12" cy="7" r="4" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <span className="suggestion-username">
                                                <HighlightMatch text={username} query={value} />
                                            </span>
                                        </div>

                                        <span className="suggestion-action-hint">
                                            <span>Select</span>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 10 4 15 9 20" />
                                                <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                                            </svg>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="search-suggestions-footer">
                        <span className="shortcut-item">
                            <kbd>↑</kbd><kbd>↓</kbd> navigate
                        </span>
                        <span className="shortcut-item">
                            <kbd>↵</kbd> select
                        </span>
                        <span className="shortcut-item">
                            <kbd>esc</kbd> close
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}