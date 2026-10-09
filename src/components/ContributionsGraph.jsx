import { useRef, useEffect } from "react";

export function ContributionGraph({ calendar }) {
    const graphScrollRef = useRef(null);

    // Slowly and gently scroll to the right when graph comes into view on mobile
    useEffect(() => {
        const el = graphScrollRef.current;
        if (!el) return;

        let hasScrolled = false;
        let animId = null;

        const slowScrollTo = (element, targetLeft, duration = 1800) => {
            const startLeft = element.scrollLeft;
            const distance = targetLeft - startLeft;
            const startTime = performance.now();

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // EaseInOutQuad curve for a gentle, luxurious scroll
                const ease = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                element.scrollLeft = startLeft + (distance * ease);

                if (progress < 1) {
                    animId = requestAnimationFrame(step);
                }
            };

            animId = requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasScrolled) {
                        hasScrolled = true;
                        const maxScroll = el.scrollWidth - el.clientWidth;
                        if (maxScroll > 20) {
                            setTimeout(() => {
                                slowScrollTo(el, maxScroll, 1800);
                            }, 400);
                        }
                    }
                });
            },
            { threshold: 0.35 }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            if (animId) cancelAnimationFrame(animId);
        };
    }, [calendar]);

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

    const streakData = contributionDays.reduce((streak, day) => {
        if (day.contributionCount > 0) {
            streak.current += 1
            streak.longest = Math.max(streak.current, streak.longest)
        }
        else {
            if (day !== contributionDays[contributionDays.length - 1]) {
                streak.current = 0
            }
            else if (contributionDays[contributionDays.length - 1].contributionCount > 0) {
                streak.current++
            }
        }
        return streak
    }, {
        current: 0, longest: 0
    })

    // console.log(streakData)

    const formattedMostActiveDate = mostActiveDay?.date
        ? new Date(mostActiveDay.date + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
        : null

    function getWeeklyContribution(weeks) {
        return weeks.map((week)=>{
            return week.contributionDays.reduce((sum, day)=>{
                sum+= day.contributionCount
                return sum;
            },0)
        })
    }

    const weeklyContribution = getWeeklyContribution(calendar.weeks).map((contribution, index)=>{
       return {
            week : `week${index+1}`,
            contributions: contribution
        }
    })
console.log(weeklyContribution)
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
            <div className="contribution-graph" ref={graphScrollRef}>
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
                    <div className="analytics-card">
                        <span className="analytics-label">&#x1F525; Longest streak</span>
                        <strong className="analytics-value">{streakData.longest > 0
                            ? `${streakData.longest}`
                            : `0`
                        } </strong>
                        <span className="analytics-subtext">Days</span>
                    </div>
                    <div className="analytics-card">
                        <span className="analytics-label">Current Streak</span>
                        <strong className="analytics-value">{streakData.current > 0
                            ? `${streakData.current}`
                            : `0`}
                        </strong>
                        <span className="analytics-subtext">Days</span>
                    </div>
                </div>
            </div>
        </section>
    )
}