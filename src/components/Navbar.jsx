import React from "react";
import { Sparkles, Moon, Sun, Zap, GitCompare, Share2 } from "lucide-react";

export const Navbar = ({ theme, setTheme, compareMode, setCompareMode, onExportClick }) => {
  const cycleTheme = () => {
    if (theme === "dark") setTheme("cyber");
    else if (theme === "cyber") setTheme("light");
    else setTheme("dark");
  };

  const getThemeLabel = () => {
    if (theme === "dark") return { label: "Dark Deep", icon: <Moon className="w-4 h-4" /> };
    if (theme === "cyber") return { label: "Cyber Neon", icon: <Zap className="w-4 h-4 text-cyan-400" /> };
    return { label: "Clean Light", icon: <Sun className="w-4 h-4 text-amber-500" /> };
  };

  const currentTheme = getThemeLabel();

  return (
    <header className="navbar-container">
      <div className="brand-group">
        <div className="logo-icon-wrap">
          <Sparkles className="logo-sparkle" />
        </div>
        <div className="brand-text">
          <span className="brand-name">GitIntel</span>
          <span className="version-pill">v2.0 PRO</span>
        </div>
      </div>

      <div className="navbar-actions">
        <button
          type="button"
          className={`nav-btn compare-btn ${compareMode ? "active" : ""}`}
          onClick={() => setCompareMode(!compareMode)}
          title="Compare two GitHub developers side-by-side"
        >
          <GitCompare className="w-4 h-4" />
          <span>{compareMode ? "Exit Compare" : "Compare Devs"}</span>
        </button>

        <button
          type="button"
          className="nav-btn export-btn"
          onClick={onExportClick}
          title="Export & Share Insights"
        >
          <Share2 className="w-4 h-4" />
          <span>Export</span>
        </button>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={cycleTheme}
          title="Cycle Theme (Dark -> Cyber -> Light)"
        >
          {currentTheme.icon}
          <span className="theme-text">{currentTheme.label}</span>
        </button>
      </div>
    </header>
  );
};
