import { Star } from "lucide-react";

interface Props {
  rewards: { available: number; lifetime: number; level: string; nextLevel?: string; nextLevelPoints?: number };
}

export function RewardPointsSection({ rewards }: Props) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
      <div className="px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
        <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Reward Points</h2>
      </div>
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 space-y-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#B68F3818" }}>
          <Star size={28} style={{ color: "#B68F38" }} />
        </div>
        <div>
          <p className="text-lg font-extrabold" style={{ color: "#4F5535" }}>Reward points coming soon</p>
          <p className="text-xs mt-1" style={{ color: "#9F905E" }}>Earn points on every order and redeem them for exciting rewards. Launching soon!</p>
        </div>
      </div>
    </div>
  );
}
