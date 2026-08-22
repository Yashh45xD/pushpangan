import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SITE } from "@/lib/site";
import { AccountSidebar, type AccountSection } from "@/components/account/AccountSidebar";
import { ProfileSection } from "@/components/account/sections/ProfileSection";
import { ContactSection } from "@/components/account/sections/ContactSection";
import { AddressSection } from "@/components/account/sections/AddressSection";
import { SecuritySection } from "@/components/account/sections/SecuritySection";
import { RecentOrdersSection } from "@/components/account/sections/RecentOrdersSection";
import { RewardPointsSection } from "@/components/account/sections/RewardPointsSection";
import { CouponsSection } from "@/components/account/sections/CouponsSection";
import { SupportSection } from "@/components/account/sections/SupportSection";
import { SettingsSection } from "@/components/account/sections/SettingsSection";

import { userService } from "@/services/userService";
import { Menu } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: `My Account — ${SITE.brand}` },
      { name: "description", content: `Manage your ${SITE.brand} account, orders, addresses, and preferences.` },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const [active, setActive] = useState<AccountSection>("orders");
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [summary, setSummary] = useState({ total: 0, pending: 0, delivered: 0, cancelled: 0 });
  const [addresses, setAddresses] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any>({ available: 0, lifetime: 0, level: "Bronze" });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check login
    const saved = localStorage.getItem("siteUser");
    if (!saved) {
      window.location.href = "/login";
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const [profileRes, ordersRes, rewardsRes, notifsRes] = await Promise.all([
          userService.getProfile(),
          userService.getOrders(),
          userService.getRewards(),
          userService.getNotifications(),
        ]);
        if (profileRes.success) {
          setUser(profileRes.user);
          setAddresses(profileRes.addresses || []);
          setSummary(profileRes.summary || { total: 0, pending: 0, delivered: 0, cancelled: 0 });
        }
        if (ordersRes.success) setOrders(ordersRes.orders || []);
        if (rewardsRes.success) setRewards(rewardsRes.rewards || { available: 0, lifetime: 0, level: "Bronze" });
        if (notifsRes.success) setNotifications(notifsRes.notifications || []);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("siteUser");
    window.location.href = "/";
  };

  const handleUserUpdate = (updated: Record<string, any>) => {
    setUser(prev => ({ ...prev, ...updated }));
  };

  const refreshAddresses = async () => {
    const res = await userService.getAddresses();
    if (res.success) setAddresses(res.addresses || []);
  };

  const sectionTitles: Record<AccountSection, string> = {
    orders: "My Orders",
    profile: "Personal Information",
    contact: "Contact Details",
    addresses: "Address Book",
    security: "Password & Security",
    coupons: "Coupons & Offers",
    rewards: "Reward Points",
    support: "Support Center",
    settings: "Settings",
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl border bg-white shadow-sm p-8 animate-pulse" style={{ borderColor: "#E2DCBE" }}>
              <div className="h-5 w-40 rounded bg-gray-200 mb-4" />
              <div className="space-y-3">
                <div className="h-3 w-full rounded bg-gray-100" />
                <div className="h-3 w-3/4 rounded bg-gray-100" />
                <div className="h-3 w-1/2 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    switch (active) {
      case "orders":
        return <RecentOrdersSection orders={orders} />;
      case "profile":
        return <ProfileSection user={user} onUpdate={handleUserUpdate} />;
      case "contact":
        return <ContactSection user={user} onUpdate={handleUserUpdate} />;
      case "addresses":
        return <AddressSection addresses={addresses} onRefresh={refreshAddresses} />;
      case "security":
        return <SecuritySection onLogout={handleLogout} />;

      case "coupons":
        return <CouponsSection />;
      case "rewards":
        return <RewardPointsSection rewards={rewards} />;
      case "support":
        return <SupportSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 flex-col" style={{ backgroundColor: "#F7F5EF" }}>
      {/* Mobile Top Bar */}
      <div className="sticky top-16 z-30 flex items-center gap-3 border-b px-4 py-3 lg:hidden" style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}>
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition hover:bg-gray-50"
          style={{ borderColor: "#E2DCBE", color: "#4F5535" }}
        >
          <Menu size={16} />
          Menu
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: "#9F905E" }}>Account</span>
          <span style={{ color: "#9F905E" }}>›</span>
          <span className="text-xs font-bold" style={{ color: "#4F5535" }}>{sectionTitles[active]}</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6 md:px-8 md:py-8">
        {/* Sidebar */}
        <AccountSidebar
          active={active}
          onSelect={setActive}
          user={user}
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb (desktop) */}
          <div className="hidden lg:flex items-center gap-2 mb-5">
            <a href="/" className="text-xs font-medium hover:underline" style={{ color: "#9F905E" }}>Home</a>
            <span style={{ color: "#9F905E" }}>›</span>
            <span className="text-xs font-medium" style={{ color: "#9F905E" }}>Account</span>
            <span style={{ color: "#9F905E" }}>›</span>
            <span className="text-xs font-bold" style={{ color: "#4F5535" }}>{sectionTitles[active]}</span>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
