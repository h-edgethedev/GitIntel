import { useState } from "react";

export function SearchBar({ username, setUsername, id, placeholder, inputfunction, buttonfunction, loading, onClick }) {

    return (
        <div className="search-row">
            <input type="search"
                id={id}
                placeholder={placeholder}
                value={username}
                onChange={e => { setUsername(e.target.value) }}
                aria-label="Github Username search"
            />
        </div>
    )
}