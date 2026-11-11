"use client";

import { useEffect, useRef, useState } from "react";
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    ExternalLink,
    Search,
    X,
} from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import {
    Badge,
    BlurFade,
    Button,
    Card,
    Input,
    Modal,
    ModalContent,
    ModalDescription,
    ModalHeader,
    ModalTitle,
    RevealText,
} from "@glinui/ui";
import SlidingTestimonial from "@/components/ui/sliding-testimonial";
import { landingPageGroups, type LandingPage, type LandingPageGroup } from "@/lib/landing-pages";

function PageCard({
    page,
    group,
    number,
    index,
    onOpen,
}: {
    page: LandingPage;
    group: LandingPageGroup;
    number: number;
    index: number;
    onOpen: (page: LandingPage, group: LandingPageGroup) => void;
}) {
    const archivePath = `/archive/${page.path.split("/").map(encodeURIComponent).join("/")}?preview=phone`;

    return (
        <motion.article
            className="w-[clamp(158px,43vw,218px)] shrink-0 snap-start sm:w-[clamp(176px,26vw,218px)] lg:w-[clamp(176px,18vw,220px)]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.42, delay: (index % 3) * 0.055, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
        >
            <Card
                variant="default"
                className="group min-w-0 overflow-hidden rounded-[1.4rem] border border-line bg-panel p-2 shadow-[var(--shadow-glass-sm)] transition-[border-color,box-shadow] duration-200 hover:border-brand/50 hover:shadow-[var(--shadow-glass-md)]"
            >
                <div className="relative aspect-[9/16.5] overflow-hidden rounded-[1.05rem] bg-[color-mix(in_oklch,var(--color-foreground)_7%,var(--color-background))]">
                    <span
                        className="pointer-events-none absolute left-1/2 top-2 z-[1] h-2.5 w-[29%] -translate-x-1/2 rounded-full bg-neutral-950"
                        aria-hidden="true"
                    />
                    <iframe
                        src={archivePath}
                        title={`${page.title} live preview`}
                        loading="lazy"
                        sandbox="allow-scripts allow-forms"
                        referrerPolicy="no-referrer"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="block h-full w-full border-0 bg-white"
                    />
                    <Button
                        type="button"
                        size="sm"
                        variant="default"
                        className="absolute bottom-3 right-3 z-10 rounded-full px-3 text-xs shadow-lg"
                        onClick={() => onOpen(page, group)}
                        aria-label={`Explore ${page.title}`}
                    >
                        Explore <ArrowUpRight size={14} aria-hidden="true" />
                    </Button>
                </div>
                {/* <div className="px-2 pb-2 pt-3">
                    <Button
                        type="button"
                        variant="ghost"
                        className="h-auto w-full justify-start rounded-lg p-1.5 text-left"
                        onClick={() => onOpen(page, group)}
                    >
                        <span className="flex min-w-0 items-center gap-2">
                            <span className="font-mono text-[10px] tabular-nums text-subtle">
                                {String(number).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
                                {page.title}
                            </span>
                            <ArrowUpRight
                                className="shrink-0 text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                                size={15}
                                aria-hidden="true"
                            />
                        </span>
                    </Button>
                    <p className="mb-0 mt-1 truncate px-1.5 text-xs leading-relaxed text-muted">
                        {page.note}
                    </p>
                    <p className="mb-0 mt-2 px-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-subtle">
                        {group.title}
                    </p>
                </div> */}
            </Card>
        </motion.article>
    );
}

function getPageTags(page: LandingPage, group: LandingPageGroup) {
    const details = `${page.title} ${page.note} ${page.path}`.toLowerCase();
    let mechanic = "Campaign follow-up";

    if (group.id === "games") {
        if (/spin|wheel|jackpot/.test(details)) mechanic = "Prize spin";
        else if (/memory|match/.test(details)) mechanic = "Memory game";
        else if (/scratch|grid|box|tap/.test(details)) mechanic = "Tap to reveal";
        else mechanic = "Game promotion";
    } else if (group.id === "fintech") {
        mechanic = "Application flow";
    } else if (group.id === "rewards") {
        mechanic = "Offer journey";
    }

    return [group.title, mechanic, "Mobile experience"];
}

