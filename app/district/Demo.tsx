"use client";

import { useState } from "react";

type EventItem = { id: string; emoji: string; title: string; venue: string; time: string };
type Status = "pending" | "interested" | "declined";
type RidhimaScreen = "feed" | "detail" | "compose" | "dashboard";
type AishaScreen = "home" | "respond" | "done";

const EVENTS: EventItem[] = [
  { id: "concert", emoji: "🎤", title: "Diljit Dosanjh Live", venue: "DY Patil Stadium", time: "Sat · 8:00 PM" },
  { id: "dinner", emoji: "🍜", title: "Gonzo – Pan Asian Kitchen", venue: "Bandra West", time: "Tonight · 8:00 PM" },
  { id: "movie", emoji: "🎬", title: "Dune: Part Three", venue: "PVR Phoenix", time: "Sun · 6:30 PM" },
];

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-5 text-[11px] font-bold text-white/70">
      <span>9:41</span>
      <span>••• 📶 🔋</span>
    </div>
  );
}

function PhoneFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-white/40">{label}</p>
      <div className="relative w-[300px] rounded-[2.5rem] border-[6px] border-[#2a2435] bg-black p-2 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="h-[580px] w-full overflow-hidden rounded-[2rem] bg-[#0a0710]">{children}</div>
      </div>
    </div>
  );
}

