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
                <span className="repository-star">repository.starga</span>
            </div>
        </article>
    )
}