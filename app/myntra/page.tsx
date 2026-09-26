export default function MyntraPage() {
  return (
    <main className="myntra-page min-h-screen">
      <nav className="border-b border-[#eaeaec] px-5 py-4 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="text-xs font-bold uppercase tracking-[0.1em] text-[#282c3f]">← RK / product notes</a>
          <span className="text-lg font-black italic tracking-tight text-[#ff3f6c]">Myntra</span>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-10 lg:px-16">
        <div className="myntra-card p-8" />
      </section>
    </main>
  );
}
