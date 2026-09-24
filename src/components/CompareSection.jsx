import React, { useState } from "react";
import { fetchUserProfile, fetchUserRepos, fetchContributionCalendar, calculateRepoAnalytics, calculateContributionStats } from "../services/githubApi";
import { GitCompare, Trophy, Loader2, Star, Users, BookOpen, Activity, Flame, ExternalLink } from "lucide-react";
import { formatNumber } from "../utils/formatters";

export const CompareSection = ({ initialUser1 }) => {
  const [user1Input, setUser1Input] = useState(initialUser1 || "torvalds");
  const [user2Input, setUser2Input] = useState("gaearon");

  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [error, setError] = useState(null);

  const runComparison = async () => {
    if (!user1Input.trim() || !user2Input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const [u1, u2, r1, r2, c1, c2] = await Promise.all([
        fetchUserProfile(user1Input.trim()),
        fetchUserProfile(user2Input.trim()),
        fetchUserRepos(user1Input.trim()),
        fetchUserRepos(user2Input.trim()),
        fetchContributionCalendar(user1Input.trim()),
        fetchContributionCalendar(user2Input.trim()),
      ]);

      const analytics1 = calculateRepoAnalytics(r1);
      const analytics2 = calculateRepoAnalytics(r2);
      const streak1 = calculateContributionStats(c1);
      const streak2 = calculateContributionStats(c2);

      setData1({ user: u1, analytics: analytics1, streak: streak1 });
      setData2({ user: u2, analytics: analytics2, streak: streak2 });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch one or both profiles. Please verify the usernames.");
    } finally {
      setLoading(false);
    }
  };

  const getWinnerClass = (val1, val2) => {
    if (val1 > val2) return { u1Winner: true, u2Winner: false };
    if (val2 > val1) return { u1Winner: false, u2Winner: true };
    return { u1Winner: false, u2Winner: false };
  };

  return (
    <div className="compare-section-card">
      <div className="compare-header">
        <GitCompare className="w-6 h-6 text-purple-400 mr-2" />
        <div>
          <h2 className="compare-title">Side-by-Side Developer Comparison</h2>
          <p className="compare-subtitle">Compare activity, stats, and achievements between any two GitHub developers.</p>
        </div>
      </div>

      {/* Input Row */}
      <div className="compare-inputs-row">
        <div className="compare-input-wrap">
          <label className="input-lbl">Developer 1</label>
          <input
            type="text"
            value={user1Input}
            onChange={(e) => setUser1Input(e.target.value)}
            placeholder="Username 1..."
            className="compare-input"
          />
        </div>

        <div className="vs-badge">VS</div>

        <div className="compare-input-wrap">
          <label className="input-lbl">Developer 2</label>
          <input
            type="text"
            value={user2Input}
            onChange={(e) => setUser2Input(e.target.value)}
            placeholder="Username 2..."
            className="compare-input"
          />
        </div>

        <button
          type="button"
          onClick={runComparison}
          disabled={loading}
          className="run-compare-btn"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2 inline" />
              <span>Comparing...</span>
            </>
          ) : (
            <span>Compare Now</span>
          )}
        </button>
      </div>

      {error && <div className="compare-error">{error}</div>}

      {/* Comparison Grid Results */}
      {data1 && data2 && (
        <div className="compare-results-wrap">
          {/* Header Row */}
          <div className="compare-grid-header">
            <div className="dev-column-head">
              <img src={data1.user.avatar_url} alt="" className="compare-avatar" />
              <div className="dev-head-info">
                <h3>{data1.user.name || data1.user.login}</h3>
                <span>@{data1.user.login}</span>
              </div>
            </div>

            <div className="vs-divider-head">Metric</div>

            <div className="dev-column-head text-right flex-row-reverse">
              <img src={data2.user.avatar_url} alt="" className="compare-avatar" />
              <div className="dev-head-info text-right">
                <h3>{data2.user.name || data2.user.login}</h3>
                <span>@{data2.user.login}</span>
              </div>
            </div>
          </div>

          {/* Metric Rows */}
          {[
            {
              label: "Followers",
              icon: <Users className="w-4 h-4 text-blue-400" />,
              v1: data1.user.followers,
              v2: data2.user.followers,
              f1: formatNumber(data1.user.followers),
              f2: formatNumber(data2.user.followers),
            },
            {
              label: "Public Repositories",
              icon: <BookOpen className="w-4 h-4 text-purple-400" />,
              v1: data1.user.public_repos,
              v2: data2.user.public_repos,
              f1: formatNumber(data1.user.public_repos),
              f2: formatNumber(data2.user.public_repos),
            },
            {
              label: "Earned Stars",
              icon: <Star className="w-4 h-4 text-amber-400" />,
              v1: data1.analytics.totalStars,
              v2: data2.analytics.totalStars,
              f1: formatNumber(data1.analytics.totalStars),
              f2: formatNumber(data2.analytics.totalStars),
            },
            {
              label: "Total Contributions (1y)",
              icon: <Activity className="w-4 h-4 text-emerald-400" />,
              v1: data1.streak.totalContributions,
              v2: data2.streak.totalContributions,
              f1: formatNumber(data1.streak.totalContributions),
              f2: formatNumber(data2.streak.totalContributions),
            },
            {
              label: "Longest Streak",
              icon: <Flame className="w-4 h-4 text-rose-400" />,
              v1: data1.streak.longestStreak,
              v2: data2.streak.longestStreak,
              f1: `${data1.streak.longestStreak} days`,
              f2: `${data2.streak.longestStreak} days`,
            },
          ].map((row, idx) => {
            const winners = getWinnerClass(row.v1, row.v2);
            return (
              <div key={idx} className="compare-row">
                <div className={`compare-cell ${winners.u1Winner ? "winner-cell" : ""}`}>
                  {winners.u1Winner && <Trophy className="w-4 h-4 text-amber-400 mr-1.5 inline" />}
                  <span>{row.f1}</span>
                </div>

                <div className="compare-cell-label">
                  {row.icon}
                  <span className="ml-1.5">{row.label}</span>
                </div>

                <div className={`compare-cell text-right ${winners.u2Winner ? "winner-cell" : ""}`}>
                  <span>{row.f2}</span>
                  {winners.u2Winner && <Trophy className="w-4 h-4 text-amber-400 ml-1.5 inline" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
