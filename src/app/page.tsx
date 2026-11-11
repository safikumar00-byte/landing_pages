"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
            className="group w-[clamp(145px,52vw,205px)] shrink-0 snap-start sm:w-[clamp(150px,23vw,188px)] lg:w-[clamp(150px,16.8vw,205px)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.42, delay: (index % 3) * 0.055, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
        >
            <div className="relative mx-auto w-full rounded-[27px] border border-[#474747] bg-[linear-gradient(135deg,#343434,#090909_48%,#292929)] p-[5px] shadow-[0_2px_6px_rgba(0,0,0,.09),inset_0_1px_rgba(255,255,255,.2)] transition-[border-color,box-shadow] duration-200 group-hover:border-[#77756f] group-hover:shadow-[0_8px_18px_rgba(0,0,0,.13)]">
                <div className="relative aspect-[9/16.5] overflow-hidden rounded-[22px] bg-[#f0efec]">
                    <span className="pointer-events-none absolute left-1/2 top-[7px] z-[1] h-[10px] w-[29%] -translate-x-1/2 rounded-full bg-[#111]" aria-hidden="true" />
                    <iframe
                        src={archivePath}
                        title={`${page.title} live preview`}
                        loading="lazy"
                        sandbox="allow-scripts allow-forms"
                        referrerPolicy="no-referrer"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="pointer-events-none block h-full w-full border-0 bg-[#f4f3f0]"
                    />
                    <button
                        type="button"
                        className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded border border-white/35 bg-black/85 px-2 py-[7px] font-mono text-[8px] leading-none text-white opacity-95 transition hover:-translate-y-px hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bc8618]"
                        onClick={() => onOpen(page, group)}
                        aria-label={`Explore ${page.title}`}
                    >
                        Explore page <ArrowUpRight size={13} />
                    </button>
                </div>
            </div>
            <button
                type="button"
                className="group block w-full cursor-pointer bg-transparent px-px pt-2.5 text-left text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bc8618]"
                onClick={() => onOpen(page, group)}
            >
                <span className="flex items-baseline gap-2">
                    <span className="font-mono text-[8px] leading-none text-[#9b9891]">{String(number).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold text-[#181817]">{page.title}</span>
                    <ArrowUpRight className="shrink-0 text-[#88867f] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#a57200]" size={15} />
                </span>
                <span className="mt-1 ml-[21px] block overflow-hidden text-ellipsis whitespace-nowrap text-[9px] text-[#77756f]">{page.note}</span>
                <span className="mt-1 ml-[21px] block font-mono text-[7px] uppercase leading-relaxed tracking-[.06em] text-[#9b9891]">{group.title}</span>
            </button>
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
        <section className="grid min-h-0 min-h-[min(650px,calc(100svh-110px))] grid-cols-1 items-center gap-5 border-b border-[#d5d4d0] py-2 scroll-mt-20 lg:grid-cols-[minmax(190px,.76fr)_minmax(0,2.4fr)] lg:gap-[clamp(22px,3.8vw,58px)]">
            <header className="flex items-end justify-between gap-3 border-b border-[#d5d4d0] pb-3 lg:h-full lg:flex-col lg:items-start lg:justify-center lg:border-b-0 lg:border-r lg:py-5 lg:pr-[clamp(16px,2vw,30px)]">
                <div className="flex flex-col items-start gap-2.5 lg:gap-[13px]">
                    <span className="font-mono text-[9px] leading-relaxed tracking-[.08em] text-[#898781]">{group.index} / 04</span>
                    <div>
                        <h2 className="m-0 font-serif text-[22px] font-medium leading-none text-[#111] sm:text-[27px]">{group.title}</h2>
                        <p className="mt-1.5 max-w-[240px] text-[10px] text-[#73716d]">{group.description}</p>
                    </div>
                </div>
                <span className="shrink-0 font-mono text-[8px] leading-relaxed tracking-[.08em] text-[#898781]">{String(group.pages.length).padStart(2, "0")} PAGES</span>
            </header>

            <div className="grid min-w-0 gap-2.5 lg:gap-3.5">
                <div className="flex items-center justify-between gap-3 font-mono text-[7px] tracking-[.08em] text-[#898781] sm:text-[8px]">
                    <span>SCROLL TO EXPLORE <span className="px-[3px] text-[#c59729]" aria-hidden="true">·</span> {String(group.pages.length).padStart(2, "0")} SCREENS</span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-[34px] rounded-full text-[#222] disabled:opacity-40 lg:size-[39px]"
                            disabled={!canScrollLeft}
                            onClick={() => scrollGallery(-1)}
                            aria-label={`Scroll ${group.title} left`}
                        >
                            <ArrowLeft size={17} />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-[34px] rounded-full text-[#222] disabled:opacity-40 lg:size-[39px]"
                            disabled={!canScrollRight}
                            onClick={() => scrollGallery(1)}
                            aria-label={`Scroll ${group.title} right`}
                        >
                            <ArrowRight size={17} />
                        </Button>
                    </div>
                </div>
                <div
                    className="flex min-w-0 snap-x snap-mandatory items-start gap-[clamp(12px,1.6vw,24px)] overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x px-[2px] pt-[5px] pb-[13px] [scroll-padding-inline:2px] [scrollbar-color:#c5c3bd_transparent] [scrollbar-width:thin] [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%_-_32px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%_-_32px),transparent)]"
                    ref={gallery}
                    onScroll={updateScrollControls}
                    aria-label={`${group.title} mobile page previews`}
                    tabIndex={0}
                >
                    {group.pages.map((page, index) => (
                        <PageCard key={page.path} page={page} group={group} number={pageNumbers.get(page.path) ?? index + 1} index={index} onOpen={onOpen} />
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
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const previewDialog = dialog.current;
        if (!previewDialog) return;
        if (selectedPreview && !previewDialog.open) previewDialog.showModal();
        if (!selectedPreview && previewDialog.open) previewDialog.close();
    }, [selectedPreview]);

    const normalizedQuery = query.trim().toLowerCase();
    const filteredGroups = landingPageGroups.map((group) => ({
        ...group,
        pages: normalizedQuery
            ? group.pages.filter((page) => matchesPage(page, group, normalizedQuery))
            : group.pages,
    }));
    const visibleGroups = filteredGroups.filter((group) => group.pages.length > 0);
    const pageNumbers = new Map(landingPageGroups.flatMap((group) =>
        group.pages.map((page, index) => [page.path, landingPageGroups
            .slice(0, landingPageGroups.indexOf(group))
            .reduce((total, previous) => total + previous.pages.length, 0) + index + 1] as const),
    ));
    const selectedArchivePath = selectedPreview
        ? `/archive/${selectedPreview.page.path.split("/").map(encodeURIComponent).join("/")}?preview=phone`
        : null;

    function scrollToSection(id: string) {
        document.getElementById(id)?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start",
        });
    }

    return (
        <main className="min-h-screen min-w-[360px] bg-[#fcfcfb] px-[clamp(16px,5.25vw,82px)] pt-6 pb-12 text-[#111] [background-image:linear-gradient(rgba(18,18,18,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,.035)_1px,transparent_1px)] [background-size:44px_44px] md:pt-[34px]">
            <div className="mx-auto w-full max-w-[1500px]" id="top">
                <section className="sticky top-0 z-30 -mx-4 flex flex-col-reverse gap-3 border-y border-[#bdbdbb] bg-[#fcfcfb]/95 px-4 py-3 backdrop-blur-md md:mx-0 md:flex-row md:items-center md:justify-between md:gap-[18px]">
                    <nav className="flex min-w-0 flex-wrap items-center gap-x-[19px] gap-y-2" aria-label="Campaign categories">
                        {visibleGroups.map((group) => (
                            <a
                                key={group.id}
                                className="inline-flex items-center gap-1.5 font-mono text-[8px] leading-relaxed text-[#555] no-underline transition-colors hover:text-[#b47a00] sm:text-[9px]"
                                href={`#${group.id}`}
                                onClick={(event) => {
                                    event.preventDefault();
                                    scrollToSection(group.id);
                                    window.history.replaceState(null, "", `#${group.id}`);
                                }}
                            >
                                <span className="text-[8px] text-[#a4a19a]">{group.index}</span>{group.title}
                            </a>
                        ))}
                    </nav>
                    <label className="flex h-8 w-full min-w-0 shrink-0 items-center gap-[7px] border-b border-[#d8d8d4] text-[#777] md:w-[min(240px,28vw)] md:min-w-[170px]">
                        <Search size={15} aria-hidden="true" />
                        <Input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Find a campaign"
                            aria-label="Find a campaign"
                            className="h-[30px] border-0 bg-transparent p-0 font-mono text-[10px] text-[#111] shadow-none placeholder:text-[#989893] focus-visible:ring-0"
                        />
                        {query && <button className="grid size-[25px] shrink-0 place-items-center border-0 bg-transparent text-[#777]" type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}
                    </label>
                </section>

                {visibleGroups.length > 0 ? visibleGroups.map((group) => (
                    <div className="flex min-h-screen items-center py-[clamp(27px,5vw,66px)]" key={group.id}>
                        <GallerySection
                            group={group}
                            pageNumbers={pageNumbers}
                            onOpen={(page, selectedGroup) => setSelectedPreview({ page, group: selectedGroup })}
                        />
                    </div>
                )) : (
                    <div className="mx-auto my-[65px] text-center">
                        <span className="font-mono text-[9px] tracking-[.15em] text-[#88867f]">NO MATCHES</span>
                        <p className="mt-2 font-serif text-[21px] text-[#555]">Nothing in the archive by that name. Try another search.</p>
                    </div>
                )}

                <SlidingTestimonial />

                <footer className="mt-[72px] flex items-center justify-between gap-2.5 border-t-2 border-[#171717] pt-3 font-mono text-[7px] tracking-[.09em] text-[#77756f] sm:text-[8px]">
                    <span>END OF INDEX</span>
                    <span>MADE FROM MEMORIES <i className="text-[#c3942b] not-italic">✳</i></span>
                    <a className="text-inherit no-underline hover:text-[#111]" href="#top">BACK TO TOP ↑</a>
                </footer>
            </div>

            <dialog
                ref={dialog}
                className="fixed inset-0 m-auto h-[calc(100dvh-24px)] w-[calc(100vw-24px)] max-h-none max-w-none overflow-hidden rounded-xl border border-[#d5d4d0] bg-[#fcfcfb] p-0 text-[#181817] shadow-[0_28px_90px_rgba(0,0,0,.24)] backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 md:h-[min(760px,calc(100dvh-40px))] md:w-[min(940px,calc(100vw-40px)]"
                aria-labelledby="preview-dialog-title"
                onClose={() => setSelectedPreview(null)}
                onClick={(event) => {
                    if (event.target === event.currentTarget) dialog.current?.close();
                }}
            >
                {selectedPreview && selectedArchivePath && (
                    <div className="grid h-full grid-rows-[auto_minmax(0,1fr)]">
                        <header className="flex items-center justify-between border-b border-[#deddd9] px-4 py-2.5 pl-5">
                            <span className="font-mono text-[8px] tracking-[.1em] text-[#77756f]">PAGE PREVIEW <span className="px-1 text-[#c3942b]">·</span> {selectedPreview.group.title.toUpperCase()}</span>
                            <Button variant="ghost" size="icon" className="size-[34px] text-[#555]" aria-label="Close page preview" onClick={() => dialog.current?.close()}><X size={18} /></Button>
                        </header>
                        <div className="grid min-h-0 grid-rows-[minmax(220px,1fr)_auto] gap-3 overflow-y-auto p-3 md:grid-cols-[minmax(0,1fr)_275px] md:grid-rows-1 md:gap-[clamp(18px,3vw,34px)] md:p-5">
                            <div className="grid min-h-0 min-w-0 place-items-center overflow-hidden rounded-lg border border-[#e0dfda] bg-[#f1f0ec] bg-[linear-gradient(rgba(18,18,18,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,.04)_1px,transparent_1px)] bg-[size:24px_24px] p-2 md:p-3.5">
                                <div className="relative aspect-[9/16] h-[90%] max-h-[430px] max-w-full rounded-[27px] border border-[#474747] bg-[linear-gradient(135deg,#343434,#090909_48%,#292929)] p-[5px] shadow-[0_5px_16px_rgba(0,0,0,.16)]">
                                    <span className="pointer-events-none absolute left-1/2 top-[7px] z-[1] h-[10px] w-[29%] -translate-x-1/2 rounded-full bg-[#111]" aria-hidden="true" />
                                    <iframe
                                        src={selectedArchivePath}
                                        title={`${selectedPreview.page.title} interactive mobile page`}
                                        loading="eager"
                                        sandbox="allow-scripts allow-forms"
                                        referrerPolicy="no-referrer"
                                        className="block h-full w-full rounded-[21px] border-0 bg-white"
                                    />
                                </div>
                            </div>
                            <section className="flex min-w-0 flex-col items-start justify-center px-1 md:px-1">
                                <span className="font-mono text-[9px] tracking-[.08em] text-[#898781]">{selectedPreview.group.index} / CAMPAIGN INDEX</span>
                                <h2 className="mt-2 text-[25px] font-medium leading-tight text-[#181817] md:mt-[13px] md:text-[30px]">{selectedPreview.page.title}</h2>
                                <p className="mt-2 text-[11px] leading-relaxed text-[#66645f] md:mt-[11px] md:text-xs">{selectedPreview.page.note}. Explore the original mobile page inside the preview.</p>
                                <div className="mt-2.5 flex flex-wrap gap-1.5 md:mt-[17px]" aria-label="Page tags">
                                    {getPageTags(selectedPreview.page, selectedPreview.group).map((tag) => <Badge key={tag} variant="secondary" className="border border-[#e0dfda] text-[9px]">{tag}</Badge>)}
                                </div>
                                <div className="my-2.5 h-px w-full bg-[#deddd9] md:mt-[22px] md:mb-[13px]" />
                                <div className="grid gap-[5px]">
                                    <span className="font-mono text-[8px] tracking-[.09em] text-[#898781]">FORMAT</span>
                                    <strong className="text-[11px] font-medium">Interactive mobile page</strong>
                                </div>
                                <Button asChild className="mt-3 w-full md:mt-[22px]">
                                    <a className="inline-flex w-full items-center justify-center gap-2 text-inherit no-underline" href={selectedArchivePath} target="_blank" rel="noreferrer">Open full page <ExternalLink size={15} /></a>
                                </Button>
                            </section>
                        </div>
                    </div>
                )}
            </dialog>
        </main>
    );
}
