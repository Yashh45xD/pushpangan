import { Tag, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

const coupons = [
  { code: "BLOOM15", discount: "15% OFF", desc: "On all Marigold orders above ₹300", expiry: "31 Aug 2026", type: "percent" },
  { code: "FRESH100", discount: "₹100 OFF", desc: "On orders above ₹500", expiry: "15 Aug 2026", type: "flat" },
  { code: "NEWUSER50", discount: "₹50 OFF", desc: "First order discount", expiry: "31 Dec 2026", type: "flat" },
  { code: "DIWALI20", discount: "20% OFF", desc: "Festival special offer", expiry: "20 Oct 2026", type: "percent" },
];

export function CouponsSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
      <div className="px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
        <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Coupons & Offers</h2>
        <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Your available discount coupons</p>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coupons.map(c => (
          <div
            key={c.code}
            className="relative rounded-2xl border-2 p-4 overflow-hidden"
            style={{ borderColor: "#B68F38" + "50", borderStyle: "dashed", backgroundColor: "#FFF8E8" }}
          >
            <div className="absolute right-3 top-3">
              <Tag size={16} style={{ color: "#B68F38", opacity: 0.5 }} />
            </div>
            <p className="text-xl font-black" style={{ color: "#B68F38" }}>{c.discount}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: "#666851" }}>{c.desc}</p>
            <div className="mt-3 flex items-center gap-2">
              <code className="rounded-lg border border-dashed px-3 py-1 text-xs font-bold tracking-wider" style={{ borderColor: "#B68F38", color: "#4F5535", backgroundColor: "#fff" }}>{c.code}</code>
              <button
                onClick={() => copy(c.code)}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition hover:opacity-90"
                style={{ backgroundColor: "#4F5535", color: "#fff" }}
              >
                {copied === c.code ? <CheckCircle size={11} /> : <Copy size={11} />}
                {copied === c.code ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-[11px]" style={{ color: "#9F905E" }}>Valid till: {c.expiry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
