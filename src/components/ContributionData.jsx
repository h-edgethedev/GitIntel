export function ProfileCard({ userData, username }) {
    const profileName = userData?.name || userData?.login || username
    const profileBio = userData?.bio || "No bio provided yet."
    return (
        <section className="results-card">
            <div className="profile-header">
                <img src={userData.avatar_url} alt={`${profileName}'s avatar`} id="avatar" />
                <div className="profile-copy">
                    <p className="profile-label">GitHub profile</p>
                    <h2>{profileName}</h2>
                    <a href={userData.html_url} className="username" target="_blank">@{userData.login || username}</a>
                </div>
            </div>

            <div className="profile-body">
                <p className="bio">{profileBio}</p>

                <div className="meta-row">
                    <span>{userData.location ? `Location: ${userData.location}` : "Location unavailable"}</span>
                    <span>{userData.company ? `Company: ${userData.company}` : "No company listed"}</span>
                </div>

                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-label">Followers</span>
                        <strong>{userData.followers}</strong>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Following</span>
                        <strong>{userData.following}</strong>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Repos</span>
                        <strong>{userData.public_repos}</strong>
                    </div>
                </div>
            </div>
            <button id="refresh">Refresh Data</button>
        </section>

    )
}