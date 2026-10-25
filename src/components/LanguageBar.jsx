const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    Shell: "#89e051",
    Vue: "#41b883",
    Svelte: "#ff3e00",
};

export default function LanguageBar({ languages }) {
    if (!languages || languages.length === 0) {
        return (
            <div className="language-bar language-bar-empty" title="No language breakdown available">
                <div className="language-segment-placeholder" />
            </div>
        );
    }

    return (
        <div className="language-bar">
            {languages.map((language) => (
                <div 
                    className="language-segment"
                    key={language.name}
                    title={`${language.name}: ${language.percentage.toFixed(1)}%`}
                    style={{
                        width: `${language.percentage}%`,
                        backgroundColor: languageColors[language.name] || "#9CA3AF"
                    }}
                />
            ))}
        </div>
    );
}