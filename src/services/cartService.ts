import { API_URL } from "../config/api";

const API_BASE = `${API_URL}/api`;

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("pushpangan_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export type ServerCartItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    mainImage: string;
    images: string[];
    price: number;
    stockQuantity: number;
    availability: boolean;
    category: string;
    unit: string;
  };
  quantity: number;
};

export type ServerCart = {
  _id: string;
  user: string;
  items: ServerCartItem[];
};

export const cartService = {
  // Fetch user's cart from MongoDB (via Express API)
  async getCart(): Promise<ServerCart | null> {
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok || !data.success) return null;
      return data.cart as ServerCart;
    } catch {
      return null;
    }
  },

  // Add item to cart (by slug mapped to productId via server)
  async addItem(
    productId: string,
    quantity: number = 1
  ): Promise<{ success: boolean; message?: string; cart?: ServerCart }> {
    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      return { success: data.success, message: data.message, cart: data.cart };
    } catch {
      return { success: false, message: "Network error." };
    }
  },

  // Update item quantity
  async updateItem(
    productId: string,
    quantity: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/cart/update`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      return { success: data.success, message: data.message };
    } catch {
      return { success: false };
    }
  },

  // Remove item from cart
  async removeItem(
    productId: string
  ): Promise<{ success: boolean }> {
    try {
      const res = await fetch(`${API_BASE}/cart/remove/${productId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return { success: data.success };
    } catch {
      return { success: false };
    }
  },

  // Clear cart
  async clearCart(): Promise<{ success: boolean }> {
    try {
      const res = await fetch(`${API_BASE}/cart/clear`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return { success: data.success };
    } catch {
      return { success: false };
    }
  },

  // Merge guest cart (localStorage) items into DB cart on login
  async mergeGuestCart(
    guestItems: Array<{ slug: string; quantity: number }>
  ): Promise<{ success: boolean; cart?: ServerCart }> {
    try {
      const res = await fetch(`${API_BASE}/cart/merge`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ items: guestItems }),
      });
      const data = await res.json();
      return { success: data.success, cart: data.cart };
    } catch {
      return { success: false };
    }
  },
};
