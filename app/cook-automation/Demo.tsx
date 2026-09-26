"use client";

import { useState } from "react";

type Item = { id: string; emoji: string; name: string; daysLeft: number; qty: string };
type Dish = { id: string; emoji: string; name: string; uses: string[] };

const ITEMS: Item[] = [
  { id: "bread", emoji: "🍞", name: "Bread", daysLeft: 2, qty: "1 loaf" },
  { id: "eggs", emoji: "🥚", name: "Eggs", daysLeft: 5, qty: "6 pcs" },
  { id: "tomato", emoji: "🍅", name: "Tomatoes", daysLeft: 3, qty: "4 pcs" },
  { id: "paneer", emoji: "🧀", name: "Paneer", daysLeft: 4, qty: "200g" },
  { id: "milk", emoji: "🥛", name: "Milk", daysLeft: 2, qty: "1L" },
  { id: "onion", emoji: "🧅", name: "Onions", daysLeft: 10, qty: "1kg" },
];

const DISHES: Dish[] = [
  { id: "sandwich", emoji: "🥪", name: "Veg Sandwich", uses: ["bread", "tomato", "onion"] },
  { id: "bhurji", emoji: "🍳", name: "Paneer Bhurji", uses: ["paneer", "onion", "tomato"] },
  { id: "omelette", emoji: "🍳", name: "Masala Omelette", uses: ["eggs", "onion", "tomato"] },
];

function expiryColor(days: number) {
  if (days <= 2) return "text-[#e2361f]";
  if (days <= 4) return "text-[#b8860b]";
  return "text-[#3a7d33]";
}

function ExpiryBadge({ days }: { days: number }) {
  return (
    <span className={`cook-chip px-2 py-1 text-[10px] ${expiryColor(days)}`}>
      {days <= 0 ? "Expired" : `Expires in ${days}d`}
    </span>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-5 text-[11px] font-bold text-black/60">
      <span>9:41</span>
      <span>••• 📶 🔋</span>
    </div>
  );
}

function PhoneFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-black/40">{label}</p>
      <div className="relative w-[300px] rounded-[2.5rem] border-[6px] border-[#14141a] bg-[#14141a] p-2 shadow-[0_30px_70px_-20px_rgba(20,20,26,0.5)]">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#14141a]" />
        <div className="h-[620px] w-full overflow-hidden rounded-[2rem] bg-[#f3f4ef]">{children}</div>
      </div>
    </div>
  );
}

// ---------- Owner screens ----------

type OwnerScreen = "home" | "vote" | "confirm" | "sent" | "postcook" | "wastage" | "cart";

