import { useEffect } from "react";
import { Link } from "react-router";
import "./About.css";
import authorPicture from "../assets/My picture.png";
import homeImg from "../assets/home.png";
import analyticsImg from "../assets/analytics.png";
import trendsImg from "../assets/trends.png";
import logoImg from "../assets/gitintel-logo.png";

export function About() {
    useEffect(() => {
        try {
            localStorage.setItem("gitintel_has_visited", "true");
        } catch {
            // Ignore storage errors in restricted/private browsing modes
        }
    }, []);

    return (
        <div className="about-wrapper">
            <main className="about-page">
                {/* Navigation */}
                <nav className="about-nav">
                    <Link to="/" className="about-back-btn" title="Return to GitIntel Search">
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Back to GitIntel</span>
                    </Link>

                    <div className="about-brand-pill">
                        <img src={logoImg} alt="GitIntel logo" className="about-brand-logo" />
                        <span>GitIntel</span>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="about-hero">
                    <div className="hero-badge">
                        <span>DEVELOPER INTELLIGENCE PLATFORM</span>
                    </div>

                    <h1 className="about-title">
                        GitHub insights,
                        <span className="insight-gradient"> made meaningful.</span>
                    </h1>

                    <p className="about-intro">
                        GitIntel is an interactive GitHub profile analyzer that transforms raw API
                        data into beautiful visual stories. Explore developer velocity, analyze
                        contribution patterns, track streaks, and discover language stacks in one sleek interface.
                    </p>

                    <div className="about-actions">
                        <Link to="/" className="about-btn primary">
                            Explore GitIntel Now
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>

                        <a
                            href="https://github.com/h-edgethedev/GitIntel"
                            target="_blank"
                            rel="noreferrer"
                            className="about-btn secondary"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            View on GitHub
                        </a>
                    </div>
                </section>

                {/* Features Showcase Section */}
                <section className="about-showcase-section">
                    <div className="section-header">
                        <p className="about-eyebrow">POWERFUL CAPABILITIES</p>
                        <h2>Everything you need to understand developer code</h2>
                        <p className="section-subtext">
                            GitIntel provides granular visibility into coding rhythm, consistency,
                            and tech stack distribution that default GitHub profiles leave hidden.
                        </p>
                    </div>

                    {/* Showcase 1: Profile & Instant Search */}
                    <div className="showcase-card">
                        <div className="showcase-content">
                            <span className="showcase-tag">01 · INSTANT DISCOVERY</span>
                            <h3>Smart Profile Intelligence & Search History</h3>
                            <p>
                                Search any developer username to immediately fetch a comprehensive profile snapshot.
                                GitIntel aggregates followers, following counts, total public repositories, and author bios
                                with instant search history for quick switching between profiles.
                            </p>
                            <ul className="showcase-bullets">
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                    </span>
                                    <span><strong>Cached Search History:</strong> Quickly jump back to previously inspected developers.</span>
                                </li>
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </span>
                                    <span><strong>Complete Identity Overview:</strong> Live avatars, biographical highlights, and follower counts.</span>
                                </li>
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="23 4 23 10 17 10"></polyline>
                                            <polyline points="1 20 1 14 7 14"></polyline>
                                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                                        </svg>
                                    </span>
                                    <span><strong>On-Demand Bypass Cache:</strong> One click to bust client cache and retrieve real-time GitHub data.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="showcase-visual">
                            <div className="mockup-frame">
                                <div className="mockup-header">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                    <span className="mockup-title">Profile & Search</span>
                                </div>
                                <img
                                    src={homeImg}
                                    alt="GitIntel Search and Profile Interface"
                                    className="mockup-img"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Showcase 2: Analytics & Streaks */}
                    <div className="showcase-card reverse">
                        <div className="showcase-content">
                            <span className="showcase-tag">02 · ACTIVITY & CONSISTENCY</span>
                            <h3>Full-Year Heatmap & Streak Intelligence</h3>
                            <p>
                                Visualize a developer's real coding dedication. GitIntel charts the complete
                                365-day contribution calendar and computes deep metrics like daily/weekly
                                averages, peak activity days, and unbroken consecutive streaks.
                            </p>
                            <ul className="showcase-bullets">
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </span>
                                    <span><strong>Interactive 52-Week Grid:</strong> Full year contribution calendar with density levels.</span>
                                </li>
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2c0 4-5 6-5 11a5 5 0 0 0 10 0c0-5-5-7-5-11z"></path>
                                        </svg>
                                    </span>
                                    <span><strong>Longest & Current Streaks:</strong> Track unbroken consistency and active coding streaks.</span>
                                </li>
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="20" x2="18" y2="10"></line>
                                            <line x1="12" y1="20" x2="12" y2="4"></line>
                                            <line x1="6" y1="20" x2="6" y2="14"></line>
                                        </svg>
                                    </span>
                                    <span><strong>Velocity Averages:</strong> Daily and weekly contribution averages for quick benchmarking.</span>
                                </li>
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                    </span>
                                    <span><strong>Most Active Day:</strong> Highlights the developer's most prolific single day with commit counts.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="showcase-visual">
                            <div className="mockup-frame">
                                <div className="mockup-header">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                    <span className="mockup-title">Heatmap & Advanced Analytics</span>
                                </div>
                                <img
                                    src={analyticsImg}
                                    alt="GitIntel Contribution Heatmap and Streak Analytics"
                                    className="mockup-img"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Showcase 3: Trends & Velocity */}
                    <div className="showcase-card">
                        <div className="showcase-content">
                            <span className="showcase-tag">03 · VELOCITY & MOMENTUM</span>
                            <h3>52-Week Weekly Contribution Trends</h3>
                            <p>
                                Spot cycles of high productivity, hackathons, and sustained sprints. The
                                Weekly Contribution Trends graph provides a smooth velocity curve mapped across all
                                52 weeks of the year to reveal cadence and momentum.
                            </p>
                            <ul className="showcase-bullets">
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                            <polyline points="17 6 23 6 23 12"></polyline>
                                        </svg>
                                    </span>
                                    <span><strong>Continuous Velocity Curve:</strong> Visualized weekly volume showing sprints and focus periods.</span>
                                </li>
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="22" y1="12" x2="18" y2="12"></line>
                                            <line x1="6" y1="12" x2="2" y2="12"></line>
                                            <line x1="12" y1="6" x2="12" y2="2"></line>
                                            <line x1="12" y1="22" x2="12" y2="18"></line>
                                        </svg>
                                    </span>
                                    <span><strong>Peak Week Metrics:</strong> Identify the most intense week of contribution volume.</span>
                                </li>
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </span>
                                    <span><strong>Active Weeks Ratio:</strong> Discover how many weeks of the year had recorded commits (e.g. 35/53).</span>
                                </li>
                            </ul>
                        </div>
                        <div className="showcase-visual">
                            <div className="mockup-frame">
                                <div className="mockup-header">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                    <span className="mockup-title">52-Week Contribution Trends</span>
                                </div>
                                <img
                                    src={trendsImg}
                                    alt="GitIntel Weekly Contribution Trends Curve"
                                    className="mockup-img"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Showcase 4: Repository Stack & Language Bar */}
                    <div className="showcase-card reverse">
                        <div className="showcase-content">
                            <span className="showcase-tag">04 · REPOSITORY INTELLIGENCE</span>
                            <h3>Repository Deep-Dive & Language Breakdown</h3>
                            <p>
                                Go beyond simple file extensions. GitIntel inspects top repositories and computes
                                byte-precise multi-language distribution bars, star counts, fork statuses,
                                and update recency so you know exactly what stack a developer builds with.
                            </p>
                            <ul className="showcase-bullets">
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="16 18 22 12 16 6"></polyline>
                                            <polyline points="8 6 2 12 8 18"></polyline>
                                        </svg>
                                    </span>
                                    <span><strong>Multi-Language Composition:</strong> Color-coded distribution bar showing percentage breakdowns (JavaScript, CSS, HTML, Python, etc.).</span>
                                </li>
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                        </svg>
                                    </span>
                                    <span><strong>Source vs Fork Badges:</strong> Clearly separates original open-source creations from forked repos.</span>
                                </li>
                                <li>
                                    <span className="bullet-icon">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                    </span>
                                    <span><strong>Stars & Recency:</strong> Direct view of popularity, description, and latest commits.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="showcase-visual">
                            {/* Interactive Repository Card Mockup */}
                            <div className="mockup-frame repo-showcase-frame">
                                <div className="mockup-header">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                    <span className="mockup-title">Top Repositories & Language Stacks</span>
                                </div>
                                <div className="repo-mockup-body">
                                    <div className="mockup-repo-card">
                                        <div className="repo-card-top">
                                            <div className="repo-name-group">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                                </svg>
                                                <span className="repo-name">GitIntel</span>
                                                <span className="repo-badge">Public</span>
                                            </div>
                                            <span className="repo-stars">
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                                <span>12</span>
                                            </span>
                                        </div>
                                        <p className="repo-desc">
                                            A modern React application using GitHub APIs to gain meaningful insights,
                                            analytics, and activity trends of developers.
                                        </p>
                                        <div className="repo-meta-row">
                                            <span className="repo-main-lang">
                                                <span className="lang-dot js"></span> JavaScript
                                            </span>
                                            <span className="repo-meta-item">Updated today</span>
                                        </div>
                                        <div className="repo-lang-section">
                                            <div className="repo-lang-header">
                                                <span>LANGUAGES</span>
                                                <span>3 detected</span>
                                            </div>
                                            <div className="repo-lang-bar">
                                                <div className="bar-segment js" style={{ width: "60.3%" }}></div>
                                                <div className="bar-segment css" style={{ width: "39.2%" }}></div>
                                                <div className="bar-segment html" style={{ width: "0.5%" }}></div>
                                            </div>
                                            <div className="repo-lang-legend">
                                                <span><span className="lang-dot js"></span> JavaScript 60.3%</span>
                                                <span><span className="lang-dot css"></span> CSS 39.2%</span>
                                                <span><span className="lang-dot html"></span> HTML 0.5%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Summary Grid */}
                <section className="about-section">
                    <p className="about-eyebrow">FEATURE SUMMARY</p>
                    <h2>Built for developer discovery</h2>

                    <div className="about-features">
                        <article className="about-feature">
                            <div className="feature-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h3>Profile Insights</h3>
                            <p>
                                Aggregates public bio, avatars, follower counts, and public repositories
                                into an accessible identity dashboard.
                            </p>
                        </article>

                        <article className="about-feature">
                            <div className="feature-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                            <h3>Contribution Activity</h3>
                            <p>
                                Full 365-day interactive contribution calendar with customized density
                                gradients and commit distribution.
                            </p>
                        </article>

                        <article className="about-feature">
                            <div className="feature-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2c0 4-5 6-5 11a5 5 0 0 0 10 0c0-5-5-7-5-11z"></path>
                                </svg>
                            </div>
                            <h3>Streak Intelligence</h3>
                            <p>
                                Real-time calculations of longest consecutive active streaks, current
                                momentum, and peak activity days.
                            </p>
                        </article>

                        <article className="about-feature">
                            <div className="feature-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                    <polyline points="17 6 23 6 23 12"></polyline>
                                </svg>
                            </div>
                            <h3>Activity Trends</h3>
                            <p>
                                52-week smoothed velocity curves that clearly identify seasonal coding
                                surges, hackathons, and sustained sprints.
                            </p>
                        </article>

                        <article className="about-feature">
                            <div className="feature-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                            </div>
                            <h3>Language Breakdown</h3>
                            <p>
                                Byte-level language percentage bars for every repository to understand
                                a developer's true technological stack.
                            </p>
                        </article>

                        <article className="about-feature">
                            <div className="feature-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                </svg>
                            </div>
                            <h3>Smart Dual-Tier Cache</h3>
                            <p>
                                LocalStorage TTL caching shields you from GitHub's 60 req/hr rate limits
                                with on-demand instant cache bypassing.
                            </p>
                        </article>
                    </div>
                </section>

                {/* Author Section */}
                <section className="about-section author-section">
                    <p className="about-eyebrow">BEHIND THE PROJECT</p>
                    <h2>Meet the developer</h2>

                    <div className="author-card">
                        <div className="author-avatar-wrapper">
                            <img src={authorPicture} alt="Heritage Oluwanifemi Barber" className="author-img" />
                        </div>

                        <div className="author-info">
                            <h3>Heritage Oluwanifemi Barber</h3>

                            <p className="author-role">
                                Computer Engineering Student · Developer
                            </p>

                            <p>
                                I'm a Computer Engineering student with an interest in software development and
                                artificial intelligence. I built GitIntel as a hands-on project to strengthen my
                                React skills, explore GitHub's APIs, and turn raw developer data into useful,
                                actionable insights.
                            </p>

                            <p>
                                GitIntel represents my journey of learning by building, solving real problems,
                                and creating tools that engineers and recruiters can genuinely benefit from.
                            </p>

                            <a
                                href="https://github.com/h-edgethedev"
                                target="_blank"
                                rel="noreferrer"
                                className="author-link"
                            >
                                <span>Find me on GitHub</span>
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Closing Section */}
                <section className="about-cta">
                    <h2>Ready to explore a developer profile?</h2>

                    <p>
                        Enter any GitHub username in GitIntel to instantly discover their contribution
                        history, streaks, repositories, and coding velocity.
                    </p>

                    <Link to="/" className="about-btn primary large">
                        Start Exploring GitIntel
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </section>

                {/* Footer */}
                <footer className="about-footer">
                    <div className="footer-brand">
                        <img src={logoImg} alt="GitIntel logo" width="20" height="20" />
                        <span>GitIntel · GitHub insights made meaningful.</span>
                    </div>
                    <p>© {new Date().getFullYear()} GitIntel. Created by <a href="https://github.com/h-edgethedev" target="_blank" rel="noreferrer">Heritage Barber</a>.</p>
                </footer>
            </main>
        </div>
    );
}
