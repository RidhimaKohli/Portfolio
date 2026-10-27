const MVP_URL = "https://second-brain-mvp-weld.vercel.app/sky?focus=111";
const POSTHOG_URL = "https://us.posthog.com/shared/LmyG1vKqim3T1zpK80we8Z2rHCHqCg";

function Section({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="sb-serif mb-5 text-left text-2xl text-[#3f2472] sm:text-3xl">
        <span className="mr-3 text-[#8b5cff]">{index}</span>
        {title}
      </h2>
      <div className="sb-card p-7 sm:p-10">{children}</div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#8b5cff]">{children}</p>;
}

function FlowRow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span className="sb-chip px-4 py-2 text-sm">{step}</span>
          {i < steps.length - 1 && <span className="text-[#8b5cff]">→</span>}
        </span>
      ))}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-left">
      <p className="sb-serif text-4xl text-[#3f2472]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-black/60">{label}</p>
    </div>
  );
}

function Pill({ tone, children }: { tone: "lead" | "lag" | "guard"; children: React.ReactNode }) {
  const color = tone === "lead" ? "bg-[#4a8c7e]" : tone === "lag" ? "bg-[#6e4c96]" : "bg-[#c0583e]";
  return <span className={`${color} mr-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white`}>{children}</span>;
}

