import React, { createContext, useContext, useState, useEffect } from "react";
import { adminService } from "../services/adminService";
import { clearAdminSession, getStoredAdminSession, type AdminUser } from "../lib/adminAuth";

interface AdminAuthContextType {
  admin: AdminUser | null;
  token: string | null;
  loading: boolean;
  theme: "light" | "dark";
  login: (credentials: { email?: string; password?: string; rememberMe?: boolean }) => Promise<any>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (allowedRoles: string[]) => boolean;
  toggleTheme: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("adminTheme") as "light" | "dark") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("adminTheme", theme);
  }, [theme]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await adminService.getMe();
        if (res.success && res.admin) {
          setAdmin(res.admin);
          setToken(getStoredAdminSession()?.token ?? null);
        } else {
          setAdmin(null);
          setToken(null);
          clearAdminSession();
        }
      } catch {
        setAdmin(null);
        setToken(null);
        clearAdminSession();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email?: string; password?: string; rememberMe?: boolean }) => {
    const res = await adminService.login(credentials);
    if (res.success && res.admin) {
      setAdmin(res.admin);
      setToken(res.token || getStoredAdminSession()?.token || null);
    }
    return res;
  };

  const logout = async () => {
    await adminService.logout();
    setAdmin(null);
    setToken(null);
  };

  const hasPermission = (permission: string): boolean => {
    if (!admin) return false;
    if (admin.role === "super_admin") return true;
    return admin.permissions?.includes(permission) || false;
  };

  const hasRole = (allowedRoles: string[]): boolean => {
    if (!admin) return false;
    if (admin.role === "super_admin") return true;
    return allowedRoles.includes(admin.role);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        loading,
        theme,
        login,
        logout,
        hasPermission,
        hasRole,
        toggleTheme,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
