import React from "react";
import { GitCommit, GitPullRequest, CircleAlert, Star, GitFork, PlusCircle, Activity } from "lucide-react";
import { formatRelativeTime } from "../utils/formatters";

export const ActivityFeedSection = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="activity-panel-card empty-state">
        <Activity className="w-8 h-8 text-gray-400 mb-2" />
        <p className="empty-txt">No recent public activity recorded for this user.</p>
      </div>
    );
  }

  const getEventMeta = (event) => {
    const type = event.type;
    const repoName = event.repo?.name || "repository";
    const repoUrl = `https://github.com/${repoName}`;

    switch (type) {
      case "PushEvent":
        const commitMsg = event.payload?.commits?.[0]?.message || "Pushed commits";
        return {
          icon: <GitCommit className="w-4 h-4 text-emerald-400" />,
          title: `Pushed to ${repoName}`,
          detail: commitMsg,
          link: repoUrl,
        };
      case "PullRequestEvent":
        const prAction = event.payload?.action || "opened";
        const prTitle = event.payload?.pull_request?.title || "";
        return {
          icon: <GitPullRequest className="w-4 h-4 text-purple-400" />,
          title: `${prAction.toUpperCase()} Pull Request in ${repoName}`,
          detail: prTitle,
          link: event.payload?.pull_request?.html_url || repoUrl,
        };
      case "IssuesEvent":
        const issueAction = event.payload?.action || "updated";
        const issueTitle = event.payload?.issue?.title || "";
        return {
          icon: <CircleAlert className="w-4 h-4 text-cyan-400" />,
          title: `${issueAction.toUpperCase()} Issue in ${repoName}`,
          detail: issueTitle,
          link: event.payload?.issue?.html_url || repoUrl,
        };
      case "WatchEvent":
        return {
          icon: <Star className="w-4 h-4 text-amber-400" />,
          title: `Starred ${repoName}`,
          detail: "Added repository to starred items",
          link: repoUrl,
        };
      case "ForkEvent":
        return {
          icon: <GitFork className="w-4 h-4 text-rose-400" />,
          title: `Forked ${repoName}`,
          detail: `Fork created at ${event.payload?.forkee?.full_name || repoName}`,
          link: event.payload?.forkee?.html_url || repoUrl,
        };
      case "CreateEvent":
        const refType = event.payload?.ref_type || "repository";
        return {
          icon: <PlusCircle className="w-4 h-4 text-blue-400" />,
          title: `Created ${refType} in ${repoName}`,
          detail: event.payload?.ref ? `Ref: ${event.payload.ref}` : "New repository initialised",
          link: repoUrl,
        };
      default:
        return {
          icon: <Activity className="w-4 h-4 text-gray-400" />,
          title: `Activity in ${repoName}`,
          detail: type.replace("Event", ""),
          link: repoUrl,
        };
    }
  };

  return (
    <div className="activity-panel-card">
      <div className="panel-title-wrap mb-4">
        <Activity className="w-5 h-5 text-emerald-400 mr-2" />
        <h3 className="panel-heading">Recent Activity Timeline</h3>
        <span className="total-badge">{events.length} events</span>
      </div>

      <div className="activity-timeline">
        {events.slice(0, 15).map((event) => {
          const meta = getEventMeta(event);
          return (
            <div key={event.id} className="timeline-item">
              <div className="timeline-icon-wrap">{meta.icon}</div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <a
                    href={meta.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="timeline-title-link"
                  >
                    {meta.title}
                  </a>
                  <span className="timeline-time">{formatRelativeTime(event.created_at)}</span>
                </div>
                {meta.detail && <p className="timeline-detail">{meta.detail}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
