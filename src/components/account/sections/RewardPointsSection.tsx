import { Star, Gift, TrendingUp } from "lucide-react";

interface Props {
  rewards: { available: number; lifetime: number; level: string; nextLevel?: string; nextLevelPoints?: number };
}

const levelConfig: Record<string, { color: string; bg: string; icon: string; next: string; threshold: number }> = {
  Bronze: { color: "#cd7f32", bg: "#FFF8F0", icon: "🥉", next: "Silver", threshold: 1000 },
  Silver: { color: "#6b7280", bg: "#F5F5F5", icon: "🥈", next: "Gold", threshold: 3000 },
  Gold: { color: "#B68F38", bg: "#FFF8E8", icon: "🥇", next: "Platinum", threshold: 5000 },
  Platinum: { color: "#7c3aed", bg: "#F5F3FF", icon: "💎", next: "Platinum", threshold: 10000 },
};

export function RewardPointsSection({ rewards }: Props) {
  const level = levelConfig[rewards.level] || levelConfig["Gold"];
  const progress = Math.min((rewards.lifetime / (level.threshold || 5000)) * 100, 100);

  return (
    <div className="space-y-4">
      {/* Main Card */}
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #4F5535 0%, #666851 50%, #B68F38 100%)" }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 bg-white" />
        <div className="absolute -right-4 -bottom-6 w-20 h-20 rounded-full opacity-10 bg-white" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-white/70 mb-1">Available Points</p>
              <p className="text-4xl font-black">{rewards.available.toLocaleString()}</p>
              <p className="text-xs mt-1 text-white/70">≈ ₹{(rewards.available * 0.25).toFixed(0)} cashback value</p>
            </div>
            <div className="text-right">
              <span className="inline-block text-3xl mb-1">{level.icon}</span>
              <p className="text-xs font-bold" style={{ color: "#F5D78E" }}>{rewards.level} Member</p>
            </div>
          </div>

          {/* Progress to next level */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-white/70">{rewards.lifetime.toLocaleString()} pts earned lifetime</span>
              <span className="text-xs font-semibold" style={{ color: "#F5D78E" }}>{level.next !== rewards.level ? `→ ${level.next}` : "Top Tier! 🎉"}</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: "#F5D78E" }} />
            </div>
            {level.next !== rewards.level && (
              <p className="mt-1.5 text-[11px] text-white/60">{Math.max(0, level.threshold - rewards.lifetime).toLocaleString()} more points to reach {level.next}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Lifetime Earned", value: rewards.lifetime.toLocaleString(), icon: TrendingUp, color: "#4F5535" },
          { label: "Redeemable", value: "₹" + (rewards.available * 0.25).toFixed(0), icon: Gift, color: "#B68F38" },
          { label: "Membership", value: rewards.level, icon: Star, color: "#B68F38" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border bg-white p-4 text-center shadow-sm" style={{ borderColor: "#E2DCBE" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: color + "18" }}>
              <Icon size={18} style={{ color }} />
            </div>
            <p className="text-base font-black" style={{ color }}>{value}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "#9F905E" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Points History */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
          <h3 className="text-sm font-bold" style={{ color: "#4F5535" }}>Points History</h3>
        </div>
        <div className="divide-y" style={{ borderColor: "#F0EFE6" }}>
          {[
            { action: "Order Delivered", points: "+50", desc: "Yellow Marigold Bunch", date: "Today", positive: true },
            { action: "Redeemed", points: "-100", desc: "Order #PG-20240001", date: "Yesterday", positive: false },
            { action: "Welcome Bonus", points: "+200", desc: "Account creation bonus", date: "2 days ago", positive: true },
            { action: "Review Submitted", points: "+20", desc: "Pink Chrysanthemums review", date: "3 days ago", positive: true },
          ].map((h, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-xs font-semibold" style={{ color: "#333" }}>{h.action}</p>
                <p className="text-[11px]" style={{ color: "#9F905E" }}>{h.desc} · {h.date}</p>
              </div>
              <span className="text-sm font-black" style={{ color: h.positive ? "#4F5535" : "#ef4444" }}>{h.points} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Redeem Banner */}
      <div className="rounded-2xl border p-4 flex items-center justify-between" style={{ backgroundColor: "#FFF8E8", borderColor: "#B68F38" + "40" }}>
        <div>
          <p className="text-sm font-bold" style={{ color: "#B68F38" }}>Redeem {rewards.available} points on your next order!</p>
          <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Use points at checkout to save money</p>
        </div>
        <a href="/shop" className="rounded-full px-3 py-1.5 text-xs font-bold text-white shrink-0 ml-3" style={{ backgroundColor: "#B68F38" }}>Shop Now 🛒</a>
      </div>
    </div>
  );
}
