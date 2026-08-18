import { HelpCircle, MessageCircle, Phone, Mail, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How do I cancel an order?", a: "You can cancel your order within 2 hours of placing it from My Orders → Cancel Order. After 2 hours, please contact support." },
  { q: "When will my flowers be delivered?", a: "Same-day delivery is available for orders placed before 2 PM. Standard delivery is within 24–48 hours." },
  { q: "How do I get a refund?", a: "Refunds are processed within 5-7 business days. Raise a return request from My Orders and our team will initiate the refund." },
  { q: "Can I change my delivery address?", a: "You can change the delivery address within 1 hour of placing the order by contacting our support team." },
];

export function SupportSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MessageCircle, label: "Live Chat", sub: "Chat with us now", color: "#4F5535", action: "Start Chat" },
          { icon: Phone, label: "Call Support", sub: "+91 1800-XXX-XXXX", color: "#B68F38", action: "Call Now" },
          { icon: Mail, label: "Email Us", sub: "pushpangan001@gmail.com", color: "#666851", action: "Send Email" },
        ].map(({ icon: Icon, label, sub, color, action }) => (
          <div key={label} className="flex flex-col items-center rounded-2xl border bg-white p-5 text-center shadow-sm hover:shadow-md transition" style={{ borderColor: "#E2DCBE" }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: color + "18" }}>
              <Icon size={22} style={{ color }} />
            </div>
            <p className="text-sm font-bold" style={{ color: "#333" }}>{label}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "#9F905E" }}>{sub}</p>
            {label === "Email Us" ? (
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=pushpangan001@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 rounded-full px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90 text-center block"
                style={{ backgroundColor: color }}
              >
                {action}
              </a>
            ) : (
              <button className="mt-3 rounded-full px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90" style={{ backgroundColor: color }}>{action}</button>
            )}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
          <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Frequently Asked Questions</h2>
        </div>
        <div className="divide-y" style={{ borderColor: "#F0EFE6" }}>
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-[#FDFBF4]"
              >
                <span className="text-sm font-semibold" style={{ color: "#333" }}>{faq.q}</span>
                <ChevronDown size={16} className={`transition-transform shrink-0 ml-2 ${openFaq === i ? "rotate-180" : ""}`} style={{ color: "#9F905E" }} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm leading-relaxed" style={{ color: "#666851" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
