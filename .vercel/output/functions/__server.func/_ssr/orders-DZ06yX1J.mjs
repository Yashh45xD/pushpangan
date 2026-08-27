import { i as __toESM } from "../_runtime.mjs";
import { t as orderService } from "./orderService-WREntGFO.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { $ as FileText, C as Search, D as Printer, E as RefreshCw, G as Info, M as Package, R as MapPin, dt as Clock, ft as CircleX, m as Star, n as X, v as ShoppingBag, vt as ChevronRight, wt as Calendar, yt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { i as useToast, r as useCart } from "./CartContext-CGJFQYZO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DZ06yX1J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FLOWER_IMAGE_MAP = [
	{
		keywords: ["rose", "roses"],
		image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5b?w=200"
	},
	{
		keywords: ["lotus"],
		image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"
	},
	{
		keywords: ["jasmine", "chameli"],
		image: "https://images.unsplash.com/photo-1591813890791-85a1db22b9e0?w=200"
	},
	{
		keywords: [
			"marigold",
			"genda",
			"tagetes"
		],
		image: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=200"
	},
	{
		keywords: ["sunflower", "sun flower"],
		image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=200"
	},
	{
		keywords: ["hibiscus", "gudhal"],
		image: "https://images.unsplash.com/photo-1596401057633-54a8b6957403?w=200"
	},
	{
		keywords: ["tulip", "tulips"],
		image: "https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=200"
	},
	{
		keywords: ["lily", "lilies"],
		image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=200"
	},
	{
		keywords: ["orchid", "orchids"],
		image: "https://images.unsplash.com/photo-1566897819059-e4d1cd76ac5c?w=200"
	},
	{
		keywords: ["daisy", "daisies"],
		image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5b?w=200"
	},
	{
		keywords: ["lavender"],
		image: "https://images.unsplash.com/photo-1499578124509-1611b77778c8?w=200"
	},
	{
		keywords: ["peony", "peonies"],
		image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=200"
	},
	{
		keywords: ["chrysanthemum", "mums"],
		image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=200"
	},
	{
		keywords: ["carnation", "carnations"],
		image: "https://images.unsplash.com/photo-1515418841082-ff3f5492a00d?w=200"
	},
	{
		keywords: ["gerbera", "daisy"],
		image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5b?w=200"
	},
	{
		keywords: ["bougainvillea"],
		image: "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?w=200"
	},
	{
		keywords: ["dahlia", "dahlias"],
		image: "https://images.unsplash.com/photo-1524650166929-c8f4cfa64697?w=200"
	},
	{
		keywords: ["aster", "asters"],
		image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5b?w=200"
	}
];
var FLOWER_FALLBACK = "https://images.unsplash.com/photo-1487530811015-780dddded18b?w=200";
function getFlowerImageByName(name) {
	if (!name) return FLOWER_FALLBACK;
	const lower = name.toLowerCase();
	for (const entry of FLOWER_IMAGE_MAP) if (entry.keywords.some((kw) => lower.includes(kw))) return entry.image;
	return FLOWER_FALLBACK;
}
function OrdersPage() {
	const { toast } = useToast();
	const { addToCart } = useCart();
	const [activeTab, setActiveTab] = (0, import_react.useState)("orders");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [timeFilter, setTimeFilter] = (0, import_react.useState)("Last 3 Months");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All");
	const [sortBy, setSortBy] = (0, import_react.useState)("Newest First");
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [selectedOrder, setSelectedOrder] = (0, import_react.useState)(null);
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [trackingOrder, setTrackingOrder] = (0, import_react.useState)(null);
	const [isTrackingModalOpen, setIsTrackingModalOpen] = (0, import_react.useState)(false);
	const [invoiceOrder, setInvoiceOrder] = (0, import_react.useState)(null);
	const [isInvoiceModalOpen, setIsInvoiceModalOpen] = (0, import_react.useState)(false);
	const [ratingOrder, setRatingOrder] = (0, import_react.useState)(null);
	const [ratingProduct, setRatingProduct] = (0, import_react.useState)(null);
	const [ratingValue, setRatingValue] = (0, import_react.useState)(5);
	const [reviewComment, setReviewComment] = (0, import_react.useState)("");
	const [isRatingModalOpen, setIsRatingModalOpen] = (0, import_react.useState)(false);
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
	(0, import_react.useEffect)(() => {
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
	const tabFilteredOrders = (0, import_react.useMemo)(() => {
		return orders.filter((order) => {
			if (activeTab === "cancelled") return order.orderStatus === "Cancelled";
			if (activeTab === "buy_again") return order.orderStatus === "Delivered";
			return order.orderStatus !== "Cancelled";
		});
	}, [orders, activeTab]);
	const searchedOrders = (0, import_react.useMemo)(() => {
		if (!searchQuery.trim()) return tabFilteredOrders;
		const query = searchQuery.toLowerCase().trim();
		return tabFilteredOrders.filter((order) => {
			if ((order.orderId || order.order_number || "").toLowerCase().includes(query)) return true;
			if (new Date(order.createdAt).toLocaleDateString().toLowerCase().includes(query)) return true;
			if ((order.orderStatus || "").toLowerCase().includes(query)) return true;
			if (order.items?.some((item) => (item.flowerName || item.product_name || "").toLowerCase().includes(query) || (item.category || "").toLowerCase().includes(query))) return true;
			return false;
		});
	}, [tabFilteredOrders, searchQuery]);
	const finalFilteredOrders = (0, import_react.useMemo)(() => {
		return searchedOrders.filter((order) => {
			if (timeFilter !== "All Orders") {
				const now = /* @__PURE__ */ new Date();
				const orderDate = new Date(order.createdAt);
				let diffDays = (now.getTime() - orderDate.getTime()) / (1e3 * 60 * 60 * 24);
				if (timeFilter === "Last 30 Days" && diffDays > 30) return false;
				if (timeFilter === "Last 3 Months" && diffDays > 90) return false;
				if (timeFilter === "Last 6 Months" && diffDays > 180) return false;
				if (timeFilter === "Last Year" && diffDays > 365) return false;
			}
			if (statusFilter !== "All") {
				if ((order.orderStatus || "").toLowerCase() !== statusFilter.toLowerCase()) return false;
			}
			return true;
		});
	}, [
		searchedOrders,
		timeFilter,
		statusFilter
	]);
	const sortedOrders = (0, import_react.useMemo)(() => {
		return [...finalFilteredOrders].sort((a, b) => {
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
				return (b.orderStatus === "Delivered" ? 1 : 0) - delA || dateB - dateA;
			}
			if (sortBy === "Pending First") {
				const pendA = [
					"Pending",
					"Confirmed",
					"Packed",
					"Shipped"
				].includes(a.orderStatus) ? 1 : 0;
				return ([
					"Pending",
					"Confirmed",
					"Packed",
					"Shipped"
				].includes(b.orderStatus) ? 1 : 0) - pendA || dateB - dateA;
			}
			return dateB - dateA;
		});
	}, [finalFilteredOrders, sortBy]);
	const itemsPerPage = 10;
	const totalPages = Math.ceil(sortedOrders.length / itemsPerPage) || 1;
	const paginatedOrders = (0, import_react.useMemo)(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return sortedOrders.slice(start, start + itemsPerPage);
	}, [sortedOrders, currentPage]);
	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	};
	const handleReorder = async (order) => {
		try {
			const items = order.items || [];
			for (const item of items) addToCart({
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
				freshness: "1 week"
			}, item.quantity);
			toast.success("Items added to basket. Opening checkout...");
			setTimeout(() => {
				window.location.href = "/checkout";
			}, 1e3);
		} catch {
			toast.error("Reorder failed.");
		}
	};
	const handleCancelOrder = async (orderId) => {
		if (!confirm("Are you sure you want to cancel this order?")) return;
		try {
			if (await orderService.cancelOrder(orderId, "Cancelled by user via portal")) {
				setOrders((prev) => prev.map((o) => o._id === orderId || o.orderId === orderId ? {
					...o,
					orderStatus: "Cancelled"
				} : o));
				toast.success("Order cancelled successfully!");
			}
		} catch {
			toast.error("Failed to cancel order.");
		}
	};
	const submitRating = async () => {
		if (!ratingOrder || !ratingProduct) return;
		try {
			await orderService.rateOrder(ratingOrder._id || ratingOrder.id, ratingProduct.productId, ratingValue, reviewComment);
			toast.success("Thank you for your rating!");
			setIsRatingModalOpen(false);
			setReviewComment("");
		} catch {
			toast.error("Could not submit review.");
		}
	};
	const getStatusColor = (status) => {
		const s = (status || "").toLowerCase();
		if (s === "pending") return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300";
		if (s === "confirmed") return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300";
		if (s === "packed" || s === "preparing" || s === "processing") return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300";
		if (s === "shipped" || s === "out for delivery") return "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300";
		if (s === "delivered") return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300";
		if (s === "cancelled") return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300";
		return "bg-slate-100 text-slate-800 border-slate-200";
	};
	const getTimelineStep = (status) => {
		const s = (status || "").toLowerCase();
		if (s === "pending") return 0;
		if (s === "confirmed") return 1;
		if (s === "packed" || s === "preparing" || s === "processing") return 2;
		if (s === "shipped" || s === "out for delivery") return 3;
		if (s === "delivered") return 4;
		return -1;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 antialiased py-8 px-4 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-6xl mx-auto space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-zinc-500 flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-primary transition",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-zinc-800 dark:text-zinc-300",
								children: "My Orders"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-3xl font-extrabold tracking-tight text-[#2E7D32] flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-8 w-8 text-[#2E7D32]" }), "My Orders"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-zinc-500 mt-1",
							children: "Track your ordered flowers, delivery status, dates, payment and address."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full md:w-80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search your orders...",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									className: "w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition shadow-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" }),
								searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSearchQuery(""),
									className: "absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex border-b border-zinc-200 dark:border-zinc-800",
						children: [
							"orders",
							"buy_again",
							"cancelled"
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setActiveTab(tab);
								setCurrentPage(1);
							},
							className: `px-5 py-3 text-sm font-semibold tracking-wide border-b-2 transition-all duration-300 capitalize ${activeTab === tab ? "border-[#2E7D32] text-[#2E7D32]" : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`,
							children: tab.replace("_", " ")
						}, tab))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-zinc-500",
									children: "Placed:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: timeFilter,
									onChange: (e) => setTimeFilter(e.target.value),
									className: "text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#2E7D32] outline-none cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last 30 Days" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last 3 Months" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last 6 Months" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last Year" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Orders" })
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-zinc-500",
									children: "Status:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: statusFilter,
									onChange: (e) => setStatusFilter(e.target.value),
									className: "text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#2E7D32] outline-none cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Pending" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Confirmed" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Processing" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Out for Delivery" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Delivered" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cancelled" })
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-zinc-500",
								children: "Sort by:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sortBy,
								onChange: (e) => setSortBy(e.target.value),
								className: "text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#2E7D32] outline-none cursor-pointer font-medium",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Newest First" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Oldest First" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Highest Amount" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Lowest Amount" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Recently Delivered" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Pending First" })
								]
							})]
						})]
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: [1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-pulse bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl h-64 shadow-sm" }, i))
					}) : paginatedOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-[#2E7D32]/10 p-6 rounded-full text-[#2E7D32] animate-bounce",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 48 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: "No Orders Yet"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-zinc-500 max-w-sm",
									children: "You haven't placed any flower orders yet. Browse our daily fresh garden collection."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition duration-300 shadow-md",
								children: "Shop Flowers 🌸"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [paginatedOrders.map((order) => {
							const statusStep = getTimelineStep(order.orderStatus || "");
							const isPending = ["Pending", "Confirmed"].includes(order.orderStatus || "");
							const isDelivered = order.orderStatus === "Delivered";
							const formattedAddress = typeof order.shippingAddress === "string" ? order.shippingAddress : [
								order.shippingAddress?.street || order.shippingAddress?.address,
								order.shippingAddress?.city,
								order.shippingAddress?.state,
								order.shippingAddress?.pincode ? `- ${order.shippingAddress?.pincode}` : ""
							].filter(Boolean).join(", ") || "Delivery Address Provided";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-50 dark:bg-zinc-800/40 p-4 border-b border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block uppercase tracking-wider text-[10px] font-bold text-zinc-400",
												children: "Order ID"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-zinc-800 dark:text-zinc-200",
												children: ["#", order.orderId || order.order_number || order._id]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block uppercase tracking-wider text-[10px] font-bold text-zinc-400",
												children: "Order Date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
													size: 12,
													className: "text-[#2E7D32]"
												}), new Date(order.createdAt).toLocaleDateString("en-IN", {
													day: "numeric",
													month: "short",
													year: "numeric"
												})]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block uppercase tracking-wider text-[10px] font-bold text-zinc-400",
												children: "Total Amount"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-[#2E7D32] text-sm block",
												children: ["₹", order.grandTotal || order.total_amount || order.totalAmount]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center justify-between md:justify-end gap-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-right",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block uppercase tracking-wider text-[10px] font-bold text-zinc-400",
														children: "Live Status"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase ${getStatusColor(order.orderStatus || "")}`,
														children: order.orderStatus || "Pending"
													})]
												})
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "divide-y divide-zinc-100 dark:divide-zinc-800",
											children: order.items?.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-4 items-center py-2.5 first:pt-0 last:pb-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: item.image || getFlowerImageByName(item.flowerName || item.product_name || item.name || ""),
														alt: item.flowerName || item.product_name,
														className: "h-16 w-16 rounded-xl object-cover border border-zinc-100 dark:border-zinc-800 shadow-sm shrink-0"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1 min-w-0",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																className: "font-semibold text-sm truncate text-zinc-900 dark:text-zinc-100",
																children: item.flowerName || item.product_name || item.name
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-zinc-500 capitalize",
																children: item.category || "Fresh Bloom"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-0.5",
																children: ["Quantity: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold",
																	children: item.quantity || item.qty
																})]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-right",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-bold text-sm text-[#2E7D32]",
															children: ["₹", (item.price || 0) * (item.quantity || item.qty || 1)]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "block text-[10px] text-zinc-400",
															children: [
																"₹",
																item.price,
																" each"
															]
														})]
													})
												]
											}, idx))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2 bg-zinc-50/70 dark:bg-zinc-800/30 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60 text-xs text-zinc-600 dark:text-zinc-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												size: 15,
												className: "text-[#2E7D32] shrink-0 mt-0.5"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-zinc-700 dark:text-zinc-200",
													children: "Delivery Address: "
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formattedAddress }),
												order.shippingAddress?.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "block text-[11px] text-zinc-400 mt-0.5",
													children: ["Contact: ", order.shippingAddress.phone]
												})
											] })]
										})]
									}),
									statusStep >= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-6 py-4 bg-zinc-50/50 dark:bg-zinc-800/20 border-t border-b border-zinc-100 dark:border-zinc-800",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[10px] md:text-xs font-semibold text-zinc-500 relative",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[8%] right-[8%] top-[14px] h-[3px] bg-zinc-200 dark:bg-zinc-800 -z-10 rounded-full" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute left-[8%] top-[14px] h-[3px] bg-[#66BB6A] -z-10 rounded-full transition-all duration-500",
													style: { width: `${statusStep / 4 * 84}%` }
												}),
												[
													{
														label: "Order Placed",
														step: 0
													},
													{
														label: "Confirmed",
														step: 1
													},
													{
														label: "Processing",
														step: 2
													},
													{
														label: "Out for Delivery",
														step: 3
													},
													{
														label: "Delivered",
														step: 4
													}
												].map((s) => {
													const isCompleted = statusStep >= s.step;
													const isCurrent = statusStep === s.step;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col items-center gap-1.5 w-1/5 text-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 ${isCompleted ? "bg-[#2E7D32] border-[#2E7D32] text-white shadow-md" : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-400"} ${isCurrent ? "animate-pulse ring-4 ring-[#66BB6A]/30 scale-110" : ""}`,
															children: isCompleted ? "✓" : s.step + 1
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `text-[10px] md:text-xs truncate max-w-full ${isCurrent ? "text-[#2E7D32] font-bold" : isCompleted ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400"}`,
															children: s.label
														})]
													}, s.label);
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-zinc-50/20 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2 items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => {
														setSelectedOrder(order);
														setIsModalOpen(true);
													},
													className: "bg-white hover:bg-zinc-50 border border-zinc-200 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700",
													title: "View Details",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "hidden sm:inline",
														children: "Details"
													})]
												}),
												statusStep >= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => {
														setTrackingOrder(order);
														setIsTrackingModalOpen(true);
													},
													className: "bg-white hover:bg-[#2E7D32]/5 border border-[#2E7D32]/30 text-[#2E7D32] px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1",
													title: "Track Package",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Track Status" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => {
														setInvoiceOrder(order);
														setIsInvoiceModalOpen(true);
													},
													className: "bg-white hover:bg-zinc-50 border border-zinc-200 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700",
													title: "Download Invoice (PDF)",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "hidden sm:inline",
														children: "Invoice"
													})]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [
												isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => handleCancelOrder(order._id || order.id),
													className: "bg-rose-50 text-rose-600 hover:bg-rose-100/80 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-rose-100",
													title: "Cancel Order",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "hidden sm:inline",
														children: "Cancel"
													})]
												}),
												isDelivered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => {
														setRatingOrder(order);
														setRatingProduct(order.items?.[0] || null);
														setRatingValue(5);
														setIsRatingModalOpen(true);
													},
													className: "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1",
													title: "Rate Order",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
														size: 14,
														className: "fill-amber-600 text-amber-600"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "hidden sm:inline",
														children: "Rate Product"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => handleReorder(order),
													className: "bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow transition flex items-center gap-1",
													title: "Buy Again / Reorder",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Buy Again" })]
												})
											]
										})]
									})
								]
							}, order._id || order.id);
						}), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handlePageChange(currentPage - 1),
									disabled: currentPage === 1,
									className: "px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 text-xs font-bold rounded-xl bg-white dark:bg-zinc-900 disabled:opacity-50 hover:bg-zinc-50 transition flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 14 }), "Prev"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1.5",
									children: Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handlePageChange(p),
										className: `h-8 w-8 text-xs font-bold rounded-xl transition ${currentPage === p ? "bg-[#2E7D32] text-white" : "bg-white hover:bg-zinc-50 text-zinc-600 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"}`,
										children: p
									}, p))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handlePageChange(currentPage + 1),
									disabled: currentPage === totalPages,
									className: "px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 text-xs font-bold rounded-xl bg-white dark:bg-zinc-900 disabled:opacity-50 hover:bg-zinc-50 transition flex items-center gap-1",
									children: ["Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
								})
							]
						})]
					})
				]
			}),
			isModalOpen && selectedOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
					onClick: () => setIsModalOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#2E7D32] text-white p-5 flex items-center justify-between shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-extrabold text-lg",
							children: "Order Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-white/85",
							children: ["#", selectedOrder.orderId || selectedOrder.order_number]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsModalOpen(false),
							className: "text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 overflow-y-auto space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-6 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-bold text-zinc-500 uppercase tracking-wider text-[10px]",
											children: "Customer Info"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: selectedOrder.shippingAddress?.fullName || "Yash Varpe"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-zinc-500 text-xs",
											children: selectedOrder.shippingAddress?.phone || "8369407007"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-zinc-500 uppercase tracking-wider text-[10px]",
										children: "Shipping Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-medium text-xs leading-relaxed text-zinc-600 dark:text-zinc-300",
										children: [
											selectedOrder.shippingAddress?.street,
											", ",
											selectedOrder.shippingAddress?.city,
											",",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											selectedOrder.shippingAddress?.state,
											" - ",
											selectedOrder.shippingAddress?.pincode
										]
									})]
								})]
							}),
							selectedOrder.deliveryInstructions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 flex gap-2 items-start text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									size: 16,
									className: "text-[#2E7D32] shrink-0 mt-0.5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold block text-zinc-700 dark:text-zinc-300",
									children: "Delivery Instructions:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-zinc-500",
									children: selectedOrder.deliveryInstructions
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-zinc-500 uppercase tracking-wider text-[10px]",
									children: "Ordered Flowers"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4",
									children: selectedOrder.items?.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-4 items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-3 items-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.image || getFlowerImageByName(item.flowerName || item.product_name || item.name || ""),
												alt: item.flowerName || item.product_name,
												className: "h-10 w-10 rounded-lg object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold block",
												children: item.flowerName || item.product_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-zinc-400 text-[10px]",
												children: ["Qty: ", item.quantity]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold",
											children: ["₹", item.price * item.quantity]
										})]
									}, idx))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-4 space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-zinc-500",
											children: "Subtotal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: ["₹", selectedOrder.subtotal]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-zinc-500",
											children: "Delivery Charge"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: selectedOrder.deliveryCharge === 0 ? "FREE" : `₹${selectedOrder.deliveryCharge}`
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-zinc-500",
											children: "GST (18%)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: ["₹", selectedOrder.gst]
										})]
									}),
									selectedOrder.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-green-600 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Discount ", selectedOrder.coupon ? `(${selectedOrder.coupon})` : ""] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-₹", selectedOrder.discount] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-zinc-200 dark:border-zinc-800 pt-2 flex justify-between font-bold text-sm text-zinc-900 dark:text-zinc-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grand Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[#2E7D32]",
											children: ["₹", selectedOrder.grandTotal || selectedOrder.total_amount]
										})]
									})
								]
							})
						]
					})]
				})]
			}),
			isTrackingModalOpen && trackingOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
					onClick: () => setIsTrackingModalOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in duration-200 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-base",
								children: "Track Delivery"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-zinc-400",
								children: ["Order #", trackingOrder.orderId || trackingOrder.order_number || trackingOrder._id]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsTrackingModalOpen(false),
								className: "text-zinc-400 hover:text-zinc-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/60 p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-zinc-500",
								children: "Live Status:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `px-3 py-1 rounded-full text-xs font-extrabold border uppercase ${getStatusColor(trackingOrder.orderStatus || "Pending")}`,
								children: trackingOrder.orderStatus || "Pending"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-5 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-200 dark:before:bg-zinc-800",
							children: [
								{
									title: "Order Placed",
									time: "Order received by Pushpangan",
									step: 0
								},
								{
									title: "Confirmed",
									time: "Seller accepted & scheduled booking",
									step: 1
								},
								{
									title: "Processing / Packed",
									time: "Fresh blooms prepared and packed",
									step: 2
								},
								{
									title: "Out for Delivery",
									time: "On delivery vehicle to your location",
									step: 3
								},
								{
									title: "Delivered",
									time: "Package delivered successfully",
									step: 4
								}
							].map((step, idx) => {
								const currentStep = getTimelineStep(trackingOrder.orderStatus || "");
								const isDone = currentStep >= step.step && currentStep !== -1;
								const isCurrent = currentStep === step.step;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 transition ${isDone ? "bg-[#2E7D32] border-[#2E7D32] scale-110" : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"} ${isCurrent ? "ring-4 ring-[#66BB6A]/40 bg-[#2E7D32] border-[#2E7D32]" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pl-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: `font-bold ${isCurrent ? "text-[#2E7D32]" : isDone ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-400"}`,
											children: step.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-zinc-400 mt-0.5",
											children: step.time
										})]
									})]
								}, idx);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl text-xs space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-zinc-400",
										children: "Delivery Partner:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Pushpangan Garden Express"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-zinc-400",
										children: "Tracking Code:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-[#2E7D32]",
										children: ["PPN-", trackingOrder.orderId || trackingOrder.order_number || trackingOrder._id]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-zinc-400",
										children: "Destination:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-right max-w-[200px] truncate",
										children: [
											trackingOrder.shippingAddress?.street || trackingOrder.shippingAddress?.address || "Address provided",
											", ",
											trackingOrder.shippingAddress?.city || "Pune"
										]
									})]
								})
							]
						})
					]
				})]
			}),
			isInvoiceModalOpen && invoiceOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
					onClick: () => setIsInvoiceModalOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in duration-200 space-y-6 max-h-[90vh] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-extrabold text-base flex items-center gap-1.5 text-zinc-800 dark:text-zinc-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
									size: 18,
									className: "text-[#2E7D32]"
								}), "Tax Invoice"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsInvoiceModalOpen(false),
								className: "text-zinc-400 hover:text-zinc-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-6 overflow-y-auto text-xs bg-white text-black",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-b pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-black text-sm text-[#2E7D32]",
										children: "PUSHPANGAN"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-zinc-500",
										children: "Fresh Flower Supplier, Pune, MH"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold uppercase text-[10px] block text-zinc-400",
											children: "Invoice No."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-sm block",
											children: ["INV-", invoiceOrder.orderId || invoiceOrder.order_number]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-bold text-[10px] uppercase text-zinc-400",
											children: "Billed To"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold block",
											children: invoiceOrder.shippingAddress?.fullName || "Yash Varpe"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-zinc-500 leading-relaxed block",
											children: [
												invoiceOrder.shippingAddress?.street,
												", ",
												invoiceOrder.shippingAddress?.city,
												", ",
												invoiceOrder.shippingAddress?.state,
												" - ",
												invoiceOrder.shippingAddress?.pincode
											]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-bold text-[10px] uppercase text-zinc-400",
												children: "Details"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Date: ", new Date(invoiceOrder.createdAt).toLocaleDateString()] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Payment: ", invoiceOrder.paymentMethod] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left border-collapse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b bg-zinc-50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 px-1",
												children: "Description"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 px-1 text-center",
												children: "Qty"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 px-1 text-right",
												children: "Rate"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 px-1 text-right",
												children: "Amount"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: invoiceOrder.items?.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 px-1",
												children: item.flowerName || item.product_name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 px-1 text-center",
												children: item.quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-2 px-1 text-right",
												children: ["₹", item.price]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-2 px-1 text-right",
												children: ["₹", item.price * item.quantity]
											})
										]
									}, idx)) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-1/2 ml-auto space-y-1 text-right",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-zinc-500",
												children: "Subtotal:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold",
												children: ["₹", invoiceOrder.subtotal]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-zinc-500",
												children: "GST (18%):"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold",
												children: ["₹", invoiceOrder.gst]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-zinc-500",
												children: "Shipping:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold",
												children: ["₹", invoiceOrder.shippingPrice || invoiceOrder.deliveryCharge || 0]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between font-bold border-t pt-1 text-[#2E7D32]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Paid:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", invoiceOrder.grandTotal || invoiceOrder.total_amount] })]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								window.print();
							},
							className: "w-full bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { size: 14 }), "Print / Save PDF"]
						})
					]
				})]
			}),
			isRatingModalOpen && ratingOrder && ratingProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
					onClick: () => setIsRatingModalOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in duration-200 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-base",
								children: "Rate Product"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsRatingModalOpen(false),
								className: "text-zinc-400 hover:text-zinc-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: ratingProduct.image || "https://images.unsplash.com/photo-1561181286-d3fee7d55364",
								alt: ratingProduct.flowerName,
								className: "h-10 w-10 rounded-lg object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-semibold",
								children: ratingProduct.flowerName || ratingProduct.product_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-zinc-400",
								children: ratingProduct.category || "Fresh Flowers"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-zinc-400",
								children: "Select Stars"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: [
									1,
									2,
									3,
									4,
									5
								].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setRatingValue(star),
									className: "p-1 hover:scale-125 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
										size: 28,
										className: star <= ratingValue ? "text-amber-500 fill-amber-500" : "text-zinc-300 dark:text-zinc-700"
									})
								}, star))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold text-zinc-500 block",
								children: "Review Comment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: reviewComment,
								onChange: (e) => setReviewComment(e.target.value),
								placeholder: "Share your experience with these flowers (freshness, aroma, package)...",
								className: "w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 h-24 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] resize-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: submitRating,
							className: "w-full bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold text-xs py-2.5 rounded-xl shadow transition",
							children: "Submit Review"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { OrdersPage as component };