function GallerySection({
    group,
    pageNumbers,
    onOpen,
}: {
    group: LandingPageGroup;
    pageNumbers: Map<string, number>;
    onOpen: (page: LandingPage, group: LandingPageGroup) => void;
}) {
    const gallery = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const pagesKey = group.pages.map((page) => page.path).join("|");
    const galleryId = `${group.id}-gallery`;

    useEffect(() => {
        const rail = gallery.current;
        if (!rail) return;

        const updateControls = () => {
            setCanScrollLeft(rail.scrollLeft > 2);
            setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
        };

        updateControls();
        const resizeObserver = new ResizeObserver(updateControls);
        resizeObserver.observe(rail);
        return () => resizeObserver.disconnect();
    }, [pagesKey]);

    function scrollGallery(direction: -1 | 1) {
        const rail = gallery.current;
        if (!rail) return;

        rail.scrollBy({
            left: direction * rail.clientWidth * 0.78,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
    }

    function updateScrollControls() {
        const rail = gallery.current;
        if (!rail) return;
        setCanScrollLeft(rail.scrollLeft > 2);
        setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
    }

    return (
        <section
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            className="grid scroll-mt-24 grid-cols-1 items-start gap-6 border-b border-line py-section lg:grid-cols-[minmax(190px,0.72fr)_minmax(0,2.4fr)] lg:items-center lg:gap-10"
        >
            <header className="flex items-end justify-between gap-4 lg:h-full lg:flex-col lg:items-start lg:justify-center">
                <div className="flex flex-col items-start gap-3">
                    <span className="font-mono text-[10px] tracking-[0.14em] text-subtle">
                        {group.index} <span className="text-brand">/</span> 04
                    </span>
                    <div>
                        <h2
                            id={`${group.id}-title`}
                            className="m-0 font-serif text-[clamp(1.65rem,3vw,2.35rem)] font-medium leading-tight tracking-[-0.035em] text-ink"
                        >
                            <RevealText
                                text={group.title}
                                direction="left"
                                duration={0.65}
                                delay={80}
                                className="max-w-full"
                            />
                        </h2>
                        <BlurFade delay={180} duration={600} blur={4} yOffset={8}>
                            <p className="mb-0 mt-2 max-w-[28ch] text-sm leading-relaxed text-muted">
                                {group.description}
                            </p>
                        </BlurFade>
                    </div>
                </div>
                <BlurFade delay={260} duration={550} blur={3} yOffset={6}>
                    <Badge variant="outline" size="sm" className="shrink-0 rounded-full px-3 font-mono text-[10px] uppercase tracking-[0.08em]">
                        {String(group.pages.length).padStart(2, "0")} pages
                    </Badge>
                </BlurFade>
            </header>

            <div className="grid min-w-0 gap-4">
                <div className="flex items-center justify-between gap-4">
                    <p className="mb-0 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                        Campaign previews <span className="px-1 text-brand" aria-hidden="true">/</span>{" "}
                        {String(group.pages.length).padStart(2, "0")} screens
                    </p>
                    <div className="flex shrink-0 gap-2">
                        <Button
                            variant="outline"
                            size="md"
                            className="size-10 rounded-full p-0"
                            disabled={!canScrollLeft}
                            onClick={() => scrollGallery(-1)}
                            aria-label={`Scroll ${group.title} left`}
                            aria-controls={galleryId}
                        >
                            <ArrowLeft size={17} aria-hidden="true" />
                        </Button>
                        <Button
                            variant="outline"
                            size="md"
                            className="size-10 rounded-full p-0"
                            disabled={!canScrollRight}
                            onClick={() => scrollGallery(1)}
                            aria-label={`Scroll ${group.title} right`}
                            aria-controls={galleryId}
                        >
                            <ArrowRight size={17} aria-hidden="true" />
                        </Button>
                    </div>
                </div>
                <div
                    id={galleryId}
                    className="campaign-rail flex min-w-0 snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain px-1 pb-4 pt-1 touch-pan-x sm:gap-5"
                    ref={gallery}
                    onScroll={updateScrollControls}
                    aria-label={`${group.title} mobile page previews`}
                    role="region"
                    tabIndex={0}
                >
                    {group.pages.map((page, index) => (
                        <PageCard
                            key={page.path}
                            page={page}
                            group={group}
                            number={pageNumbers.get(page.path) ?? index + 1}
                            index={index}
                            onOpen={onOpen}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function matchesPage(page: LandingPage, group: LandingPageGroup, query: string) {
    return `${page.title} ${page.note} ${page.path} ${group.title}`.toLowerCase().includes(query);
}

export default function Home() {
    const [query, setQuery] = useState("");
    const [selectedPreview, setSelectedPreview] = useState<{ page: LandingPage; group: LandingPageGroup } | null>(null);
    const [activeGroup, setActiveGroup] = useState(landingPageGroups[0]?.id ?? "");

    const normalizedQuery = query.trim().toLowerCase();
    const filteredGroups = landingPageGroups.map((group) => ({
        ...group,
        pages: normalizedQuery
            ? group.pages.filter((page) => matchesPage(page, group, normalizedQuery))
            : group.pages,
    }));
    const visibleGroups = filteredGroups.filter((group) => group.pages.length > 0);
    const visibleGroupKey = visibleGroups.map((group) => group.id).join("|");
    const pageNumbers = new Map(landingPageGroups.flatMap((group, groupIndex) =>
        group.pages.map((page, index) => [page.path, landingPageGroups
            .slice(0, groupIndex)
            .reduce((total, previous) => total + previous.pages.length, 0) + index + 1] as const),
    ));
    const selectedArchivePath = selectedPreview
        ? `/archive/${selectedPreview.page.path.split("/").map(encodeURIComponent).join("/")}?preview=phone`
        : null;

    useEffect(() => {
        const sections = visibleGroupKey
            .split("|")
            .filter(Boolean)
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const current = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (current) setActiveGroup(current.target.id);
            },
            { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [visibleGroupKey]);

    return (
        <MotionConfig reducedMotion="user">
            <main id="top" className="index-backdrop min-h-screen bg-page px-gutter text-ink">
                <div className="mx-auto w-full max-w-[1440px]">
                    <section className="grid gap-8 pb-10 pt-14 sm:pb-14 sm:pt-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(230px,0.65fr)] lg:items-end lg:gap-12 lg:pb-16 lg:pt-24">
                        <div>
                            <BlurFade delay={40} duration={550} blur={4} yOffset={8}>
                                <Badge
                                    variant="glass"
                                    size="sm"
                                    className="mb-5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.13em]"
                                >
                                    <span className="mr-2 inline-block size-1.5 rounded-full bg-brand" aria-hidden="true" />
                                    Interactive campaign archive
                                </Badge>
                            </BlurFade>
                            <h1 className="mb-0 max-w-[15ch] font-serif text-[clamp(2.6rem,7.2vw,6.1rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ink">
                                <RevealText
                                    text="Campaign pages, collected in one place."
                                    direction="left"
                                    duration={0.9}
                                    delay={100}
                                    className="max-w-full"
                                />
                            </h1>
                            <BlurFade delay={300} duration={650} blur={5} yOffset={10}>
                                <p className="mb-0 mt-6 max-w-[58ch] text-base leading-relaxed text-muted sm:mt-7 sm:text-lg">
                                    Explore original mobile experiences across games, fintech, rewards, and campaign follow-ups.
                                </p>
                            </BlurFade>
                            <BlurFade delay={440} duration={600} blur={4} yOffset={8}>
                                <Button asChild variant="default" size="md" className="mt-7 rounded-full px-5">
                                    <a href={`#${visibleGroups[0]?.id ?? "top"}`} className="inline-flex items-center gap-2">
                                        Browse the archive <ArrowDown size={16} aria-hidden="true" />
                                    </a>
                                </Button>
                            </BlurFade>
                        </div>

                        <BlurFade delay={360} duration={700} blur={6} yOffset={12}>
                            <Card
                                variant="glass"
                                className="grid grid-cols-2 gap-4 rounded-card p-5 sm:gap-6 sm:p-6"
                            >
                                <div className="border-r border-line pr-4 sm:pr-6">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-subtle">Pages</span>
                                    <p className="mb-0 mt-2 font-serif text-4xl tracking-[-0.04em] text-ink">
                                        {String(landingPageGroups.reduce((total, group) => total + group.pages.length, 0)).padStart(2, "0")}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-subtle">Collections</span>
                                    <p className="mb-0 mt-2 font-serif text-4xl tracking-[-0.04em] text-ink">
                                        {String(landingPageGroups.length).padStart(2, "0")}
                                    </p>
                                </div>
                                <p className="col-span-2 mb-0 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                                    Select any screen to open an interactive preview or visit the original page.
                                </p>
                            </Card>
                        </BlurFade>
                    </section>

                    <header className="sticky top-0 z-30 -mx-2 border-y border-line/80 bg-page/90 px-2 py-3 backdrop-blur-xl sm:-mx-3 sm:px-3">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
                            <nav
                                className="campaign-rail flex min-w-0 items-center gap-1 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0"
                                aria-label="Campaign categories"
                            >
                                {visibleGroups.map((group) => (
                                    <Button
                                        key={group.id}
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className={`h-9 shrink-0 rounded-full px-3 text-xs ${activeGroup === group.id ? "bg-brand/10 text-ink" : "text-muted"}`}
                                    >
                                        <a
                                            href={`#${group.id}`}
                                            aria-current={activeGroup === group.id ? "location" : undefined}
                                        >
                                            <span className="mr-1.5 font-mono text-[10px] text-subtle">{group.index}</span>
                                            {group.title}
                                        </a>
                                    </Button>
                                ))}
                            </nav>
                            <label className="flex h-11 w-full min-w-0 shrink-0 items-center gap-2 rounded-full border border-line bg-panel px-3 text-muted shadow-[var(--shadow-glass-inset)] transition-[border-color,box-shadow] focus-within:border-brand/60 focus-within:ring-2 focus-within:ring-brand/20 md:w-[min(290px,32vw)]">
                                <Search size={16} aria-hidden="true" />
                                <Input
                                    type="search"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Find a campaign"
                                    aria-label="Find a campaign"
                                    variant="ghost"
                                    size="sm"
                                    className="h-9 min-w-0 border-0 bg-transparent px-1 text-sm text-ink shadow-none placeholder:text-subtle focus-visible:ring-0"
                                />
                                {query && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="size-8 shrink-0 rounded-full p-0"
                                        type="button"
                                        onClick={() => setQuery("")}
                                        aria-label="Clear search"
                                    >
                                        <X size={15} aria-hidden="true" />
                                    </Button>
                                )}
                            </label>
                        </div>
                    </header>

                    {visibleGroups.length > 0 ? visibleGroups.map((group) => (
                        <GallerySection
                            key={group.id}
                            group={group}
                            pageNumbers={pageNumbers}
                            onOpen={(page, selectedGroup) => setSelectedPreview({ page, group: selectedGroup })}
                        />
                    )) : (
                        <div className="mx-auto py-20 text-center sm:py-28">
                            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">No matches</span>
                            <BlurFade delay={120} duration={550} blur={4} yOffset={8}>
                                <p className="mb-0 mt-3 font-serif text-2xl text-muted">
                                    Nothing in the archive by that name. Try another search.
                                </p>
                            </BlurFade>
                        </div>
                    )}

                    <SlidingTestimonial />

                    <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 font-mono text-[10px] uppercase tracking-[0.11em] text-subtle sm:mt-24">
                        <span>End of index</span>
                        <span>Made from memories <i className="text-brand not-italic" aria-hidden="true">✳</i></span>
                        <a className="rounded-full px-2 py-1 text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" href="#top">
                            Back to top ↑
                        </a>
                    </footer>
                </div>

                <Modal
                    open={Boolean(selectedPreview)}
                    onOpenChange={(open) => {
                        if (!open) setSelectedPreview(null);
                    }}
                >
                    {selectedPreview && selectedArchivePath && (
                        <ModalContent
                            variant="default"
                            size="lg"
                            className="h-[min(840px,calc(100dvh-24px))] w-[min(1080px,calc(100vw-24px))] max-w-none overflow-hidden p-0"
                        >
                            <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)]">
                                <ModalHeader className="border-b border-line px-5 py-4 pr-14 sm:px-7">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-subtle">
                                        {selectedPreview.group.index} <span className="px-1 text-brand">/</span>{" "}
                                        {selectedPreview.group.title}
                                    </span>
                                    <ModalTitle className="mt-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                                        <RevealText
                                            text={selectedPreview.page.title}
                                            direction="left"
                                            duration={0.55}
                                            delay={70}
                                        />
                                    </ModalTitle>
                                </ModalHeader>
                                <div className="grid min-h-0 grid-rows-[minmax(260px,1fr)_auto] gap-5 overflow-y-auto p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_280px] md:grid-rows-1 md:gap-8">
                                    <div className="grid min-h-[260px] min-w-0 place-items-center overflow-hidden rounded-card border border-line bg-[color-mix(in_oklch,var(--color-foreground)_4%,var(--color-background))] p-3 sm:p-5">
                                        <div className="relative h-[min(62dvh,580px)] max-h-full max-w-full aspect-[9/16] rounded-[1.7rem] border border-neutral-700 bg-[linear-gradient(145deg,#383838,#090909_52%,#282828)] p-[5px] shadow-[var(--shadow-glass-md)]">
                                            <span
                                                className="pointer-events-none absolute left-1/2 top-2 z-[1] h-2.5 w-[29%] -translate-x-1/2 rounded-full bg-neutral-950"
                                                aria-hidden="true"
                                            />
                                            <iframe
                                                src={selectedArchivePath}
                                                title={`${selectedPreview.page.title} interactive mobile page`}
                                                loading="eager"
                                                sandbox="allow-scripts allow-forms"
                                                referrerPolicy="no-referrer"
                                                className="block h-full w-full rounded-[1.35rem] border-0 bg-white"
                                            />
                                        </div>
                                    </div>
                                    <section className="flex min-w-0 flex-col items-start justify-center px-1 py-2">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                                            {selectedPreview.group.index} / Campaign index
                                        </span>
                                        <BlurFade delay={180} duration={550} blur={4} yOffset={7}>
                                            <ModalDescription className="mb-0 mt-3 text-sm leading-relaxed text-muted">
                                                {selectedPreview.page.note}. Explore the original mobile page inside the preview.
                                            </ModalDescription>
                                        </BlurFade>
                                        <div className="mt-5 flex flex-wrap gap-2" aria-label="Page tags">
                                            {getPageTags(selectedPreview.page, selectedPreview.group).map((tag) => (
                                                <Badge key={tag} variant="outline" size="sm" className="rounded-full">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="my-5 h-px w-full bg-line" />
                                        <div className="grid gap-1">
                                            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">Format</span>
                                            <strong className="text-sm font-medium text-ink">Interactive mobile page</strong>
                                        </div>
                                        <Button asChild variant="default" size="lg" className="mt-6 w-full justify-between rounded-xl">
                                            <a
                                                href={selectedArchivePath}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex w-full items-center justify-between gap-3 text-inherit no-underline"
                                            >
                                                Open full page <ExternalLink size={16} aria-hidden="true" />
                                            </a>
                                        </Button>
                                    </section>
                                </div>
                            </div>
                        </ModalContent>
                    )}
                </Modal>
            </main>
        </MotionConfig>
    );
}
