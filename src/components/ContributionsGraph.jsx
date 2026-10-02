export function ContributionGraph({ calendar }) {
    const monthLabels = (() => {
        if (!calendar?.weeks?.length) return []
        const labels = []
        const seen = new Set()

        calendar.weeks.forEach((week, index) => {
            const firstDay = week?.contributionDays?.[0].date
            if (!firstDay) return
            const date = new Date(firstDay)
            const key = `${date.getFullYear()}-${date.getMonth()}`

            if (!seen.has(key)) {
                seen.add(key)
                labels.push({
                    index,
                    label: date.toLocaleString("en-US", { month: "short" })
                })
            }
        })

        return labels
    })()

    const contributionDays = calendar?.weeks?.flatMap(week => week.contributionDays) || []
    const totalContribution = contributionDays.reduce((sum, day) => {
        return sum + day.contributionCount
    }, 0)

    const averageContribution = contributionDays.length ? (totalContribution / contributionDays.length).toFixed(2) : "0.00"
    const avgWeeklyContribution = calendar?.weeks?.length ? (totalContribution / calendar.weeks.length).toFixed(2) : "0.00"

    const mostActiveDay = contributionDays.reduce((maxDay, day) => {
        if (!maxDay || day.contributionCount > maxDay.contributionCount) {
            return day
        }
        return maxDay
    }, null)

    const formattedMostActiveDate = mostActiveDay?.date
        ? new Date(mostActiveDay.date + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
        : null

    return (
        <section className="contribution-panel">
            <div className="panel-head">
                <span className="panel-tag">Contributions</span>
                <div className="contribution-stats-row">
                    <div className="contribution-stat">
                        <span className="contribution-stat-label">Total</span>
                        <span className="contribution-total">{calendar.totalContributions}</span>
                    </div>
                </div>
            </div>
            <p className="panel-copy">Total contributions recorded in the last year.</p>
            <div className="contribution-graph">
                <div className="month-row">
                    {
                        monthLabels.map((month) => (
                            <span key={`${month.label}-${month.index}`}
                                className="month-label"
                                style={{ gridColumn: `${month.index + 1}/span 1` }}>
                                {month.label}
                            </span>
                        ))}
                </div>
                <div className="heatmap">
                    {
                        calendar.weeks.flatMap((week, weekIndex) =>
                            week.contributionDays.map((day, dayIndex) => (
                                <span key={`${day.date}-${weekIndex}`}
                                    className="day-cell"
                                    title={`${day.date}: ${day.contributionCount} contributions`}
                                    style={{
                                        backgroundColor: day.color === "#ebedf0" ? "#151B23" : day.color,
                                        gridColumn: weekIndex + 1,
                                        gridRow: dayIndex + 1,
                                    }}></span>
                            ))
                        )
                    }
                </div>
            </div>

            <div className="advanced-analytics">
                <h3 className="analytics-title">Advanced Analytics</h3>
                <div className="analytics-grid">
                    <div className="analytics-card">
                        <span className="analytics-label">Daily Average</span>
                        <strong className="analytics-value">{averageContribution}</strong>
                        <span className="analytics-subtext">contributions / day</span>
                    </div>
                    <div className="analytics-card">
                        <span className="analytics-label">Weekly Average</span>
                        <strong className="analytics-value">{avgWeeklyContribution}</strong>
                        <span className="analytics-subtext">contributions / week</span>
                    </div>
                    <div className="analytics-card">
                        <span className="analytics-label">Most Active Day</span>
                        <strong className="analytics-value">
                            {mostActiveDay && mostActiveDay.contributionCount > 0
                                ? `${mostActiveDay.contributionCount} contribs`
                                : "N/A"}
                        </strong>
                        <span className="analytics-subtext">
                            {formattedMostActiveDate || "No activity recorded"}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}