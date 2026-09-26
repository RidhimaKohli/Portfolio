export default function Home() {
  return (
    <main className="min-h-screen bg-white px-5 py-5 sm:px-10 lg:px-16">
      <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-[var(--line)] pb-5 text-sm">
        <a href="/" className="font-bold text-[var(--purple)]">RK / product </a>
            </nav>

      <section className="mx-auto grid max-w-6xl gap-6 py-16 lg:grid-cols-[1.4fr_0.6fr] lg:py-24">
        <div className="card p-7 sm:p-12">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-[var(--red)]">A portfolio in progress</p>
          <h1 className="display max-w-3xl text-5xl leading-tight text-black sm:text-7xl">Product Portfolio<br /></h1>
        </div>
        <div className="card bg-[var(--purple)] p-7 text-lg leading-7 text-white sm:p-9">
          <p>A list of product prototypes, ideas and teardowns</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-5">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-black">Selected Products</h2>
          <span className="text-sm text-[var(--blue)]">01 / 02</span>
        </div>
        <a href="/district" className="card card-hover group grid gap-6 p-6 md:grid-cols-[1fr_1.5fr_auto] md:items-center">
          <p className="text-sm text-[var(--blue)]">01 &nbsp; / &nbsp; 2026</p>
          <div>
            <h3 className="display text-4xl text-[var(--purple)]">District By Zomato</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-black/60">Reimagining</p>
          </div>
          <span className="text-2xl text-[var(--red)]">↗</span>
        </a>
        <a href="/cook-automation" className="card card-hover group grid gap-6 p-6 md:grid-cols-[1fr_1.5fr_auto] md:items-center">
          <p className="text-sm text-[var(--blue)]">02 &nbsp; / &nbsp; 2026</p>
          <div>
            <h3 className="display text-4xl text-[#8a5a00]">cookAuto</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-black/60">Smart kitchen coordination, from grocery order to cook confirmation</p>
          </div>
          <span className="text-2xl text-[var(--red)]">↗</span>
        </a>
      </section>
      </main>
  );
}
