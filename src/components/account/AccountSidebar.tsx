import { User, Package, Heart, Settings, CreditCard, MapPin, Bell, Star, HelpCircle, LogOut, ChevronRight, Flower2, Tag, BarChart3, X } from "lucide-react";

export type AccountSection =
  | "dashboard"
  | "orders"
  | "wishlist"
  | "profile"
  | "contact"
  | "addresses"
  | "security"
  | "payments"
  | "subscriptions"
  | "coupons"
  | "reviews"
  | "notifications"
  | "rewards"
  | "support"
  | "settings";

interface SidebarProps {
  active: AccountSection;
  onSelect: (s: AccountSection) => void;
  user: { firstName?: string; lastName?: string; email?: string; avatar?: string } | null;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const navGroups = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", icon: BarChart3, label: "Dashboard" },
      { id: "orders", icon: Package, label: "My Orders" },
      { id: "wishlist", icon: Heart, label: "Wishlist" },
    ],
  },
  {
    label: "Account",
    items: [
      { id: "profile", icon: User, label: "Personal Info" },
      { id: "contact", icon: Bell, label: "Contact Details" },
      { id: "addresses", icon: MapPin, label: "Address Book" },
      { id: "security", icon: Settings, label: "Password & Security" },
    ],
  },
  {
    label: "Payments & Offers",
    items: [
      { id: "payments", icon: CreditCard, label: "Payments" },
      { id: "coupons", icon: Tag, label: "Coupons & Offers" },
      { id: "rewards", icon: Star, label: "Reward Points" },
    ],
  },
  {
    label: "Activity",
    items: [
      { id: "subscriptions", icon: Flower2, label: "Flower Subscriptions" },
      { id: "reviews", icon: Star, label: "Reviews & Ratings" },
      { id: "notifications", icon: Bell, label: "Notifications" },
    ],
  },
  {
    label: "More",
    items: [
      { id: "support", icon: HelpCircle, label: "Support Center" },
      { id: "settings", icon: Settings, label: "Settings" },
    ],
  },
];

export function AccountSidebar({ active, onSelect, user, onLogout, isOpen = true, onClose }: SidebarProps) {
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Guest User";
  const initial = fullName.charAt(0).toUpperCase();

  const content = (
    <div className="flex h-full flex-col overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header / Profile Card */}
      <div
        className="relative flex flex-col items-center px-6 py-8 text-center"
        style={{ background: "linear-gradient(135deg, #4F5535 0%, #666851 100%)" }}
      >
        {onClose && (
          <button onClick={onClose} className="absolute right-3 top-3 rounded-full p-1 text-white/70 hover:text-white lg:hidden">
            <X size={18} />
          </button>
        )}
        {/* Avatar */}
        <div className="relative mb-3">
          {user?.avatar ? (
            <img src={user.avatar} alt={fullName} className="h-18 w-18 rounded-full border-4 border-white/30 object-cover shadow-lg" style={{ width: 72, height: 72 }} />
          ) : (
            <div
              className="flex items-center justify-center rounded-full border-4 font-black text-2xl text-white shadow-lg"
              style={{ width: 72, height: 72, backgroundColor: "#B68F38", borderColor: "rgba(255,255,255,0.3)" }}
            >
              {initial}
            </div>
          )}
          <span className="absolute -bottom-1 -right-1 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: "#B68F38", color: "#fff" }}>
            GOLD
          </span>
        </div>
        <h2 className="text-sm font-bold text-white">{fullName}</h2>
        <p className="mt-0.5 text-[11px] text-white/70 truncate max-w-full">{user?.email || ""}</p>
        <button
          onClick={() => onSelect("profile")}
          className="mt-3 rounded-full px-3 py-1 text-[11px] font-semibold transition hover:opacity-80"
          style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
        >
          ✏️ Edit Profile
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5" style={{ scrollbarWidth: "thin" }}>
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#9F905E" }}>
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ id, icon: Icon, label }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => { onSelect(id as AccountSection); onClose?.(); }}
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all"
                      style={{
                        backgroundColor: isActive ? "#F0EFE6" : "transparent",
                        color: isActive ? "#4F5535" : "#444",
                      }}
                    >
                      <Icon
                        size={16}
                        style={{ color: isActive ? "#B68F38" : "#666851" }}
                        className="shrink-0 transition-colors group-hover:text-[#B68F38]"
                      />
                      <span className={isActive ? "font-bold" : ""}>{label}</span>
                      {isActive && <ChevronRight size={14} className="ml-auto" style={{ color: "#B68F38" }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t px-4 py-4" style={{ borderColor: "#F0EFE6" }}>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex lg:flex-col rounded-2xl overflow-hidden shadow-sm flex-shrink-0"
        style={{ width: 280, height: "fit-content", position: "sticky", top: 84, border: "1px solid #E2DCBE" }}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <aside
            className="relative flex flex-col overflow-hidden shadow-2xl"
            style={{ width: 300, backgroundColor: "#FFFFFF" }}
          >
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