function OwnerHome({ votingOpen, onOpenVoting }: { votingOpen: boolean; onOpenVoting: () => void }) {
  const expiring = ITEMS.filter((i) => i.daysLeft <= 2);
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="px-5 pt-4">
        <p className="text-lg font-black text-black">cookAuto</p>
        <p className="text-xs text-black/50">Hi Ridhima, here&apos;s your kitchen today</p>
      </div>

      {expiring.length > 0 && (
        <div className="mx-4 mt-3 rounded-2xl bg-[#fff3d6] p-3 text-xs font-bold text-[#8a5a00]">
          ⏳ {expiring.map((e) => e.name).join(" & ")} expiring in {Math.min(...expiring.map((e) => e.daysLeft))} days — suggest a sandwich?
        </div>
      )}

      <div className="mt-4 flex-1 overflow-y-auto px-4 pb-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-black/40">Grocery list (from Blinkit)</p>
        <div className="cook-card mb-4 divide-y divide-[#eef0e6]">
          {ITEMS.map((i) => (
            <div key={i.id} className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{i.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-black">{i.name}</p>
                  <p className="text-[10px] text-black/40">{i.qty}</p>
                </div>
              </div>
              <ExpiryBadge days={i.daysLeft} />
            </div>
          ))}
        </div>

        <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-black/40">What can be cooked</p>
        <div className="space-y-2">
          {DISHES.map((d) => (
            <div key={d.id} className="cook-card flex items-center gap-3 p-3">
              <span className="text-xl">{d.emoji}</span>
              <p className="text-xs font-bold text-black">{d.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6">
        <button onClick={onOpenVoting} className="cook-cta w-full py-3 text-sm" disabled={votingOpen}>
          {votingOpen ? "Voting open — waiting on votes" : "Open Voting with Friend"}
        </button>
      </div>
    </div>
  );
}

function VoteScreen({
  who,
  myVote,
  onVote,
  onBack,
}: {
  who: string;
  myVote: string | null;
  onVote: (id: string) => void;
  onBack?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex items-center gap-2 px-4 pt-3">
        {onBack && <button onClick={onBack} className="text-black/50">←</button>}
        <p className="text-sm font-bold text-black">Vote — {who}</p>
      </div>
      <p className="px-4 pt-2 text-xs text-black/50">Pick a dish from what&apos;s in the kitchen right now.</p>
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto px-4">
        {DISHES.map((d) => (
          <button
            key={d.id}
            onClick={() => onVote(d.id)}
            className={`w-full rounded-2xl border p-3 text-left transition ${
              myVote === d.id ? "border-[#14141a] bg-[#d4ff3f]" : "cook-card border-transparent"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{d.emoji}</span>
                <p className="text-xs font-bold text-black">{d.name}</p>
              </div>
              {myVote === d.id && <span className="text-sm font-bold text-black">✓</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function OwnerConfirm({
  ownerVote,
  friendVote,
  onSend,
  onBack,
}: {
  ownerVote: string;
  friendVote: string | null;
  onSend: () => void;
  onBack: () => void;
}) {
  const decided = friendVote && friendVote === ownerVote;
  const dish = DISHES.find((d) => d.id === ownerVote)!;
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex items-center gap-2 px-4 pt-3">
        <button onClick={onBack} className="text-black/50">←</button>
        <p className="text-sm font-bold text-black">Decision</p>
      </div>
      <div className="mt-4 px-4">
        <div className="cook-card p-4 text-center">
          <span className="text-3xl">{dish.emoji}</span>
          <p className="mt-2 text-sm font-bold text-black">{dish.name}</p>
          <p className="mt-1 text-xs text-black/50">Your vote: {dish.name}</p>
          <p className="mt-1 text-xs text-black/50">
            Friend: {friendVote ? DISHES.find((d) => d.id === friendVote)?.name : "waiting to vote…"}
          </p>
        </div>
        {!decided && friendVote && (
          <p className="mt-3 text-center text-xs font-bold text-[#e2361f]">You voted differently — wait for a rematch or re-vote.</p>
        )}
        {!friendVote && <p className="mt-3 text-center text-xs text-black/40">⏳ Waiting on your friend&apos;s vote</p>}
      </div>
      <div className="mt-auto px-4 pb-6">
        <button onClick={onSend} disabled={!decided} className="cook-cta w-full py-3 text-sm">
          Send to Cook on WhatsApp
        </button>
      </div>
    </div>
  );
}

function OwnerSent({ dish, cooked, onGoPostCook }: { dish: Dish; cooked: boolean; onGoPostCook: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <p className="text-4xl">✅</p>
      <p className="mt-3 text-sm font-bold leading-6 text-black">Sent to cook via WhatsApp</p>
      <p className="mt-2 text-xs text-black/50">&ldquo;Please make {dish.name} today&rdquo;</p>
      {!cooked && <p className="mt-4 text-xs text-black/40">⏳ Waiting for the cook to confirm…</p>}
      {cooked && (
        <button onClick={onGoPostCook} className="cook-cta mt-6 px-6 py-3 text-sm">
          View updated inventory
        </button>
      )}
    </div>
  );
}

function OwnerPostCook({ usedIds, onGoWastage }: { usedIds: string[]; onGoWastage: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="px-4 pt-3">
        <p className="text-sm font-bold text-black">Cooked ✅ — inventory synced</p>
      </div>
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto px-4">
        {ITEMS.map((i) => {
          const used = usedIds.includes(i.id);
          return (
            <div key={i.id} className="cook-card flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{i.emoji}</span>
                <p className="text-xs font-bold text-black">{i.name}</p>
              </div>
              <span className={`cook-chip px-2 py-1 text-[10px] ${used ? "text-[#3a7d33]" : "text-black/50"}`}>
                {used ? "Used" : "Remaining"}
              </span>
            </div>
          );
        })}
      </div>
      <div className="px-4 pb-6">
        <button onClick={onGoWastage} className="cook-cta w-full py-3 text-sm">Check wastage tracker</button>
      </div>
    </div>
  );
}

function OwnerWastage({
  usedIds,
  wastage,
  onMark,
  onGoCart,
}: {
  usedIds: string[];
  wastage: Record<string, "finished" | "thrown" | undefined>;
  onMark: (id: string, action: "finished" | "thrown") => void;
  onGoCart: () => void;
}) {
  const atRisk = ITEMS.filter((i) => !usedIds.includes(i.id) && i.daysLeft <= 3);
  const allHandled = atRisk.every((i) => wastage[i.id]);
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="px-4 pt-3">
        <p className="text-sm font-bold text-black">Wastage tracker</p>
        <p className="text-xs text-black/50">Items not used, nearing expiry</p>
      </div>
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto px-4">
        {atRisk.length === 0 && <p className="text-xs text-black/40">Nothing at risk right now 🎉</p>}
        {atRisk.map((i) => (
          <div key={i.id} className="cook-card p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{i.emoji}</span>
                <p className="text-xs font-bold text-black">{i.name}</p>
              </div>
              <ExpiryBadge days={i.daysLeft} />
            </div>
            {!wastage[i.id] ? (
              <div className="mt-2 flex gap-2">
                <button onClick={() => onMark(i.id, "finished")} className="cook-chip flex-1 py-2 text-[10px] text-[#3a7d33]">Mark Finished</button>
                <button onClick={() => onMark(i.id, "thrown")} className="cook-chip flex-1 py-2 text-[10px] text-[#e2361f]">Mark Thrown</button>
              </div>
            ) : (
              <p className={`mt-2 text-[10px] font-bold ${wastage[i.id] === "finished" ? "text-[#3a7d33]" : "text-[#e2361f]"}`}>
                {wastage[i.id] === "finished" ? "✓ Finished" : "✗ Thrown away"}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="px-4 pb-6">
        <button onClick={onGoCart} disabled={!allHandled} className="cook-cta w-full py-3 text-sm">
          Generate auto-cart
        </button>
      </div>
    </div>
  );
}

function OwnerCart({
  usedIds,
  wastage,
  approved,
  onApprove,
}: {
  usedIds: string[];
  wastage: Record<string, "finished" | "thrown" | undefined>;
  approved: boolean;
  onApprove: () => void;
}) {
  const reorder = ITEMS.filter((i) => usedIds.includes(i.id) || wastage[i.id] === "thrown");
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="px-4 pt-3">
        <p className="text-sm font-bold text-black">Auto-cart suggestion</p>
        <p className="text-xs text-black/50">Generated from what you used or threw out</p>
      </div>
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto px-4">
        {reorder.map((i) => (
          <div key={i.id} className="cook-card flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{i.emoji}</span>
              <p className="text-xs font-bold text-black">{i.name}</p>
            </div>
            <span className="text-[10px] font-bold text-black/50">{i.qty}</span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-6">
        {!approved ? (
          <div className="flex gap-2">
            <button className="cook-chip flex-1 py-3 text-xs">Edit</button>
            <button onClick={onApprove} className="cook-cta flex-1 py-3 text-sm">Approve Cart</button>
          </div>
        ) : (
          <p className="text-center text-xs font-bold text-[#3a7d33]">✓ Cart approved — reorder placed. Cycle repeats on delivery.</p>
        )}
      </div>
    </div>
  );
}

// ---------- Friend screens ----------

function FriendHome({ votingOpen }: { votingOpen: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      {votingOpen ? (
        <p className="text-xs text-black/40">Open the notification below to vote 👇</p>
      ) : (
        <p className="text-xs text-black/30">No new notifications</p>
      )}
    </div>
  );
}

function FriendResult({ decided, sent }: { decided: string | null; sent: boolean }) {
  const dish = decided ? DISHES.find((d) => d.id === decided) : null;
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      {dish ? (
        <>
          <span className="text-3xl">{dish.emoji}</span>
          <p className="mt-2 text-sm font-bold text-black">Decided: {dish.name} 🎉</p>
          {sent && <p className="mt-2 text-xs text-[#3a7d33]">✓ Cook has been notified</p>}
          {!sent && <p className="mt-2 text-xs text-black/40">Waiting for it to be sent to the cook…</p>}
        </>
      ) : (
        <p className="text-xs text-black/40">You voted — waiting for the group decision…</p>
      )}
    </div>
  );
}

// ---------- Cook screen ----------

function CookScreen({ sent, dish, cooked, onMarkCooked }: { sent: boolean; dish: Dish | null; cooked: boolean; onMarkCooked: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#e5ddd0]">
      <div className="bg-[#128c7e] px-4 py-4">
        <p className="text-sm font-bold text-white">Ridhima (via cookAuto)</p>
        <p className="text-[10px] text-white/70">online</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {!sent && <p className="text-center text-xs text-black/30">No messages yet</p>}
        {sent && dish && (
          <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white p-3 shadow">
            <p className="text-xs leading-5 text-black">
              Please make <span className="font-bold">{dish.name} {dish.emoji}</span> today. Everyone voted for it! 🙌
            </p>
            <p className="mt-1 text-right text-[10px] text-black/30">9:41 AM</p>
          </div>
        )}
        {cooked && (
          <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#dcf8c6] p-3 shadow">
            <p className="text-xs leading-5 text-black">Done! {dish?.name} is ready ✅</p>
            <p className="mt-1 text-right text-[10px] text-black/30">9:52 AM ✓✓</p>
          </div>
        )}
      </div>
      {sent && !cooked && (
        <div className="p-4">
          <button onClick={onMarkCooked} className="cook-cta w-full py-3 text-sm">Mark as Cooked</button>
        </div>
      )}
    </div>
  );
}

// ---------- Orchestrator ----------

export default function DemoView() {
  const [ownerScreen, setOwnerScreen] = useState<OwnerScreen>("home");
  const [friendScreen, setFriendScreen] = useState<"home" | "vote" | "result">("home");

  const [votingOpen, setVotingOpen] = useState(false);
  const [ownerVote, setOwnerVote] = useState<string | null>(null);
  const [friendVote, setFriendVote] = useState<string | null>(null);
  const [sentToCook, setSentToCook] = useState(false);
  const [cooked, setCooked] = useState(false);
  const [wastage, setWastage] = useState<Record<string, "finished" | "thrown" | undefined>>({});
  const [cartApproved, setCartApproved] = useState(false);

  const decidedDish = ownerVote && friendVote && ownerVote === friendVote ? ownerVote : null;
  const dish = decidedDish ? DISHES.find((d) => d.id === decidedDish)! : null;
  const usedIds = dish ? dish.uses : [];

  function reset() {
    setOwnerScreen("home");
    setFriendScreen("home");
    setVotingOpen(false);
    setOwnerVote(null);
    setFriendVote(null);
    setSentToCook(false);
    setCooked(false);
    setWastage({});
    setCartApproved(false);
  }

  return (
    <div>
      <div className="cook-card flex flex-wrap items-center justify-between gap-3 p-5 text-left">
        <p className="text-sm leading-6 text-black/65">
          Start on <span className="font-bold text-black">Ridhima&apos;s phone</span> (owner), open voting, switch to{" "}
          <span className="font-bold text-black">the friend&apos;s phone</span> to vote, then watch it land on{" "}
          <span className="font-bold text-black">the cook&apos;s WhatsApp</span> and sync back.
        </p>
        <button onClick={reset} className="cook-chip shrink-0 px-4 py-2 text-xs">Restart demo</button>
      </div>

      <div className="mt-10 grid justify-items-center gap-12 lg:grid-cols-3">
        <PhoneFrame label="Ridhima's phone (owner)">
          {ownerScreen === "home" && (
            <OwnerHome
              votingOpen={votingOpen}
              onOpenVoting={() => {
                setVotingOpen(true);
                setOwnerScreen("vote");
              }}
            />
          )}
          {ownerScreen === "vote" && (
            <VoteScreen
              who="you"
              myVote={ownerVote}
              onVote={(id) => {
                setOwnerVote(id);
                setOwnerScreen("confirm");
              }}
              onBack={() => setOwnerScreen("home")}
            />
          )}
          {ownerScreen === "confirm" && ownerVote && (
            <OwnerConfirm
              ownerVote={ownerVote}
              friendVote={friendVote}
              onBack={() => setOwnerScreen("vote")}
              onSend={() => {
                setSentToCook(true);
                setOwnerScreen("sent");
              }}
            />
          )}
          {ownerScreen === "sent" && dish && (
            <OwnerSent dish={dish} cooked={cooked} onGoPostCook={() => setOwnerScreen("postcook")} />
          )}
          {ownerScreen === "postcook" && (
            <OwnerPostCook usedIds={usedIds} onGoWastage={() => setOwnerScreen("wastage")} />
          )}
          {ownerScreen === "wastage" && (
            <OwnerWastage
              usedIds={usedIds}
              wastage={wastage}
              onMark={(id, action) => setWastage((w) => ({ ...w, [id]: action }))}
              onGoCart={() => setOwnerScreen("cart")}
            />
          )}
          {ownerScreen === "cart" && (
            <OwnerCart usedIds={usedIds} wastage={wastage} approved={cartApproved} onApprove={() => setCartApproved(true)} />
          )}
        </PhoneFrame>

        <PhoneFrame label="Friend's phone">
          {friendScreen === "home" && (
            votingOpen && !friendVote ? (
              <button onClick={() => setFriendScreen("vote")} className="flex h-full w-full flex-col justify-center px-6 text-left">
                <div className="cook-card p-4">
                  <p className="text-xs font-bold text-black">🔔 Voting is open</p>
                  <p className="mt-1 text-[10px] text-black/50">Tap to vote on what to cook</p>
                </div>
              </button>
            ) : (
              <FriendHome votingOpen={votingOpen} />
            )
          )}
          {friendScreen === "vote" && (
            <VoteScreen
              who="friend"
              myVote={friendVote}
              onVote={(id) => {
                setFriendVote(id);
                setFriendScreen("result");
              }}
            />
          )}
          {friendScreen === "result" && <FriendResult decided={decidedDish} sent={sentToCook} />}
        </PhoneFrame>

        <PhoneFrame label="Cook's phone (WhatsApp)">
          <CookScreen sent={sentToCook} dish={dish} cooked={cooked} onMarkCooked={() => setCooked(true)} />
        </PhoneFrame>
      </div>
    </div>
  );
}
