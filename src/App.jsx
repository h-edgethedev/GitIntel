import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/SearchBar";
import { ProfileHeaderCard } from "./components/ProfileHeaderCard";
import { DeveloperArchetypeCard } from "./components/DeveloperArchetypeCard";
import { ContributionGraphSection } from "./components/ContributionGraphSection";
import { LanguageBreakdownSection } from "./components/LanguageBreakdownSection";
import { RepositoriesSection } from "./components/RepositoriesSection";
import { ActivityFeedSection } from "./components/ActivityFeedSection";
import { CompareSection } from "./components/CompareSection";
import { ExportModal } from "./components/ExportModal";
import {
  fetchUserProfile,
  fetchUserRepos,
  fetchUserEvents,
  fetchContributionCalendar,
  calculateRepoAnalytics,
  calculateContributionStats,
} from "./services/githubApi";
import { LayoutDashboard, Calendar, Code, BookOpen, Activity, AlertCircle, Sparkles } from "lucide-react";

function App() {
  const [username, setUsername] = useState("torvalds");
  const [activeTab, setActiveTab] = useState("overview");
  const [theme, setTheme] = useState("dark"); // 'dark' | 'cyber' | 'light'
  const [compareMode, setCompareMode] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  // Data States
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [calendar, setCalendar] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Computed Stats
  const repoAnalytics = calculateRepoAnalytics(repos);
  const streakStats = calculateContributionStats(calendar);

  const handleSearch = useCallback(async (searchUser) => {
    if (!searchUser || !searchUser.trim()) return;
    const cleanUser = searchUser.trim();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Parallel fetch for speed & performance
      const [userRes, reposRes, eventsRes, calendarRes] = await Promise.all([
        fetchUserProfile(cleanUser),
        fetchUserRepos(cleanUser),
        fetchUserEvents(cleanUser),
        fetchContributionCalendar(cleanUser),
      ]);

      setUserData(userRes);
      setRepos(reposRes);
      setEvents(eventsRes);
      setCalendar(calendarRes);

      // Save recent search in localStorage
      try {
        const recent = JSON.parse(localStorage.getItem("gitintel_recent") || "[]");
        const updated = [cleanUser, ...recent.filter((u) => u.toLowerCase() !== cleanUser.toLowerCase())].slice(0, 6);
        localStorage.setItem("gitintel_recent", JSON.stringify(updated));
      } catch (e) {}
    } catch (err) {
      console.error("Search error:", err);
      if (err.response?.status === 404) {
        setErrorMsg(`GitHub user "${cleanUser}" was not found. Please check spelling.`);
      } else if (err.response?.status === 403) {
        setErrorMsg("GitHub API rate limit hit. Try again later or set VITE_GITHUB_TOKEN.");
      } else {
        setErrorMsg(`Failed to analyze profile: ${err.message || "Unknown error"}`);
      }
      setUserData(null);
      setRepos([]);
      setEvents([]);
      setCalendar(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    handleSearch("torvalds");
  }, [handleSearch]);

  const tabs = [
    { id: "overview", label: "Overview & AI Persona", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "contributions", label: "Contribution Heatmap", icon: <Calendar className="w-4 h-4" /> },
    { id: "languages", label: "Languages & Stack", icon: <Code className="w-4 h-4" /> },
    { id: "repos", label: `Repositories (${repos.length})`, icon: <BookOpen className="w-4 h-4" /> },
    { id: "activity", label: "Activity Timeline", icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className={`app-shell theme-${theme}`}>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar
          theme={theme}
          setTheme={setTheme}
          compareMode={compareMode}
          setCompareMode={setCompareMode}
          onExportClick={() => setExportOpen(true)}
        />

        {/* Search Header */}
        <SearchBar
          username={username}
          setUsername={setUsername}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Compare Developers View */}
        {compareMode ? (
          <CompareSection initialUser1={userData?.login || username} />
        ) : (
          <>
            {/* Error Banner */}
            {errorMsg && (
              <div className="error-banner">
                <AlertCircle className="w-5 h-5 mr-2 inline shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Profile Header & Identity Card */}
            {userData && (
              <>
                <ProfileHeaderCard
                  userData={userData}
                  repoAnalytics={repoAnalytics}
                  streakStats={streakStats}
                />

                {/* Dashboard Navigation Tabs */}
                <div className="dashboard-tabs-row">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
                      onClick={() => setActiveTab(t.id)}
                    >
                      {t.icon}
                      <span className="tab-label">{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Views Content */}
                <div className="tab-content-area">
                  {activeTab === "overview" && (
                    <div className="overview-grid-layout">
                      <DeveloperArchetypeCard
                        userData={userData}
                        repoAnalytics={repoAnalytics}
                        streakStats={streakStats}
                      />
                      <ContributionGraphSection calendar={calendar} streakStats={streakStats} />
                      <LanguageBreakdownSection repoAnalytics={repoAnalytics} />
                      <RepositoriesSection repos={repos} />
                    </div>
                  )}

                  {activeTab === "contributions" && (
                    <ContributionGraphSection calendar={calendar} streakStats={streakStats} />
                  )}

                  {activeTab === "languages" && (
                    <LanguageBreakdownSection repoAnalytics={repoAnalytics} />
                  )}

                  {activeTab === "repos" && <RepositoriesSection repos={repos} />}

                  {activeTab === "activity" && <ActivityFeedSection events={events} />}
                </div>
              </>
            )}
          </>
        )}

        {/* Share & Export Modal */}
        <ExportModal
          isOpen={exportOpen}
          onClose={() => setExportOpen(false)}
          userData={userData}
          repoAnalytics={repoAnalytics}
          streakStats={streakStats}
        />

        {/* Modern Footer */}
        <footer className="gitintel-footer">
          <p>
            <Sparkles className="w-4 h-4 text-purple-400 inline mr-1" />
            GitIntel Developer Insights Platform — Powered by GitHub REST & GraphQL API
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;