function Table({ head, rows, className = "" }: { head: string[]; rows: React.ReactNode[][]; className?: string }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-black/10 text-left text-black/40">
            {head.map((h) => (
              <th key={h} className="py-2 pr-4 font-bold uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-black/10 align-top last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`py-3 pr-4 ${j === 0 ? "font-bold text-[#1c1a17]" : "text-black/65"}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Drop images in public/second-brain/ and pass `src` (e.g. "/second-brain/sky.png") to replace a placeholder.
function Shot({ caption, src }: { caption: string; src?: string }) {
  return (
    <figure className="text-left">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={caption} className="w-full rounded-xl border border-black/10" />
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-xl border-2 border-dashed border-[#b79af0] bg-[#f5f0fd] text-xs font-bold uppercase tracking-[0.16em] text-[#8b5cff]">
          Screenshot
        </div>
      )}
      <figcaption className="mt-2 text-xs leading-5 text-black/50">{caption}</figcaption>
    </figure>
  );
}

const hypotheses = [
  { n: "01", ok: true, who: "staying consistent", why: "there is no system that brings the right content back at the right time." },
  { n: "02", ok: true, who: "not finding what they saved", why: "their saved content is unstructured and unconnected." },
  { n: "03", ok: false, who: "figuring out what to learn next", why: "they lose too much time evaluating and switching sources." },
];

const solutionSteps = [
  ["1. Upload", "One-click upload from anywhere (links, videos)."],
  ["2. Summarize", "AI summary + auto-labeling for quick context."],
  ["3. Organize", "Connected topics and tags to create structure."],
  ["4. Retrieve", "Semantic search + filters to find what you need, instantly."],
  ["5. Reinforce", "Nudges bring back what you saved weeks ago."],
];

const learnings = [
  { status: "Validated", title: "Capture friction, not intent, is the binding constraint.", body: "One click, and saving becomes reflexive." },
  { status: "Validated", title: "Retrieval has to run on the idea, not the source.", body: "People find items by describing the concept." },
  { status: "Invalidated", title: "A stated learning goal makes the product sticky.", body: "People came back to save with no goal set." },
];

const shipped = ["Login", "List of all reads", "Search", "Add link on web app", "AI summary", "Extension capture", "YouTube capture", "Visualise & recommend"];
const deferred = ["Notes", "PDF capture", "Image capture", "Import library", "LLM chat", "Community"];

const metricGroups: { stage: string; blurb: string; items: [("lead" | "lag"), string][] }[] = [
  { stage: "Acquisition", blurb: "How they arrive", items: [["lag", "Sign-ups (unique users)"], ["lead", "Top referrers by channel"], ["lag", "Sessions & pageviews"]] },
  { stage: "Activation", blurb: "First meaningful use", items: [["lead", "Sign-ins (daily)"], ["lead", "Add-link opens / user"], ["lag", "Articles submitted"], ["lead", "Visit → interaction funnel"]] },
  { stage: "Engagement", blurb: "Depth in each feature", items: [["lead", "Sky zooms / user"], ["lead", "Node article opens / user"], ["lead", "Timeline opens / user"], ["lead", "Search MRR (relevance)"], ["lead", "Summary scrolls / user"], ["lag", "Articles read (unique)"]] },
  { stage: "Retention", blurb: "Coming back over time", items: [["lag", "DAU / WAU / MAU"], ["lag", "Weekly retention (cohort)"], ["lag", "Growth accounting"], ["lag", "Sign-in → add-link retention"], ["lag", "User paths from login"]] },
];

const thresholds: [string, "lead" | "lag" | "guard", string, string][] = [
  ["Weekly retention (W1)", "lag", "≥ 25%", "Drop > 5% WoW, or below floor for 2 weeks"],
  ["Article revisit rate (weekly)", "lead", "≥ 30%", "Below floor for 2 consecutive weeks"],
  ["Search MRR", "lead", "≥ 0.60", "7-day rolling avg below floor"],
  ["Zero-result search rate", "guard", "≤ 15%", "Above ceiling on any given day"],
  ["Search → article CTR", "lead", "≥ 50%", "Below floor for 3+ days"],
  ["Add-link opens / user (weekly)", "lead", "≥ 3", "Below floor for 2 consecutive weeks"],
  ["Article failure rate", "guard", "≤ 5%", "Above ceiling on any given day"],
  ["Signup → add-link retention (D7)", "lag", "≥ 20%", "Weekly cohort below floor"],
];

const evals = [
  { value: "< 3%", kind: "Ceiling · contradiction rate", name: "Summary quality", protects: "Protects trust", how: "Check whether the summary directly contradicts the source using NLI models (SummaC / FactCC / AlignScore, shortlist to compare).", action: "Pause AI summaries on new saves, fall back to raw extracted text, trigger a model review." },
  { value: "< 15%", kind: "Ceiling · miss rate, hit@3", name: "Tags accuracy", protects: "Protects the graph", how: "Set tighter than usual because there is no manual correction path yet, so a wrong tag is currently permanent. hit@1 miss rate is also watched at < 25%.", action: "Stop auto-finalizing tags and add a lightweight accept/reject step at save time as an interim safety valve." },
  { value: "< 25%", kind: "Ceiling · AI-judge disagreement", name: "Node distance / similarity", protects: "Protects relevance", how: "With no human evaluation capacity, measure whether Gemini's similarity ranking agrees with an independent AI judge.", action: "Periodic manual spot-check by the team, and alter the internal formula that gauges similarity." },
  { value: "≥ 0.5", kind: "Floor, not ceiling · MRR", name: "Search / ranking", protects: "Protects findability", how: "Analyse the rank of the results users pick, to see which results get chosen most.", action: "Trigger a head-to-head A/B between text-match and embedding-based ranking." },
];

const scenarios: [string, string, string, string, string][] = [
  ["Paying users", "2,000", "2,000", "2,000", "1,000"],
  ["Net revenue / month (₹)", "74,497", "74,497", "74,497", "37,248"],
  ["Contribution per paying user (₹)", "29.82", "29.82", "29.82", "29.82"],
  ["Less: free-cohort cost (₹)", "(30,195)", "(40,309)", "(50,531)", "(84,332)"],
  ["Contribution after free tier (₹)", "29,436", "19,322", "9,100", "(54,517)"],
  ["Operating profit / month (₹)", "27,527", "17,413", "7,191", "(56,426)"],
  ["Operating margin", "37%", "23%", "10%", "(151%)"],
  ["Headroom (funded ÷ actual free users)", "1.97x", "1.48x", "1.18x", "0.35x"],
  ["Break-even conversion rate", "2.0%", "2.6%", "3.4%", "5.7%"],
];

const channels = [
  { title: "Reading platforms", body: "Browser extension plus one-click import for Medium, Substack, Pocket and Kindle highlights. The article a young professional was already reading lands in Second Brain in one tap.", kpi: "Organic distribution — near-zero paid media" },
  { title: "Campus & workplace blogs", body: "Guest essays in student newsletters, department and society mailing lists, and early-career Slack / Discord communities. Ambassadors run one reading-workflow session per campus.", kpi: "Target ≤ ₹11 per free signup" },
  { title: "Ads on research websites", body: "Paid placements around arXiv, SSRN, JSTOR and Semantic Scholar, plus retargeting on scholarly search. Bought on payback, not impressions.", kpi: "Hard cap ₹300 CAC → 2.8x LTV/CAC" },
];

export default function SecondBrainPage() {
  return (
    <main className="sb-page min-h-screen px-5 py-5 sm:px-10 lg:px-16">
      <nav className="mx-auto flex max-w-3xl items-center justify-between border-b border-black/10 pb-5 text-sm">
        <a href="/" className="font-bold text-[#3f2472]">← RK / product notes</a>
        <span className="text-black/40">Second Brain / 03</span>
      </nav>

      <article className="mx-auto max-w-3xl py-12 lg:py-16">
        {/* Hero */}
        <h1 className="sb-serif text-left text-5xl leading-tight text-[#3f2472] sm:text-7xl">Second Brain</h1>
        <p className="mt-2 text-left text-xl italic text-[#8b5cff] sm:text-2xl">Everything you read, quietly connected.</p>

        <div className="sb-card mt-6 p-7 sm:p-10">
          <p className="text-left text-lg leading-7 text-black/70">
            A connected learning system that captures, organizes and brings back the right content at the right time,
            so that nothing you read gets lost.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={MVP_URL} target="_blank" rel="noopener noreferrer" className="sb-cta px-5 py-3 text-sm">Open the live MVP ↗</a>
            <a href={POSTHOG_URL} target="_blank" rel="noopener noreferrer" className="sb-chip px-5 py-3 text-sm">PostHog dashboard ↗</a>
          </div>
          <p className="mt-5 text-left text-xs text-black/45">Team 4 — Pranjay Tiwari · Rahul Khatav · Ridhima Kohli · Shreya Sivaram · Tanu Gupta</p>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-left text-lg font-bold text-[#1c1a17]">The problem</h2>
          <div className="sb-card p-6"><p className="text-left text-lg leading-7 text-black/70">The biggest gap isn&apos;t finding content; it&apos;s getting value back from what&apos;s already saved.</p></div>
        </div>
        <div className="mt-6">
          <h2 className="mb-4 text-left text-lg font-bold text-[#1c1a17]">The artefact</h2>
          <div className="sb-card p-6"><p className="text-left text-lg leading-7 text-black/70">A knowledge graph of everything you save — summarised, tagged, connected and resurfaced — behind a one-click capture.</p></div>
        </div>

        <div className="mt-10"><Shot src="/second-brain/sky.png" caption="The Sky: 22 saved reads clustered into connected topics, with 46 connections" /></div>

        {/* 01 Customer */}
        <Section index="01" title="Target customer">
          <div className="text-left">
            <h3 className="sb-serif text-3xl leading-tight text-[#3f2472]">Sarthak, the Scrambled Ambitious Learner</h3>
            <p className="mt-5 text-lg leading-8 text-black/65">
              Mid-20s to early-30s. High intent, high curiosity, low structural discipline. Wants to learn quickly and
              believes AI tools can accelerate them, but gets lost in the volume of options and ends most sessions with
              more tabs open than lessons completed.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["High intent", "High curiosity", "Low discipline", "Multi-device", "Always learning"].map((t) => (
                <span key={t} className="sb-chip px-4 py-2 text-sm">{t}</span>
              ))}
            </div>
            <div className="sb-dark mt-8 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">The paradox</p>
              <p className="mt-1 text-xl font-bold">High intent + lots of tools = low progress + poor recall.</p>
            </div>
          </div>
        </Section>

        {/* 02 Problem */}
        <Section index="02" title="Where value leaks">
          <div className="text-left">
            <Tag>Current user journey</Tag>
            <div className="mt-2 overflow-x-auto">
              <FlowRow steps={["Start search", "Find resources", "Save somewhere", "Plan (maybe)", "Start learning", "Need it again — can't find it"]} />
            </div>
            <p className="mt-4 text-sm leading-6 text-black/60">
              Saves land in bookmarks, WhatsApp and notes. The plan lives in the head. When the content is needed again,
              it can&apos;t be found or recalled, and the loop restarts: high effort, low clarity.
            </p>
          </div>

          <div className="mt-8 border-t border-black/10 pt-8 text-left">
            <Tag>Core problem — the collapse between “saved” and “resurfaced”</Tag>
            <p className="text-sm leading-6 text-black/65">
              Learners save aggressively across many platforms (high save intent), but most saved content is hard to find
              or never resurfaces (low retrieval). The result is decision fatigue, wasted effort and lost learning momentum.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <Stat value="6+" label="sources searched in parallel (LLMs, YouTube, blogs, forums…)" />
              <Stat value="50+" label="links saved across tabs, bookmarks, WhatsApp, notes" />
              <Stat value="<20%" label="return rate — saved content that is ever reused" />
            </div>
            <p className="mt-4 text-xs text-black/40">Evidence from user interviews.</p>
          </div>

          <div className="mt-8 border-t border-black/10 pt-8 text-left">
            <Tag>Problem hypotheses — Sarthak is most frustrated about…</Tag>
            <div className="grid gap-4 sm:grid-cols-3">
              {hypotheses.map((h) => (
                <div key={h.n} className="rounded-2xl border border-black/10 bg-[#faf7f0] p-5">
                  <p className={`text-xs font-bold uppercase tracking-[0.16em] ${h.ok ? "text-[#3a7d33]" : "text-[#c0392b]"}`}>
                    {h.n} · {h.ok ? "Confirmed" : "Not confirmed"}
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#1c1a17]">{h.who}</p>
                  <p className="mt-1 text-sm leading-6 text-black/60">because {h.why}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 03 Solution */}
        <Section index="03" title="Solution hypothesis">
          <div className="sb-dark p-6 text-left sm:p-8">
            <p className="text-lg italic leading-7">
              A connected learning system that captures, organizes and brings back the right content at the right time so that nothing you read gets lost.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-5">
            {solutionSteps.map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-dashed border-[#b79af0] p-4 text-left">
                <p className="text-sm font-bold text-[#3f2472]">{title}</p>
                <p className="mt-1 text-xs leading-5 text-black/60">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-black/10 pt-8 text-left">
            <Tag>What testing told us</Tag>
            <div className="grid gap-4 sm:grid-cols-3">
              {learnings.map((l) => (
                <div key={l.title} className="rounded-2xl border border-black/10 bg-[#faf7f0] p-5">
                  <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${l.status === "Validated" ? "bg-[#3f2472] text-white" : "bg-[#e0a84a] text-[#3a2600]"}`}>{l.status}</span>
                  <p className="mt-3 text-sm font-bold text-[#1c1a17]">{l.title}</p>
                  <p className="mt-1 text-sm leading-6 text-black/60">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 04 MVP */}
        <Section index="04" title="What we shipped">
          <div className="text-left">
            <p className="text-lg leading-8 text-black/65">
              Scope was cut by customer delight (Kano) against implementation complexity: ship what makes saving
              reflexive and retrieval useful, defer what is costly or not yet proven.
            </p>
            <a href={MVP_URL} target="_blank" rel="noopener noreferrer" className="sb-cta mt-5 px-5 py-3 text-sm">Open the live MVP ↗</a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="sb-dark p-7 text-left">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/70">In MVP 1</p>
              <ul className="space-y-2 text-sm leading-6">
                {shipped.map((s) => <li key={s} className="flex gap-2"><span>—</span><span className="text-white/90">{s}</span></li>)}
              </ul>
            </div>
            <div className="rounded-[1.25rem] border border-black/10 bg-[#faf7f0] p-7 text-left">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#8b5cff]">Deferred</p>
              <ul className="space-y-2 text-sm leading-6">
                {deferred.map((s) => <li key={s} className="flex gap-2"><span className="text-[#8b5cff]">—</span><span className="text-black/70">{s}</span></li>)}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2"><Shot src="/second-brain/article.png" caption="Article view: AI summary, key arguments and evidence, opened from a node in the Sky" /></div>
            <Shot src="/second-brain/search.png" caption="Search across the library by idea, not source" />
            <Shot src="/second-brain/capture.png" caption="Capture: paste a link or YouTube video, and see what you've been thinking about" />
          </div>

          <div className="mt-8 border-t border-black/10 pt-8 text-left">
            <Tag>Our moat</Tag>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["A graph that compounds", "Value compounds with the library."],
                ["Switching cost accrues", "An earned graph doesn't transfer."],
                ["Unoccupied position", "No direct substitute does it all."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-black/10 bg-[#faf7f0] p-5">
                  <p className="sb-serif text-lg text-[#3f2472]">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-black/60">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 05 Metrics */}
        <Section index="05" title="How we measure value">
          <div className="sb-dark p-7 text-left sm:p-9">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-white/60">North star</p>
            <p className="sb-serif text-3xl">Weekly Recall Rate</p>
            <p className="mt-2 text-white/85">The % of active users who reopen at least one previously saved item in a given week.</p>
            <p className="mt-4 border-t border-white/20 pt-4 text-sm italic leading-6 text-white/75">
              It is the single behaviour both sides need: the user gets confident recall, and the business gets the
              returning usage that compounds the data moat.
            </p>
          </div>

          <div className="mt-8 border-t border-black/10 pt-8 text-left">
            <Tag>Derived via the GAME framework</Tag>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["G", "Goals", "Confident recall (user) × retention that feeds the moat (business)."],
                ["A", "Actions", "Save, reopen, search, note — mapped to acquisition, activation, retention."],
                ["M", "Measures", "Instrumented events in PostHog, reused rather than reinvented."],
                ["E", "Evaluate", "Each metric checked for validity, sensitivity, actionability and gaming risk."],
              ].map(([letter, title, body]) => (
                <div key={letter} className="rounded-2xl border border-black/10 bg-[#faf7f0] p-5">
                  <p className="sb-serif text-3xl text-[#b79af0]">{letter}</p>
                  <p className="text-sm font-bold text-[#1c1a17]">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-black/60">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-black/10 pt-8 text-left">
            <Tag>Metric portfolio</Tag>
            <p className="mb-4 text-xs text-black/50">
              <Pill tone="lead">Lead</Pill>Leading (predictive)
              <span className="mx-3" />
              <Pill tone="lag">Lag</Pill>Lagging (outcome)
              <span className="mx-3" />
              <Pill tone="guard">Guard</Pill>Guardrail
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {metricGroups.map((g) => (
                <div key={g.stage} className="rounded-2xl border border-black/10 bg-[#faf7f0] p-5">
                  <p className="sb-serif text-lg text-[#3f2472]">{g.stage}</p>
                  <p className="mb-3 text-xs italic text-black/50">{g.blurb}</p>
                  <ul className="space-y-1.5 text-sm text-black/70">
                    {g.items.map(([tone, name]) => <li key={name}><Pill tone={tone}>{tone}</Pill>{name}</li>)}
                  </ul>
                </div>
              ))}
              <div className="rounded-2xl border border-black/10 bg-[#faf7f0] p-5 sm:col-span-2">
                <p className="sb-serif text-lg text-[#3f2472]">Guardrails</p>
                <p className="mb-3 text-xs italic text-black/50">Quality &amp; reliability</p>
                <ul className="grid gap-1.5 text-sm text-black/70 sm:grid-cols-2">
                  {["Article failures", "Zero-result searches", "Search click rank distribution", "Original vs summary trust ratios"].map((n) => (
                    <li key={n}><Pill tone="guard">Guard</Pill>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
            <a href={POSTHOG_URL} target="_blank" rel="noopener noreferrer" className="sb-chip mt-6 px-5 py-3 text-sm">Open the PostHog dashboard ↗</a>
          </div>

          <div className="mt-8 border-t border-black/10 pt-8 text-left">
            <Tag>From signal to action</Tag>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="sb-dark p-6">
                <Pill tone="lead">Lead</Pill>
                <p className="sb-serif mt-3 text-2xl">Article revisits</p>
                <p className="mt-2 text-sm text-white/75">% of active users who reopen a previously saved article in a week. Are people using their second brain, or just hoarding?</p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">Trigger</p>
                <p className="text-sm italic text-white/85">Weekly revisit rate below 30% of active users, or new-adds outpace revisits by more than 4×.</p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">PM action · possible RCA</p>
                <ul className="mt-1 space-y-1 text-sm text-white/85">
                  <li>— Check search MRR and zero-result rate: is search failing to surface old saves?</li>
                  <li>— Look at Timeline and Node engagement: is discovery of older articles broken?</li>
                  <li>— Ship resurfacing prompts (“you saved this X weeks ago”) and better ranking.</li>
                </ul>
              </div>
              <div className="sb-dark p-6">
                <Pill tone="guard">Guard</Pill>
                <p className="sb-serif mt-3 text-2xl">Article failure count</p>
                <p className="mt-2 text-sm text-white/75">Failed article loads and processing attempts. The moment ingestion breaks, so does the product.</p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">Trigger</p>
                <p className="text-sm italic text-white/85">Failures spike above the paywall-driven baseline (~7d rolling avg), or exceed 5% of submissions.</p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">PM action · possible RCA</p>
                <ul className="mt-1 space-y-1 text-sm text-white/85">
                  <li>— Break failures down by source domain: is a publisher blocking us?</li>
                  <li>— Check parser logs and recent deploys for ingestion regressions.</li>
                  <li>— Watch session replays of failed users: retry, abandon or churn?</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-black/10 pt-8 text-left">
            <Tag>Metric thresholds</Tag>
            <Table
              head={["Metric", "Type", "Limit", "Alert when"]}
              rows={thresholds.map(([name, tone, limit, alert]) => [name, <Pill key="t" tone={tone}>{tone}</Pill>, <span key="l" className="font-bold text-[#3f2472]">{limit}</span>, alert])}
            />
          </div>
        </Section>

        {/* 06 Evals */}
        <Section index="06" title="AI evals: thresholds & triggers">
          <p className="text-left text-lg leading-8 text-black/65">
            A number only matters if crossing it triggers a real action. These are the lines each AI eval is watched
            against, and what happens the moment one is crossed.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {evals.map((e) => (
              <div key={e.name} className="rounded-2xl border border-black/10 bg-[#faf7f0] p-6 text-left">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="sb-serif text-xl text-[#1c1a17]">{e.name}</p>
                  <p className="sb-serif text-3xl text-[#3f2472]">{e.value}</p>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">{e.kind}</p>
                <p className="mt-3 text-sm leading-6 text-black/65">{e.how}</p>
                <p className="mt-3 text-sm leading-6 text-black/80"><span className="font-bold text-[#3f2472]">If crossed → </span>{e.action}</p>
                <span className="sb-chip mt-4 px-3 py-1 text-xs">{e.protects}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 07 Monetization */}
        <Section index="07" title="Monetization">
          <div className="text-left">
            <p className="text-lg leading-8 text-black/65">
              Freemium: <span className="font-bold text-[#1c1a17]">30 articles free</span>, then paid features and a
              higher article limit at <span className="font-bold text-[#1c1a17]">₹49 / month</span>. Storage drives the
              major costs, so the size of the free tier decides whether the model works.
            </p>
          </div>

          <Table
            className="mt-8"
            head={["₹ / month", "S1 · 20 free", "S2 · 30 free", "S3 · 50 free", "S4 · unlimited"]}
            rows={scenarios.map((r) => r.map((c, i) => (i === 2 ? <span key={i} className="font-bold text-[#3f2472]">{c}</span> : c)))}
          />
          <p className="mt-3 text-left text-xs text-black/45">Scenario 2 (current plan) highlighted. Paying users at 4% conversion; S4 at 2%.</p>

          <div className="sb-dark mt-8 p-7 text-left">
            <p className="sb-serif text-3xl">2.6% break-even conversion</p>
            <p className="mt-2 text-white/85">
              One paying customer funds 35.5 free users against 24 actually carried (1.48x headroom). The plan runs at
              4%. Unlimited free (S4) loses money at any realistic conversion.
            </p>
          </div>

          <div className="mt-8 border-t border-black/10 pt-8 text-left">
            <Tag>Sensitivity — Scenario 2 operating profit (₹ / month), conversion × price</Tag>
            <Table
              head={["Conversion", "₹29", "₹39", "₹49", "₹59"]}
              rows={[
                ["2%", "(28,445)", "(20,844)", "(13,242)", "(5,640)"],
                ["3%", "(20,719)", "(9,317)", "2,086", "13,488"],
                ["4%", "(12,994)", "2,210", "17,413", "32,617"],
                ["5%", "(5,268)", "13,737", "32,741", "51,745"],
                ["6%", "2,458", "25,263", "48,068", "70,874"],
              ]}
            />
          </div>
        </Section>

        {/* 08 Growth */}
        <Section index="08" title="Go-to-market">
          <div className="text-left">
            <p className="text-lg leading-8 text-black/65">
              Product-led growth: reach readers where they already read. The 30 free articles are the acquisition
              engine, and every channel funnels into the free tier.
            </p>
            <Tag>PLG loop — the free tier does the selling</Tag>
            <div className="overflow-x-auto"><FlowRow steps={["Discover while reading", "Save into 30 free articles", "Search your own library", "Hit the 30-article cap", "Upgrade at ₹49 / month"]} /></div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {channels.map((c) => (
              <div key={c.title} className="rounded-2xl border border-black/10 bg-[#faf7f0] p-5 text-left">
                <p className="sb-serif text-lg text-[#3f2472]">{c.title}</p>
                <p className="mt-2 text-sm leading-6 text-black/60">{c.body}</p>
                <p className="mt-3 text-xs font-bold text-[#8b5cff]">{c.kpi}</p>
              </div>
            ))}
          </div>

          <div className="sb-dark mt-8 grid gap-6 p-7 sm:grid-cols-4">
            {[
              ["₹852", "Lifetime contribution per paying user"],
              ["₹11", "Ceiling on cost per free signup"],
              ["2.6%", "Break-even conversion; plan runs at 4%"],
              ["35.5", "Free users funded by one paying customer"],
            ].map(([v, l]) => (
              <div key={l} className="text-left">
                <p className="sb-serif text-3xl">{v}</p>
                <p className="mt-1 text-xs leading-5 text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 09 Ethics */}
        <Section index="09" title="Ethical considerations">
          <div className="space-y-6 text-left text-lg leading-8 text-black/65">
            <p>
              <span className="font-bold text-[#1c1a17]">Ownership.</span> Storage is secure and private so users feel free to
              save and organise anything. Users keep full ownership of their data; it is never sold, shared or repurposed.
            </p>
            <p>
              <span className="font-bold text-[#1c1a17]">Control.</span> Users can delete any saved item, or their entire account,
              at any time, with no data retained after deletion.
            </p>
            <p>
              <span className="font-bold text-[#1c1a17]">Risk.</span> The principal risk is surfacing politically or socially
              sensitive saved content at the wrong moment. An automatic guardrail suppresses push notifications for any
              content tagged as political or socially grey-area.
            </p>
          </div>
        </Section>

        <div className="sb-dark mt-14 p-7 text-left sm:p-10">
          <p className="sb-serif text-2xl leading-snug sm:text-3xl">
            From “I saved it somewhere” to “here&apos;s what you saved, and how it connects.”
          </p>
          <p className="mt-6 border-t border-white/25 pt-5 text-white/85">
            Every save makes the graph more valuable and harder to leave. That compounding library is the moat.
          </p>
        </div>
      </article>
    </main>
  );
}
