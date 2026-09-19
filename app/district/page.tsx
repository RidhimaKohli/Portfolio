"use client";

import { useState } from "react";
import DemoView from "./Demo";

function Section({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="mb-5 text-left text-2xl font-bold text-white sm:text-3xl">
        <span className="mr-3 text-[#a855f7]">{index}</span>
        {title}
      </h2>
      <div className="district-card p-7 sm:p-10">{children}</div>
    </section>
  );
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return <p className={`mb-3 text-left text-xs font-bold uppercase tracking-[0.16em] ${color}`}>{children}</p>;
}

function FlowRow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-[#c9a8ff]">{step}</span>
          {i < steps.length - 1 && <span className="text-[#f472b6]">→</span>}
        </span>
      ))}
    </div>
  );
}

function MetricTable({ caption, rows }: { caption: string; rows: { name: string; formula: string; note: string }[] }) {
  return (
    <div className="district-card overflow-x-auto p-6 sm:p-7">
      <Tag color="text-[#60a5fa]">{caption}</Tag>
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-white/40">
            <th className="py-2 pr-4 font-bold uppercase tracking-wide">Metric</th>
            <th className="py-2 pr-4 font-bold uppercase tracking-wide">Formula</th>
            <th className="py-2 font-bold uppercase tracking-wide">Why it matters</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-white/10 align-top last:border-0">
              <td className="py-3 pr-4 font-bold text-white">{r.name}</td>
              <td className="py-3 pr-4 text-[#c9a8ff]">{r.formula}</td>
              <td className="py-3 text-white/60">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PersonaCard({ color, name, blurb, pain }: { color: string; name: string; blurb: string; pain: string }) {
  return (
    <div className="district-card p-6 text-left">
      <p className={`text-xl font-bold ${color}`}>{name}</p>
      <p className="mt-3 text-sm leading-6 text-white/60">{blurb}</p>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#fb7185]">Pain point</p>
      <p className="mt-1 text-sm leading-6 text-white/85">{pain}</p>
    </div>
  );
}

function ChecklistCard({ tone, title, items }: { tone: "purple" | "card"; title: string; items: string[] }) {
  const isPurple = tone === "purple";
  return (
    <div className={isPurple ? "district-purple p-7 text-left" : "district-card p-7 text-left"}>
      <p className={`mb-4 text-xs font-bold uppercase tracking-[0.16em] ${isPurple ? "text-white/70" : "text-[#60a5fa]"}`}>{title}</p>
      <ul className="space-y-2 text-sm leading-6">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={isPurple ? "text-white" : "text-[#fb7185]"}>—</span>
            <span className={isPurple ? "text-white/90" : "text-white/80"}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DistrictPage() {
  const [tab, setTab] = useState<"case-study" | "demo">("case-study");
  const containerWidth = tab === "demo" ? "max-w-5xl" : "max-w-3xl";

  return (
    <main className="district-page min-h-screen px-5 py-5 sm:px-10 lg:px-16">
      <nav className={`mx-auto flex ${containerWidth} items-center justify-between border-b border-white/10 pb-5 text-sm`}>
        <a href="/" className="font-bold text-[#c9a8ff]">← RK / product notes</a>
        <span className="text-white/40">District / 01</span>
      </nav>

      <div className={`mx-auto ${containerWidth} flex gap-2 pt-6`}>
        <button
          onClick={() => setTab("case-study")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition ${tab === "case-study" ? "bg-white text-[#0a0710]" : "border border-white/15 text-white/60 hover:text-white"}`}
        >
          Case Study
        </button>
        <button
          onClick={() => setTab("demo")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition ${tab === "demo" ? "bg-white text-[#0a0710]" : "border border-white/15 text-white/60 hover:text-white"}`}
        >
          Demo
        </button>
      </div>

      {tab === "demo" && (
        <section className={`mx-auto ${containerWidth} py-12 lg:py-16`}>
          <h2 className="mb-2 text-left text-2xl font-bold text-white sm:text-3xl">Try the flow</h2>
          <p className="mb-8 max-w-2xl text-left text-sm leading-6 text-white/60">
            A working prototype of &ldquo;Plan with Friends&rdquo; across two phones — discovery, plan-with-friends,
            the friend notification, the interested/can&apos;t-make-it response, and the live interest dashboard.
          </p>
          <DemoView />
        </section>
      )}

      {tab === "case-study" && (
      <article className={`mx-auto ${containerWidth} py-12 lg:py-16`}>
        {/* Hero */}
        <h1 className="display text-left text-5xl leading-tight text-white sm:text-7xl">District by Zomato</h1>

        <div className="district-card mt-6 p-7 sm:p-10">
          <p className="text-left text-lg leading-7 text-white/70">
            A social planning and group-intent layer that turns District from a transaction platform into the place
            where the plan is formed.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-left text-lg font-bold text-white">The problem</h2>
          <div className="district-card p-6"><p className="text-left text-lg leading-7 text-white/70">Going out with friends is usually a coordination problem, not a discovery problem.</p></div>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-left text-lg font-bold text-white">The hypothesis</h2>
          <div className="district-card p-6"><p className="text-left text-lg leading-7 text-white/70">If sharing intent with friends and converting it into a plan is easy, coordination friction drops and bookings rise.</p></div>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-left text-lg font-bold text-white">The artefact</h2>
          <div className="district-card p-6"><p className="text-left text-lg leading-7 text-white/70">“Plan with Friends” — an intent-to-book layer on every event, movie and restaurant.</p></div>
        </div>

        {/* 01 — Opportunity */}
        <Section index="01" title="The opportunity">
          <div className="text-left">
            <h3 className="display text-3xl leading-tight text-[#c9a8ff] sm:text-4xl">Coordination, not discovery, is the bottleneck.</h3>
            <p className="mt-6 text-lg leading-8 text-white/65">
              A user may have several friend groups and a free weekend, but no easy way to know who else is free, who
              would actually be interested in a given event, and when the group should stop waiting and just book.
              Today that conversation happens on WhatsApp and Instagram DMs — entirely outside District.
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 text-left">
            <Tag color="text-[#60a5fa]">Current user journey</Tag>
            <div className="mt-2 overflow-x-auto"><FlowRow steps={["Find something", "Share on WhatsApp", "Ask across groups", "Wait", "Follow up", "Tally interest", "Reopen District", "Book"]} /></div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
            {[
              ["Fragmented coordination", "The conversation happens outside District entirely."],
              ["High response latency", "Friends may take hours or days to reply."],
              ["Poor visibility", "The initiator manually tracks who's actually interested."],
              ["Decision paralysis", "No deadline means even interested people never commit."],
              ["Lost intent", "Coordination friction kills discoveries before they convert."],
              ["No social graph", "District has little visibility into who users go out with."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
                <p className="text-sm font-bold text-[#fb7185]">{title}</p>
                <p className="mt-1 text-sm leading-6 text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 02 — Hypothesis */}
        <Section index="02" title="The hypothesis">
          <div className="text-left">
            <p className="text-2xl leading-snug text-white sm:text-3xl">
              If District lets users share intent to attend an experience with friends, set a response deadline, and
              convert collective interest into a booking — coordination friction drops and group bookings rise.
            </p>
            <p className="mt-8 border-t border-white/10 pt-6 text-lg text-white/65">
              The shift: from <span className="font-bold text-white">“I found something I want to book”</span> to{" "}
              <span className="font-bold text-white">“I found something we could do together.”</span>
            </p>
          </div>
        </Section>

        {/* 03 — Product */}
        <Section index="03" title="The product: “Plan with Friends”">
          <div className="text-left">
            <Tag color="text-[#60a5fa]">Core flow</Tag>
            <div className="mt-2 overflow-x-auto"><FlowRow steps={["Discover", "Show interest", "Invite friends", "Collect interest", "Deadline", "Book together"]} /></div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 text-left">
            <Tag color="text-[#fb7185]">Step 1 — Discover</Tag>
            <p className="text-sm leading-6 text-white/65">
              A user finds an event, movie, restaurant or activity. Instead of only <span className="font-bold text-white">Book Now</span>,
              they also see <span className="font-bold text-white">Interested</span> and <span className="font-bold text-white">Plan with Friends</span>.
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 text-left">
            <Tag color="text-white/50">Step 2 — Create a plan</Tag>
            <p className="text-sm leading-6 text-white/65">The initiator picks the experience, date/time, group size, friends to notify, and a response deadline.</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#6d28d9] to-[#9333ea] p-5 text-sm leading-6 text-white">
              <p className="font-bold">Diljit Dosanjh Concert</p>
              <p>Saturday, 8 PM</p>
              <p>Interested with: 8 friends</p>
              <p>Respond by: Thursday, 8 PM</p>
              <p className="mt-2 italic text-white/75">“I’m free Saturday. Anyone in?”</p>
            </div>
          </div>
        </Section>

        {/* 04 — Notify & respond */}
        <Section index="04" title="Notify & respond">
          <div className="text-left">
            <Tag color="text-[#60a5fa]">Friend notification — one tap, deep-linked to the event</Tag>
            <div className="mt-3 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6">
              <p className="font-bold text-white">Ridhima wants to go to the Diljit concert 🎵</p>
              <p className="mt-1 text-white/60">Saturday • 8 PM · Respond by Thursday, 8 PM</p>
              <div className="mt-4 flex gap-3">
                <span className="district-purple rounded-full px-4 py-2 text-xs font-bold">I&apos;m Interested</span>
                <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/60">Can&apos;t Make It</span>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto border-t border-white/10 pt-8 text-left">
            <Tag color="text-[#fb7185]">Interest dashboard — status at a glance, no extra WhatsApp thread needed</Tag>
            <p className="mb-4 text-sm font-bold text-white">Diljit Concert · Saturday, 8 PM · 5 / 8 friends interested</p>
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <tbody>
                {[
                  ["A", "✅ Interested", "text-[#34d399]"],
                  ["B", "✅ Interested", "text-[#34d399]"],
                  ["C", "⏳ Pending", "text-white/45"],
                  ["D", "❌ Can't make it", "text-[#fb7185]"],
                  ["E", "⏳ Pending", "text-white/45"],
                ].map(([name, status, color]) => (
                  <tr key={name} className="border-b border-white/10 last:border-0">
                    <td className="py-2 pr-4 font-bold text-white">{name}</td>
                    <td className={`py-2 ${color}`}>{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 05 — Deadline */}
        <Section index="05" title="The deadline mechanic">
          <div className="text-left">
            <p className="text-lg leading-8 text-white/65">
              Without a deadline, this feature just recreates an endless group chat. A visible countdown — with a
              reminder nudge to anyone who hasn&apos;t responded — forces a clean transition from{" "}
              <span className="font-bold text-white">intent</span> to <span className="font-bold text-white">commitment</span> to{" "}
              <span className="font-bold text-white">transaction</span>.
            </p>
            <div className="mt-6 inline-block rounded-full bg-[#fb7185]/15 px-5 py-3 text-sm font-bold text-[#fb7185]">⏳ 3 hours left to respond</div>
          </div>
        </Section>

        {/* 06 — Booking flow */}
        <Section index="06" title="From intent to transaction">
          <div className="district-purple p-7 text-left sm:p-9">
            <p className="text-2xl font-bold">6 people are interested 🎉</p>
            <p className="mt-2 text-white/85">Ready to make it happen?</p>
            <span className="mt-5 inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-[#6726a8]">Book for the Group</span>
          </div>
          <p className="mt-6 text-left text-sm leading-6 text-white/65">
            Once the response window closes, District can support one person paying for everyone, split payments,
            individual payment links, group seat selection, and a single booking confirmation shared with everyone —
            minimizing the steps between collective interest and an actual transaction.
          </p>
        </Section>

        {/* 07 — Why it compounds */}
        <Section index="07" title="Why this compounds">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a45c2] to-[#2457d6] p-7 text-left sm:p-9">
            <Tag color="text-white/70">The acquisition loop</Tag>
            <div className="mt-2 overflow-x-auto">
              <div className="flex flex-wrap items-center gap-2 text-sm text-white">
                {["Booking", "Social invitation", "New user", "New friend graph", "New plan", "New booking"].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className="rounded-full bg-white/15 px-4 py-2 font-bold">{s}</span>
                    {i < arr.length - 1 && <span>→</span>}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/85">Every existing user becomes a potential distribution channel.</p>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
            {[
              ["Higher conversion", "Reduces the friction that today causes interested users to abandon a booking they couldn't coordinate."],
              ["Increased frequency", "Users return to District to plan something, not only when they've already decided to book."],
              ["Friend-graph creation", "District gains real visibility into who users actually go out with."],
              ["Organic acquisition", "Inviting friends gives non-users a concrete reason to download District."],
              ["Cross-category discovery", "A friend invited to a concert may stay for dining, movies or other events."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
                <p className="text-sm font-bold text-[#c9a8ff]">{title}</p>
                <p className="mt-1 text-sm leading-6 text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 08 — Personas */}
        <Section index="08" title="Who it's for">
          <div className="grid gap-4 sm:grid-cols-3">
            <PersonaCard color="text-[#c9a8ff]" name="The Planner" blurb="Usually initiates plans and wants to know who is available." pain="Spends significant time coordinating people." />
            <PersonaCard color="text-[#fb7185]" name="The Passive Participant" blurb="Wants to go out but rarely initiates plans." pain="Doesn't want to participate in lengthy group conversations." />
            <PersonaCard color="text-[#60a5fa]" name="The Busy Friend" blurb="May be interested but needs a clear deadline to decide." pain="Misses plans because responses happen asynchronously." />
          </div>
        </Section>

        {/* 09 — MVP scope */}
        <Section index="09" title="MVP scope">
          <div className="grid gap-4 md:grid-cols-2">
            <ChecklistCard
              tone="purple"
              title="Must have"
              items={["Add / follow friends on District", "“Interested” CTA", "Select friends", "Create a plan", "Response deadline", "Push notification", "Interested / Can't make it response", "Plan dashboard", "Reminder notification", "Group booking CTA"]}
            />
            <ChecklistCard
              tone="card"
              title="Could have later"
              items={["Split payments", "Group chat", "AI-generated recommendations", "Availability-based recommendations", "Recurring friend groups", "Shared wishlists", "“Everyone's free” calendar matching", "Personalized group recommendations"]}
            />
          </div>
        </Section>

        {/* 10 — Guardrails & privacy */}
        <Section index="10" title="Guardrails & privacy">
          <div className="text-left">
            <p className="text-lg leading-8 text-white/65">
              A social graph raises real privacy stakes. Visibility should be controlled at the{" "}
              <span className="font-bold text-white">plan level</span>, not assumed to be visible to the entire
              friend network. Users should be able to:
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {["Hide an event from specific people", "Choose exactly who gets an invitation", "Keep their interests private", "Disable social notifications", "Remove or block friends"].map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-white/75"><span className="text-[#fb7185]">—</span>{item}</li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm italic leading-6 text-white/50">
              Example: a user might want to share “Interested in a Sunday brunch” with Friend Group A but not Friend Group B.
            </p>
          </div>
        </Section>

        {/* 11 — Metrics */}
        <Section index="11" title="Measuring success">
          <div className="district-purple p-7 text-left sm:p-9">
            <Tag color="text-white/70">North star</Tag>
            <p className="text-2xl font-bold sm:text-3xl">Social Plans → Booking Conversion Rate</p>
            <p className="mt-2 text-white/85">The percentage of plans created through the feature that ultimately result in a District booking — connecting social intent directly to commerce.</p>
          </div>

          <div className="mt-8 space-y-6 border-t border-white/10 pt-8">
            <MetricTable caption="Engagement metrics" rows={[
              { name: "Plans created / active user", formula: "# plans created ÷ MAU", note: "Whether users adopt District for social planning." },
              { name: "Friends added per user", formula: "avg. friends per user", note: "Adoption of the social graph." },
              { name: "Friends invited per plan", formula: "avg. invitees per plan", note: "Breadth of social distribution." },
              { name: "Interest response rate", formula: "# responded ÷ # invited", note: "Effectiveness of the notify/respond loop." },
              { name: "Interests uploaded per user", formula: "avg. per user", note: "Frequency of expressed intent." },
            ]} />

            <MetricTable caption="Conversion metrics" rows={[
              { name: "Plan → booking conversion", formula: "# plans booked ÷ # plans created", note: "Core efficacy of the feature." },
              { name: "Incremental bookings", formula: "treatment vs. control lift", note: "Bookings genuinely added, not shifted." },
              { name: "Group booking rate", formula: "% of bookings from a social plan", note: "Share of bookings that are multi-participant." },
            ]} />

            <MetricTable caption="Growth metrics" rows={[
              { name: "Friend add rate", formula: "new friends added ÷ active users", note: "Social graph growth." },
              { name: "Invite → download", formula: "invitations ÷ downloads", note: "Acquisition efficiency of invites." },
              { name: "Invite → activation", formula: "download → first meaningful action", note: "Prevents optimizing for downloads alone." },
            ]} />
          </div>
        </Section>

        {/* 12 — Validating the bet */}
        <Section index="12" title="Validating the bet">
          <div className="text-left">
            <Tag color="text-[#60a5fa]">Guardrail metrics — don&apos;t optimize for engagement alone</Tag>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {["Notification opt-out rate", "Notification spam rate (per user)", "Plan abandonment rate", "Booking cancellation rate", "Friend removal / block rate", "Negative feedback (\"too many notifications\", \"didn't understand why\")"].map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-white/75"><span className="text-[#fb7185]">—</span>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left">
              <p className="text-sm font-bold text-white/50">Control</p>
              <p className="mt-1 text-sm leading-6 text-white/65">Existing District experience.</p>
            </div>
            <div className="district-red p-6 text-left">
              <p className="text-sm font-bold text-white/70">Treatment</p>
              <p className="mt-1 text-sm leading-6 text-white/90">Existing experience + “Plan with Friends,” measured on booking conversion, frequency, sessions/user, friend additions, group bookings and retention.</p>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 text-left">
            <p className="text-lg italic leading-8 text-white/70">
              “Does reducing social coordination friction generate incremental bookings and engagement — rather
              than simply shifting existing bookings into a new interface?”
            </p>
          </div>
        </Section>

        <div className="district-purple mt-14 p-7 text-left sm:p-10">
          <p className="text-2xl leading-snug sm:text-3xl">
            “I want to do something this weekend” → “Here are the people who want to do it with me” → “We&apos;re going.”
          </p>
          <p className="mt-6 border-t border-white/25 pt-5 text-white/85">
            The opportunity isn&apos;t adding a friends feature. It&apos;s making District the operating system for
            going out with people.
          </p>
        </div>
      </article>
      )}
    </main>
  );
}
