import React from "react";
import {
  MapPin,
  Building,
  Link as LinkIcon,
  Calendar,
  Users,
  UserPlus,
  BookOpen,
  Star,
  GitFork,
  Activity,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { formatNumber, formatDate } from "../utils/formatters";

// Inline Twitter / X Icon
const TwitterIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const ProfileHeaderCard = ({ userData, repoAnalytics, streakStats }) => {
  if (!userData) return null;

  const profileName = userData.name || userData.login;
  const bio = userData.bio || "No biography provided.";

  return (
    <div className="profile-header-card">
      <div className="profile-main-top">
        <div className="avatar-wrapper">
          <img
            src={userData.avatar_url}
            alt={`${profileName}'s avatar`}
            className="avatar-img"
          />
          {userData.hireable && (
            <span className="hireable-badge" title="Open to work / hireable">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" /> Hireable
            </span>
          )}
        </div>

        <div className="profile-identity">
          <div className="name-row">
            <h1 className="dev-name">{profileName}</h1>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link-btn"
              title="Open GitHub Profile"
            >
              <span>@{userData.login}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          <p className="dev-bio">{bio}</p>

          {/* Meta Details Row */}
          <div className="meta-info-grid">
            {userData.location && (
              <span className="meta-item">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{userData.location}</span>
              </span>
            )}
            {userData.company && (
              <span className="meta-item">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                <span>{userData.company}</span>
              </span>
            )}
            {userData.blog && (
              <a
                href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-item meta-link"
              >
                <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{userData.blog.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
            {userData.twitter_username && (
              <a
                href={`https://twitter.com/${userData.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-item meta-link"
              >
                <TwitterIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>@{userData.twitter_username}</span>
              </a>
            )}
            <span className="meta-item">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Joined {formatDate(userData.created_at)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="stats-dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap bg-purple-glow">
            <BookOpen className="w-5 h-5 text-purple-400" />
          </div>
          <div className="stat-copy">
            <span className="stat-val">{formatNumber(userData.public_repos)}</span>
            <span className="stat-lbl">Public Repos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-blue-glow">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="stat-copy">
            <span className="stat-val">{formatNumber(userData.followers)}</span>
            <span className="stat-lbl">Followers</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-cyan-glow">
            <UserPlus className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="stat-copy">
            <span className="stat-val">{formatNumber(userData.following)}</span>
            <span className="stat-lbl">Following</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-amber-glow">
            <Star className="w-5 h-5 text-amber-400" />
          </div>
          <div className="stat-copy">
            <span className="stat-val">{formatNumber(repoAnalytics?.totalStars || 0)}</span>
            <span className="stat-lbl">Earned Stars</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-rose-glow">
            <GitFork className="w-5 h-5 text-rose-400" />
          </div>
          <div className="stat-copy">
            <span className="stat-val">{formatNumber(repoAnalytics?.totalForks || 0)}</span>
            <span className="stat-lbl">Total Forks</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-emerald-glow">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="stat-copy">
            <span className="stat-val">{formatNumber(streakStats?.totalContributions || 0)}</span>
            <span className="stat-lbl">Contributions (1y)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
