"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { gsap } from "gsap";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { landingPageGroups, type LandingPage, type LandingPageGroup } from "@/lib/landing-pages";

function PageCard({
  page,
  group,
  number,
  index,
}: {
  page: LandingPage;
  group: LandingPageGroup;
  number: number;
  index: number;
}) {
  const archivePath = `/archive/${page.path.split("/").map(encodeURIComponent).join("/")}`;

  return (
    <motion.article
      className="archive-card"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.42, delay: (index % 3) * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
    >
      <a className="archive-card-link" href={archivePath} target="_blank" rel="noreferrer" aria-label={`Open ${page.title} in a new tab`}>
        <div className="preview-window">
          <div className="window-chrome" aria-hidden="true">
            <span className="window-dots"><i /><i /><i /></span>
            <span className="window-caption">CAMPAIGN / {String(number).padStart(2, "0")}</span>
            <ArrowUpRight size={13} />
          </div>
          <div className="preview-viewport">
            <iframe
              src={archivePath}
              title={`${page.title} live preview`}
              loading="lazy"
              sandbox="allow-scripts allow-forms"
              referrerPolicy="no-referrer"
              tabIndex={-1}
              aria-hidden="true"
            />
            <span className="preview-open">Open original <ArrowUpRight size={13} /></span>
          </div>
        </div>
        <div className="card-caption">
          <div className="card-title-line"><span className="card-number">{String(number).padStart(2, "0")}</span><h3>{page.title}</h3><ArrowUpRight className="card-arrow" size={15} /></div>
          <p>{page.note}</p>
          <span className="card-category">{group.title}</span>
        </div>
      </a>
    </motion.article>
  );
}

function matchesPage(page: LandingPage, group: LandingPageGroup, query: string) {
  return `${page.title} ${page.note} ${page.path} ${group.title}`.toLowerCase().includes(query);
}

export default function Home() {
  const [query, setQuery] = useState("");
  const topRule = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rule = topRule.current;
    if (!rule) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = gsap.fromTo(
      rule,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.82, ease: "power2.out" },
    );

    return () => {
      animation.kill();
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredGroups = landingPageGroups.map((group) => ({
    ...group,
    pages: normalizedQuery
      ? group.pages.filter((page) => matchesPage(page, group, normalizedQuery))
      : group.pages,
  }));
  const allMatches = filteredGroups.flatMap((group) =>
    group.pages.map((page) => ({ page, group })),
  );
  const featuredPages = normalizedQuery
    ? allMatches.slice(0, 3)
    : filteredGroups[0].pages.slice(0, 3).map((page) => ({ page, group: filteredGroups[0] }));
  const featuredPaths = new Set(featuredPages.map(({ page }) => page.path));
  const visibleGroups = filteredGroups
    .map((group) => ({ ...group, pages: group.pages.filter((page) => !featuredPaths.has(page.path)) }))
    .filter((group) => group.pages.length > 0);
  const pageCount = allMatches.length;
  const pageNumbers = new Map(landingPageGroups.flatMap((group) =>
    group.pages.map((page, index) => [page.path, landingPageGroups
      .slice(0, landingPageGroups.indexOf(group))
      .reduce((total, previous) => total + previous.pages.length, 0) + index + 1] as const),
  ));

  return (
    <main className="archive-shell">
      <header className="archive-header">
        <div className="archive-topline">
          <a className="archive-wordmark" href="#top">PERSONAL INDEX <span>®</span></a>
          <span className="archive-count">{String(pageCount).padStart(2, "0")} / 38 CAMPAIGNS</span>
        </div>
        <div ref={topRule} className="archive-rule" />
      </header>

      <div className="archive-content" id="top">
        <section className={`archive-hero${featuredPages.length ? " has-featured" : ""}`} aria-labelledby="archive-title">
          <div className="hero-copy">
            <p className="hero-overline">A PERSONAL COLLECTION <span>·</span> EST. 2024</p>
            <h1 id="archive-title"><span>Welcome to my</span><strong>Gaming<br />Campaigns</strong></h1>
            <p className="hero-description">A digitized collection<br />of things and core<br />memories that live<br />rent-free in my mind.</p>
            <p className="hero-count"><span>{String(pageCount).padStart(2, "0")}</span> little worlds to wander through</p>
          </div>
          {featuredPages.length > 0 && (
            <div className="featured-grid" aria-label="Featured campaign previews">
              {featuredPages.map(({ page, group }, index) => (
                <PageCard key={page.path} page={page} group={group} number={pageNumbers.get(page.path) ?? index + 1} index={index} />
              ))}
            </div>
          )}
        </section>

        <section className="archive-controls" aria-label="Archive controls">
          <nav className="section-nav" aria-label="Campaign categories">
            {visibleGroups.map((group) => (
              <a key={group.id} href={`#${group.id}`}><span>{group.index}</span>{group.title}</a>
            ))}
          </nav>
          <label className="archive-search">
            <Search size={15} aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a campaign"
              aria-label="Find a campaign"
            />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}
          </label>
        </section>

        {visibleGroups.length > 0 ? visibleGroups.map((group) => (
          <section className="archive-section" id={group.id} key={group.id}>
            <header className="section-heading">
              <div className="section-title-wrap">
                <span className="section-number">{group.index} / 04</span>
                <div><h2>{group.title}</h2><p>{group.description}</p></div>
              </div>
              <span className="section-total">{String(filteredGroups.find((item) => item.id === group.id)?.pages.length ?? group.pages.length).padStart(2, "0")} PAGES</span>
            </header>
            <div className="archive-grid">
              {group.pages.map((page, index) => (
                <PageCard key={page.path} page={page} group={group} number={pageNumbers.get(page.path) ?? index + 1} index={index} />
              ))}
            </div>
          </section>
        )) : (
          <div className="empty-state"><span>NO MATCHES</span><p>Nothing in the archive by that name. Try another search.</p></div>
        )}

        <footer className="archive-footer"><span>END OF INDEX</span><span>MADE FROM MEMORIES <i>✳</i></span><a href="#top">BACK TO TOP ↑</a></footer>
      </div>
    </main>
  );
}