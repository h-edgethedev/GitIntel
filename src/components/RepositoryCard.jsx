export default function RepositoryCard({repository}){
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
                <span>{repository.fork_counts} forks </span>
            </div>
        </article>
    )
}