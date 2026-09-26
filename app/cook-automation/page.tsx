import DemoView from "./Demo";

function InfoBox({ title, accent, chip, children }: { title: string; accent: string; chip: string; children: React.ReactNode }) {
  return (
    <div className="cook-card p-6 text-left">
      <div className="mb-4 flex items-center gap-2">
        <span className="cook-chip flex h-7 w-7 items-center justify-center text-sm">{chip}</span>
        <p className={`text-xs font-black uppercase tracking-[0.16em] ${accent}`}>{title}</p>
      </div>
      {children}
    </div>
  );
}

function List({ items }: { items: { emoji: string; text: string }[] }) {
  return (
    <ul className="space-y-2.5 text-sm leading-6 text-black/70">
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-2.5">
          <span className="mt-0.5 text-base leading-none">{item.emoji}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CookAutomationPage() {
  return (
    <main className="cook-page min-h-screen px-5 py-5 sm:px-10 lg:px-16">
      <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-black/10 pb-5 text-sm">
        <a href="/" className="font-bold text-black">← RK / product notes</a>
        <span className="cook-chip px-3 py-1 text-xs">cookAuto</span>
      </nav>

      <section className="mx-auto max-w-6xl pt-8 pb-10">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-[#8a5a00]">Cook Automation</p>
        <h1 className="display text-left text-4xl leading-tight text-black sm:text-6xl">cookAuto</h1>
        <p className="mt-3 max-w-2xl text-left text-base leading-7 text-black/60 sm:text-lg">
          A smart kitchen coordination app that connects grocery orders, meal planning, and cook communication —
          from expiry tracking to an agentic reorder cart.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 pb-14 md:grid-cols-3">
        <InfoBox title="Pain points & target user" accent="text-[#e2361f]" chip="🔥">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-black/40">Pain points</p>
          <List
            items={[
              { emoji: "🗑️", text: "Food wastage from forgotten groceries" },
              { emoji: "🤯", text: "Daily “what to cook” decision fatigue" },
              { emoji: "📵", text: "Miscommunication with household help on meal planning" },
              { emoji: "🕳️", text: "No visibility into what's actually consumed" },
            ]}
          />
          <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-black/40">Target user</p>
          <ul className="space-y-2.5 text-sm leading-6 text-black/70">
            <li className="flex items-start gap-2.5"><span className="mt-0.5 text-base leading-none">🏙️</span><span>Urban dual-income households</span></li>
            <li className="flex items-start gap-2.5"><span className="mt-0.5 text-base leading-none">🏠</span><span>Hostel-mess-style shared kitchens</span></li>
            <li className="flex items-start gap-2.5"><span className="mt-0.5 text-base leading-none">🛒</span><span>Quick-commerce grocery users with domestic help</span></li>
          </ul>
        </InfoBox>

        <InfoBox title="Features" accent="text-[#8a5a00]" chip="⚡">
          <List
            items={[
              { emoji: "⏳", text: "Auto expiry tracking from order data" },
              { emoji: "🍳", text: "AI-curated cook suggestions based on inventory" },
              { emoji: "🗳️", text: "In-app voting between household members" },
              { emoji: "💬", text: "Auto WhatsApp dispatch to cook" },
              { emoji: "🔄", text: "Post-cook inventory reconciliation" },
              { emoji: "🧾", text: "Wastage logging (finished / thrown)" },
              { emoji: "🛒", text: "Agentic auto-cart generation with one-click approval" },
            ]}
          />
        </InfoBox>

        <InfoBox title="Metrics to track" accent="text-[#3a7d33]" chip="📊">
          <div className="cook-lime mb-4 rounded-xl p-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-black/60">⭐ North star</p>
            <p className="text-sm font-bold text-black">Grocery Utilization Rate</p>
            <p className="mt-1 text-xs leading-5 text-black/70">% of ordered groceries consumed before expiry</p>
          </div>
          <List
            items={[
              { emoji: "💸", text: "Food wastage rate (₹ value or kg thrown per week)" },
              { emoji: "⏱️", text: "Voting-to-cook turnaround time" },
              { emoji: "🤝", text: "Cart auto-approval rate (trust in agentic suggestions)" },
              { emoji: "📈", text: "Weekly active decision cycles (orders → cooked loop completions)" },
            ]}
          />
        </InfoBox>
      </section>

      <section className="mx-auto max-w-6xl pb-16">
        <h2 className="mb-5 text-left text-sm font-black uppercase tracking-[0.16em] text-black">Try the flow</h2>
        <DemoView />
      </section>
    </main>
  );
}
