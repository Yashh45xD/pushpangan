import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { useToast } from "@/hooks/useToast";
import { useCart } from "@/lib/CartContext";
import { orderService } from "@/services/orderService";
import {
  Search,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  ChevronRight,
  FileText,
  RefreshCw,
  XCircle,
  Star,
  MessageSquare,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Info,
  Clock,
  Printer,
  ChevronDown,
  ShoppingBag,
  HelpCircle,
  SlidersHorizontal,
  X
} from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "My Orders — Pushpangan Flowers" },
      { name: "description", content: "View, search, filter, and track your Pushpangan fresh flower orders. Manage deliveries, reorder, rate items, and download invoices." },
    ],
  }),
  component: OrdersPage,
});

type TabType = "orders" | "buy_again" | "cancelled";

// Maps flower keywords to curated Unsplash images
const FLOWER_IMAGE_MAP: { keywords: string[]; image: string }[] = [
  { keywords: ["rose", "roses"], image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5b?w=200" },
  { keywords: ["lotus"], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200" },
  { keywords: ["jasmine", "chameli"], image: "https://images.unsplash.com/photo-1591813890791-85a1db22b9e0?w=200" },
  { keywords: ["marigold", "genda", "tagetes"], image: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=200" },
  { keywords: ["sunflower", "sun flower"], image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=200" },
  { keywords: ["hibiscus", "gudhal"], image: "https://images.unsplash.com/photo-1596401057633-54a8b6957403?w=200" },
  { keywords: ["tulip", "tulips"], image: "https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=200" },
  { keywords: ["lily", "lilies"], image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=200" },
  { keywords: ["orchid", "orchids"], image: "https://images.unsplash.com/photo-1566897819059-e4d1cd76ac5c?w=200" },
  { keywords: ["daisy", "daisies"], image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5b?w=200" },
  { keywords: ["lavender"], image: "https://images.unsplash.com/photo-1499578124509-1611b77778c8?w=200" },
  { keywords: ["peony", "peonies"], image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=200" },
  { keywords: ["chrysanthemum", "mums"], image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=200" },
  { keywords: ["carnation", "carnations"], image: "https://images.unsplash.com/photo-1515418841082-ff3f5492a00d?w=200" },
  { keywords: ["gerbera", "daisy"], image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5b?w=200" },
  { keywords: ["bougainvillea"], image: "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?w=200" },
  { keywords: ["dahlia", "dahlias"], image: "https://images.unsplash.com/photo-1524650166929-c8f4cfa64697?w=200" },
  { keywords: ["aster", "asters"], image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5b?w=200" },
];

const FLOWER_FALLBACK = "https://images.unsplash.com/photo-1487530811015-780dddded18b?w=200";

function getFlowerImageByName(name: string): string {
  if (!name) return FLOWER_FALLBACK;
  const lower = name.toLowerCase();
  for (const entry of FLOWER_IMAGE_MAP) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.image;
    }
  }
  return FLOWER_FALLBACK;
}

function OrdersPage() {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<TabType>("orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("Last 3 Months");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<any | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<any | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [ratingOrder, setRatingOrder] = useState<any | null>(null);
  const [ratingProduct, setRatingProduct] = useState<any | null>(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const userStr = localStorage.getItem("siteUser");
      const user = userStr ? JSON.parse(userStr) : null;
      const data = await orderService.getUserOrders(user?.email || user?._id || "guest");
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load orders", err);
      toast.error("Could not fetch order history.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load orders on mount & listen for updates
  useEffect(() => {
    fetchOrders();

    const handleUpdate = () => {
      fetchOrders();
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pushpangan_orders_updated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pushpangan_orders_updated", handleUpdate);
    };
  }, []);

  // Tab Filtering (Orders, Buy Again, Cancelled)
  const tabFilteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (activeTab === "cancelled") {
        return order.orderStatus === "Cancelled";
      }
      if (activeTab === "buy_again") {
        return order.orderStatus === "Delivered";
      }
      return order.orderStatus !== "Cancelled";
    });
  }, [orders, activeTab]);

  // Search filter
  const searchedOrders = useMemo(() => {
    if (!searchQuery.trim()) return tabFilteredOrders;
    const query = searchQuery.toLowerCase().trim();

    return tabFilteredOrders.filter((order) => {
      const orderId = (order.orderId || order.order_number || "").toLowerCase();
      if (orderId.includes(query)) return true;

      const dateStr = new Date(order.createdAt).toLocaleDateString().toLowerCase();
      if (dateStr.includes(query)) return true;

      const status = (order.orderStatus || "").toLowerCase();
      if (status.includes(query)) return true;

      const itemMatch = order.items?.some(
        (item: any) =>
          (item.flowerName || item.product_name || "").toLowerCase().includes(query) ||
          (item.category || "").toLowerCase().includes(query)
      );
      if (itemMatch) return true;

      return false;
    });
  }, [tabFilteredOrders, searchQuery]);

  // Timeframe and Status dropdown filter
  const finalFilteredOrders = useMemo(() => {
    return searchedOrders.filter((order) => {
      // Time filter
      if (timeFilter !== "All Orders") {
        const now = new Date();
        const orderDate = new Date(order.createdAt);
        let diffMs = now.getTime() - orderDate.getTime();
        let diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (timeFilter === "Last 30 Days" && diffDays > 30) return false;
        if (timeFilter === "Last 3 Months" && diffDays > 90) return false;
        if (timeFilter === "Last 6 Months" && diffDays > 180) return false;
        if (timeFilter === "Last Year" && diffDays > 365) return false;
      }

      // Status filter
      if (statusFilter !== "All") {
        const status = order.orderStatus || "";
        if (status.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }

      return true;
    });
  }, [searchedOrders, timeFilter, statusFilter]);

  // Sorting
  const sortedOrders = useMemo(() => {
    const list = [...finalFilteredOrders];
    return list.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      const amtA = a.grandTotal || a.total_amount || 0;
      const amtB = b.grandTotal || b.total_amount || 0;

      if (sortBy === "Newest First") return dateB - dateA;
      if (sortBy === "Oldest First") return dateA - dateB;
      if (sortBy === "Highest Amount") return amtB - amtA;
      if (sortBy === "Lowest Amount") return amtA - amtB;
      if (sortBy === "Recently Delivered") {
        const delA = a.orderStatus === "Delivered" ? 1 : 0;
        const delB = b.orderStatus === "Delivered" ? 1 : 0;
        return delB - delA || dateB - dateA;
      }
      if (sortBy === "Pending First") {
        const pendA = ["Pending", "Confirmed", "Packed", "Shipped"].includes(a.orderStatus) ? 1 : 0;
        const pendB = ["Pending", "Confirmed", "Packed", "Shipped"].includes(b.orderStatus) ? 1 : 0;
        return pendB - pendA || dateB - dateA;
      }
      return dateB - dateA;
    });
  }, [finalFilteredOrders, sortBy]);

  // Pagination (10 per page)
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(start, start + itemsPerPage);
  }, [sortedOrders, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Order Actions
  const handleReorder = async (order: any) => {
    try {
      const items = order.items || [];
      for (const item of items) {
        addToCart(
          {
            slug: item.productId || `slug_${Date.now()}`,
            name: item.flowerName || item.product_name,
            price: item.price,
            image: item.image || "https://images.unsplash.com/photo-1561181286-d3fee7d55364",
            category: item.category || "Flowers",
            unit: "per Bundle",
            color: "Multicolor",
            description: "",
            available: true,
            occasions: ["Any"],
            freshness: "1 week",
          },
          item.quantity
        );
      }
      toast.success("Items added to basket. Opening checkout...");
      setTimeout(() => {
        window.location.href = "/checkout";
      }, 1000);
    } catch {
      toast.error("Reorder failed.");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const updated = await orderService.cancelOrder(orderId, "Cancelled by user via portal");
      if (updated) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId || o.orderId === orderId ? { ...o, orderStatus: "Cancelled" } : o
          )
        );
        toast.success("Order cancelled successfully!");
      }
    } catch {
      toast.error("Failed to cancel order.");
    }
  };

  const submitRating = async () => {
    if (!ratingOrder || !ratingProduct) return;
    try {
      const result = await orderService.rateOrder(
        ratingOrder._id || ratingOrder.id,
        ratingProduct.productId,
        ratingValue,
        reviewComment
      );
      toast.success("Thank you for your rating!");
      setIsRatingModalOpen(false);
      setReviewComment("");
    } catch {
      toast.error("Could not submit review.");
    }
  };

  // Helpers
  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "pending") return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300";
    if (s === "confirmed") return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300";
    if (s === "packed" || s === "preparing" || s === "processing") return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300";
    if (s === "shipped" || s === "out for delivery") return "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300";
    if (s === "delivered") return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300";
    if (s === "cancelled") return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300";
    return "bg-slate-100 text-slate-800 border-slate-200";
  };

  const getTimelineStep = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "pending") return 0;
    if (s === "confirmed") return 1;
    if (s === "packed" || s === "preparing" || s === "processing") return 2;
    if (s === "shipped" || s === "out for delivery") return 3;
    if (s === "delivered") return 4;
    return -1; // cancelled
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 antialiased py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Breadcrumbs */}
        <div className="text-xs text-zinc-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-zinc-800 dark:text-zinc-300">My Orders</span>
        </div>

        {/* ─── HEADER SECTION ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#2E7D32] flex items-center gap-2">
              <Package className="h-8 w-8 text-[#2E7D32]" />
              My Orders
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Track your ordered flowers, delivery status, dates, payment and address.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search your orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition shadow-sm"
            />
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ─── TABS ─── */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          {(["orders", "buy_again", "cancelled"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`px-5 py-3 text-sm font-semibold tracking-wide border-b-2 transition-all duration-300 capitalize ${
                activeTab === tab
                  ? "border-[#2E7D32] text-[#2E7D32]"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* ─── FILTERS & SORTING ─── */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-500">Placed:</span>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#2E7D32] outline-none cursor-pointer"
              >
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>All Orders</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#2E7D32] outline-none cursor-pointer"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Processing</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#2E7D32] outline-none cursor-pointer font-medium"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Highest Amount</option>
              <option>Lowest Amount</option>
              <option>Recently Delivered</option>
              <option>Pending First</option>
            </select>
          </div>
        </div>

        {/* ─── ORDERS LIST ─── */}
        {isLoading ? (
          /* Skeletons */
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl h-64 shadow-sm" />
            ))}
          </div>
        ) : paginatedOrders.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-6">
            <div className="bg-[#2E7D32]/10 p-6 rounded-full text-[#2E7D32] animate-bounce">
              <ShoppingBag size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">No Orders Yet</h2>
              <p className="text-sm text-zinc-500 max-w-sm">
                You haven't placed any flower orders yet. Browse our daily fresh garden collection.
              </p>
            </div>
            <Link
              to="/shop"
              className="bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition duration-300 shadow-md"
            >
              Shop Flowers 🌸
            </Link>
          </div>
        ) : (
          /* Real List */
          <div className="space-y-6">
            {paginatedOrders.map((order) => {
              const statusStep = getTimelineStep(order.orderStatus || "");
              const isPending = ["Pending", "Confirmed"].includes(order.orderStatus || "");
              const isDelivered = order.orderStatus === "Delivered";
              const formattedAddress = typeof order.shippingAddress === "string" 
                ? order.shippingAddress 
                : [
                    order.shippingAddress?.street || order.shippingAddress?.address,
                    order.shippingAddress?.city,
                    order.shippingAddress?.state,
                    order.shippingAddress?.pincode ? `- ${order.shippingAddress?.pincode}` : ""
                  ].filter(Boolean).join(", ") || "Delivery Address Provided";

              return (
                <div
                  key={order._id || order.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  {/* Top Bar Header: Order ID, Date, Payment, Grand Total & Admin Status */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-50 dark:bg-zinc-800/40 p-4 border-b border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                    <div>
                      <span className="block uppercase tracking-wider text-[10px] font-bold text-zinc-400">Order ID</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">#{order.orderId || order.order_number || order._id}</span>
                    </div>
                    <div>
                      <span className="block uppercase tracking-wider text-[10px] font-bold text-zinc-400">Order Date</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                        <Calendar size={12} className="text-[#2E7D32]" />
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div>
                      <span className="block uppercase tracking-wider text-[10px] font-bold text-zinc-400">Total Amount</span>
                      <span className="font-bold text-[#2E7D32] text-sm block">
                        ₹{order.grandTotal || order.total_amount || order.totalAmount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-2">
                      <div className="text-right">
                        <span className="block uppercase tracking-wider text-[10px] font-bold text-zinc-400">Live Status</span>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase ${getStatusColor(order.orderStatus || "")}`}>
                          {order.orderStatus || "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body - Ordered Flowers */}
                  <div className="p-4 space-y-3">
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-center py-2.5 first:pt-0 last:pb-0">
                          <img
                            src={item.image || getFlowerImageByName(item.flowerName || item.product_name || item.name || "")}
                            alt={item.flowerName || item.product_name}
                            className="h-16 w-16 rounded-xl object-cover border border-zinc-100 dark:border-zinc-800 shadow-sm shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate text-zinc-900 dark:text-zinc-100">
                              {item.flowerName || item.product_name || item.name}
                            </h4>
                            <p className="text-xs text-zinc-500 capitalize">{item.category || "Fresh Bloom"}</p>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
                              Quantity: <span className="font-bold">{item.quantity || item.qty}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-sm text-[#2E7D32]">₹{(item.price || 0) * (item.quantity || item.qty || 1)}</span>
                            <span className="block text-[10px] text-zinc-400">₹{item.price} each</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address Section */}
                    <div className="flex items-start gap-2 bg-zinc-50/70 dark:bg-zinc-800/30 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60 text-xs text-zinc-600 dark:text-zinc-300">
                      <MapPin size={15} className="text-[#2E7D32] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-zinc-700 dark:text-zinc-200">Delivery Address: </span>
                        <span>{formattedAddress}</span>
                        {order.shippingAddress?.phone && (
                          <span className="block text-[11px] text-zinc-400 mt-0.5">Contact: {order.shippingAddress.phone}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Timeline Tracker (Updated in Real-Time by Admin) */}
                  {statusStep >= 0 && (
                    <div className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-800/20 border-t border-b border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center justify-between text-[10px] md:text-xs font-semibold text-zinc-500 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[8%] right-[8%] top-[14px] h-[3px] bg-zinc-200 dark:bg-zinc-800 -z-10 rounded-full" />
                        <div
                          className="absolute left-[8%] top-[14px] h-[3px] bg-[#66BB6A] -z-10 rounded-full transition-all duration-500"
                          style={{ width: `${(statusStep / 4) * 84}%` }}
                        />

                        {/* Steps */}
                        {[
                          { label: "Order Placed", step: 0 },
                          { label: "Confirmed", step: 1 },
                          { label: "Processing", step: 2 },
                          { label: "Out for Delivery", step: 3 },
                          { label: "Delivered", step: 4 }
                        ].map((s) => {
                          const isCompleted = statusStep >= s.step;
                          const isCurrent = statusStep === s.step;

                          return (
                            <div key={s.label} className="flex flex-col items-center gap-1.5 w-1/5 text-center">
                              <span
                                className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 ${
                                  isCompleted
                                    ? "bg-[#2E7D32] border-[#2E7D32] text-white shadow-md"
                                    : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-400"
                                } ${isCurrent ? "animate-pulse ring-4 ring-[#66BB6A]/30 scale-110" : ""}`}
                              >
                                {isCompleted ? "✓" : s.step + 1}
                              </span>
                              <span className={`text-[10px] md:text-xs truncate max-w-full ${isCurrent ? "text-[#2E7D32] font-bold" : isCompleted ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400"}`}>
                                {s.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions / Buttons Footer */}
                  <div className="p-4 bg-zinc-50/20 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="bg-white hover:bg-zinc-50 border border-zinc-200 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        title="View Details"
                      >
                        <Info size={14} />
                        <span className="hidden sm:inline">Details</span>
                      </button>

                      {statusStep >= 0 && (
                        <button
                          onClick={() => {
                            setTrackingOrder(order);
                            setIsTrackingModalOpen(true);
                          }}
                          className="bg-white hover:bg-[#2E7D32]/5 border border-[#2E7D32]/30 text-[#2E7D32] px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1"
                          title="Track Package"
                        >
                          <Clock size={14} />
                          <span>Track Status</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setInvoiceOrder(order);
                          setIsInvoiceModalOpen(true);
                        }}
                        className="bg-white hover:bg-zinc-50 border border-zinc-200 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        title="Download Invoice (PDF)"
                      >
                        <FileText size={14} />
                        <span className="hidden sm:inline">Invoice</span>
                      </button>
                    </div>

                    <div className="flex gap-2">
                      {isPending && (
                        <button
                          onClick={() => handleCancelOrder(order._id || order.id)}
                          className="bg-rose-50 text-rose-600 hover:bg-rose-100/80 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-rose-100"
                          title="Cancel Order"
                        >
                          <XCircle size={14} />
                          <span className="hidden sm:inline">Cancel</span>
                        </button>
                      )}

                      {isDelivered && (
                        <button
                          onClick={() => {
                            setRatingOrder(order);
                            setRatingProduct(order.items?.[0] || null);
                            setRatingValue(5);
                            setIsRatingModalOpen(true);
                          }}
                          className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
                          title="Rate Order"
                        >
                          <Star size={14} className="fill-amber-600 text-amber-600" />
                          <span className="hidden sm:inline">Rate Product</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleReorder(order)}
                        className="bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow transition flex items-center gap-1"
                        title="Buy Again / Reorder"
                      >
                        <RefreshCw size={14} />
                        <span>Buy Again</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 text-xs font-bold rounded-xl bg-white dark:bg-zinc-900 disabled:opacity-50 hover:bg-zinc-50 transition flex items-center gap-1"
                >
                  <ChevronLeft size={14} />
                  Prev
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`h-8 w-8 text-xs font-bold rounded-xl transition ${
                        currentPage === p
                          ? "bg-[#2E7D32] text-white"
                          : "bg-white hover:bg-zinc-50 text-zinc-600 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 text-xs font-bold rounded-xl bg-white dark:bg-zinc-900 disabled:opacity-50 hover:bg-zinc-50 transition flex items-center gap-1"
                >
                  Next
                  <ChevronRightIcon size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── ORDER DETAILS MODAL ─── */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#2E7D32] text-white p-5 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-extrabold text-lg">Order Details</h3>
                <span className="text-xs text-white/85">#{selectedOrder.orderId || selectedOrder.order_number}</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Customer and Delivery details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Customer Info</h4>
                  <p className="font-semibold">{selectedOrder.shippingAddress?.fullName || "Yash Varpe"}</p>
                  <p className="text-zinc-500 text-xs">{selectedOrder.shippingAddress?.phone || "8369407007"}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Shipping Address</h4>
                  <p className="font-medium text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city},<br/>
                    {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                  </p>
                </div>
              </div>

              {/* Delivery instructions */}
              {selectedOrder.deliveryInstructions && (
                <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 flex gap-2 items-start text-xs">
                  <Clock size={16} className="text-[#2E7D32] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-zinc-700 dark:text-zinc-300">Delivery Instructions:</span>
                    <span className="text-zinc-500">{selectedOrder.deliveryInstructions}</span>
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Ordered Flowers</h4>
                <div className="space-y-3 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center justify-between text-xs">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.image || getFlowerImageByName(item.flowerName || item.product_name || item.name || "")}
                          alt={item.flowerName || item.product_name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-semibold block">{item.flowerName || item.product_name}</span>
                          <span className="text-zinc-400 text-[10px]">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-semibold">₹{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Delivery Charge</span>
                  <span className="font-semibold">{selectedOrder.deliveryCharge === 0 ? "FREE" : `₹${selectedOrder.deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">GST (18%)</span>
                  <span className="font-semibold">₹{selectedOrder.gst}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount {selectedOrder.coupon ? `(${selectedOrder.coupon})` : ""}</span>
                    <span>-₹{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2 flex justify-between font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  <span>Grand Total</span>
                  <span className="text-[#2E7D32]">₹{selectedOrder.grandTotal || selectedOrder.total_amount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TRACKING MODAL ─── */}
      {isTrackingModalOpen && trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTrackingModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in duration-200 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Track Delivery</h3>
                <span className="text-xs text-zinc-400">Order #{trackingOrder.orderId || trackingOrder.order_number || trackingOrder._id}</span>
              </div>
              <button onClick={() => setIsTrackingModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X size={20} />
              </button>
            </div>

            {/* Current Status Badge updated by admin */}
            <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/60 p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-500">Live Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold border uppercase ${getStatusColor(trackingOrder.orderStatus || "Pending")}`}>
                {trackingOrder.orderStatus || "Pending"}
              </span>
            </div>

            {/* Tracking timeline */}
            <div className="space-y-5 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-200 dark:before:bg-zinc-800">
              {[
                { title: "Order Placed", time: "Order received by Pushpangan", step: 0 },
                { title: "Confirmed", time: "Seller accepted & scheduled booking", step: 1 },
                { title: "Processing / Packed", time: "Fresh blooms prepared and packed", step: 2 },
                { title: "Out for Delivery", time: "On delivery vehicle to your location", step: 3 },
                { title: "Delivered", time: "Package delivered successfully", step: 4 }
              ].map((step, idx) => {
                const currentStep = getTimelineStep(trackingOrder.orderStatus || "");
                const isDone = currentStep >= step.step && currentStep !== -1;
                const isCurrent = currentStep === step.step;

                return (
                  <div key={idx} className="relative text-xs">
                    <span
                      className={`absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 transition ${
                        isDone
                          ? "bg-[#2E7D32] border-[#2E7D32] scale-110"
                          : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                      } ${isCurrent ? "ring-4 ring-[#66BB6A]/40 bg-[#2E7D32] border-[#2E7D32]" : ""}`}
                    />
                    <div className="pl-2">
                      <h4 className={`font-bold ${isCurrent ? "text-[#2E7D32]" : isDone ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-400"}`}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{step.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Delivery Partner:</span>
                <span className="font-semibold">Pushpangan Garden Express</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Tracking Code:</span>
                <span className="font-semibold text-[#2E7D32]">PPN-{trackingOrder.orderId || trackingOrder.order_number || trackingOrder._id}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-400">Destination:</span>
                <span className="font-semibold text-right max-w-[200px] truncate">
                  {trackingOrder.shippingAddress?.street || trackingOrder.shippingAddress?.address || "Address provided"}, {trackingOrder.shippingAddress?.city || "Pune"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── INVOICE MODAL (PDF View simulator) ─── */}
      {isInvoiceModalOpen && invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsInvoiceModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in duration-200 space-y-6 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
              <h3 className="font-extrabold text-base flex items-center gap-1.5 text-zinc-800 dark:text-zinc-100">
                <Printer size={18} className="text-[#2E7D32]" />
                Tax Invoice
              </h3>
              <button onClick={() => setIsInvoiceModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X size={20} />
              </button>
            </div>

            {/* Simulated Invoice PDF paper content */}
            <div className="border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-6 overflow-y-auto text-xs bg-white text-black">
              {/* Header */}
              <div className="flex justify-between border-b pb-4">
                <div>
                  <h4 className="font-black text-sm text-[#2E7D32]">PUSHPANGAN</h4>
                  <p className="text-[10px] text-zinc-500">Fresh Flower Supplier, Pune, MH</p>
                </div>
                <div className="text-right">
                  <span className="font-bold uppercase text-[10px] block text-zinc-400">Invoice No.</span>
                  <span className="font-bold text-sm block">INV-{invoiceOrder.orderId || invoiceOrder.order_number}</span>
                </div>
              </div>

              {/* Dates & Billing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block font-bold text-[10px] uppercase text-zinc-400">Billed To</span>
                  <span className="font-bold block">{invoiceOrder.shippingAddress?.fullName || "Yash Varpe"}</span>
                  <span className="text-[10px] text-zinc-500 leading-relaxed block">
                    {invoiceOrder.shippingAddress?.street}, {invoiceOrder.shippingAddress?.city}, {invoiceOrder.shippingAddress?.state} - {invoiceOrder.shippingAddress?.pincode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-[10px] uppercase text-zinc-400">Details</span>
                  <p>Date: {new Date(invoiceOrder.createdAt).toLocaleDateString()}</p>
                  <p>Payment: {invoiceOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-zinc-50">
                    <th className="py-2 px-1">Description</th>
                    <th className="py-2 px-1 text-center">Qty</th>
                    <th className="py-2 px-1 text-right">Rate</th>
                    <th className="py-2 px-1 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceOrder.items?.map((item: any, idx: number) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-1">{item.flowerName || item.product_name}</td>
                      <td className="py-2 px-1 text-center">{item.quantity}</td>
                      <td className="py-2 px-1 text-right">₹{item.price}</td>
                      <td className="py-2 px-1 text-right">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Calculation Summary */}
              <div className="w-1/2 ml-auto space-y-1 text-right">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal:</span>
                  <span className="font-semibold">₹{invoiceOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">GST (18%):</span>
                  <span className="font-semibold">₹{invoiceOrder.gst}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping:</span>
                  <span className="font-semibold">₹{invoiceOrder.shippingPrice || invoiceOrder.deliveryCharge || 0}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-1 text-[#2E7D32]">
                  <span>Total Paid:</span>
                  <span>₹{invoiceOrder.grandTotal || invoiceOrder.total_amount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="w-full bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 shadow"
            >
              <Printer size={14} />
              Print / Save PDF
            </button>
          </div>
        </div>
      )}

      {/* ─── RATING MODAL ─── */}
      {isRatingModalOpen && ratingOrder && ratingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsRatingModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in duration-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base">Rate Product</h3>
              <button onClick={() => setIsRatingModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-xs">
              <img
                src={ratingProduct.image || "https://images.unsplash.com/photo-1561181286-d3fee7d55364"}
                alt={ratingProduct.flowerName}
                className="h-10 w-10 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold">{ratingProduct.flowerName || ratingProduct.product_name}</h4>
                <p className="text-[10px] text-zinc-400">{ratingProduct.category || "Fresh Flowers"}</p>
              </div>
            </div>

            {/* Stars Selector */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400">Select Stars</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingValue(star)}
                    className="p-1 hover:scale-125 transition"
                  >
                    <Star
                      size={28}
                      className={star <= ratingValue ? "text-amber-500 fill-amber-500" : "text-zinc-300 dark:text-zinc-700"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-zinc-500 block">Review Comment</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with these flowers (freshness, aroma, package)..."
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 h-24 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] resize-none"
              />
            </div>

            <button
              onClick={submitRating}
              className="w-full bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
