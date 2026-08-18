import { Link } from "@tanstack/react-router";
import { HorizontalLogo } from "@/components/site/Logo";
import { useCart } from "@/lib/CartContext";
import { useEffect, useState, useRef } from "react";

export function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; loggedIn: boolean } | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Load user from localStorage
    const loadUser = () => {
      try {
        const saved = localStorage.getItem("siteUser");
        if (saved) setUser(JSON.parse(saved));
        else setUser(null);
      } catch { setUser(null); }
    };
    loadUser();

    // Listen for login/logout events from other tabs or navigation
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("siteUser");
    setUser(null);
    setShowProfileMenu(false);
    window.location.href = "/";
  };

  const getInitial = (name: string) =>
    name ? name.trim().charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <HorizontalLogo />

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-semibold text-foreground/80 hover:text-primary transition">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-semibold text-primary hover:text-accent transition">
            Shop Flowers 🌺
          </Link>
          <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition">
            About Us
          </a>
          <a href="#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Cart Basket Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-foreground shadow-sm hover:border-primary hover:shadow-md transition"
            aria-label="Open Cart"
            id="header-cart-btn"
          >
            <span className="text-base">🛒</span>
            <span className="hidden sm:inline">Basket</span>
            {isMounted && totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground shadow animate-pulse">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Profile or Login Button */}
          {isMounted && user?.loggedIn ? (
            <div ref={menuRef} className="relative">
              {/* User Initial Avatar Circle */}
              <button
                type="button"
                onClick={() => setShowProfileMenu((v) => !v)}
                style={{ backgroundColor: "#B68F38", color: "#FFFFFF", borderColor: "#4F5535" }}
                className="w-9 h-9 rounded-full border-2 flex items-center justify-center font-black text-sm uppercase shadow-md transition hover:opacity-90 cursor-pointer"
                aria-label="User profile menu"
                title={user.name}
              >
                {getInitial(user.name)}
              </button>

              {/* Dropdown Profile Menu */}
              {showProfileMenu && (
                <div
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border shadow-xl z-50 overflow-hidden"
                >
                  {/* User Info Header */}
                  <div style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE" }} className="px-4 py-3 border-b">
                    <div
                      style={{ backgroundColor: "#B68F38", color: "#FFFFFF" }}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base uppercase shadow mb-2"
                    >
                      {getInitial(user.name)}
                    </div>
                    <p style={{ color: "#4F5535" }} className="text-xs font-extrabold truncate">{user.name}</p>
                    <p style={{ color: "#666851" }} className="text-[11px] truncate">{user.email}</p>
                  </div>

                  {/* Menu Links */}
                  <div className="py-2">
                    {user?.email === "admin@pushpangan.com" && (
                      <a
                        href="/admin"
                        style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold hover:brightness-110 transition mx-2 my-1 rounded-xl shadow-sm"
                      >
                        👑 Admin Dashboard
                      </a>
                    )}
                    <a
                      href="/account"
                      style={{ color: "#4F5535" }}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-[#F5F3E9] transition"
                    >
                      👤 My Account
                    </a>
                    <a
                      href="/account"
                      style={{ color: "#4F5535" }}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-[#F5F3E9] transition"
                    >
                      📦 My Orders
                    </a>
                    <a
                      href="/account"
                      style={{ color: "#4F5535" }}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-[#F5F3E9] transition"
                    >
                      ❤️ Wishlist
                    </a>
                    <a
                      href="/account"
                      style={{ color: "#4F5535" }}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-[#F5F3E9] transition"
                    >
                      ⚙️ Account Settings
                    </a>
                    <div style={{ borderColor: "#E2DCBE" }} className="border-t my-1.5"></div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-sm transition hover:brightness-110"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}