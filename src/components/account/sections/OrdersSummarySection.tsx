import { Package, CheckCircle, XCircle, Clock, Heart, Star } from "lucide-react";

interface Props {
  summary: { total: number; pending: number; delivered: number; cancelled: number };
  wishlistCount?: number;
  rewards?: { available: number; level: string };
  onNav: (s: string) => void;
}

const stats = (summary: Props["summary"], wishlistCount: number, rewards: Props["rewards"]) => [
  { label: "Pending Orders", value: summary.pending, icon: Clock, color: "#B68F38", bg: "#FFF8E8", section: "orders" },
  { label: "Delivered", value: summary.delivered, icon: CheckCircle, color: "#4F5535", bg: "#F0F5EC", section: "orders" },
  { label: "Cancelled", value: summary.cancelled, icon: XCircle, color: "#ef4444", bg: "#FFF1F1", section: "orders" },
  { label: "Wishlist Items", value: wishlistCount, icon: Heart, color: "#f43f5e", bg: "#FFF1F3", section: "wishlist" },
  { label: "Reward Points", value: rewards?.available || 0, icon: Star, color: "#B68F38", bg: "#FFF8E8", section: "rewards" },
];

export function OrdersSummarySection({ summary, wishlistCount = 0, rewards, onNav }: Props) {
  const cards = stats(summary, wishlistCount, rewards);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Account Overview</h2>
        <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>A quick glance at your activity</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {cards.map(({ label, value, icon: Icon, color, bg, section }) => (
          <button
            key={label}
            onClick={() => onNav(section)}
            className="group flex flex-col items-center rounded-2xl border p-4 text-center transition hover:shadow-md hover:-translate-y-0.5"
            style={{ backgroundColor: bg, borderColor: color + "30" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition group-hover:scale-110" style={{ backgroundColor: color + "18" }}>
              <Icon size={20} style={{ color }} />
            </div>
            <span className="text-2xl font-black" style={{ color }}>{value}</span>
            <span className="mt-1 text-[11px] font-medium" style={{ color: "#666851" }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Total Orders Banner */}
      <div
        className="mt-4 flex items-center justify-between rounded-2xl px-5 py-4"
        style={{ background: "linear-gradient(135deg, #4F5535 0%, #666851 100%)" }}
      >
        <div className="flex items-center gap-3">
          <Package size={24} style={{ color: "#B68F38" }} />
          <div>
            <p className="text-sm font-bold text-white">{summary.total} Total Orders</p>
            <p className="text-xs text-white/70">All time orders placed on Pushpangan</p>
          </div>
        </div>
        <button
          onClick={() => onNav("orders")}
          className="rounded-full px-4 py-1.5 text-xs font-bold transition hover:opacity-90"
          style={{ backgroundColor: "#B68F38", color: "#fff" }}
        >
          View All
        </button>
      </div>
    </div>
  );
}
