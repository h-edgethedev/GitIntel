import { useState } from "react";
import { Link } from "react-router";
import "./About.css"

export function About() {
    return (
        <div>
            <main className="about-page">
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
                </nav>

                {/* Hero Section */}
                <section className="about-hero">
                    <p className="about-eyebrow">GET TO KNOW GITINTEL</p>

                    <h1 className="insight">
                        GitHub insights,
                        <span> made meaningful.</span>
                    </h1>

                    <p className="about-intro">
                        GitIntel is a GitHub profile analyzer that helps
                        you explore developer profiles, understand coding
                        activity, and discover insights beyond the usual
                        GitHub profile page.
                    </p>

                    <div className="about-actions">
                        <Link to="/" className="about-btn primary">
                            Explore GitIntel
                        </Link>

                        <a
                            href="https://github.com/h-edgethedev/GitIntel"
                            target="_blank"
                            rel="noreferrer"
                            className="about-btn secondary"
                        >
                            Visit GitHub
                        </a>
                    </div>
                </section>

                {/* Project Section */}
                <section className="about-section">
                    <p className="about-eyebrow">THE PROJECT</p>
                    <h2>What is GitIntel?</h2>

                    <p>
                        Finding useful information about a developer on
                        GitHub can mean jumping between profiles,
                        repositories, and contribution graphs.
                        GitIntel brings important developer insights
                        together in one place.
                    </p>

                    <p>
                        Enter a GitHub username and explore a developer's
                        public profile, contribution activity, consistency,
                        and other useful statistics through a simple,
                        interactive interface.
                    </p>
                </section>

                {/* Features Section */}
                <section className="about-section">
                    <p className="about-eyebrow">WHAT YOU CAN EXPLORE</p>
                    <h2>Built for developer discovery</h2>

                    <div className="about-features">
                        <article className="about-feature">
                            <span className="feature-icon">👤</span>
                            <h3>Profile Insights</h3>
                            <p>
                                Explore public GitHub profile information
                                and get a quick overview of a developer.
                            </p>
                        </article>

                        <article className="about-feature">
                            <span className="feature-icon">🟪</span>
                            <h3>Contribution Activity</h3>
                            <p>
                                Visualize contribution history through
                                GitHub's contribution calendar.
                            </p>
                        </article>

                        <article className="about-feature">
                            <span className="feature-icon">🔥</span>
                            <h3>Streak Intelligence</h3>
                            <p>
                                Examine contribution streaks and discover
                                how consistently a developer contributes.
                            </p>
                        </article>

                        <article className="about-feature">
                            <span className="feature-icon">📊</span>
                            <h3>Activity Trends</h3>
                            <p>
                                Explore weekly contribution patterns
                                and identify periods of higher activity.
                            </p>
                        </article>
                    </div>
                </section>

                {/* Author Section */}
                <section className="about-section author-section">
                    <p className="about-eyebrow">BEHIND THE PROJECT</p>
                    <h2>Meet the developer</h2>

                    <div className="author-card">
                        <div className="author-avatar">
                            <img src="src\assets\My picture.png" alt="Author's picture" className="author-avatar" />
                        </div>

                        <div className="author-info">
                            <h3>Heritage Oluwanifemi Barber</h3>

                            <p className="author-role">
                                Computer Engineering Student · Developer
                            </p>

                            <p>
                                I'm a Computer Engineering student with
                                an interest in software development and
                                artificial intelligence. I built GitIntel
                                as a hands-on project to strengthen my
                                React skills, explore GitHub's APIs, and turn raw developer data into useful
                                insights.
                            </p>

                            <p>
                                GitIntel represents my journey of learning
                                by building, solving problems, and creating
                                projects that people can actually use.
                            </p>

                            <a
                                href="https://github.com/h-edgethedev"
                                target="_blank"
                                rel="noreferrer"
                                className="author-link"
                            >
                                Find me on GitHub ↗
                            </a>
                        </div>
                    </div>
                </section>

                {/* Closing Section */}
                <section className="about-cta">
                    <h2>Curious about a developer?</h2>

                    <p>
                        Start exploring GitHub profiles with GitIntel
                        and discover more about the people behind the code.
                    </p>

                    <Link to="/" className="about-btn primary">
                        Start exploring
                    </Link>
                </section>

                <footer className="about-footer">
                    <p>
                        Built with curiosity, React, and a love for
                        developer tools.
                    </p>
                    <p>© {new Date().getFullYear()} GitIntel</p>
                </footer>
            </main>
        </div>
    )
}