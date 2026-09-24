import React from "react";
import { Code, Tag } from "lucide-react";

export const LanguageBreakdownSection = ({ repoAnalytics }) => {
  if (!repoAnalytics || !repoAnalytics.languageStats?.length) {
    return null;
  }

  const { languageStats, topics } = repoAnalytics;

  return (
    <div className="language-panel-card">
      <div className="panel-title-wrap mb-4">
        <Code className="w-5 h-5 text-cyan-400 mr-2" />
        <h3 className="panel-heading">Languages & Tech Stack</h3>
      </div>

      {/* Stacked Progress Bar */}
      <div className="language-stacked-bar">
        {languageStats.map((lang) => (
          <div
            key={lang.name}
            className="stacked-bar-segment"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
            title={`${lang.name}: ${lang.percentage}% (${lang.count} repos)`}
          />
        ))}
      </div>

      {/* Language Breakdown Cards Grid */}
      <div className="language-cards-grid">
        {languageStats.map((lang) => (
          <div key={lang.name} className="language-item-card">
            <div className="lang-header">
              <span
                className="lang-color-dot"
                style={{ backgroundColor: lang.color }}
              />
              <span className="lang-name">{lang.name}</span>
            </div>
            <div className="lang-details">
              <span className="lang-pct">{lang.percentage}%</span>
              <span className="lang-count">{lang.count} {lang.count === 1 ? "repo" : "repos"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Topics Tag Cloud */}
      {topics && topics.length > 0 && (
        <div className="topics-section mt-6">
          <div className="topics-heading-wrap">
            <Tag className="w-4 h-4 text-purple-400 mr-1.5 inline" />
            <span className="topics-heading">Popular Topics & Skills:</span>
          </div>
          <div className="topics-cloud">
            {topics.map((t) => (
              <span key={t} className="topic-pill">
                #{t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
