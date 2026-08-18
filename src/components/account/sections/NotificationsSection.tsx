import { Bell, ShoppingBag, Truck, Tag, Check } from "lucide-react";
import { useState } from "react";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface Props { notifications: Notification[]; }

const typeConfig: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
  offer: { icon: Tag, color: "#B68F38", bg: "#FFF8E8" },
  order: { icon: ShoppingBag, color: "#4F5535", bg: "#F0F5EC" },
  delivery: { icon: Truck, color: "#0284c7", bg: "#EFF9FF" },
};

export function NotificationsSection({ notifications: initNotifs }: Props) {
  const [notifs, setNotifs] = useState(initNotifs);
  const [prefs, setPrefs] = useState({ offers: true, orders: true, delivery: true, sms: false, whatsapp: true });

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const unread = notifs.filter(n => !n.read).length;

  return (
    <div className="space-y-5">
      {/* Notification Feed */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Notifications</h2>
            {unread > 0 && (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: "#B68F38", color: "#fff" }}>{unread}</span>
            )}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: "#B68F38" }}>
              <Check size={12} /> Mark all read
            </button>
          )}
        </div>

        {notifs.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <Bell size={36} style={{ color: "#B68F38", opacity: 0.3 }} />
            <p className="mt-3 text-sm" style={{ color: "#9F905E" }}>No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "#F0EFE6" }}>
            {notifs.map(n => {
              const cfg = typeConfig[n.type] || typeConfig["offer"];
              const Icon = cfg.icon;
              return (
                <div key={n._id} className={`flex gap-3 px-5 py-4 transition hover:bg-[#FDFBF4] ${!n.read ? "border-l-4" : ""}`} style={{ borderLeftColor: !n.read ? "#B68F38" : "transparent" }}>
                  <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center" style={{ backgroundColor: cfg.bg }}>
                    <Icon size={16} style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold" style={{ color: "#333" }}>{n.title}</p>
                      {!n.read && <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: "#B68F38" }} />}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#666851" }}>{n.message}</p>
                    <p className="text-[11px] mt-1" style={{ color: "#aaa" }}>{new Date(n.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="rounded-2xl border bg-white shadow-sm p-6" style={{ borderColor: "#E2DCBE" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "#4F5535" }}>Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: "offers", label: "Latest Offers & Deals", desc: "Discounts, seasonal sales, flash sales" },
            { key: "orders", label: "Order Updates", desc: "Confirmation, dispatch, and delivery" },
            { key: "delivery", label: "Delivery Alerts", desc: "Real-time delivery notifications" },
            { key: "sms", label: "SMS Notifications", desc: "Receive alerts via SMS" },
            { key: "whatsapp", label: "WhatsApp Updates", desc: "Get updates on WhatsApp" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#F7F5EF" }}>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#333" }}>{label}</p>
                <p className="text-[11px]" style={{ color: "#9F905E" }}>{desc}</p>
              </div>
              <button
                onClick={() => setPrefs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${prefs[key as keyof typeof prefs] ? "bg-[#4F5535]" : "bg-gray-200"}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${prefs[key as keyof typeof prefs] ? "translate-x-5" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