function RidhimaFeed({ onSelect }: { onSelect: (e: EventItem) => void }) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="px-5 pt-4">
        <p className="text-lg font-bold text-white">District</p>
        <p className="text-xs text-white/40">Hi Ridhima, here&apos;s what&apos;s on tonight</p>
      </div>
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto px-4 pb-4">
        {EVENTS.map((e) => (
          <button
            key={e.id}
            onClick={() => onSelect(e)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-[#a855f7]/50 hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{e.emoji}</span>
              <div>
                <p className="text-sm font-bold text-white">{e.title}</p>
                <p className="text-xs text-white/50">{e.venue} · {e.time}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function RidhimaEventDetail({ event, onBack, onPlan }: { event: EventItem; onBack: () => void; onPlan: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex items-center gap-2 px-4 pt-3">
        <button onClick={onBack} className="text-white/60">←</button>
        <p className="text-sm font-bold text-white">Event details</p>
      </div>
      <div className="mt-4 px-4">
        <div className="flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6d28d9] to-[#9333ea] text-5xl">{event.emoji}</div>
        <p className="mt-4 text-lg font-bold text-white">{event.title}</p>
        <p className="text-xs text-white/50">{event.venue} · {event.time}</p>
      </div>
      <div className="mt-auto space-y-2 px-4 pb-6">
        <button className="w-full rounded-full bg-white py-3 text-sm font-bold text-[#6726a8]">Book Now</button>
        <button className="w-full rounded-full border border-white/15 py-3 text-sm font-bold text-white/80">Interested</button>
        <button onClick={onPlan} className="w-full rounded-full bg-gradient-to-r from-[#6d28d9] to-[#9333ea] py-3 text-sm font-bold text-white">Plan with Friends</button>
      </div>
    </div>
  );
}

function RidhimaCompose({ event, onBack, onSend }: { event: EventItem; onBack: () => void; onSend: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex items-center gap-2 px-4 pt-3">
        <button onClick={onBack} className="text-white/60">←</button>
        <p className="text-sm font-bold text-white">Plan with friends</p>
      </div>
      <div className="mt-4 space-y-4 px-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-[10px] uppercase tracking-wide text-white/40">Event</p>
          <p className="text-sm font-bold text-white">{event.title}</p>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-white/40">Invite</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#a855f7]/20 px-3 py-2 text-xs font-bold text-[#c9a8ff]">🙋‍♀️ Aisha ✓</span>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-white/40">Respond by</p>
          <span className="rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-white/70">Tonight, 8:00 PM</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs italic leading-5 text-white/60">
          &ldquo;I&apos;m free tonight, anyone in?&rdquo;
        </div>
      </div>
      <div className="mt-auto px-4 pb-6">
        <button onClick={onSend} className="w-full rounded-full bg-gradient-to-r from-[#6d28d9] to-[#9333ea] py-3 text-sm font-bold text-white">Send Plan</button>
      </div>
    </div>
  );
}

function RidhimaDashboard({ event, status, onReset }: { event: EventItem; status: Status; onReset: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="px-4 pt-3">
        <p className="text-sm font-bold text-white">Plan sent ✅</p>
        <p className="mt-1 text-xs text-white/50">{event.title} · {event.time}</p>
      </div>
      <div className="mt-4 px-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">🙋‍♀️ Aisha</span>
            <span className={`text-xs font-bold ${status === "pending" ? "text-white/40" : status === "interested" ? "text-[#34d399]" : "text-[#fb7185]"}`}>
              {status === "pending" ? "⏳ Pending" : status === "interested" ? "✅ Interested" : "❌ Can't make it"}
            </span>
          </div>
        </div>

        {status === "pending" && <p className="mt-4 text-center text-xs text-white/40">⏳ 3 hours left to respond · waiting on Aisha</p>}

        {status === "interested" && (
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#6d28d9] to-[#9333ea] p-4 text-center">
            <p className="text-sm font-bold text-white">1 / 1 friends interested 🎉</p>
            <p className="mt-1 text-xs text-white/80">Ready to make it happen?</p>
            <button className="mt-3 w-full rounded-full bg-white py-2 text-xs font-bold text-[#6726a8]">Book for the Group</button>
          </div>
        )}

        {status === "declined" && <p className="mt-4 text-center text-xs text-[#fb7185]">Aisha can&apos;t make it this time.</p>}
      </div>
      <div className="mt-auto px-4 pb-6">
        <button onClick={onReset} className="w-full rounded-full border border-white/15 py-2 text-xs font-bold text-white/60">Restart demo</button>
      </div>
    </div>
  );
}

function AishaHome({ hasPlan, event, onOpen }: { hasPlan: boolean; event: EventItem; onOpen: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-b from-[#1a1030] to-[#0a0710] px-4 pb-6 pt-10">
      <div className="text-center">
        <p className="text-4xl font-bold text-white">9:41</p>
        <p className="text-xs text-white/40">Saturday, 5 September</p>
      </div>
      <div>
        {hasPlan ? (
          <button onClick={onOpen} className="w-full animate-[fadeIn_0.4s_ease] rounded-2xl border border-white/10 bg-white/10 p-4 text-left backdrop-blur transition hover:border-[#a855f7]/50">
            <div className="flex items-start gap-3">
              <span className="text-xl">🟣</span>
              <div>
                <p className="text-xs font-bold text-white/70">District · now</p>
                <p className="mt-1 text-sm font-bold text-white">Ridhima wants to go to {event.title} 🎉</p>
                <p className="mt-1 text-xs text-white/60">Tap to respond · Respond by 8:00 PM</p>
              </div>
            </div>
          </button>
        ) : (
          <p className="text-center text-xs text-white/30">No new notifications</p>
        )}
      </div>
    </div>
  );
}

function AishaRespond({ event, onRespond }: { event: EventItem; onRespond: (s: Status) => void }) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="px-4 pt-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-wide text-white/40">Plan invite</p>
      </div>
      <div className="mt-4 px-6 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6d28d9] to-[#9333ea] text-4xl">{event.emoji}</div>
        <p className="mt-4 text-lg font-bold text-white">{event.title}</p>
        <p className="text-xs text-white/50">{event.venue} · {event.time}</p>
        <p className="mt-3 text-sm leading-5 text-white/70">Ridhima: &ldquo;I&apos;m free tonight, anyone in?&rdquo;</p>
        <p className="mt-2 text-xs text-white/40">⏳ Respond by 8:00 PM</p>
      </div>
      <div className="mt-auto space-y-2 px-4 pb-6">
        <button onClick={() => onRespond("interested")} className="w-full rounded-full bg-gradient-to-r from-[#6d28d9] to-[#9333ea] py-3 text-sm font-bold text-white">I&apos;m Interested</button>
        <button onClick={() => onRespond("declined")} className="w-full rounded-full border border-white/15 py-3 text-sm font-bold text-white/70">Can&apos;t Make It</button>
      </div>
    </div>
  );
}

function AishaConfirmed({ status }: { status: Status }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <p className="text-4xl">{status === "interested" ? "🎉" : "👋"}</p>
      <p className="mt-3 text-sm font-bold leading-6 text-white">
        {status === "interested" ? "You're in! Ridhima has been notified." : "No worries — Ridhima has been notified."}
      </p>
      <p className="mt-2 text-xs text-white/40">Switch back to Ridhima&apos;s phone to see her dashboard update.</p>
    </div>
  );
}

export default function DemoView() {
  const [ridhimaScreen, setRidhimaScreen] = useState<RidhimaScreen>("feed");
  const [aishaScreen, setAishaScreen] = useState<AishaScreen>("home");
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(EVENTS[0]);
  const [planSent, setPlanSent] = useState(false);
  const [status, setStatus] = useState<Status>("pending");

  function reset() {
    setRidhimaScreen("feed");
    setAishaScreen("home");
    setPlanSent(false);
    setStatus("pending");
    setSelectedEvent(EVENTS[0]);
  }

  return (
    <div>
      <div className="district-card flex flex-wrap items-center justify-between gap-3 p-5 text-left">
        <p className="text-sm leading-6 text-white/65">
          Tap an event on <span className="font-bold text-white">Ridhima&apos;s phone</span>, send it to a friend, then
          switch to <span className="font-bold text-white">Aisha&apos;s phone</span> to respond and watch the dashboard update.
        </p>
        <button onClick={reset} className="shrink-0 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/60 hover:text-white">Restart demo</button>
      </div>

      <div className="mt-10 grid justify-items-center gap-12 sm:grid-cols-2">
        <PhoneFrame label="Ridhima's phone">
          {ridhimaScreen === "feed" && (
            <RidhimaFeed onSelect={(e) => { setSelectedEvent(e); setRidhimaScreen("detail"); }} />
          )}
          {ridhimaScreen === "detail" && (
            <RidhimaEventDetail event={selectedEvent} onBack={() => setRidhimaScreen("feed")} onPlan={() => setRidhimaScreen("compose")} />
          )}
          {ridhimaScreen === "compose" && (
            <RidhimaCompose
              event={selectedEvent}
              onBack={() => setRidhimaScreen("detail")}
              onSend={() => { setPlanSent(true); setStatus("pending"); setRidhimaScreen("dashboard"); setAishaScreen("home"); }}
            />
          )}
          {ridhimaScreen === "dashboard" && <RidhimaDashboard event={selectedEvent} status={status} onReset={reset} />}
        </PhoneFrame>

        <PhoneFrame label="Aisha's phone (friend)">
          {aishaScreen === "home" && <AishaHome hasPlan={planSent} event={selectedEvent} onOpen={() => setAishaScreen("respond")} />}
          {aishaScreen === "respond" && <AishaRespond event={selectedEvent} onRespond={(s) => { setStatus(s); setAishaScreen("done"); }} />}
          {aishaScreen === "done" && <AishaConfirmed status={status} />}
        </PhoneFrame>
      </div>
    </div>
  );
}
