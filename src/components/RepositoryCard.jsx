import LanguageBar from './LanguageBar';

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

function formatUpdatedDate(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Updated today";
    if (diffDays === 1) return "Updated yesterday";
    if (diffDays < 30) return `Updated ${diffDays}d ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)}mo ago`;
    return `Updated ${Math.floor(diffDays / 365)}y ago`;
}

export default function RepositoryCard({ repository }) {
    const languages = Array.isArray(repository.languages) ? repository.languages : [];
    const updatedText = formatUpdatedDate(repository.updated_at);

    return (
        <article className="repository-card">
            <div className="repository-card-header">
                <div className="repository-title-wrap">
                    <svg className="repo-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25Z" />
                    </svg>
                    <h3>
                        <a
                            href={repository.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="repository-link"
                        >
                            {repository.name}
                        </a>
                    </h3>
                    <span className="repository-badge">
                        {repository.fork ? "Fork" : "Public"}
                    </span>
                </div>

                <div className="repository-stats-group">
                    <a
                        href={`${repository.html_url}/stargazers`}
                        target="_blank"
                        rel="noreferrer"
                        className="repository-star-badge"
                        title={`${repository.stargazers_count ?? 0} stars`}
                    >
                        <svg className="star-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                            <path d="m8 .25 2.4 4.86 5.36.78-3.88 3.78.92 5.33L8 12.48l-4.8 2.52.92-5.33L.24 5.89l5.36-.78L8 .25Z" />
                        </svg>
                        <span>{repository.stargazers_count ?? 0}</span>
                    </a>
                </div>
            </div>

            <p className="repository-description">
                {repository.description || "No description provided for this repository."}
            </p>

            <div className="repository-meta">
                {repository.language && (
                    <span className="repository-meta-item">
                        <span
                            className="language-dot"
                            style={{
                                backgroundColor: languageColors[repository.language] || "#94a3b8"
                            }}
                        />
                        {repository.language}
                    </span>
                )}
                <span className="repository-meta-item">
                    <svg className="fork-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h4.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25ZM12.5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM8 10.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm.75-2.25v-.5a.75.75 0 0 0-1.5 0v.5A2.25 2.25 0 1 0 8 12.5a2.25 2.25 0 0 0 .75-4.5Z" />
                    </svg>
                    {repository.forks_count ?? 0}
                </span>
                {updatedText && (
                    <span className="repository-meta-item repository-updated">
                        {updatedText}
                    </span>
                )}
            </div>

            <div className="repository-languages">
                <div className="languages-header">
                    <span className="languages-title">Languages</span>
                    {languages.length > 0 && (
                        <span className="languages-count">{languages.length} detected</span>
                    )}
                </div>
                <LanguageBar languages={languages} />
                {languages.length > 0 ? (
                    <div className="language-legend">
                        {languages.map((language) => (
                            <span className="language-chip" key={language.name}>
                                <span
                                    className="language-dot"
                                    style={{
                                        backgroundColor: languageColors[language.name] || "#9CA3AF"
                                    }}
                                />
                                <span className="language-chip-name">{language.name}</span>
                                <span className="language-chip-pct">{language.percentage.toFixed(1)}%</span>
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="language-legend-empty">
                        <span>{repository.language || "Pure text/markdown repository"}</span>
                    </div>
                )}
            </div>
        </article>
    );
}