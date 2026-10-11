import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="weekly-chart-tooltip">
        <div className="tooltip-header">
          <span className="tooltip-week">{data.displayWeek}</span>
          {data.dateRange && <span className="tooltip-date">{data.dateRange}</span>}
        </div>
        <div className="tooltip-body">
          <span className="tooltip-indicator" />
          <span className="tooltip-count">{data.contributions}</span>
          <span className="tooltip-label">
            {data.contributions === 1 ? "contribution" : "contributions"}
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export function WeeklyContributionChart({ calendar }) {
  const { chartData, stats } = useMemo(() => {
    if (!calendar?.weeks?.length) {
      return { chartData: [], stats: { total: 0, avg: 0, peak: 0, activeWeeks: 0 } };
    }

    let total = 0;
    let peak = 0;
    let activeWeeks = 0;

    const data = calendar.weeks.map((week, index) => {
      const weekContributions = (week.contributionDays || []).reduce(
        (sum, day) => sum + (day.contributionCount || 0),
        0
      );

      total += weekContributions;
      if (weekContributions > peak) peak = weekContributions;
      if (weekContributions > 0) activeWeeks += 1;

      const firstDay = week.contributionDays?.[0]?.date;
      const lastDay = week.contributionDays?.[week.contributionDays.length - 1]?.date;

      let dateRange = "";
      let monthLabel = "";
      if (firstDay) {
        const dStart = new Date(firstDay + "T00:00:00");
        monthLabel = dStart.toLocaleDateString("en-US", { month: "short" });
        if (lastDay) {
          const dEnd = new Date(lastDay + "T00:00:00");
          dateRange = `${dStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${dEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
        } else {
          dateRange = dStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        }
      }

      return {
        weekIndex: index + 1,
        displayWeek: `Week ${index + 1}`,
        shortWeek: `W${index + 1}`,
        monthLabel: monthLabel || `W${index + 1}`,
        dateRange,
        contributions: weekContributions
      };
    });

    const avg = data.length ? (total / data.length).toFixed(1) : 0;

    return {
      chartData: data,
      stats: { total, avg, peak, activeWeeks, totalWeeks: data.length }
    };
  }, [calendar]);

  if (!chartData.length) return null;

  return (
    <section className="weekly-contribution-card">
      <div className="weekly-card-header">
        <div className="weekly-header-info">
          <div className="panel-head">
            <span className="panel-tag weekly-tag">Velocity</span>
            <span className="weekly-period-badge">52-Week Activity</span>
          </div>
          <h3>Weekly Contribution Trends</h3>
          <p className="panel-copy">
            Detailed weekly volume showing consistency, sprints, and code activity.
          </p>
        </div>

        <div className="weekly-stats-ribbon">
          <div className="weekly-stat-pill">
            <span className="stat-pill-label">Avg / Week</span>
            <span className="stat-pill-value">{stats.avg}</span>
          </div>
          <div className="weekly-stat-pill highlight">
            <span className="stat-pill-label">Peak Week</span>
            <span className="stat-pill-value">{stats.peak}</span>
          </div>
          <div className="weekly-stat-pill">
            <span className="stat-pill-label">Active Weeks</span>
            <span className="stat-pill-value">
              {stats.activeWeeks} <small>/{stats.totalWeeks}</small>
            </span>
          </div>
        </div>
      </div>

      <div className="weekly-chart-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData} margin={{ top: 12, right: 10, left: -22, bottom: 4 }}>
            <defs>
              <linearGradient id="contributionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.45} />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148, 163, 184, 0.08)"
              vertical={false}
            />

            <XAxis
              dataKey="shortWeek"
              axisLine={{ stroke: "rgba(148, 163, 184, 0.15)" }}
              tickLine={false}
              tick={{ fill: "#94a9bd", fontSize: 11 }}
              minTickGap={26}
              dy={6}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a9bd", fontSize: 11 }}
              dx={-4}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="contributions"
              stroke="#a78bfa"
              strokeWidth={2.5}
              fill="url(#contributionGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#c4b5fd",
                stroke: "#1e1b4b",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}