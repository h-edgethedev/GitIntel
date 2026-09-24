import React, { useState } from "react";
import { X, Copy, Check, Share2, Code, FileText } from "lucide-react";

export const ExportModal = ({ isOpen, onClose, userData, repoAnalytics, streakStats }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen || !userData) return null;

  const profileUrl = window.location.href;
  const markdownBadge = `![GitIntel Profile](https://img.shields.io/badge/GitIntel-${userData.login}-purple?style=for-the-badge&logo=github)\n[![Followers](https://img.shields.io/github/followers/${userData.login}?style=social)](https://github.com/${userData.login})`;

  const jsonSummary = JSON.stringify(
    {
      username: userData.login,
      name: userData.name,
      bio: userData.bio,
      location: userData.location,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      earnedStars: repoAnalytics?.totalStars || 0,
      totalContributions: streakStats?.totalContributions || 0,
      topLanguage: repoAnalytics?.languageStats?.[0]?.name || "N/A",
    },
    null,
    2
  );

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center">
            <Share2 className="w-5 h-5 text-purple-400 mr-2" />
            <h3 className="modal-title">Export & Share Insights</h3>
          </div>
          <button type="button" onClick={onClose} className="modal-close-btn">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          {/* Share Profile Link */}
          <div className="export-field-group">
            <label className="export-lbl">Share Profile Link</label>
            <div className="export-copy-input-row">
              <input type="text" readOnly value={profileUrl} className="export-input" />
              <button
                type="button"
                onClick={() => handleCopy(profileUrl, "link")}
                className="export-copy-btn"
              >
                {copiedKey === "link" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === "link" ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* GitHub Markdown Snippet */}
          <div className="export-field-group">
            <label className="export-lbl">
              <Code className="w-3.5 h-3.5 mr-1 inline" /> Markdown Badge Code
            </label>
            <div className="export-copy-input-row">
              <textarea readOnly rows={3} value={markdownBadge} className="export-textarea" />
              <button
                type="button"
                onClick={() => handleCopy(markdownBadge, "md")}
                className="export-copy-btn"
              >
                {copiedKey === "md" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === "md" ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* JSON Report Export */}
          <div className="export-field-group">
            <label className="export-lbl">
              <FileText className="w-3.5 h-3.5 mr-1 inline" /> Developer JSON Summary
            </label>
            <div className="export-copy-input-row">
              <textarea readOnly rows={4} value={jsonSummary} className="export-textarea font-mono" />
              <button
                type="button"
                onClick={() => handleCopy(jsonSummary, "json")}
                className="export-copy-btn"
              >
                {copiedKey === "json" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === "json" ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
