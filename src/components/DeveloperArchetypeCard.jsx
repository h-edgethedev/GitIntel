import React from "react";
import { deriveDeveloperArchetype } from "../services/githubApi";
import { Cpu, Flame, Trophy, Award, Zap } from "lucide-react";
import { formatNumber } from "../utils/formatters";

export const DeveloperArchetypeCard = ({ userData, repoAnalytics, streakStats }) => {
  if (!userData || !repoAnalytics || !streakStats) return null;

  const archetype = deriveDeveloperArchetype(userData, repoAnalytics, streakStats);
  const topLanguage = repoAnalytics.languageStats[0];

  const highlights = [];
  if (topLanguage) {
    highlights.push({
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      text: `Primary language is ${topLanguage.name} (${topLanguage.percentage}% of repos)`,
    });
  }
  if (repoAnalytics.totalStars > 0) {
    highlights.push({
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
      text: `Earned ${formatNumber(repoAnalytics.totalStars)} stars across public repositories`,
    });
  }
  if (streakStats.longestStreak > 0) {
    highlights.push({
      icon: <Flame className="w-4 h-4 text-rose-400" />,
      text: `Peak contribution streak of ${streakStats.longestStreak} consecutive days`,
    });
  }
  if (streakStats.averagePerDay > 0) {
    highlights.push({
      icon: <Zap className="w-4 h-4 text-purple-400" />,
      text: `Averages ~${streakStats.averagePerDay} contributions per day`,
    });
  }

  return (
    <div className="archetype-card">
      <div className="archetype-header">
        <div className="archetype-badge-icon">{archetype.badge}</div>
        <div className="archetype-title-group">
          <div className="archetype-tag">
            <Award className="w-3.5 h-3.5 mr-1 inline" /> Developer Intelligence Persona
          </div>
          <h2 className="archetype-title">{archetype.title}</h2>
          <p className="archetype-subtitle">{archetype.description}</p>
        </div>
      </div>

      <div className="archetype-insights-grid">
        {highlights.map((h, i) => (
          <div key={i} className="insight-item">
            <div className="insight-icon">{h.icon}</div>
            <span className="insight-text">{h.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
