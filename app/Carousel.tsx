"use client";

import { useRef } from "react";
import TiltCard from "./TiltCard";

export type Product = {
  href: string;
  index: string;
  year: string;
  title: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
};

export default function Carousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const many = products.length > 3;

  function scrollByCard(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return;
    const a = track.children[0] as HTMLElement;
    const b = track.children[1] as HTMLElement;
    track.scrollBy({ left: dir * (b.offsetLeft - a.offsetLeft), behavior: "smooth" });
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 text-xs uppercase tracking-[0.2em] sm:px-10 lg:px-0">
        <h2 className="font-bold text-[var(--cy-cyan)]">&gt; Selected_Products</h2>
        <div className="flex items-center gap-3">
          <span className="text-[var(--cy-magenta)]">{String(products.length).padStart(2, "0")} loaded</span>
          {many && (
            <>
              <button type="button" aria-label="Previous project" className="cy-arrow" onClick={() => scrollByCard(-1)}>←</button>
              <button type="button" aria-label="Next project" className="cy-arrow" onClick={() => scrollByCard(1)}>→</button>
            </>
          )}
        </div>
      </div>

      <div className="cy-wrap min-h-0 flex-1">
        <div
          ref={trackRef}
          className={`cy-track ${many ? "cy-many" : "cy-few"}`}
          style={{ "--n": products.length } as React.CSSProperties}
        >
          {products.map((p) => (
            <TiltCard key={p.href} href={p.href} accent={p.accent}>
              <div className="cy-lift flex items-start justify-between text-xs tracking-widest">
                <span style={{ color: p.accent }}>{p.index} // {p.year}</span>
                <span className="text-lg" style={{ color: p.accent }}>↗</span>
              </div>
              <div className="cy-lift-more cy-icon flex justify-center">{p.icon}</div>
              <div className="cy-lift-more">
                <h3 className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-3xl">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/65">{p.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
