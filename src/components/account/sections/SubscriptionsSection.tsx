import { Flower2, Plus } from "lucide-react";

const subs = [
  { name: "Weekly Marigold Bouquet", frequency: "Every Monday", nextDelivery: "5 Aug 2026", price: 349, status: "Active", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60" },
  { name: "Monthly Rose Bundle", frequency: "1st of every month", nextDelivery: "1 Sep 2026", price: 899, status: "Paused", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=60" },
];

export function SubscriptionsSection() {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
        <div>
          <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Flower Subscriptions</h2>
          <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Auto-delivery flower plans</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: "#4F5535" }}>
          <Plus size={13} /> New Plan
        </button>
      </div>
      <div className="p-5 space-y-4">
        {subs.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <Flower2 size={36} style={{ color: "#B68F38", opacity: 0.3 }} />
            <p className="mt-3 text-sm" style={{ color: "#9F905E" }}>No subscriptions yet</p>
          </div>
        ) : subs.map((s, i) => (
          <div key={i} className="flex gap-4 rounded-2xl border p-4" style={{ borderColor: "#E2DCBE" }}>
            <img src={s.image} alt={s.name} className="w-14 h-14 rounded-xl object-cover border" style={{ borderColor: "#E2DCBE" }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <p className="text-sm font-bold" style={{ color: "#4F5535" }}>{s.name}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>{s.status}</span>
              </div>
              <p className="text-xs mt-1" style={{ color: "#666851" }}>🔁 {s.frequency}</p>
              <p className="text-xs" style={{ color: "#666851" }}>📅 Next: {s.nextDelivery}</p>
              <p className="text-sm font-bold mt-1" style={{ color: "#B68F38" }}>₹{s.price}/delivery</p>
              <div className="mt-2 flex gap-2">
                <button className="rounded-lg border px-3 py-1 text-[11px] font-medium hover:bg-gray-50" style={{ borderColor: "#E2DCBE", color: "#4F5535" }}>Edit</button>
                <button className="rounded-lg border px-3 py-1 text-[11px] font-medium" style={{ borderColor: "#E2DCBE", color: s.status === "Active" ? "#B68F38" : "#4F5535" }}>
                  {s.status === "Active" ? "Pause" : "Resume"}
                </button>
                <button className="rounded-lg border border-rose-200 px-3 py-1 text-[11px] font-medium text-rose-500">Cancel</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
