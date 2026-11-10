"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Command,
  Component,
  Copy,
  CreditCard,
  Ellipsis,
  LayoutDashboard,
  LifeBuoy,
  Moon,
  Palette,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Sun,
  Type,
  WandSparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const colors = [
  { name: "Primary", variable: "--primary", hex: "#f6a90d" },
  { name: "Secondary", variable: "--secondary", hex: "#f2f3f6" },
  { name: "Accent", variable: "--accent", hex: "#fcf5d6" },
  { name: "Muted", variable: "--muted", hex: "#f7f8fa" },
  { name: "Destructive", variable: "--destructive", hex: "#e5484d" },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  async function copyColor(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(null), 1400);
  }

  return (
    <div className={darkMode ? "app-shell dark" : "app-shell"}>
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="Studio home">
          <span className="brand-mark"><Sparkles size={17} strokeWidth={2.2} /></span>
          <span>studio<span className="brand-period">.</span></span>
          <span className="brand-plan">TEAM</span>
        </a>

        <button className="workspace-picker" type="button">
          <span className="workspace-avatar">A</span>
          <span className="workspace-copy"><strong>Acme Studio</strong><small>Design workspace</small></span>
          <ChevronDown size={15} />
        </button>

        <div className="sidebar-group">
          <span className="sidebar-label">WORKSPACE</span>
          <nav className="sidebar-nav" aria-label="Workspace">
            <a href="#overview"><LayoutDashboard size={16} /><span>Overview</span></a>
            <a className="active" href="#components" aria-current="page"><Component size={16} /><span>Components</span><span className="nav-count">12</span></a>
            <a href="#colors"><Palette size={16} /><span>Color tokens</span></a>
            <a href="#typography"><Type size={16} /><span>Typography</span></a>
          </nav>
        </div>

        <div className="sidebar-group sidebar-group-lower">
          <span className="sidebar-label">PREFERENCES</span>
          <nav className="sidebar-nav" aria-label="Preferences">
            <a href="#settings"><Settings2 size={16} /><span>Settings</span></a>
            <a href="#billing"><CreditCard size={16} /><span>Plan & billing</span></a>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="help-box">
            <span className="help-icon"><CircleHelp size={16} /></span>
            <div><strong>Need a hand?</strong><span>Visit the component docs</span></div>
            <ArrowDownRight size={14} />
          </div>
          <div className="profile-row">
            <span className="profile-avatar">MK</span>
            <span className="profile-copy"><strong>Morgan Kim</strong><small>morgan@acme.co</small></span>
            <Ellipsis size={18} />
          </div>
        </div>
      </aside>

      <main className="main-panel" id="overview">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>Components</strong></div>
          <div className="topbar-actions">
            <button type="button" className="search-trigger" aria-label="Search components"><Search size={15} /><span>Search anything...</span><kbd><Command size={11} /> K</kbd></button>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="top-icon"><Bell size={17} /></Button>
            <span className="topbar-divider" />
            <Button variant="outline" size="sm" className="docs-button"><LifeBuoy size={15} /> Help center</Button>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div className="heading-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> DESIGN SYSTEM <span className="eyebrow-line" /> UPDATED JUST NOW</div>
              <h1>Components, <span>considered.</span></h1>
              <p>A small, thoughtful library for building interfaces that feel like yours.</p>
            </div>
            <div className="heading-actions">
              <Button variant="outline" size="default"><WandSparkles size={16} /> Customize</Button>
              <Button size="default"><Plus size={17} /> Add component</Button>
            </div>
          </section>

          <section className="metric-strip" aria-label="Design system summary">
            <div className="metric"><span className="metric-label">COMPONENTS</span><div><strong>12</strong><span className="metric-change"><ArrowDownRight size={13} /> 3 this week</span></div></div>
            <div className="metric"><span className="metric-label">TOKENS</span><div><strong>38</strong><span className="metric-note">across 6 groups</span></div></div>
            <div className="metric"><span className="metric-label">LIBRARY STATUS</span><div><Badge variant="secondary" className="status-badge"><span className="status-dot" /> All systems good</Badge></div></div>
            <div className="theme-switch">
              <span className="theme-icon">{darkMode ? <Moon size={16} /> : <Sun size={16} />}</span>
              <span className="theme-label"><strong>{darkMode ? "Dark appearance" : "Light appearance"}</strong><small>Preview theme</small></span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} aria-label="Dark appearance" />
            </div>
          </section>

          <section className="showcase-section" id="components">
            <div className="section-heading">
              <div><div className="section-kicker">THE LIBRARY</div><h2>Explore the essentials</h2></div>
              <Button variant="ghost" size="sm" className="browse-link">Browse all components <ArrowRight size={15} /></Button>
            </div>

            <Tabs defaultValue="buttons" className="showcase-tabs">
              <TabsList aria-label="Component categories" className="category-tabs">
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
                <TabsTrigger value="forms">Forms</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>

              <TabsContent value="buttons">
                <div className="component-grid">
                  <Card className="specimen-card">
                    <CardHeader className="specimen-header"><div><CardTitle>Buttons</CardTitle><CardDescription>Clear actions, comfortable rhythm.</CardDescription></div><Badge variant="outline">5 variants</Badge></CardHeader>
                    <CardContent className="button-demo">
                      <div className="button-row"><Button><Sparkles size={15} /> Primary action</Button><Button variant="secondary">Secondary</Button></div>
                      <div className="button-row"><Button variant="outline"><Plus size={15} /> Add item</Button><Button variant="ghost">Quiet action <ArrowRight size={15} /></Button></div>
                      <div className="button-row"><Button variant="destructive">Delete project</Button><Button variant="outline" size="icon" aria-label="Copy link"><Copy size={15} /></Button><Button variant="outline" size="icon" aria-label="Open settings"><Settings2 size={15} /></Button></div>
                    </CardContent>
                    <CardFooter className="specimen-footer"><span><code>Button</code> · <code>button.tsx</code></span><Button variant="ghost" size="sm" aria-label="View button source"><ArrowRight size={15} /></Button></CardFooter>
                  </Card>

                  <Card className="specimen-card form-card">
                    <CardHeader className="specimen-header"><div><CardTitle>A little input</CardTitle><CardDescription>Bring your next idea in.</CardDescription></div><Badge variant="secondary">Interactive</Badge></CardHeader>
                    <CardContent>
                      <form className="invite-form" onSubmit={handleSubmit}>
                        <label htmlFor="invite-email">Email address</label>
                        <div className="input-action"><Input id="invite-email" type="email" placeholder="you@company.com" value={email} onChange={(event) => { setEmail(event.target.value); setSubmitted(false); }} required /><Button type="submit" size="icon" aria-label="Send invite">{submitted ? <Check size={16} /> : <ArrowRight size={16} />}</Button></div>
                        <p className={submitted ? "form-hint success-hint" : "form-hint"}>{submitted ? `Invite ready for ${email}` : "A friendly little label keeps things clear."}</p>
                      </form>
                      <div className="form-separator" />
                      <div className="plan-row"><span className="plan-icon"><Sparkles size={16} /></span><span className="plan-copy"><strong>Starter plan</strong><small>Good things start small.</small></span><Badge variant="outline">Free</Badge></div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="forms">
                <Card className="specimen-card alternate-panel"><CardHeader><CardTitle>Form elements</CardTitle><CardDescription>Inputs with clear labels, helpful states, and a little breathing room.</CardDescription></CardHeader><CardContent className="form-elements"><label htmlFor="search-input">Search projects</label><Input id="search-input" placeholder="Search by name..." /><label htmlFor="disabled-input">Disabled field</label><Input id="disabled-input" placeholder="Not available" disabled /><p>Use labels and hints to keep each field easy to scan.</p></CardContent></Card>
              </TabsContent>

              <TabsContent value="feedback">
                <Card className="specimen-card alternate-panel"><CardHeader><CardTitle>Feedback states</CardTitle><CardDescription>Small signals, just enough to keep people oriented.</CardDescription></CardHeader><CardContent className="feedback-showcase"><Badge><Check size={13} /> Published</Badge><Badge variant="secondary">In review</Badge><Badge variant="outline">Draft</Badge><Badge variant="destructive">Action needed</Badge></CardContent></Card>
              </TabsContent>

              <TabsContent value="layout">
                <Card className="specimen-card alternate-panel"><CardHeader><CardTitle>Surfaces</CardTitle><CardDescription>Quiet structure for the content that matters.</CardDescription></CardHeader><CardContent><div className="surface-sample"><span className="surface-icon"><Component size={17} /></span><div><strong>Card surface</strong><p>A reliable home for related information.</p></div><Button variant="ghost" size="icon" aria-label="Open surface"><ArrowRight size={15} /></Button></div></CardContent></Card>
              </TabsContent>
            </Tabs>
          </section>

          <section className="lower-grid" id="colors">
            <Card className="token-card">
              <div className="lower-section-heading"><div><div className="section-kicker">COLOR TOKENS</div><h2>Warm by nature</h2></div><Button variant="ghost" size="icon" aria-label="More color options"><Ellipsis size={18} /></Button></div>
              <div className="swatch-list">{colors.map((color) => <button key={color.name} className="swatch-row" type="button" onClick={() => void copyColor(color.variable)} aria-label={`Copy ${color.name} color token`}><span className="swatch" style={{ backgroundColor: `var(${color.variable})` }} /><span className="swatch-name">{color.name}</span><code>{copied === color.variable ? "Copied" : color.hex}</code>{copied === color.variable ? <Check size={14} className="copy-state" /> : <Copy size={13} className="copy-icon" />}</button>)}</div>
              <div className="token-card-footer"><span>5 of 38 color tokens</span><Button variant="ghost" size="sm">View all <ArrowRight size={14} /></Button></div>
            </Card>

            <Card className="type-card" id="typography">
              <div className="lower-section-heading"><div><div className="section-kicker">TYPE SCALE</div><h2>Made to be read</h2></div><Button variant="ghost" size="icon" aria-label="Typography options"><Ellipsis size={18} /></Button></div>
              <div className="type-sample"><span>DISPLAY / 32</span><strong>Good ideas,<br />beautifully made.</strong><div><span>BODY / 14</span><p>Thoughtful interfaces start with a clear point of view and room to breathe.</p></div></div>
              <div className="type-card-footer"><span>Inter <i>·</i> Source Serif 4 <i>·</i> JetBrains Mono</span><Button variant="ghost" size="sm">Type settings <ArrowRight size={14} /></Button></div>
            </Card>
          </section>

          <footer className="page-footer"><span><span className="footer-status" /> Everything is up to date</span><span>MADE WITH CARE <span className="footer-spark">✳</span> STUDIO UI KIT</span></footer>
        </div>
      </main>
    </div>
  );
}