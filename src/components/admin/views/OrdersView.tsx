import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import {
  Search,
  Printer,
  Edit,
  Trash2,
  X,
  Save,
  Plus,
  RefreshCw,
  Eye,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Package,
} from "lucide-react";

// Format location helper
const formatLocation = (ord: any) => {
  if (!ord) return "Address not specified";
  if (typeof ord.shippingAddress === "string") return ord.shippingAddress;
  if (ord.shippingAddress && typeof ord.shippingAddress === "object") {
    const parts = [
      ord.shippingAddress.address || ord.shippingAddress.street,
      ord.shippingAddress.city,
      ord.shippingAddress.state,
      ord.shippingAddress.pincode ? `- ${ord.shippingAddress.pincode}` : "",
    ].filter(Boolean);
    if (parts.length > 0) return parts.join(", ");
  }
  const parts = [
    ord.address || ord.shipping_address,
    ord.city || ord.shipping_city,
    ord.state || ord.shipping_state,
    (ord.pincode || ord.shipping_pincode) ? `- ${ord.pincode || ord.shipping_pincode}` : "",
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Address not specified";
};

export const OrdersView: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatusTab, setSelectedStatusTab] = useState("All Orders");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Modals
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Order Form
  const [orderForm, setOrderForm] = useState({
    _id: "",
    orderNumber: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    itemName: "Dutch Marigold Bouquet",
    price: 499,
    quantity: 1,
    deliveryFee: 50,
    address: "",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411037",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Pending",
  });

  const filterTabs = [
    "All Orders",
    "Pending",
    "Confirmed",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  const fetchOrders = async () => {
    try {
      const res = await adminService.getOrders();
      let list = res.orders || [];

      // Check localStorage for persist updates
      const saved = localStorage.getItem("pushpangan_admin_orders");
      if (saved) {
        list = JSON.parse(saved);
      } else if (list.length === 0) {
        // Sample baseline orders matching Pushpangan flower arrangement domain if none in DB
        list = [
          {
            _id: "ord-101",
            orderNumber: "ORD-2026-901",
            customerName: "Aarav Sharma",
            customerEmail: "aarav@example.com",
            customerPhone: "+91 98765 11111",
            itemName: "Royal Dutch Red Roses Bouquet",
            items: [{ name: "Royal Dutch Red Roses Bouquet", price: 499, quantity: 1, subtotal: 499 }],
            createdAt: "2026-08-12",
            finalAmount: 549,
            totalAmount: 499,
            orderStatus: "Out for Delivery",
            paymentStatus: "Paid",
            paymentMethod: "UPI",
            shippingAddress: { address: "Flat 402, Sunshine Heights, MG Road", city: "Pune", state: "Maharashtra", pincode: "411001" },
          },
          {
            _id: "ord-102",
            orderNumber: "ORD-2026-902",
            customerName: "Sneha Kulkarni",
            customerEmail: "sneha@example.com",
            customerPhone: "+91 98765 22222",
            itemName: "Yellow Marigold Festival Garland",
            items: [{ name: "Yellow Marigold Festival Garland", price: 299, quantity: 2, subtotal: 598 }],
            createdAt: "2026-08-13",
            finalAmount: 648,
            totalAmount: 598,
            orderStatus: "Confirmed",
            paymentStatus: "Paid",
            paymentMethod: "Credit Card",
            shippingAddress: { address: "12, Rose Villa, Baner Link Road", city: "Pune", state: "Maharashtra", pincode: "411045" },
          },
          {
            _id: "ord-103",
            orderNumber: "ORD-2026-903",
            customerName: "Vikram Patil",
            customerEmail: "vikram@example.com",
            customerPhone: "+91 98765 33333",
            itemName: "Pink Lotus Sacred Altar Set",
            items: [{ name: "Pink Lotus Sacred Altar Set", price: 350, quantity: 1, subtotal: 350 }],
            createdAt: "2026-08-11",
            finalAmount: 400,
            totalAmount: 350,
            orderStatus: "Delivered",
            paymentStatus: "Paid",
            paymentMethod: "UPI",
            shippingAddress: { address: "Kothrud Depot Road, Ideal Colony", city: "Pune", state: "Maharashtra", pincode: "411038" },
          },
          {
            _id: "ord-104",
            orderNumber: "ORD-2026-904",
            customerName: "Ananya Deshmukh",
            customerEmail: "ananya@example.com",
            customerPhone: "+91 98765 44444",
            itemName: "Jasmine Mogra Veni Set",
            items: [{ name: "Jasmine Mogra Veni Set", price: 899, quantity: 1, subtotal: 899 }],
            createdAt: "2026-08-10",
            finalAmount: 949,
            totalAmount: 899,
            orderStatus: "Pending",
            paymentStatus: "Pending",
            paymentMethod: "COD",
            shippingAddress: { address: "FC Road, Near Goodluck Cafe, Deccan", city: "Pune", state: "Maharashtra", pincode: "411004" },
          },
          {
            _id: "ord-105",
            orderNumber: "ORD-2026-905",
            customerName: "Rohan Kulkarni",
            customerEmail: "rohan@example.com",
            customerPhone: "+91 98765 55555",
            itemName: "Red Hibiscus 21-Set Bloom",
            items: [{ name: "Red Hibiscus 21-Set Bloom", price: 315, quantity: 1, subtotal: 315 }],
            createdAt: "2026-08-09",
            finalAmount: 365,
            totalAmount: 315,
            orderStatus: "Cancelled",
            paymentStatus: "Refunded",
            paymentMethod: "UPI",
            shippingAddress: { address: "Plot 88, Viman Nagar Phase 2", city: "Pune", state: "Maharashtra", pincode: "411014" },
          },
        ];
        localStorage.setItem("pushpangan_admin_orders", JSON.stringify(list));
      }
      setOrders(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const handleUpdate = () => {
      fetchOrders();
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pushpangan_orders_updated", handleUpdate);
    const interval = setInterval(fetchOrders, 2000);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pushpangan_orders_updated", handleUpdate);
      clearInterval(interval);
    };
  }, []);

  const saveToLocal = (newOrders: any[]) => {
    setOrders(newOrders);
    localStorage.setItem("pushpangan_admin_orders", JSON.stringify(newOrders));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("pushpangan_orders_updated"));
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await adminService.updateOrderStatus(orderId, { orderStatus: newStatus });
    } catch (e) {}

    const updated = orders.map((o) =>
      o._id === orderId ? { ...o, orderStatus: newStatus } : o
    );
    saveToLocal(updated);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (!confirm("Are you sure you want to remove this order record?")) return;
    const updated = orders.filter((o) => o._id !== orderId);
    saveToLocal(updated);
  };

  const handleSaveOrderModal = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = orderForm.price * orderForm.quantity;
    const finalAmt = subtotal + orderForm.deliveryFee;

    const payload = {
      _id: orderForm._id || "ord-" + Date.now(),
      orderNumber: orderForm.orderNumber,
      customerName: orderForm.customerName,
      customerEmail: orderForm.customerEmail,
      customerPhone: orderForm.customerPhone,
      itemName: orderForm.itemName,
      items: [{ name: orderForm.itemName, price: orderForm.price, quantity: orderForm.quantity, subtotal }],
      totalAmount: subtotal,
      finalAmount: finalAmt,
      orderStatus: orderForm.orderStatus,
      paymentStatus: orderForm.paymentStatus,
      paymentMethod: orderForm.paymentMethod,
      createdAt: new Date().toISOString().split("T")[0],
      shippingAddress: {
        address: orderForm.address,
        city: orderForm.city,
        state: orderForm.state,
        pincode: orderForm.pincode,
      },
    };

    let updated = [];
    if (isEditing) {
      updated = orders.map((o) => (o._id === payload._id ? payload : o));
    } else {
      updated = [payload, ...orders];
    }
    saveToLocal(updated);
    setShowOrderModal(false);
  };

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setOrderForm({
      _id: "",
      orderNumber: "ORD-2026-" + Math.floor(100 + Math.random() * 900),
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      itemName: "Rose & Marigold Bouquet",
      price: 499,
      quantity: 1,
      deliveryFee: 50,
      address: "",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411037",
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      orderStatus: "Pending",
    });
    setShowOrderModal(true);
  };

  const handleOpenEditModal = (ord: any) => {
    setIsEditing(true);
    setOrderForm({
      _id: ord._id,
      orderNumber: ord.orderNumber,
      customerName: ord.customerName,
      customerEmail: ord.customerEmail || "",
      customerPhone: ord.customerPhone || "",
      itemName: ord.itemName || ord.items?.[0]?.name || "Flower Arrangement",
      price: ord.items?.[0]?.price || 499,
      quantity: ord.items?.[0]?.quantity || 1,
      deliveryFee: 50,
      address: ord.shippingAddress?.address || ord.address || "",
      city: ord.shippingAddress?.city || ord.city || "Pune",
      state: ord.shippingAddress?.state || ord.state || "Maharashtra",
      pincode: ord.shippingAddress?.pincode || ord.pincode || "411037",
      paymentMethod: ord.paymentMethod || "UPI",
      paymentStatus: ord.paymentStatus || "Paid",
      orderStatus: ord.orderStatus || "Pending",
    });
    setShowOrderModal(true);
  };

  // Status Badge Styling Function
  const getStatusBadgeClass = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("delivered")) {
      return "bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold";
    }
    if (s.includes("out for delivery") || s.includes("shipped")) {
      return "bg-blue-100 text-blue-800 border-blue-300 font-extrabold";
    }
    if (s.includes("cancelled")) {
      return "bg-rose-100 text-rose-800 border-rose-300 font-extrabold";
    }
    if (s.includes("processing")) {
      return "bg-amber-100 text-amber-800 border-amber-300 font-extrabold";
    }
    // Default Gray for Pending / Confirmed
    return "bg-slate-200 text-slate-700 border-slate-300 font-extrabold";
  };

  // Filtering Logic (includes searching location)
  const filteredOrders = orders.filter((o) => {
    const locStr = formatLocation(o).toLowerCase();
    const matchesSearch =
      (o.orderNumber || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.customerName || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.itemName || o.items?.[0]?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      locStr.includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedStatusTab === "All Orders") return true;
    return (o.orderStatus || "").toLowerCase() === selectedStatusTab.toLowerCase();
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 style={{ color: "#4F5535" }} className="text-2xl font-black tracking-tight">
            Order Management
          </h1>
          <p style={{ color: "#666851" }} className="text-xs mt-1 font-medium">
            Track and manage customer orders along with delivery locations.
          </p>
        </div>

        {/* Top Right Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search style={{ color: "#9F905E" }} className="absolute left-3.5 top-2.5 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders, location..."
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE", color: "#4F5535" }}
              className="w-full text-xs rounded-xl py-2 pl-9 pr-3 outline-none border focus:border-[#B68F38] shadow-xs font-medium"
            />
          </div>
          <button
            onClick={handleOpenAddModal}
            style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
            className="px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-sm hover:opacity-90 transition flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" /> Create Order
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {filterTabs.map((tab) => {
          const isActive = selectedStatusTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setSelectedStatusTab(tab)}
              style={{
                backgroundColor: isActive ? "#E2DCBE" : "#FFFFFF",
                color: "#4F5535",
                borderColor: "#E2DCBE",
              }}
              className={`px-4 py-2 rounded-full text-xs font-extrabold border transition shadow-xs whitespace-nowrap ${
                isActive ? "shadow-sm ring-2 ring-[#B68F38]" : "hover:bg-[#F5F3E9]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Orders Table Container Card */}
      <div
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
        className="rounded-3xl border shadow-sm p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 style={{ color: "#4F5535" }} className="text-sm font-extrabold">
            Orders List ({filteredOrders.length})
          </h2>
          <span style={{ color: "#9F905E" }} className="text-xs font-semibold">
            Showing live customer orders with delivery addresses
          </span>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                className="border-b text-[11px] font-extrabold uppercase tracking-wider"
              >
                <th className="py-3 px-4 rounded-l-xl">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Delivery Location</th>
                <th className="py-3 px-4">Product/Service</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Update Status</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DCBE]/60 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 font-medium">
                    No matching orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-[#F5F3E9]/50 transition">
                    {/* Order ID */}
                    <td className="py-3.5 px-4 font-black">
                      <button
                        onClick={() => {
                          setSelectedOrder(ord);
                          setShowInvoiceModal(true);
                        }}
                        style={{ color: "#B68F38" }}
                        className="hover:underline font-extrabold"
                      >
                        {ord.orderNumber}
                      </button>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3.5 px-4">
                      <div style={{ color: "#4F5535" }} className="font-extrabold">
                        {ord.customerName}
                      </div>
                      {ord.customerPhone && (
                        <div style={{ color: "#666851" }} className="text-[10px] font-medium">
                          {ord.customerPhone}
                        </div>
                      )}
                    </td>

                    {/* Customer Delivery Location */}
                    <td className="py-3.5 px-4 max-w-[220px]">
                      <div
                        style={{ color: "#4F5535" }}
                        className="flex items-start gap-1 text-[11px] font-semibold"
                        title={formatLocation(ord)}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#B68F38" }} />
                        <span className="line-clamp-2">{formatLocation(ord)}</span>
                      </div>
                    </td>

                    {/* Product/Service */}
                    <td className="py-3.5 px-4">
                      <div style={{ color: "#4F5535" }} className="font-bold truncate max-w-[180px]">
                        {ord.itemName || ord.items?.[0]?.name || "Flower Arrangement"}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap" style={{ color: "#666851" }}>
                      {ord.createdAt ? ord.createdAt.split("T")[0] : "2026-08-13"}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 font-black whitespace-nowrap" style={{ color: "#4F5535" }}>
                      ₹{ord.finalAmount || ord.totalAmount || 0}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] border whitespace-nowrap ${getStatusBadgeClass(
                          ord.orderStatus
                        )}`}
                      >
                        {ord.orderStatus}
                      </span>
                    </td>

                    {/* Update Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                        style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                        className="text-[11px] font-bold px-2 py-1 rounded-xl border outline-none cursor-pointer focus:border-[#B68F38]"
                      >
                        {["Pending", "Confirmed", "Processing", "Out for Delivery", "Delivered", "Cancelled"].map(
                          (st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setShowInvoiceModal(true);
                          }}
                          title="View / Print Invoice & Location"
                          style={{ backgroundColor: "#F5F3E9", color: "#4F5535" }}
                          className="p-1.5 rounded-lg border border-[#E2DCBE] hover:bg-[#E2DCBE] transition"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(ord)}
                          title="Edit Order & Address"
                          style={{ backgroundColor: "#F5F3E9", color: "#4F5535" }}
                          className="p-1.5 rounded-lg border border-[#E2DCBE] hover:bg-[#E2DCBE] transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(ord._id)}
                          title="Delete Order"
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice & Detailed Location Modal */}
      {showInvoiceModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
            className="border rounded-3xl p-6 w-full max-w-lg shadow-2xl relative space-y-4"
          >
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b pb-3">
              <h3 style={{ color: "#4F5535" }} className="text-xl font-extrabold">
                Pushpangan – Order Invoice
              </h3>
              <p style={{ color: "#B68F38" }} className="text-xs font-bold mt-0.5">
                Order ID: #{selectedOrder.orderNumber}
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-[#4F5535]">
              <div className="flex justify-between">
                <span className="font-bold">Customer:</span>
                <span className="font-semibold">{selectedOrder.customerName}</span>
              </div>
              {selectedOrder.customerPhone && (
                <div className="flex justify-between">
                  <span className="font-bold flex items-center gap-1"><Phone className="w-3 h-3 text-[#B68F38]" /> Contact Phone:</span>
                  <span className="font-semibold">{selectedOrder.customerPhone}</span>
                </div>
              )}
              {/* Delivery Location Highlight Box */}
              <div className="bg-[#F5F3E9] p-3 rounded-2xl border border-[#E2DCBE] space-y-1 my-2">
                <div className="font-extrabold text-[#4F5535] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B68F38]" />
                  <span>Customer Delivery Location:</span>
                </div>
                <p className="text-xs font-semibold text-[#666851] pl-5 leading-relaxed">
                  {formatLocation(selectedOrder)}
                </p>
              </div>

              <div className="flex justify-between">
                <span className="font-bold">Item / Flower:</span>
                <span className="font-semibold">{selectedOrder.itemName || selectedOrder.items?.[0]?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Order Date:</span>
                <span>{selectedOrder.createdAt ? selectedOrder.createdAt.split("T")[0] : "2026-08-13"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Payment Method:</span>
                <span className="font-bold uppercase">{selectedOrder.paymentMethod || "UPI"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Status:</span>
                <span className="font-extrabold text-[#B68F38]">{selectedOrder.orderStatus}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-black text-sm">
                <span>Total Amount:</span>
                <span style={{ color: "#4F5535" }}>₹{selectedOrder.finalAmount || selectedOrder.totalAmount}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => window.print()}
                style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                className="px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow hover:opacity-90"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Order Modal (with location inputs) */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleSaveOrderModal}
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
            className="border rounded-3xl p-6 w-full max-w-md shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setShowOrderModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 style={{ color: "#4F5535" }} className="text-lg font-extrabold">
              {isEditing ? "Edit Order & Location" : "Create New Order"}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#4F5535] mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={orderForm.customerName}
                    onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4F5535] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={orderForm.customerPhone}
                    onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                    placeholder="+91 98765 00000"
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
                  />
                </div>
              </div>

              {/* Delivery Address / Location */}
              <div>
                <label className="block font-bold text-[#4F5535] mb-1">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#B68F38]" /> Delivery Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  placeholder="e.g. Flat 402, Rose Villa, Baner Road"
                  style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                  className="w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-[#4F5535] mb-1">City</label>
                  <input
                    type="text"
                    value={orderForm.city}
                    onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full rounded-xl px-2.5 py-2 border outline-none focus:border-[#B68F38]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4F5535] mb-1">State</label>
                  <input
                    type="text"
                    value={orderForm.state}
                    onChange={(e) => setOrderForm({ ...orderForm, state: e.target.value })}
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full rounded-xl px-2.5 py-2 border outline-none focus:border-[#B68F38]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4F5535] mb-1">Pincode</label>
                  <input
                    type="text"
                    value={orderForm.pincode}
                    onChange={(e) => setOrderForm({ ...orderForm, pincode: e.target.value })}
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full rounded-xl px-2.5 py-2 border outline-none focus:border-[#B68F38]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#4F5535] mb-1">Product / Flower Name *</label>
                <input
                  type="text"
                  required
                  value={orderForm.itemName}
                  onChange={(e) => setOrderForm({ ...orderForm, itemName: e.target.value })}
                  style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                  className="w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#4F5535] mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={orderForm.price}
                    onChange={(e) => setOrderForm({ ...orderForm, price: Number(e.target.value) })}
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#4F5535] mb-1">Order Status</label>
                  <select
                    value={orderForm.orderStatus}
                    onChange={(e) => setOrderForm({ ...orderForm, orderStatus: e.target.value })}
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
                  >
                    {["Pending", "Confirmed", "Processing", "Out for Delivery", "Delivered", "Cancelled"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                className="px-4 py-2 text-slate-500 font-bold hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                className="px-5 py-2 rounded-xl text-xs font-extrabold shadow flex items-center gap-1.5 hover:opacity-90"
              >
                <Save className="w-4 h-4" /> Save Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
