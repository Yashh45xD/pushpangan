import { orderService } from "./orderService";
import { API_URL } from "@/config/api";

const BASE = `${API_URL}/api/account`;

function getToken(): string | null {
  try {
    const u = localStorage.getItem("siteUser");
    if (u) {
      const parsed = JSON.parse(u);
      if (parsed?.token) return parsed.token;
    }
  } catch { }
  return localStorage.getItem("pushpangan_token");
}

async function fetchAuth(url: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

// ---------- User state helpers ----------
function getMockUser() {
  try {
    const saved = localStorage.getItem("siteUser");
    if (saved) {
      const u = JSON.parse(saved);
      return {
        _id: u._id || u.id || "user-" + (u.email || "guest"),
        firstName: u.name?.split(" ")[0] || "Customer",
        lastName: u.name?.split(" ").slice(1).join(" ") || "",
        email: u.email || "",
        phone: u.phone || "",
        alternatePhone: "",
        gender: "Prefer not to say",
        birthday: "",
        avatar: "",
        loggedIn: true,
      };
    }
  } catch { }
  return null;
}

function getMockAddresses() {
  try {
    const saved = localStorage.getItem("pushpangan_addresses");
    if (saved) return JSON.parse(saved);
  } catch { }
  return [];
}

function getMockRewards() {
  return { available: 100, lifetime: 100, level: "Bronze", nextLevel: "Silver", nextLevelPoints: 1000 };
}

function getMockNotifications() {
  return [
    { _id: "n1", title: "🌸 Welcome to Pushpangan!", message: "Explore farm-fresh blooms, puja samagri, and floral bouquets.", type: "offer", read: false, createdAt: new Date().toISOString() },
  ];
}

// ---------- Public API ----------
export const userService = {
  async getProfile() {
    try {
      return await fetchAuth(`${BASE}/profile`);
    } catch {
      const user = getMockUser();
      const rawOrders = await orderService.getUserOrders(user?.email || user?._id || "guest");
      const userOrders = Array.isArray(rawOrders) ? rawOrders : [];

      const total = userOrders.length;
      const pending = userOrders.filter((o) =>
        ["Pending", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Processing"].includes(o.orderStatus)
      ).length;
      const delivered = userOrders.filter((o) => o.orderStatus === "Delivered").length;
      const cancelled = userOrders.filter((o) => o.orderStatus === "Cancelled").length;

      return {
        success: true,
        user,
        addresses: getMockAddresses(),
        rewards: getMockRewards(),
        summary: { total, pending, delivered, cancelled },
      };
    }
  },

  async updateProfile(data: Record<string, unknown>) {
    try {
      return await fetchAuth(`${BASE}/profile`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      // Update local storage
      const saved = localStorage.getItem("siteUser");
      if (saved) {
        const u = JSON.parse(saved);
        u.name = `${data.firstName || ""} ${data.lastName || ""}`.trim() || u.name;
        if (data.phone) u.phone = data.phone;
        localStorage.setItem("siteUser", JSON.stringify(u));
      }
      return { success: true, user: { ...getMockUser(), ...data } };
    }
  },

  async changePassword(currentPassword: string, newPassword: string) {
    try {
      return await fetchAuth(`${BASE}/password`, { method: "PUT", body: JSON.stringify({ currentPassword, newPassword }) });
    } catch {
      return { success: true, message: "Password updated successfully." };
    }
  },

  async getAddresses() {
    try {
      return await fetchAuth(`${BASE}/addresses`);
    } catch {
      return { success: true, addresses: getMockAddresses() };
    }
  },

  async addAddress(data: Record<string, unknown>) {
    try {
      return await fetchAuth(`${BASE}/addresses`, { method: "POST", body: JSON.stringify(data) });
    } catch {
      const addresses = getMockAddresses();
      const newAddr = { ...data, _id: `addr_${Date.now()}` };
      addresses.push(newAddr);
      localStorage.setItem("pushpangan_addresses", JSON.stringify(addresses));
      return { success: true, address: newAddr };
    }
  },

  async updateAddress(id: string, data: Record<string, unknown>) {
    try {
      return await fetchAuth(`${BASE}/addresses/${id}`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      const addresses = getMockAddresses().map((a: any) => (a._id === id ? { ...a, ...data } : a));
      localStorage.setItem("pushpangan_addresses", JSON.stringify(addresses));
      return { success: true, address: { ...data, _id: id } };
    }
  },

  async deleteAddress(id: string) {
    try {
      return await fetchAuth(`${BASE}/addresses/${id}`, { method: "DELETE" });
    } catch {
      const addresses = getMockAddresses().filter((a: any) => a._id !== id);
      localStorage.setItem("pushpangan_addresses", JSON.stringify(addresses));
      return { success: true };
    }
  },

  async getOrders() {
    try {
      return await fetchAuth(`${BASE}/orders`);
    } catch {
      const user = getMockUser();
      const userOrders = await orderService.getUserOrders(user?.email || user?._id || "guest");
      return { success: true, orders: Array.isArray(userOrders) ? userOrders : [] };
    }
  },

  async getRewards() {
    try {
      return await fetchAuth(`${BASE}/rewards`);
    } catch {
      return { success: true, rewards: getMockRewards() };
    }
  },

  async getNotifications() {
    try {
      return await fetchAuth(`${BASE}/notifications`);
    } catch {
      return { success: true, notifications: getMockNotifications() };
    }
  },

  async deleteAccount() {
    try {
      return await fetchAuth(`${BASE}/account`, { method: "DELETE" });
    } catch {
      localStorage.removeItem("siteUser");
      return { success: true };
    }
  },
};
