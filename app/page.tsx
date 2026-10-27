import Carousel, { type Product } from "./Carousel";

const iconProps = {
  width: 72,
  height: 72,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const products: Product[] = [
  {
    href: "/district",
    index: "01",
    year: "2026",
    title: "District By Zomato",
    description: "Reimagining",
    accent: "#ff2bd6",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M24 4 41 14v20L24 44 7 34V14z" />
        <path d="M24 4v18m0 0 17-8M24 22 7 14M24 22v22" opacity="0.55" />
      </svg>
    ),
  },
  {
    href: "/cook-automation",
    index: "02",
    year: "2026",
    title: "cookAuto",
    description: "Smart kitchen coordination, from grocery order to cook confirmation",
    accent: "#c8ff3d",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="9" y="9" width="30" height="30" rx="3" />
        <rect x="18" y="18" width="12" height="12" />
        <path d="M16 3v6m8-6v6m8-6v6M16 39v6m8-6v6m8-6v6M3 16h6m-6 8h6m-6 8h6m30-16h6m-6 8h6m-6 8h6" />
      </svg>
    ),
  },
  {
    href: "/second-brain",
    index: "03",
    year: "2026",
    title: "Second Brain",
    description: "Everything you read, quietly connected. A learning graph that captures, organizes and resurfaces what you save",
    accent: "#a78bfa",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <circle cx="24" cy="24" r="6" />
        <circle cx="8" cy="12" r="3.5" />
        <circle cx="40" cy="12" r="3.5" />
        <circle cx="10" cy="38" r="3.5" />
        <circle cx="39" cy="37" r="3.5" />
        <path d="M11 14l9 7m17-7-9 7M12 35l8-8m19 7-9-7" opacity="0.55" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="cyber relative flex h-dvh min-h-[640px] flex-col overflow-hidden">
      <div className="cy-bg" aria-hidden="true">
        <span className="cy-glow cy-glow-1" />
        <span className="cy-glow cy-glow-2" />
        <span className="cy-glow cy-glow-3" />
        <span className="cy-grid" />
        <span className="cy-scan" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 text-sm sm:px-10 lg:px-0">
          <a href="/" className="font-bold tracking-widest text-white">
            RK<span className="text-[var(--cy-cyan)]">/</span>PRODUCT
          </a>
          <div className="flex items-center gap-3">
            <a href="https://ridhimakohli.github.io/" target="_blank" rel="noopener noreferrer" className="cy-pill">
              Website <span aria-hidden="true">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/kohliridhima" target="_blank" rel="noopener noreferrer" className="cy-pill">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>

        <section className="relative flex flex-1 basis-0 flex-col items-center justify-center px-5 text-center">
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(46vh,420px)] w-auto -translate-x-1/2 -translate-y-1/2 opacity-40"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
          >
            <g className="cy-ring" stroke="#00f0ff" strokeWidth="0.6" strokeDasharray="2 5">
              <circle cx="100" cy="100" r="96" />
            </g>
            <g className="cy-ring-rev" stroke="#ff2bd6" strokeWidth="0.8" strokeDasharray="30 12 4 12">
              <circle cx="100" cy="100" r="78" />
            </g>
            <path d="M100 4v14M100 182v14M4 100h14M182 100h14" stroke="#00f0ff" strokeWidth="1" />
          </svg>

          <h1 className="cy-title relative text-4xl sm:text-6xl lg:text-7xl">Product Portfolio</h1>
          <p className="relative mt-4 text-base tracking-[0.25em] text-[var(--cy-cyan)] sm:text-xl">
            &gt; By Ridhima Kohli<span className="cy-cursor">&nbsp;</span>
          </p>
        </section>

        <section className="min-h-0 flex-1 basis-0 pb-4">
          <Carousel products={products} />
        </section>
      </div>
    </main>
  );
}
