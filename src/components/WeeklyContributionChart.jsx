import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

function CustomTooltip({ active, payload, avg }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const count = data.contributions;
    const diffFromAvg = avg > 0 ? Math.round(((count - avg) / avg) * 100) : 0;

    return (
      <div className="weekly-chart-tooltip">
        <div className="tooltip-header">
          <span className="tooltip-week">{data.displayWeek}</span>
          {data.dateRange && <span className="tooltip-date">{data.dateRange}</span>}
        </div>
        <div className="tooltip-body">
          <span className="tooltip-indicator" />
          <span className="tooltip-count">{count}</span>
          <span className="tooltip-label">
            {count === 1 ? "contribution" : "contributions"}
          </span>
        </div>
        <div className="tooltip-footer">
          {count > 0 && avg > 0 ? (
            <span className={`tooltip-comparison ${diffFromAvg >= 0 ? "positive" : "negative"}`}>
              {diffFromAvg >= 0 ? `+${diffFromAvg}%` : `${diffFromAvg}%`} vs average
            </span>
          ) : (
            <span className="tooltip-comparison neutral">No contributions</span>
          )}
          {data.busiestDay && data.busiestDay.contributionCount > 0 && (
            <span className="tooltip-peak-day">
              Peak: {data.busiestDay.dayName} ({data.busiestDay.contributionCount})
            </span>
          )}
        </div>
      </div>
    );
  }
  return null;
}

