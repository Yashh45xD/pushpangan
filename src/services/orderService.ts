export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type CreateOrderInput = {
  user_id?: string;
  total_amount: number;
  discount_amount?: number;
  delivery_fee?: number;
  final_amount: number;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  shipping_phone: string;
  payment_method: "upi" | "razorpay" | "cod" | "card" | "netbanking";
  delivery_date?: string;
  items: Array<{
    product_id?: string;
    product_name: string;
    unit_price: number;
    quantity: number;
    subtotal: number;
    image?: string;
    category?: string;
  }>;
};

const ORDERS_KEY = "pushpangan_orders_list";

function getStoredOrders(): any[] {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: any[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("pushpangan_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const orderService = {
  async createOrder(input: CreateOrderInput) {
    let newOrder: any = null;
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          orderItems: input.items.map((i) => ({
            product: i.product_id,
            name: i.product_name,
            quantity: i.quantity,
            price: i.unit_price,
            image: i.image,
            category: i.category,
          })),
          shippingAddress: {
            fullName: input.shipping_address.split(",")[0] || "Customer",
            phone: input.shipping_phone,
            street: input.shipping_address,
            city: input.shipping_city,
            state: input.shipping_state,
            pincode: input.shipping_pincode,
          },
          paymentMethod: input.payment_method === "cod" ? "COD" : input.payment_method === "razorpay" ? "Razorpay" : "Stripe",
          discountAmount: input.discount_amount,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        newOrder = data.data;
      }
    } catch (err) {
      console.warn("Backend API createOrder failed, falling back to local storage:", err);
    }

    if (!newOrder) {
      // Fallback: Local Storage Order Object
      const orderNumber = `PKG-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
      newOrder = {
        _id: `ord_${Date.now()}`,
        orderId: orderNumber,
        order_number: orderNumber,
        orderNumber: orderNumber,
        userId: input.user_id || "guest",
        customerName: input.shipping_address.split(",")[0] || "Customer",
        customerPhone: input.shipping_phone,
        total_amount: input.total_amount,
        totalAmount: input.final_amount,
        subtotal: input.total_amount,
        deliveryCharge: input.delivery_fee || 0,
        discount: input.discount_amount || 0,
        gst: Math.round(input.total_amount * 0.18),
        grandTotal: input.final_amount,
        shippingAddress: {
          fullName: input.shipping_address.split(",")[0] || "Customer",
          phone: input.shipping_phone,
          street: input.shipping_address,
          city: input.shipping_city,
          state: input.shipping_state,
          pincode: input.shipping_pincode,
        },
        orderStatus: "Pending",
        paymentMethod: input.payment_method.toUpperCase(),
        paymentStatus: input.payment_method === "cod" ? "Pending" : "Paid",
        estimatedDelivery: input.delivery_date || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        items: input.items.map((i) => ({
          productId: i.product_id,
          flowerName: i.product_name,
          name: i.product_name,
          quantity: i.quantity,
          qty: i.quantity,
          price: i.unit_price,
          subtotal: i.subtotal,
          image: i.image || "https://images.unsplash.com/photo-1561181286-d3fee7d55364",
          category: i.category || "Fresh Flowers",
        })),
        createdAt: new Date().toISOString(),
      };
    }

    // 1. Save to Customer Orders List (pushpangan_orders_list)
    const customerOrders = getStoredOrders().filter(
      (o) => !["ord_1", "ord_2", "ord_3", "PUSH58924", "PUSH49301", "PUSH11930", "PG-20240001", "PG-20240002", "PG-20240003"].includes(o._id) &&
             !["PUSH58924", "PUSH49301", "PUSH11930", "PG-20240001", "PG-20240002", "PG-20240003"].includes(o.orderId) &&
             !["PUSH58924", "PUSH49301", "PUSH11930", "PG-20240001", "PG-20240002", "PG-20240003"].includes(o.orderNumber)
    );
    customerOrders.unshift(newOrder);
    saveOrders(customerOrders);

    // 2. Save to Admin Orders List (pushpangan_admin_orders)
    try {
      const adminOrderObj = {
        _id: newOrder._id || newOrder.id,
        orderNumber: newOrder.orderId || newOrder.order_number || `ORD-${Date.now()}`,
        customerName: input.shipping_address.split(",")[0] || "Customer",
        customerEmail: input.user_id?.includes("@") ? input.user_id : "customer@pushpangan.com",
        customerPhone: input.shipping_phone,
        itemName: input.items?.[0]?.product_name || "Flower Arrangement",
        items: input.items.map((i) => ({
          name: i.product_name,
          price: i.unit_price,
          quantity: i.quantity,
          subtotal: i.subtotal,
          image: i.image,
        })),
        totalAmount: input.final_amount,
        finalAmount: input.final_amount,
        orderStatus: "Pending",
        paymentStatus: input.payment_method === "cod" ? "Pending" : "Paid",
        paymentMethod: input.payment_method.toUpperCase(),
        createdAt: new Date().toISOString().split("T")[0],
        shippingAddress: {
          address: input.shipping_address,
          city: input.shipping_city,
          state: input.shipping_state,
          pincode: input.shipping_pincode,
        },
      };

      const adminOrdersData = localStorage.getItem("pushpangan_admin_orders");
      const adminOrders = adminOrdersData ? JSON.parse(adminOrdersData) : [];
      adminOrders.unshift(adminOrderObj);
      localStorage.setItem("pushpangan_admin_orders", JSON.stringify(adminOrders));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("pushpangan_orders_updated"));
      }
    } catch (e) {
      console.warn("Failed to sync to admin orders:", e);
    }

    return newOrder;
  },

  async getUserOrders(userId?: string) {
    try {
      const response = await fetch(`${API_BASE}/orders/myorders`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok && data.success && Array.isArray(data.data)) {
        return data.data;
      }
    } catch (err) {
      console.warn("Backend API getUserOrders failed, falling back to local storage:", err);
    }

    const allOrders = getStoredOrders();
    // Filter out dummy/admin demo mock orders
    const cleanedOrders = allOrders.filter(
      (o) => !["ord_1", "ord_2", "ord_3", "PUSH58924", "PUSH49301", "PUSH11930", "PG-20240001", "PG-20240002", "PG-20240003"].includes(o._id) &&
             !["PUSH58924", "PUSH49301", "PUSH11930", "PG-20240001", "PG-20240002", "PG-20240003"].includes(o.orderId) &&
             !["PUSH58924", "PUSH49301", "PUSH11930", "PG-20240001", "PG-20240002", "PG-20240003"].includes(o.orderNumber)
    );
    if (cleanedOrders.length !== allOrders.length) {
      saveOrders(cleanedOrders);
    }

    if (!userId || userId === "guest" || userId === "all") {
      return cleanedOrders;
    }

    // Filter strictly by the current buyer's ID/email/phone
    const buyerOrders = cleanedOrders.filter((o) => {
      if (o.userId === userId) return true;
      if (o.userEmail && o.userEmail.toLowerCase() === userId.toLowerCase()) return true;
      if (o.customerEmail && o.customerEmail.toLowerCase() === userId.toLowerCase()) return true;
      if (o.customerPhone === userId || o.shippingAddress?.phone === userId) return true;
      if (o.userId === "guest" || !o.userId) return true; // orders placed in this browser
      return false;
    });

    return buyerOrders;
  },

  async getOrderById(id: string) {
    try {
      const response = await fetch(`${API_BASE}/orders/${id}`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.data;
      }
    } catch (err) {
      console.warn("Backend API getOrderById failed, falling back to local storage:", err);
    }
    const orders = getStoredOrders();
    return orders.find((o) => o._id === id || o.id === id || o.orderId === id || o.order_number === id) || null;
  },

  async cancelOrder(id: string, reason?: string) {
    try {
      const response = await fetch(`${API_BASE}/orders/${id}/cancel`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ cancelReason: reason }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.data;
      }
    } catch (err) {
      console.warn("Backend API cancelOrder failed, falling back to local storage:", err);
    }

    const orders = getStoredOrders();
    const order = orders.find((o) => o._id === id || o.id === id || o.orderId === id || o.order_number === id);
    if (order) {
      order.orderStatus = "Cancelled";
      order.order_status = "Cancelled";
      saveOrders(orders);
    }

    // Also update in admin orders if present
    try {
      const adminData = localStorage.getItem("pushpangan_admin_orders");
      if (adminData) {
        const adminOrders = JSON.parse(adminData);
        const aOrder = adminOrders.find((o: any) => o._id === id || o.id === id || o.orderNumber === id);
        if (aOrder) {
          aOrder.orderStatus = "Cancelled";
          localStorage.setItem("pushpangan_admin_orders", JSON.stringify(adminOrders));
        }
      }
    } catch { }

    return order;
  },

  async reorder(id: string) {
    try {
      const response = await fetch(`${API_BASE}/orders/${id}/reorder`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.data;
      }
    } catch (err) {
      console.warn("Backend API reorder failed, falling back to local storage:", err);
    }
    return null;
  },

  async rateOrder(id: string, productId: string, rating: number, comment: string) {
    try {
      const response = await fetch(`${API_BASE}/orders/${id}/rate`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, rating, comment }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.data;
      }
    } catch (err) {
      console.warn("Backend API rateOrder failed, falling back to local storage:", err);
    }
    return null;
  },

  async searchOrders(query: string) {
    try {
      const response = await fetch(`${API_BASE}/orders/search?query=${encodeURIComponent(query)}`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.data;
      }
    } catch (err) {
      console.warn("Backend API searchOrders failed, falling back to local storage:", err);
    }

    const orders = getStoredOrders();
    return orders.filter((o) => {
      const oid = (o.orderId || o.order_number || "").toLowerCase();
      const q = query.toLowerCase();
      if (oid.includes(q)) return true;
      const itemsMatch = o.items?.some((i: any) => (i.flowerName || i.product_name || "").toLowerCase().includes(q));
      if (itemsMatch) return true;
      return false;
    });
  },

  async filterOrders(timeframe: string, status: string) {
    try {
      const response = await fetch(`${API_BASE}/orders/filter?timeframe=${encodeURIComponent(timeframe)}&status=${encodeURIComponent(status)}`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.data;
      }
    } catch (err) {
      console.warn("Backend API filterOrders failed, falling back to local storage:", err);
    }

    const orders = getStoredOrders();
    return orders.filter((o) => {
      if (status !== "All" && o.orderStatus !== status && o.order_status !== status) {
        return false;
      }
      return true;
    });
  },

  async getInvoice(id: string) {
    try {
      const response = await fetch(`${API_BASE}/orders/invoice/${id}`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.data;
      }
    } catch (err) {
      console.warn("Backend API getInvoice failed, falling back to local storage:", err);
    }
    return null;
  },

  async getInvoiceData(orderId: string) {
    return this.getOrderById(orderId);
  },
};

