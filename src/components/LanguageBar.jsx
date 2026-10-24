const languageColors = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    TypeScript: "#3178c6",
    "C++": "#f34b7d",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
};

export default function LanguageBar({ languages }) {
    return (
        <div className="language-bar">
            {
                languages.map((language)=>(
                    <div 
                    className="language-segment"
                    key={language.name}
                    title={`${language.name}: ${language.percentage.toFixed(1)}%`}
                    style={{
                        width: `${language.percentage}%`,
                        backgroundColor: languageColors[language.name] || "#9CA3AF"
                    }}
                    />
                ))
            }
        </div>
    )
}