export function WeeklyContributionChart({ calendar }) {
  const [timeRange, setTimeRange] = useState("52");
  const [chartType, setChartType] = useState("area");

  const allWeeksData = useMemo(() => {
    if (!calendar?.weeks?.length) return [];

    let lastMonth = "";

    return calendar.weeks.map((week, index) => {
      const days = week.contributionDays || [];
      const weekContributions = days.reduce(
        (sum, day) => sum + (day.contributionCount || 0),
        0
      );

      const firstDay = days[0]?.date;
      const lastDay = days[days.length - 1]?.date;

      let dateRange = "";
      let monthName = "";
      let isFirstOfWeekInMonth = false;

      if (firstDay) {
        const dStart = new Date(firstDay + "T00:00:00");
        const currentMonth = dStart.toLocaleDateString("en-US", { month: "short" });
        if (currentMonth !== lastMonth) {
          monthName = currentMonth;
          lastMonth = currentMonth;
          isFirstOfWeekInMonth = true;
        }

        if (lastDay) {
          const dEnd = new Date(lastDay + "T00:00:00");
          dateRange = `${dStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${dEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
        } else {
          dateRange = dStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        }
      }

      // Find the busiest single day of this week
      let busiest = null;
      days.forEach((day) => {
        if (!busiest || (day.contributionCount || 0) > (busiest.contributionCount || 0)) {
          const d = new Date(day.date + "T00:00:00");
          busiest = {
            date: day.date,
            dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
            contributionCount: day.contributionCount || 0
          };
        }
      });

      return {
        weekIndex: index + 1,
        displayWeek: `Week ${index + 1}`,
        shortWeek: `W${index + 1}`,
        axisLabel: isFirstOfWeekInMonth ? monthName : "",
        monthName,
        dateRange,
        contributions: weekContributions,
        busiestDay: busiest
      };
    });
  }, [calendar]);

  const { chartData, stats } = useMemo(() => {
    if (!allWeeksData.length) {
      return {
        chartData: [],
        stats: { total: 0, avg: 0, peak: 0, activeWeeks: 0, consistency: 0, momentum: 0 }
      };
    }

    const rangeCount = parseInt(timeRange, 10);
    const data = rangeCount < allWeeksData.length
      ? allWeeksData.slice(-rangeCount)
      : allWeeksData;

    let total = 0;
    let peak = 0;
    let activeWeeks = 0;

    data.forEach((w) => {
      total += w.contributions;
      if (w.contributions > peak) peak = w.contributions;
      if (w.contributions > 0) activeWeeks += 1;
    });

    const avg = data.length ? parseFloat((total / data.length).toFixed(1)) : 0;
    const consistency = data.length ? Math.round((activeWeeks / data.length) * 100) : 0;

    // Calculate momentum (last 4 weeks vs current period avg)
    const last4 = data.slice(-4);
    const last4Avg = last4.length
      ? last4.reduce((s, w) => s + w.contributions, 0) / last4.length
      : 0;
    const momentum = avg > 0 ? Math.round(((last4Avg - avg) / avg) * 100) : 0;

    return {
      chartData: data,
      stats: {
        total,
        avg,
        peak,
        activeWeeks,
        totalWeeks: data.length,
        consistency,
        momentum
      }
    };
  }, [allWeeksData, timeRange]);

  if (!chartData.length) return null;

  return (
    <section className="weekly-contribution-card">
      <div className="weekly-card-header">
        <div className="weekly-header-info">
          <div className="panel-head">
            <span className="panel-tag weekly-tag">Velocity</span>
            <span className="weekly-period-badge">
              {timeRange === "52" ? "52-Week Annual" : timeRange === "26" ? "6-Month Rhythm" : "12-Week Sprint"}
            </span>
            {stats.momentum !== 0 && (
              <span className={`weekly-momentum-badge ${stats.momentum > 0 ? "sprint" : "cooldown"}`}>
                {stats.momentum > 0 ? `▲ +${stats.momentum}% recent sprint` : `▼ ${stats.momentum}% pace`}
              </span>
            )}
          </div>
          <h3>Weekly Contribution Trends</h3>
          <p className="panel-copy">
            Detailed weekly volume showing consistency, sprints, and code activity.
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="weekly-controls-group">
          {/* Chart Type Toggle */}
          <div className="segmented-control chart-type-toggle">
            <button
              type="button"
              className={`control-btn ${chartType === "area" ? "active" : ""}`}
              onClick={() => setChartType("area")}
              title="Smooth Velocity Wave"
            >
              Wave
            </button>
            <button
              type="button"
              className={`control-btn ${chartType === "bar" ? "active" : ""}`}
              onClick={() => setChartType("bar")}
              title="Weekly Volume Bars"
            >
              Bars
            </button>
          </div>

          {/* Time Range Toggle */}
          <div className="segmented-control time-range-toggle">
            <button
              type="button"
              className={`control-btn ${timeRange === "52" ? "active" : ""}`}
              onClick={() => setTimeRange("52")}
            >
              1Y
            </button>
            <button
              type="button"
              className={`control-btn ${timeRange === "26" ? "active" : ""}`}
              onClick={() => setTimeRange("26")}
            >
              6M
            </button>
            <button
              type="button"
              className={`control-btn ${timeRange === "12" ? "active" : ""}`}
              onClick={() => setTimeRange("12")}
            >
              3M
            </button>
          </div>
        </div>
      </div>

      {/* Stats Ribbon */}
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
        <div className="weekly-stat-pill">
          <span className="stat-pill-label">Consistency</span>
          <span className="stat-pill-value">
            {stats.consistency}%
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="weekly-chart-wrapper">
        <ResponsiveContainer
          width="100%"
          height={280}
          minWidth={0}
          minHeight={280}
          initialDimension={{ width: 800, height: 280 }}
        >
          {chartType === "area" ? (
            <AreaChart data={chartData} margin={{ top: 16, right: 12, left: -20, bottom: 4 }}>
              <defs>
                <linearGradient id="contributionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5} />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.07)"
                vertical={false}
              />

              <XAxis
                dataKey={timeRange === "12" ? "shortWeek" : "axisLabel"}
                axisLine={{ stroke: "rgba(148, 163, 184, 0.15)" }}
                tickLine={false}
                tick={{ fill: "#94a9bd", fontSize: 11 }}
                interval={0}
                dy={6}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a9bd", fontSize: 11 }}
                dx={-4}
              />

              <ReferenceLine
                y={stats.avg}
                stroke="rgba(56, 189, 248, 0.45)"
                strokeDasharray="3 3"
                label={{
                  value: `avg: ${stats.avg}`,
                  position: "insideTopRight",
                  fill: "#38bdf8",
                  fontSize: 10,
                  opacity: 0.8
                }}
              />

              <Tooltip content={<CustomTooltip avg={stats.avg} />} />

              <Area
                type="monotone"
                dataKey="contributions"
                stroke="#a78bfa"
                strokeWidth={2.5}
                fill="url(#contributionGradient)"
                dot={timeRange === "12" ? { r: 3, fill: "#a78bfa", strokeWidth: 0 } : false}
                activeDot={{
                  r: 6,
                  fill: "#c4b5fd",
                  stroke: "#1e1b4b",
                  strokeWidth: 2
                }}
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 16, right: 12, left: -20, bottom: 4 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.07)"
                vertical={false}
              />

              <XAxis
                dataKey={timeRange === "12" ? "shortWeek" : "axisLabel"}
                axisLine={{ stroke: "rgba(148, 163, 184, 0.15)" }}
                tickLine={false}
                tick={{ fill: "#94a9bd", fontSize: 11 }}
                interval={0}
                dy={6}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a9bd", fontSize: 11 }}
                dx={-4}
              />

              <ReferenceLine
                y={stats.avg}
                stroke="rgba(56, 189, 248, 0.45)"
                strokeDasharray="3 3"
                label={{
                  value: `avg: ${stats.avg}`,
                  position: "insideTopRight",
                  fill: "#38bdf8",
                  fontSize: 10,
                  opacity: 0.8
                }}
              />

              <Tooltip content={<CustomTooltip avg={stats.avg} />} />

              <Bar
                dataKey="contributions"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                maxBarSize={timeRange === "12" ? 28 : timeRange === "26" ? 16 : 8}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}