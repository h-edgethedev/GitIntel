import React, { useState } from "react";
import { Flame, Calendar, Sparkles, TrendingUp, Award } from "lucide-react";
import { formatDate } from "../utils/formatters";

const THEMES = {
  emerald: {
    label: "Emerald",
    colors: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  },
  cyber: {
    label: "Cyber Violet",
    colors: ["#161b22", "#2e1065", "#5b21b6", "#7c3aed", "#a78bfa"],
  },
  amber: {
    label: "Solar Amber",
    colors: ["#161b22", "#451a03", "#78350f", "#d97706", "#fbbf24"],
  },
  cyan: {
    label: "Neon Cyan",
    colors: ["#161b22", "#083344", "#155e75", "#0891b2", "#22d3ee"],
  },
  matrix: {
    label: "Matrix",
    colors: ["#0d1117", "#003b00", "#006b00", "#00b300", "#00ff00"],
  },
};

export const ContributionGraphSection = ({ calendar, streakStats }) => {
  const [activeThemeKey, setActiveThemeKey] = useState("emerald");
  const activeTheme = THEMES[activeThemeKey];

  if (!calendar || !calendar.weeks?.length) return null;

  // Compute Month Labels
  const monthLabels = (() => {
    const labels = [];
    const seen = new Set();
    calendar.weeks.forEach((week, index) => {
      const firstDay = week.contributionDays?.[0]?.date;
      if (!firstDay) return;
      const date = new Date(firstDay);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!seen.has(key)) {
        seen.add(key);
        labels.push({
          index,
          label: date.toLocaleString("en-US", { month: "short" }),
        });
      }
    });
    return labels;
  })();

  const mapLevelToColor = (day) => {
    const level = day.contributionLevel;
    const count = day.contributionCount;
    if (count === 0 || level === "NONE") return activeTheme.colors[0];
    if (level === "FIRST_QUARTILE" || count <= 3) return activeTheme.colors[1];
    if (level === "SECOND_QUARTILE" || count <= 6) return activeTheme.colors[2];
    if (level === "THIRD_QUARTILE" || count <= 9) return activeTheme.colors[3];
    return activeTheme.colors[4];
  };

  return (
    <div className="contribution-panel-card">
      <div className="panel-top-row">
        <div className="panel-title-wrap">
          <Calendar className="w-5 h-5 text-emerald-400 mr-2" />
          <h3 className="panel-heading">Contribution Activity</h3>
          <span className="total-badge">{calendar.totalContributions} total</span>
        </div>

        {/* Heatmap Theme Switcher */}
        <div className="theme-picker-group">
          <span className="picker-lbl">Theme:</span>
          {Object.entries(THEMES).map(([key, t]) => (
            <button
              key={key}
              type="button"
              className={`theme-dot-btn ${activeThemeKey === key ? "active" : ""}`}
              onClick={() => setActiveThemeKey(key)}
              title={t.label}
              style={{ backgroundColor: t.colors[4] }}
            />
          ))}
        </div>
      </div>

      {/* Streak & Activity Cards Grid */}
      <div className="streak-stats-row">
        <div className="streak-mini-card">
          <Flame className="w-4 h-4 text-orange-400 mb-1" />
          <span className="streak-val">{streakStats?.currentStreak || 0} Days</span>
          <span className="streak-lbl">Current Streak</span>
        </div>

        <div className="streak-mini-card">
          <Flame className="w-4 h-4 text-rose-500 mb-1" />
          <span className="streak-val">{streakStats?.longestStreak || 0} Days</span>
          <span className="streak-lbl">Longest Streak</span>
        </div>

        <div className="streak-mini-card">
          <TrendingUp className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="streak-val">{streakStats?.activeDays || 0} Days</span>
          <span className="streak-lbl">Active Days</span>
        </div>

        <div className="streak-mini-card">
          <Award className="w-4 h-4 text-amber-400 mb-1" />
          <span className="streak-val">{streakStats?.peakDay?.count || 0}</span>
          <span className="streak-lbl">
            Peak Day ({streakStats?.peakDay?.date ? formatDate(streakStats.peakDay.date) : "N/A"})
          </span>
        </div>
      </div>

      {/* Contribution Calendar Heatmap */}
      <div className="heatmap-overflow-container">
        <div className="contribution-graph-grid" style={{ "--total-weeks": calendar.weeks.length }}>
          <div className="month-labels-row">
            {monthLabels.map((month) => (
              <span
                key={`${month.label}-${month.index}`}
                className="month-label-item"
                style={{ gridColumn: `${month.index + 1} / span 1` }}
              >
                {month.label}
              </span>
            ))}
          </div>

          <div className="days-heatmap-grid">
            {calendar.weeks.flatMap((week, weekIndex) =>
              week.contributionDays.map((day, dayIndex) => (
                <span
                  key={`${day.date}-${weekIndex}`}
                  className="day-cell-tile"
                  title={`${day.date}: ${day.contributionCount} contributions`}
                  style={{
                    backgroundColor: mapLevelToColor(day),
                    gridColumn: weekIndex + 1,
                    gridRow: dayIndex + 1,
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="heatmap-legend-bar">
        <span className="legend-txt">Less</span>
        <div className="legend-squares">
          {activeTheme.colors.map((c, idx) => (
            <span key={idx} className="legend-sq" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="legend-txt">More</span>
      </div>
    </div>
  );
};
