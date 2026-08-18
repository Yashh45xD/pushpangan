import { CreditCard, Plus, Trash2, Smartphone, Wallet, Gift } from "lucide-react";
import { useState } from "react";

const mockCards = [
  { _id: "c1", type: "Visa", last4: "4242", expiry: "09/28", name: "Vaishali Sharma", isDefault: true },
  { _id: "c2", type: "Mastercard", last4: "8765", expiry: "12/27", name: "Vaishali Sharma", isDefault: false },
];

const mockUpi = [
  { _id: "u1", id: "vaishali@upi", isDefault: true },
  { _id: "u2", id: "vaishali@paytm", isDefault: false },
];

export function PaymentsSection() {
  const [cards] = useState(mockCards);
  const [upis] = useState(mockUpi);

  const cardBg: Record<string, string> = { Visa: "#1a1f71", Mastercard: "#eb001b", RuPay: "#004e8c" };

  return (
    <div className="space-y-5">
      {/* Saved Cards */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
          <div>
            <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Saved Cards</h2>
            <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Manage your payment methods</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: "#4F5535" }}>
            <Plus size={13} /> Add Card
          </button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map(card => (
            <div key={card._id} className="relative rounded-2xl p-5 text-white shadow-md overflow-hidden" style={{ background: `linear-gradient(135deg, ${cardBg[card.type] || "#333"}, #333)` }}>
              <div className="absolute right-4 top-4 opacity-20 text-5xl font-black">{card.type}</div>
              <CreditCard size={28} className="mb-3 opacity-60" />
              <p className="text-lg font-mono tracking-wider">•••• •••• •••• {card.last4}</p>
              <div className="mt-3 flex justify-between text-xs">
                <span className="opacity-70">{card.name}</span>
                <span className="opacity-70">{card.expiry}</span>
              </div>
              {card.isDefault && (
                <span className="absolute left-4 top-4 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">Default</span>
              )}
              <button className="absolute bottom-3 right-3 opacity-50 hover:opacity-100 transition"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet & Gift Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border bg-white shadow-sm p-5 text-center" style={{ borderColor: "#E2DCBE" }}>
          <Wallet size={28} className="mx-auto mb-2" style={{ color: "#4F5535" }} />
          <p className="text-sm font-bold" style={{ color: "#4F5535" }}>Pushpangan Wallet</p>
          <p className="text-2xl font-black mt-1" style={{ color: "#B68F38" }}>₹0.00</p>
          <button className="mt-3 rounded-full px-4 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: "#4F5535" }}>Add Money</button>
        </div>
        <div className="rounded-2xl border bg-white shadow-sm p-5 text-center" style={{ borderColor: "#E2DCBE" }}>
          <Gift size={28} className="mx-auto mb-2" style={{ color: "#B68F38" }} />
          <p className="text-sm font-bold" style={{ color: "#4F5535" }}>Gift Cards</p>
          <p className="text-2xl font-black mt-1" style={{ color: "#B68F38" }}>0</p>
          <button className="mt-3 rounded-full px-4 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: "#B68F38" }}>Add Gift Card</button>
        </div>
      </div>
    </div>
  );
}
