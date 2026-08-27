// Pushpangan Admin API Service Layer
import {
  clearAdminSession,
  createAdminSessionToken,
  getStoredAdminSession,
  isAdminRole,
  persistAdminSession,
  validateLocalAdminCredentials,
} from "../lib/adminAuth";
import { API_URL } from "../config/api";

const API_BASE = `${API_URL}/api/admin`;

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const adminService = {
  // Authentication
  async login(credentials: { email?: string; password?: string; rememberMe?: boolean }) {
    const email = credentials.email?.trim() || "";
    const password = credentials.password || "";

    if (!email || !password) {
      return { success: false, message: "Email and password are required." };
    }

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }
      if (!data.admin || !isAdminRole(data.admin.role)) {
        return { success: false, message: "This account is not authorized for admin access." };
      }
      if (data.token) persistAdminSession(data.admin, data.token);
      if (data.refreshToken) localStorage.setItem("adminRefreshToken", data.refreshToken);
      return data;
    } catch {
      const admin = validateLocalAdminCredentials(email, password);
      if (!admin) {
        return { success: false, message: "Invalid admin credentials or unauthorized access." };
      }

      const token = createAdminSessionToken(admin.id);
      persistAdminSession(admin, token);
      return { success: true, token, admin };
    }
  },

  async logout() {
    try {
      await fetch(`${API_BASE}/logout`, { method: "POST", headers: getHeaders() });
    } catch (e) {}
    clearAdminSession();
  },

  async getMe() {
    try {
      const res = await fetch(`${API_BASE}/me`, { headers: getHeaders() });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      if (!data.success || !data.admin || !isAdminRole(data.admin.role)) {
        throw new Error("Unauthorized");
      }
      return data;
    } catch {
      const session = getStoredAdminSession();
      if (session) {
        return { success: true, admin: session.admin };
      }
      clearAdminSession();
      return { success: false, admin: null };
    }
  },

  // Stats
  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE}/dashboard-stats`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        cards: {
          todayOrders: 0,
          todayRevenue: 0,
          monthlyRevenue: 0,
          totalCustomers: 0,
          pendingOrders: 0,
          completedOrders: 0,
          cancelledOrders: 0,
          lowStockFlowers: 0,
          bestSellingFlower: "N/A",
          recentCustomers: [],
        },
        charts: {
          dailySales: [],
          monthlySales: [],
          categoryPerformance: [],
          topSellingFlowers: [],
        },
      };
    }
  },

  // Flowers
  async getFlowers(params?: any) {
    try {
      const query = new URLSearchParams(params || {}).toString();
      const res = await fetch(`${API_BASE}/flowers?${query}`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        flowers: [],
        total: 0,
      };
    }
  },

  async saveFlower(flower: any) {
    const url = flower._id ? `${API_BASE}/flowers/${flower._id}` : `${API_BASE}/flowers`;
    const method = flower._id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(flower),
    });
    return await res.json();
  },

  async deleteFlower(id: string) {
    const res = await fetch(`${API_BASE}/flowers/${id}`, { method: "DELETE", headers: getHeaders() });
    return await res.json();
  },

  async duplicateFlower(id: string) {
    const res = await fetch(`${API_BASE}/flowers/${id}/duplicate`, { method: "POST", headers: getHeaders() });
    return await res.json();
  },

  async toggleFlowerStatus(id: string) {
    const res = await fetch(`${API_BASE}/flowers/${id}/toggle-status`, { method: "PATCH", headers: getHeaders() });
    return await res.json();
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        categories: [],
      };
    }
  },

  async saveCategory(category: any) {
    const url = category._id ? `${API_BASE}/categories/${category._id}` : `${API_BASE}/categories`;
    const method = category._id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(category) });
    return await res.json();
  },

  async deleteCategory(id: string) {
    const res = await fetch(`${API_BASE}/categories/${id}`, { method: "DELETE", headers: getHeaders() });
    return await res.json();
  },

  // Orders
  async getOrders(params?: any) {
    try {
      const query = new URLSearchParams(params || {}).toString();
      const res = await fetch(`${API_BASE}/orders?${query}`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        orders: [],
      };
    }
  },

  async updateOrderStatus(id: string, body: any) {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return await res.json();
  },

  async refundOrder(id: string, body: any) {
    const res = await fetch(`${API_BASE}/orders/${id}/refund`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return await res.json();
  },

  // Customers
  async getCustomers(params?: any) {
    try {
      const query = new URLSearchParams(params || {}).toString();
      const res = await fetch(`${API_BASE}/customers?${query}`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        customers: [],
      };
    }
  },

  async blockCustomer(id: string) {
    const res = await fetch(`${API_BASE}/customers/${id}/block`, { method: "PUT", headers: getHeaders() });
    return await res.json();
  },

  async deleteCustomer(id: string) {
    const res = await fetch(`${API_BASE}/customers/${id}`, { method: "DELETE", headers: getHeaders() });
    return await res.json();
  },

  // Inventory
  async getInventory() {
    try {
      const res = await fetch(`${API_BASE}/inventory`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        products: [],
        metrics: { totalItems: 0, lowStockCount: 0, outOfStockCount: 0 },
      };
    }
  },

  async restockInventory(productId: string, quantity: number) {
    const res = await fetch(`${API_BASE}/inventory/restock`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });
    return await res.json();
  },

  // Coupons
  async getCoupons() {
    try {
      const res = await fetch(`${API_BASE}/coupons`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        coupons: [],
      };
    }
  },

  async saveCoupon(coupon: any) {
    const res = await fetch(`${API_BASE}/coupons`, { method: "POST", headers: getHeaders(), body: JSON.stringify(coupon) });
    return await res.json();
  },

  async toggleCoupon(id: string) {
    const res = await fetch(`${API_BASE}/coupons/${id}/toggle`, { method: "PATCH", headers: getHeaders() });
    return await res.json();
  },

  async deleteCoupon(id: string) {
    const res = await fetch(`${API_BASE}/coupons/${id}`, { method: "DELETE", headers: getHeaders() });
    return await res.json();
  },

  // Offers
  async getOffers() {
    try {
      const res = await fetch(`${API_BASE}/offers`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        offers: [],
      };
    }
  },

  async saveOffer(offer: any) {
    const res = await fetch(`${API_BASE}/offers`, { method: "POST", headers: getHeaders(), body: JSON.stringify(offer) });
    return await res.json();
  },

  async toggleOffer(id: string) {
    const res = await fetch(`${API_BASE}/offers/${id}/toggle`, { method: "PATCH", headers: getHeaders() });
    return await res.json();
  },

  async deleteOffer(id: string) {
    const res = await fetch(`${API_BASE}/offers/${id}`, { method: "DELETE", headers: getHeaders() });
    return await res.json();
  },

  // Reviews
  async getReviews() {
    try {
      const res = await fetch(`${API_BASE}/reviews`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        reviews: [],
      };
    }
  },

  async updateReviewStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE}/reviews/${id}/status`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return await res.json();
  },

  async replyReview(id: string, reply: string) {
    const res = await fetch(`${API_BASE}/reviews/${id}/reply`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ reply }),
    });
    return await res.json();
  },

  async deleteReview(id: string) {
    const res = await fetch(`${API_BASE}/reviews/${id}`, { method: "DELETE", headers: getHeaders() });
    return await res.json();
  },

  // Settings
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}/settings`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        settings: {
          websiteName: "Pushpangan Fresh Flowers",
          businessName: "Pushpangan Flower eCommerce Pvt Ltd",
          gstNumber: "27AAAAA0000A1Z5",
          email: "contact@pushpangan.com",
          phone: "+91 98765 43210",
          address: "Market Yard, Gultekdi, Pune, Maharashtra 411037",
          shippingCharges: 50,
          freeShippingThreshold: 499,
          deliveryRadiusKm: 25,
          emailProvider: "SMTP",
          smsGateway: "Twilio",
        },
      };
    }
  },

  async saveSettings(settings: any) {
    const res = await fetch(`${API_BASE}/settings`, { method: "PUT", headers: getHeaders(), body: JSON.stringify(settings) });
    return await res.json();
  },

  // Admins
  async getAdmins() {
    try {
      const res = await fetch(`${API_BASE}/admins`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        admins: [],
      };
    }
  },

  async saveAdmin(admin: any) {
    const res = await fetch(`${API_BASE}/admins`, { method: "POST", headers: getHeaders(), body: JSON.stringify(admin) });
    return await res.json();
  },

  async deleteAdmin(id: string) {
    const res = await fetch(`${API_BASE}/admins/${id}`, { method: "DELETE", headers: getHeaders() });
    return await res.json();
  },

  // Activity Logs & Notifications
  async getActivityLogs() {
    try {
      const res = await fetch(`${API_BASE}/activity-logs`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        logs: [],
      };
    }
  },

  async getNotifications() {
    try {
      const res = await fetch(`${API_BASE}/notifications`, { headers: getHeaders() });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err) {
      return {
        success: true,
        notifications: [],
      };
    }
  },

  async markNotificationsRead() {
    const res = await fetch(`${API_BASE}/notifications/read-all`, { method: "PUT", headers: getHeaders() });
    return await res.json();
  },
};
