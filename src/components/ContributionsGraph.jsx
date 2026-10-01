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

    return (
        <section className="contribution-panel">
            <div className="panel-head">
                <span className="panel-tag">Contributions</span>
                <span className="contribution-total">{calendar.totalContributions}</span>
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
        </section>
    )
}