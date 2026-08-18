const BASE = "/api/account";

function getToken(): string | null {
  try {
    const u = localStorage.getItem("siteUser");
    if (u) return JSON.parse(u)?.token || null;
  } catch { }
  return null;
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

// ---------- Demo mock data (when backend is offline) ----------
function getMockUser() {
  try {
    const saved = localStorage.getItem("siteUser");
    if (saved) {
      const u = JSON.parse(saved);
      return {
        _id: "demo-user",
        firstName: u.name?.split(" ")[0] || "Guest",
        lastName: u.name?.split(" ").slice(1).join(" ") || "",
        email: u.email || "guest@pushpangan.com",
        phone: u.phone || "+91 9876543210",
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

function getMockSummary() {
  return { total: 8, pending: 2, delivered: 5, cancelled: 1 };
}

function getMockOrders() {
  return [
    { _id: "o1", orderNumber: "PG-20240001", items: [{ name: "Yellow Dutch Marigold Bunch", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80", qty: 3, price: 149 }], totalAmount: 447, orderStatus: "Delivered", createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    { _id: "o2", orderNumber: "PG-20240002", items: [{ name: "Pink Chrysanthemums", image: "https://images.unsplash.com/photo-1490750967868-88df5691cc99?w=80", qty: 2, price: 299 }], totalAmount: 598, orderStatus: "Out for Delivery", createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: "o3", orderNumber: "PG-20240003", items: [{ name: "Red Roses Premium Bunch", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=80", qty: 1, price: 499 }], totalAmount: 499, orderStatus: "Pending", createdAt: new Date().toISOString() },
  ];
}

function getMockAddresses() {
  return [
    { _id: "a1", label: "Home", fullName: "Vaishali Sharma", phone: "9876543210", line1: "42, Garden View Apartments", line2: "Sector 15", city: "Noida", state: "Uttar Pradesh", pincode: "201301", isDefault: true },
    { _id: "a2", label: "Office", fullName: "Vaishali Sharma", phone: "9876543210", line1: "Tech Park, Block C", line2: "Floor 4", city: "Gurugram", state: "Haryana", pincode: "122001", isDefault: false },
  ];
}

function getMockRewards() {
  return { available: 750, lifetime: 2400, level: "Gold", nextLevel: "Platinum", nextLevelPoints: 5000 };
}

function getMockNotifications() {
  return [
    { _id: "n1", title: "🌸 Weekend Marigold Sale!", message: "Get 15% off on all Marigold bundles.", type: "offer", read: false, createdAt: new Date().toISOString() },
    { _id: "n2", title: "📦 Order Shipped!", message: "Your Chrysanthemum order is out for delivery.", type: "order", read: false, createdAt: new Date().toISOString() },
    { _id: "n3", title: "🎉 Festival Offer!", message: "Flat ₹100 off on orders above ₹500.", type: "offer", read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  ];
}

// ---------- Public API ----------
export const userService = {
  async getProfile() {
    try {
      return await fetchAuth(`${BASE}/profile`);
    } catch {
      return { success: true, user: getMockUser(), addresses: getMockAddresses(), rewards: getMockRewards(), summary: getMockSummary() };
    }
  },

  async updateProfile(data: Record<string, unknown>) {
    try {
      return await fetchAuth(`${BASE}/profile`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      // Update local mock
      const saved = localStorage.getItem("siteUser");
      if (saved) {
        const u = JSON.parse(saved);
        u.name = `${data.firstName || ""} ${data.lastName || ""}`.trim() || u.name;
        localStorage.setItem("siteUser", JSON.stringify(u));
      }
      return { success: true, user: { ...getMockUser(), ...data } };
    }
  },

  async changePassword(currentPassword: string, newPassword: string) {
    try {
      return await fetchAuth(`${BASE}/password`, { method: "PUT", body: JSON.stringify({ currentPassword, newPassword }) });
    } catch {
      return { success: true, message: "Password updated (demo mode)." };
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
      return { success: true, address: { ...data, _id: `mock-${Date.now()}` } };
    }
  },

  async updateAddress(id: string, data: Record<string, unknown>) {
    try {
      return await fetchAuth(`${BASE}/addresses/${id}`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      return { success: true, address: { ...data, _id: id } };
    }
  },

  async deleteAddress(id: string) {
    try {
      return await fetchAuth(`${BASE}/addresses/${id}`, { method: "DELETE" });
    } catch {
      return { success: true };
    }
  },

  async getOrders() {
    try {
      return await fetchAuth(`${BASE}/orders`);
    } catch {
      return { success: true, orders: getMockOrders() };
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
      return { success: true };
    }
  },
};
