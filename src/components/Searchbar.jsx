import { useState } from "react";

export function SearchBar({ value, id, placeholder, onchange, buttonfunction, loading}) {

    return (
        <div className="search-row">
            <input type="search"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={e => { onchange(e.target.value) }}
                aria-label="Github Username search"
            />
            <button type="button" id="analyze" onClick={buttonfunction} disabled={loading}>
                {loading? "Analyzing": "Analyze"}
            </button>
            <div className={`loader ${loading? "": "hidden"}`}></div>
        </div>
    )
}