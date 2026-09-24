import React, { useState, useMemo } from "react";
import { BookOpen, Star, GitFork, ExternalLink, Search, ArrowUpDown, CircleAlert, Globe } from "lucide-react";
import { formatNumber, formatRelativeTime } from "../utils/formatters";
import { LANGUAGE_COLORS } from "../services/githubApi";

export const RepositoriesSection = ({ repos }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("stars"); // 'stars' | 'forks' | 'updated' | 'name'

  const filteredRepos = useMemo(() => {
    if (!repos) return [];
    let list = repos.filter((r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.language && r.language.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return list.sort((a, b) => {
      if (sortBy === "stars") return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      if (sortBy === "forks") return (b.forks_count || 0) - (a.forks_count || 0);
      if (sortBy === "updated") return new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [repos, searchTerm, sortBy]);

  if (!repos || repos.length === 0) {
    return (
      <div className="repos-panel-card empty-state">
        <BookOpen className="w-8 h-8 text-gray-400 mb-2" />
        <p className="empty-txt">No public repositories found for this account.</p>
      </div>
    );
  }

  return (
    <div className="repos-panel-card">
      <div className="repos-top-bar">
        <div className="panel-title-wrap">
          <BookOpen className="w-5 h-5 text-purple-400 mr-2" />
          <h3 className="panel-heading">Public Repositories</h3>
          <span className="total-badge">{repos.length} total</span>
        </div>

        {/* Search & Sort Controls */}
        <div className="repos-controls-row">
          <div className="repo-search-box">
            <Search className="w-3.5 h-3.5 search-ico" />
            <input
              type="text"
              placeholder="Filter repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="repo-search-input"
            />
          </div>

          <div className="repo-sort-box">
            <ArrowUpDown className="w-3.5 h-3.5 sort-ico" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="repo-sort-select"
            >
              <option value="stars">Most Starred</option>
              <option value="forks">Most Forked</option>
              <option value="updated">Recently Pushed</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Repos Grid */}
      <div className="repos-grid">
        {filteredRepos.slice(0, 18).map((repo) => {
          const langColor = LANGUAGE_COLORS[repo.language] || "#8b949e";
          return (
            <div key={repo.id} className="repo-card">
              <div className="repo-card-header">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-name-link"
                >
                  <BookOpen className="w-4 h-4 text-purple-400 mr-1.5 shrink-0" />
                  <span className="repo-name-txt">{repo.name}</span>
                </a>
                {repo.fork && <span className="fork-pill">Fork</span>}
              </div>

              <p className="repo-desc">{repo.description || "No description provided."}</p>

              <div className="repo-card-footer">
                <div className="repo-meta-group">
                  {repo.language && (
                    <span className="repo-meta-item">
                      <span className="lang-dot" style={{ backgroundColor: langColor }} />
                      <span>{repo.language}</span>
                    </span>
                  )}

                  {repo.stargazers_count > 0 && (
                    <span className="repo-meta-item" title="Stars">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      <span>{formatNumber(repo.stargazers_count)}</span>
                    </span>
                  )}

                  {repo.forks_count > 0 && (
                    <span className="repo-meta-item" title="Forks">
                      <GitFork className="w-3.5 h-3.5 text-rose-400" />
                      <span>{formatNumber(repo.forks_count)}</span>
                    </span>
                  )}

                  {repo.open_issues_count > 0 && (
                    <span className="repo-meta-item" title="Open Issues">
                      <CircleAlert className="w-3.5 h-3.5 text-sky-400" />
                      <span>{repo.open_issues_count}</span>
                    </span>
                  )}
                </div>

                <div className="repo-footer-right">
                  {repo.homepage && (
                    <a
                      href={repo.homepage.startsWith("http") ? repo.homepage : `https://${repo.homepage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-link-btn"
                      title="Live Demo / Website"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <span className="updated-txt">
                    {formatRelativeTime(repo.pushed_at || repo.updated_at)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRepos.length > 18 && (
        <div className="more-repos-note">
          <span>Showing top 18 of {filteredRepos.length} repositories matching filter.</span>
        </div>
      )}
    </div>
  );
};
