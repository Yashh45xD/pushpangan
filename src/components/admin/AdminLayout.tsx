import React, { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShoppingBag,
  Flower2,
  FolderTree,
  Users,
  Store,
  Sparkles,
  Layers,
  CreditCard,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";

interface AdminLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

/*
 * Pushpangan Brand Colors:
 * Main Background: Warm Beige / Ivory (#F5F3E9)
 * Sidebar/Header Cards: Off-White (#FFFFFF)
 * Accents: Beige/Khaki (#E2DCBE / #9F905E)
 * Primary Olive/Beige Highlight: #4F5535 & #B68F38
 */

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  children,
}) => {
  const { admin, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // Grouped Navigation Items
  const sidebarGroups = [
    {
      group: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      ],
    },
    {
      group: "Management",
      items: [
        { id: "sellers", label: "Sellers / Florists", icon: Store },
        { id: "customers", label: "Users", icon: Users },
        { id: "flowers", label: "Products (Flowers/Bouquets)", icon: Flower2 },
        { id: "orders", label: "Orders", icon: ShoppingBag, badge: "Live" },
      ],
    },
    {
      group: "Discover & Services",
      items: [
        { id: "categories", label: "Categories", icon: FolderTree },
        { id: "services", label: "Services", icon: Layers },
      ],
    },
    {
      group: "Finance",
      items: [
        { id: "payments", label: "Finance & Payments", icon: CreditCard },
      ],
    },
  ];

  return (
    <div
      style={{ backgroundColor: "#F5F3E9", color: "#4F5535" }}
      className="min-h-screen flex flex-col font-sans"
    >
      {/* Top Navigation Bar */}
      <header
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
        className="h-16 px-4 lg:px-8 flex items-center justify-between border-b sticky top-0 z-40 shadow-sm"
      >
        {/* Left Logo & Brand Name */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-[#4F5535] hover:bg-[#F5F3E9]"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              style={{ backgroundColor: "#B68F38" }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm transition group-hover:scale-105"
            >
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span style={{ color: "#4F5535" }} className="font-extrabold text-base tracking-tight">
                Pushpangan <span style={{ color: "#B68F38" }} className="font-normal text-xs">– Fresh Flowers</span>
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 ml-4 text-xs font-extrabold text-[#4F5535]">
            <Link to="/shop" className="hover:text-[#B68F38] transition">Shop</Link>
            <Link to="/shop" className="hover:text-[#B68F38] transition">Sell</Link>
            <Link to="/shop" className="hover:text-[#B68F38] transition">Discover</Link>
          </nav>
        </div>

        {/* Center / Right Section (Search & Cart) */}
        <div className="flex items-center gap-4">
          {/* Top Bar Search */}
          <div className="relative hidden sm:block w-48 lg:w-72">
            <Search style={{ color: "#9F905E" }} className="absolute left-3 top-2.5 w-3.5 h-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog, orders..."
              style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
              className="w-full text-xs rounded-xl py-2 pl-8 pr-3 outline-none border focus:border-[#B68F38] font-medium"
            />
          </div>

          {/* View Cart Button */}
          <Link
            to="/basket"
            style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-sm hover:opacity-90 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">View Cart</span>
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
              className="p-2 rounded-xl border transition hover:bg-[#E2DCBE]/40"
            >
              <Bell className="w-4 h-4" />
            </button>

            {showNotifications && (
              <div
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE", color: "#4F5535" }}
                className="absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl p-4 border z-50"
              >
                <div style={{ borderColor: "#E2DCBE" }} className="flex items-center justify-between pb-2 border-b mb-2">
                  <h4 style={{ color: "#B68F38" }} className="text-xs font-extrabold uppercase">Notifications</h4>
                  <span className="text-[10px] bg-[#B68F38] text-white px-2 py-0.5 rounded-full font-bold">Live</span>
                </div>
                <p className="text-xs opacity-75">No new notifications.</p>
              </div>
            )}
          </div>

          {/* Admin Avatar */}
          <div
            style={{ backgroundColor: "#B68F38", color: "#FFFFFF" }}
            className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs uppercase shadow-sm cursor-default"
            title={admin?.name || "Admin"}
          >
            {admin?.name ? admin.name.trim().charAt(0).toUpperCase() : "A"}
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Main Content */}
      <div className="flex-1 flex min-w-0">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Sidebar Navigation */}
        <aside
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
          className="fixed lg:static top-16 bottom-0 left-0 z-40 w-64 border-r flex flex-col transition-transform duration-300 shadow-sm"
        >
          {/* Grouped Links */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {sidebarGroups.map((grp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div style={{ color: "#9F905E" }} className="text-[10px] font-extrabold uppercase tracking-wider px-2">
                  {grp.group}
                </div>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  // Handle mapping tabs
                  let targetTab = item.id;
                  if (item.id === "sellers") targetTab = "customers";
                  if (item.id === "services") targetTab = "delivery";
                  const isActive = activeTab === targetTab;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(targetTab);
                        setSidebarOpen(false);
                      }}
                      style={{
                        backgroundColor: isActive ? "#F5F3E9" : "transparent",
                        color: isActive ? "#4F5535" : "#666851",
                        borderColor: isActive ? "#E2DCBE" : "transparent",
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                        isActive ? "font-extrabold shadow-xs" : "hover:bg-[#F5F3E9]/60 hover:text-[#4F5535]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon style={{ color: isActive ? "#B68F38" : "#9F905E" }} className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span style={{ backgroundColor: "#B68F38" }} className="px-2 py-0.5 rounded-full text-[9px] text-white font-black">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Logout Section at Sidebar Bottom */}
          <div style={{ borderColor: "#E2DCBE" }} className="p-4 border-t">
            <button
              onClick={logout}
              style={{ backgroundColor: "#F5F3E9", color: "#4F5535", borderColor: "#E2DCBE" }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-extrabold hover:bg-[#E2DCBE]/40 transition"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Logout Session</span>
            </button>
          </div>
        </aside>

        {/* Page Content Render Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

