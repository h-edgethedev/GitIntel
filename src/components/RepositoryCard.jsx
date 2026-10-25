import LanguageBar from './LanguageBar';

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

export default function RepositoryCard({ repository }) {
    const languages = Array.isArray(repository.languages) ? repository.languages : []
    return (
        <article className="repository-card">
            <div className="repository-card-header">
                <h3>
                    <a
                        href={repository.html_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {repository.name}
                    </a>
                </h3>
                <span className="repository-star">{repository.stargazers_count}</span>
            </div>
            <p className="repository-description">
                {repository.description || "No description provided."}
            </p>
            <div className="repository-meta">
                <span>{repository.language || "Language not specified"} </span>
                <span>{repository.forks_count ?? 0} forks </span>
            </div>
            <div className="repository-languages">
                <h4>Languages</h4>
                <LanguageBar languages={languages} />
                <div className="language-legend">
                    {
                        languages.map((language) => (
                            <span className="language-name"
                                key={language.name}
                            >
                                <span
                                    className="language-dot"
                                    style={{
                                        backgroundColor: languageColors[language.name] || "#9CA3AF"
                                    }}>
                                    {language.name} {language.percentage.toFixed(1)}%
                                </span>
                            </span>
                        ))
                    }
                </div>
            </div>
        </article>
    )
}