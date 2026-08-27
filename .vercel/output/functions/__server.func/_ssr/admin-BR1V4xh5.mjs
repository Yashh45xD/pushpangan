import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { $ as FileText, At as ArrowUpRight, B as LogOut, C as Search, D as Printer, Dt as Bell, E as RefreshCw, Et as Boxes, F as MessageSquare, H as LayoutDashboard, J as History, K as IndianRupee, L as Menu, M as Package, Mt as ArrowDownRight, O as Plus, Ot as Ban, Q as Flower2, R as MapPin, S as Server, St as ChartColumn, U as Layers, Y as Globe, Z as FolderTree, _ as ShoppingCart, _t as CircleAlert, a as UserPlus, at as EllipsisVertical, b as ShieldCheck, c as TrendingUp, ct as CreditCard, d as Tag, dt as Clock, et as FileSpreadsheet, ft as CircleX, g as Sparkles, h as SquarePen, ht as CircleCheck, j as Pen, k as Phone, kt as Award, l as Trash2, lt as Copy, m as Star, mt as CirclePlus, n as X, nt as Eye, o as Truck, p as Store, q as Image, r as Users, rt as EyeOff, s as TriangleAlert, st as Database, tt as FileCode, u as Ticket, ut as CloudUpload, v as ShoppingBag, vt as ChevronRight, w as Save, wt as Calendar, x as Settings, xt as Check, y as Shield, yt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as FLOWERS } from "./productService-DaSRxsDy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAdminAuth, i as adminService, n as AdminLogin, r as ProductDetailView, t as AdminAuthProvider } from "./ProductDetailView-BYVGrZFq.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BR1V4xh5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AdminLayout = ({ activeTab, setActiveTab, children }) => {
	const { admin, logout } = useAdminAuth();
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [showNotifications, setShowNotifications] = (0, import_react.useState)(false);
	const sidebarGroups = [
		{
			group: "Overview",
			items: [{
				id: "dashboard",
				label: "Dashboard",
				icon: LayoutDashboard
			}]
		},
		{
			group: "Management",
			items: [
				{
					id: "sellers",
					label: "Sellers / Florists",
					icon: Store
				},
				{
					id: "customers",
					label: "Users",
					icon: Users
				},
				{
					id: "flowers",
					label: "Products (Flowers/Bouquets)",
					icon: Flower2
				},
				{
					id: "orders",
					label: "Orders",
					icon: ShoppingBag,
					badge: "Live"
				}
			]
		},
		{
			group: "Discover & Services",
			items: [{
				id: "categories",
				label: "Categories",
				icon: FolderTree
			}, {
				id: "services",
				label: "Services",
				icon: Layers
			}]
		},
		{
			group: "Finance",
			items: [{
				id: "payments",
				label: "Finance & Payments",
				icon: CreditCard
			}]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			backgroundColor: "#F5F3E9",
			color: "#4F5535"
		},
		className: "min-h-screen flex flex-col font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			style: {
				backgroundColor: "#FFFFFF",
				borderColor: "#E2DCBE"
			},
			className: "h-16 px-4 lg:px-8 flex items-center justify-between border-b sticky top-0 z-40 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSidebarOpen(true),
						className: "lg:hidden p-2 rounded-xl text-[#4F5535] hover:bg-[#F5F3E9]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { backgroundColor: "#B68F38" },
							className: "w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm transition group-hover:scale-105",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, { className: "w-5 h-5 text-white" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: { color: "#4F5535" },
							className: "font-extrabold text-base tracking-tight",
							children: ["Pushpangan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "#B68F38" },
								className: "font-normal text-xs",
								children: "– Fresh Flowers"
							})]
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden md:flex items-center gap-6 ml-4 text-xs font-extrabold text-[#4F5535]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "hover:text-[#B68F38] transition",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "hover:text-[#B68F38] transition",
								children: "Sell"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "hover:text-[#B68F38] transition",
								children: "Discover"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative hidden sm:block w-48 lg:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							style: { color: "#9F905E" },
							className: "absolute left-3 top-2.5 w-3.5 h-3.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: "Search catalog, orders...",
							style: {
								backgroundColor: "#F5F3E9",
								borderColor: "#E2DCBE",
								color: "#4F5535"
							},
							className: "w-full text-xs rounded-xl py-2 pl-8 pr-3 outline-none border focus:border-[#B68F38] font-medium"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/basket",
						style: {
							backgroundColor: "#4F5535",
							color: "#FFFFFF"
						},
						className: "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-sm hover:opacity-90 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "View Cart"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowNotifications(!showNotifications),
							style: {
								backgroundColor: "#F5F3E9",
								borderColor: "#E2DCBE",
								color: "#4F5535"
							},
							className: "p-2 rounded-xl border transition hover:bg-[#E2DCBE]/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4" })
						}), showNotifications && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								backgroundColor: "#FFFFFF",
								borderColor: "#E2DCBE",
								color: "#4F5535"
							},
							className: "absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl p-4 border z-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { borderColor: "#E2DCBE" },
								className: "flex items-center justify-between pb-2 border-b mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									style: { color: "#B68F38" },
									className: "text-xs font-extrabold uppercase",
									children: "Notifications"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] bg-[#B68F38] text-white px-2 py-0.5 rounded-full font-bold",
									children: "Live"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs opacity-75",
								children: "No new notifications."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							backgroundColor: "#B68F38",
							color: "#FFFFFF"
						},
						className: "w-8 h-8 rounded-full flex items-center justify-center font-black text-xs uppercase shadow-sm cursor-default",
						title: admin?.name || "Admin",
						children: admin?.name ? admin.name.trim().charAt(0).toUpperCase() : "A"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex min-w-0",
			children: [
				sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					onClick: () => setSidebarOpen(false),
					className: "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					style: {
						backgroundColor: "#FFFFFF",
						borderColor: "#E2DCBE"
					},
					className: "fixed lg:static top-16 bottom-0 left-0 z-40 w-64 border-r flex flex-col transition-transform duration-300 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar",
						children: sidebarGroups.map((grp, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { color: "#9F905E" },
								className: "text-[10px] font-extrabold uppercase tracking-wider px-2",
								children: grp.group
							}), grp.items.map((item) => {
								const Icon = item.icon;
								let targetTab = item.id;
								if (item.id === "sellers") targetTab = "customers";
								if (item.id === "services") targetTab = "delivery";
								const isActive = activeTab === targetTab;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setActiveTab(targetTab);
										setSidebarOpen(false);
									},
									style: {
										backgroundColor: isActive ? "#F5F3E9" : "transparent",
										color: isActive ? "#4F5535" : "#666851",
										borderColor: isActive ? "#E2DCBE" : "transparent"
									},
									className: `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all border ${isActive ? "font-extrabold shadow-xs" : "hover:bg-[#F5F3E9]/60 hover:text-[#4F5535]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											style: { color: isActive ? "#B68F38" : "#9F905E" },
											className: "w-4 h-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
									}), item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { backgroundColor: "#B68F38" },
										className: "px-2 py-0.5 rounded-full text-[9px] text-white font-black",
										children: item.badge
									})]
								}, item.id);
							})]
						}, idx))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { borderColor: "#E2DCBE" },
						className: "p-4 border-t",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: logout,
							style: {
								backgroundColor: "#F5F3E9",
								color: "#4F5535",
								borderColor: "#E2DCBE"
							},
							className: "w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-extrabold hover:bg-[#E2DCBE]/40 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4 text-rose-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Logout Session" })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar",
					children
				})
			]
		})]
	});
};
var DashboardView = () => {
	const [stats, setStats] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const fetchStats = async () => {
			try {
				const res = await adminService.getDashboardStats();
				setStats(res);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-pulse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { backgroundColor: "#FFFFFF" },
			className: "h-8 w-48 rounded-lg border border-[#E2DCBE]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4",
			children: [...Array(10)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { backgroundColor: "#FFFFFF" },
				className: "h-28 rounded-2xl border border-[#E2DCBE]"
			}, i))
		})]
	});
	const cards = stats?.cards || {};
	const charts = stats?.charts || {};
	const CHART_COLORS = [
		"#B68F38",
		"#4F5535",
		"#9F905E",
		"#666851",
		"#d9a441"
	];
	const kpiCards = [
		{
			title: "Today's Orders",
			value: cards.todayOrders,
			change: "+14%",
			isUp: true,
			icon: ShoppingBag,
			color: "#B68F38"
		},
		{
			title: "Today's Revenue",
			value: `₹${cards.todayRevenue?.toLocaleString()}`,
			change: "+18%",
			isUp: true,
			icon: IndianRupee,
			color: "#4F5535"
		},
		{
			title: "Monthly Revenue",
			value: `₹${cards.monthlyRevenue?.toLocaleString()}`,
			change: "+24%",
			isUp: true,
			icon: TrendingUp,
			color: "#B68F38"
		},
		{
			title: "Total Customers",
			value: cards.totalCustomers,
			change: "+8%",
			isUp: true,
			icon: Users,
			color: "#4F5535"
		},
		{
			title: "Pending Orders",
			value: cards.pendingOrders,
			change: "Action Needed",
			isUp: false,
			icon: Clock,
			color: "#9F905E"
		},
		{
			title: "Completed Orders",
			value: cards.completedOrders,
			change: "98.2% Rate",
			isUp: true,
			icon: CircleCheck,
			color: "#4F5535"
		},
		{
			title: "Cancelled Orders",
			value: cards.cancelledOrders,
			change: "-2.1%",
			isUp: true,
			icon: CircleX,
			color: "#666851"
		},
		{
			title: "Low Stock Flowers",
			value: cards.lowStockFlowers,
			change: "Restock Now",
			isUp: false,
			icon: TriangleAlert,
			color: "#B68F38"
		},
		{
			title: "Best Selling Flower",
			value: cards.bestSellingFlower,
			change: "Yellow Marigold",
			isUp: true,
			icon: Award,
			color: "#4F5535"
		},
		{
			title: "Recent Registrations",
			value: cards.recentCustomers?.length || 5,
			change: "Today",
			isUp: true,
			icon: Calendar,
			color: "#9F905E"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					backgroundColor: "#FFFFFF",
					borderColor: "#E2DCBE",
					color: "#4F5535"
				},
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-2xl font-extrabold flex items-center gap-2",
					style: { color: "#4F5535" },
					children: ["Pushpangan Executive Overview ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						style: { color: "#B68F38" },
						className: "w-5 h-5"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { color: "#666851" },
					className: "text-xs mt-1 font-medium",
					children: "Wholesale & Retail Fresh Flower Telemetry, Daily Sales & Inventory Controls"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						backgroundColor: "#F5F3E9",
						color: "#B68F38",
						borderColor: "#E2DCBE"
					},
					className: "text-xs font-extrabold px-3.5 py-1.5 rounded-xl border",
					children: "Jul 2026 Live Telemetry"
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
				children: kpiCards.map((card, idx) => {
					const Icon = card.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							backgroundColor: "#FFFFFF",
							borderColor: "#E2DCBE"
						},
						className: "p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: "#666851" },
									className: "text-xs font-bold truncate",
									children: card.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { backgroundColor: card.color },
									className: "p-2 rounded-xl text-white shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { color: "#4F5535" },
								className: "text-xl font-extrabold tracking-tight truncate",
								children: card.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-1 text-[11px] font-bold",
								children: [card.isUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: { color: "#4F5535" },
									className: "flex items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5" }),
										" ",
										card.change
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: { color: "#B68F38" },
									className: "flex items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "w-3.5 h-3.5" }),
										" ",
										card.change
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: "#9F905E" },
									className: "font-normal",
									children: "vs last week"
								})]
							})
						]
					}, idx);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							backgroundColor: "#FFFFFF",
							borderColor: "#E2DCBE"
						},
						className: "p-5 rounded-3xl border shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: { color: "#4F5535" },
								className: "text-sm font-extrabold",
								children: "Daily Order Volume"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { color: "#666851" },
								className: "text-[11px]",
								children: "Order count for the past 7 days"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									backgroundColor: "rgba(182, 143, 56, 0.15)",
									color: "#B68F38",
									borderColor: "#E2DCBE"
								},
								className: "text-xs font-extrabold px-2.5 py-1 rounded-full border",
								children: "Orders/Day"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: charts.dailySales || [],
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#E2DCBE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "day",
											stroke: "#666851",
											fontSize: 11
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "#666851",
											fontSize: 11
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											backgroundColor: "#FFFFFF",
											borderColor: "#E2DCBE",
											borderRadius: "12px",
											fontSize: "12px",
											color: "#4F5535"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "sales",
											fill: "#B68F38",
											radius: [
												6,
												6,
												0,
												0
											]
										})
									]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							backgroundColor: "#FFFFFF",
							borderColor: "#E2DCBE"
						},
						className: "p-5 rounded-3xl border shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: { color: "#4F5535" },
								className: "text-sm font-extrabold",
								children: "Monthly Revenue Growth"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { color: "#666851" },
								className: "text-[11px]",
								children: "Total revenue trajectory in INR (₹)"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									backgroundColor: "rgba(79, 85, 53, 0.15)",
									color: "#4F5535",
									borderColor: "#E2DCBE"
								},
								className: "text-xs font-extrabold px-2.5 py-1 rounded-full border",
								children: "₹ Revenue"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
									data: charts.monthlySales || [],
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "colorRev",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "5%",
												stopColor: "#4F5535",
												stopOpacity: .6
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "95%",
												stopColor: "#4F5535",
												stopOpacity: 0
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#E2DCBE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "month",
											stroke: "#666851",
											fontSize: 11
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "#666851",
											fontSize: 11
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											backgroundColor: "#FFFFFF",
											borderColor: "#E2DCBE",
											borderRadius: "12px",
											fontSize: "12px",
											color: "#4F5535"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "revenue",
											stroke: "#4F5535",
											fillOpacity: 1,
											fill: "url(#colorRev)"
										})
									]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							backgroundColor: "#FFFFFF",
							borderColor: "#E2DCBE"
						},
						className: "p-5 rounded-3xl border shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: { color: "#4F5535" },
								className: "text-sm font-extrabold",
								children: "Top Selling Flower Share"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { color: "#666851" },
								className: "text-[11px]",
								children: "Sales breakdown by flower variety"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: charts.topSellingFlowers || [],
										cx: "50%",
										cy: "50%",
										innerRadius: 60,
										outerRadius: 85,
										paddingAngle: 5,
										dataKey: "sales",
										children: (charts.topSellingFlowers || []).map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: CHART_COLORS[index % CHART_COLORS.length] }, `cell-${index}`))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										backgroundColor: "#FFFFFF",
										borderColor: "#E2DCBE",
										borderRadius: "12px",
										fontSize: "12px",
										color: "#4F5535"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
										fontSize: "11px",
										color: "#666851"
									} })
								] })
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							backgroundColor: "#FFFFFF",
							borderColor: "#E2DCBE"
						},
						className: "p-5 rounded-3xl border shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: { color: "#4F5535" },
								className: "text-sm font-extrabold",
								children: "Category Demand Growth"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { color: "#666851" },
								className: "text-[11px]",
								children: "Category sales volume vs growth index"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: charts.categoryPerformance || [],
									layout: "vertical",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#E2DCBE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											type: "number",
											stroke: "#666851",
											fontSize: 11
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											dataKey: "category",
											type: "category",
											stroke: "#666851",
											fontSize: 11,
											width: 80
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											backgroundColor: "#FFFFFF",
											borderColor: "#E2DCBE",
											borderRadius: "12px",
											fontSize: "12px",
											color: "#4F5535"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "sales",
											fill: "#9F905E",
											radius: [
												0,
												6,
												6,
												0
											]
										})
									]
								})
							})
						})]
					})
				]
			})
		]
	});
};
var STORAGE_KEY = "pushpangan_admin_products";
var flowersToAdminProducts = () => {
	return FLOWERS.map((f) => ({
		_id: f.slug,
		name: f.name,
		slug: f.slug,
		category: f.category,
		color: f.color,
		price: f.price,
		discountPrice: Math.round(f.price * .9),
		stockQuantity: 100,
		unit: f.unit,
		image: f.image,
		images: [f.image],
		description: f.description,
		shortDescription: f.description,
		scientificName: "",
		occasions: f.occasions,
		freshness: f.freshness,
		season: "All Season",
		isFeatured: true,
		isBestSeller: false,
		isTrending: false,
		tags: f.occasions.join(", ").toLowerCase(),
		status: "published",
		minOrderQuantity: 1,
		available: f.available
	}));
};
var loadProducts = () => {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			const parsed = JSON.parse(saved);
			if (Array.isArray(parsed) && parsed.length > 0) return parsed;
		}
	} catch {}
	const defaults = flowersToAdminProducts();
	localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
	return defaults;
};
var saveProducts = (products) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};
var categoriesList = [
	"Marigold",
	"Rose",
	"Traditional",
	"Exotic",
	"Seasonal",
	"Bouquet",
	"Garlands",
	"Loose Flowers",
	"Flower Petals",
	"Wedding Flowers",
	"Decoration Flowers",
	"Festival Flowers"
];
var FlowersView = () => {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("All");
	const [stockFilter, setStockFilter] = (0, import_react.useState)("All");
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const [successMsg, setSuccessMsg] = (0, import_react.useState)("");
	const [deleteConfirm, setDeleteConfirm] = (0, import_react.useState)(null);
	const [viewingProductId, setViewingProductId] = (0, import_react.useState)(null);
	const emptyForm = {
		_id: "",
		name: "",
		slug: "",
		category: "Marigold",
		color: "Yellow",
		price: 100,
		discountPrice: 90,
		stockQuantity: 100,
		unit: "per Kg",
		image: "",
		images: [],
		description: "",
		shortDescription: "",
		scientificName: "",
		occasions: ["Festival", "Pooja"],
		freshness: "Same-day harvest",
		season: "All Season",
		isFeatured: false,
		isBestSeller: false,
		isTrending: false,
		tags: "puja, fresh",
		status: "published",
		minOrderQuantity: 1,
		available: true
	};
	const [formData, setFormData] = (0, import_react.useState)({ ...emptyForm });
	(0, import_react.useEffect)(() => {
		const loaded = loadProducts();
		setProducts(loaded);
		setLoading(false);
	}, []);
	const filteredProducts = (0, import_react.useMemo)(() => {
		let list = [...products];
		if (selectedCategory !== "All") list = list.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
		if (stockFilter === "In Stock") list = list.filter((p) => p.available && p.stockQuantity > 0);
		else if (stockFilter === "Out of Stock") list = list.filter((p) => !p.available || p.stockQuantity <= 0);
		if (search.trim()) {
			const q = search.toLowerCase();
			list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.color.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags?.toLowerCase().includes(q));
		}
		return list;
	}, [
		products,
		selectedCategory,
		stockFilter,
		search
	]);
	const showSuccess = (msg) => {
		setSuccessMsg(msg);
		setTimeout(() => setSuccessMsg(""), 2500);
	};
	const handleOpenModal = (product) => {
		if (product) {
			setEditingProduct(product);
			setFormData({ ...product });
		} else {
			setEditingProduct(null);
			setFormData({ ...emptyForm });
		}
		setShowModal(true);
	};
	const handleSave = (e) => {
		e.preventDefault();
		let updated;
		if (editingProduct) {
			updated = products.map((p) => p._id === editingProduct._id ? {
				...formData,
				_id: editingProduct._id,
				slug: editingProduct.slug
			} : p);
			showSuccess(`"${formData.name}" updated successfully!`);
		} else {
			const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
			updated = [{
				...formData,
				_id: "flw_" + Date.now(),
				slug,
				images: formData.image ? [formData.image, ...formData.images.filter((i) => i !== formData.image)] : formData.images,
				available: true
			}, ...products];
			showSuccess(`"${formData.name}" added successfully!`);
		}
		setProducts(updated);
		saveProducts(updated);
		setShowModal(false);
	};
	const handleDelete = (id) => {
		const updated = products.filter((p) => p._id !== id);
		setProducts(updated);
		saveProducts(updated);
		setDeleteConfirm(null);
		showSuccess("Product deleted.");
	};
	const handleDuplicate = (product) => {
		const updated = [{
			...product,
			_id: "flw_" + Date.now(),
			slug: product.slug + "-copy-" + Date.now(),
			name: product.name + " (Copy)"
		}, ...products];
		setProducts(updated);
		saveProducts(updated);
		showSuccess(`"${product.name}" duplicated!`);
	};
	const handleToggleStatus = (id) => {
		const updated = products.map((p) => p._id === id ? {
			...p,
			status: p.status === "published" ? "draft" : "published"
		} : p);
		setProducts(updated);
		saveProducts(updated);
	};
	const handleToggleStock = (id) => {
		const updated = products.map((p) => {
			if (p._id !== id) return p;
			const nowAvailable = !(p.available && p.stockQuantity > 0);
			return {
				...p,
				available: nowAvailable,
				stockQuantity: nowAvailable ? Math.max(p.stockQuantity || 1, 1) : 0
			};
		});
		setProducts(updated);
		saveProducts(updated);
		const product = updated.find((p) => p._id === id);
		showSuccess(`"${product?.name}" marked as ${product?.available ? "In Stock" : "Out of Stock"}!`);
	};
	const handleImageUpload = (e) => {
		const files = e.target.files;
		if (files && files[0]) {
			const reader = new FileReader();
			reader.onload = (uploadEvent) => {
				const url = uploadEvent.target?.result;
				setFormData((prev) => ({
					...prev,
					image: prev.image || url,
					images: [...prev.images, url]
				}));
			};
			reader.readAsDataURL(files[0]);
		}
	};
	const handleRemoveImage = (idx) => {
		const newImages = formData.images.filter((_, i) => i !== idx);
		setFormData({
			...formData,
			images: newImages,
			image: newImages[0] || ""
		});
	};
	const totalProducts = products.length;
	const publishedCount = products.filter((p) => p.status === "published").length;
	const draftCount = products.filter((p) => p.status === "draft").length;
	const lowStockCount = products.filter((p) => p.stockQuantity <= 10).length;
	if (viewingProductId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDetailView, {
		productId: viewingProductId,
		onBack: () => setViewingProductId(null),
		onEdit: (prod) => {
			setViewingProductId(null);
			handleOpenModal(prod);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 font-sans",
		children: [
			successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					backgroundColor: "#4F5535",
					color: "#FFFFFF"
				},
				className: "fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-bold animate-pulse",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }),
					" ",
					successMsg
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					style: { color: "#4F5535" },
					className: "text-xl font-extrabold flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, {
						style: { color: "#B68F38" },
						className: "w-6 h-6"
					}), "Flower Product Management"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { color: "#666851" },
					className: "text-xs mt-1",
					children: "Add, edit, duplicate, and manage your entire flower catalog. Changes are reflected on the shop instantly."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleOpenModal(),
						style: {
							backgroundColor: "#4F5535",
							color: "#FFFFFF"
						},
						className: "px-4 py-2.5 rounded-xl font-bold text-xs shadow hover:opacity-90 transition flex items-center gap-1.5 border border-[#9F905E]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add New Flower"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
				children: [
					{
						label: "Total Products",
						value: totalProducts,
						icon: Package,
						color: "#4F5535"
					},
					{
						label: "Published",
						value: publishedCount,
						icon: Eye,
						color: "#16a34a"
					},
					{
						label: "Drafts",
						value: draftCount,
						icon: EyeOff,
						color: "#9F905E"
					},
					{
						label: "Low Stock",
						value: lowStockCount,
						icon: CircleAlert,
						color: "#dc2626"
					}
				].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						backgroundColor: "#FFFFFF",
						borderColor: "#E2DCBE"
					},
					className: "border rounded-2xl p-4 flex items-center gap-3 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							backgroundColor: stat.color + "18",
							color: stat.color
						},
						className: "w-10 h-10 rounded-xl flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(stat.icon, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { color: "#666851" },
						className: "text-[10px] font-bold uppercase",
						children: stat.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { color: "#4F5535" },
						className: "text-lg font-extrabold",
						children: stat.value
					})] })]
				}, stat.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					backgroundColor: "#FFFFFF",
					borderColor: "#E2DCBE"
				},
				className: "p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:w-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						style: { color: "#9F905E" },
						className: "absolute left-3 top-2.5 w-4 h-4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search flower by name, color, tag...",
						style: {
							backgroundColor: "#F5F3E9",
							borderColor: "#E2DCBE",
							color: "#4F5535"
						},
						className: "w-full border rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-[#B68F38] font-medium"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 w-full sm:w-auto overflow-x-auto flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "#666851" },
							className: "text-xs font-bold whitespace-nowrap",
							children: "Category:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: selectedCategory,
							onChange: (e) => setSelectedCategory(e.target.value),
							style: {
								backgroundColor: "#F5F3E9",
								borderColor: "#E2DCBE",
								color: "#4F5535"
							},
							className: "border rounded-xl py-2 px-3 text-xs outline-none focus:border-[#B68F38] font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "All",
								children: "All Categories"
							}), categoriesList.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: cat,
								children: cat
							}, cat))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "#666851" },
							className: "text-xs font-bold whitespace-nowrap",
							children: "Stock:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1.5",
							children: [
								"All",
								"In Stock",
								"Out of Stock"
							].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStockFilter(opt),
								style: {
									backgroundColor: stockFilter === opt ? opt === "In Stock" ? "#E2DCBE" : opt === "Out of Stock" ? "rgba(184,50,69,0.12)" : "#4F5535" : "#F5F3E9",
									color: stockFilter === opt ? opt === "In Stock" ? "#4F5535" : opt === "Out of Stock" ? "#B83245" : "#FFFFFF" : "#666851",
									borderColor: stockFilter === opt ? opt === "In Stock" ? "#9F905E" : opt === "Out of Stock" ? "#B83245" : "#4F5535" : "#E2DCBE"
								},
								className: "px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition whitespace-nowrap",
								children: opt
							}, opt))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: { color: "#9F905E" },
							className: "text-[10px] font-bold whitespace-nowrap",
							children: [
								filteredProducts.length,
								" result",
								filteredProducts.length !== 1 ? "s" : ""
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					backgroundColor: "#FFFFFF",
					borderColor: "#E2DCBE"
				},
				className: "border rounded-2xl overflow-hidden shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							style: {
								backgroundColor: "#F5F3E9",
								borderColor: "#E2DCBE",
								color: "#4F5535"
							},
							className: "border-b text-[11px] font-bold uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Flower Info"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Price"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Stock"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Badges"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 text-right",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							style: { borderColor: "#E2DCBE" },
							className: "divide-y text-xs",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "py-16 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, {
										style: { color: "#B68F38" },
										className: "w-8 h-8 animate-spin"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#666851" },
										className: "font-bold",
										children: "Loading flower catalog..."
									})]
								})
							}) }) : filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "py-16 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, {
										style: { color: "#9F905E" },
										className: "w-8 h-8"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#666851" },
										className: "font-bold",
										children: "No flowers found matching your filters."
									})]
								})
							}) }) : filteredProducts.map((flw) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-[#F5F3E9]/50 transition group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: flw.image || flw.images?.[0] || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=150",
												alt: flw.name,
												className: "w-12 h-12 rounded-xl object-cover border border-[#E2DCBE] shadow-sm"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: { color: "#4F5535" },
												className: "font-extrabold text-sm group-hover:text-[#B68F38] transition",
												children: flw.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: { color: "#9F905E" },
												className: "text-[10px] font-medium",
												children: [
													flw.color,
													" · ",
													flw.unit
												]
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												backgroundColor: "#F5F3E9",
												color: "#4F5535",
												borderColor: "#E2DCBE"
											},
											className: "px-2.5 py-1 rounded-full text-[10px] font-bold border",
											children: flw.category
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										style: { color: "#4F5535" },
										className: "py-3 px-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-extrabold text-sm",
											children: ["₹", flw.discountPrice || flw.price]
										}), flw.discountPrice && flw.discountPrice < flw.price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: { color: "#9F905E" },
											className: "text-[10px] line-through",
											children: ["₹", flw.price]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-start gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												style: {
													backgroundColor: flw.stockQuantity <= 10 ? "rgba(220, 38, 38, 0.1)" : flw.stockQuantity <= 30 ? "rgba(182, 143, 56, 0.15)" : "rgba(79, 85, 53, 0.1)",
													color: flw.stockQuantity <= 10 ? "#dc2626" : flw.stockQuantity <= 30 ? "#B68F38" : "#4F5535",
													borderColor: "#E2DCBE"
												},
												className: "px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
												children: [
													flw.stockQuantity,
													" ",
													flw.unit
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleToggleStock(flw._id),
												title: "Click to toggle stock availability",
												style: {
													backgroundColor: flw.available && flw.stockQuantity > 0 ? "#E2DCBE" : "rgba(184,50,69,0.12)",
													color: flw.available && flw.stockQuantity > 0 ? "#4F5535" : "#B83245",
													borderColor: flw.available && flw.stockQuantity > 0 ? "#9F905E" : "#B83245"
												},
												className: "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border transition hover:opacity-80 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
													width: 6,
													height: 6,
													borderRadius: "50%",
													backgroundColor: flw.available && flw.stockQuantity > 0 ? "#4F5535" : "#B83245",
													display: "inline-block",
													flexShrink: 0
												} }), flw.available && flw.stockQuantity > 0 ? "In Stock" : "Out of Stock"]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-1",
											children: [
												flw.isFeatured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														backgroundColor: "#4F5535",
														color: "#FFFFFF"
													},
													className: "px-1.5 py-0.5 rounded text-[9px] font-bold",
													children: "Featured"
												}),
												flw.isBestSeller && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														backgroundColor: "#B68F38",
														color: "#FFFFFF"
													},
													className: "px-1.5 py-0.5 rounded text-[9px] font-bold",
													children: "Best Seller"
												}),
												flw.isTrending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-700",
													children: "Trending"
												}),
												!flw.isFeatured && !flw.isBestSeller && !flw.isTrending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: { color: "#9F905E" },
													className: "text-[10px]",
													children: "—"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleToggleStatus(flw._id),
											style: {
												backgroundColor: flw.status === "published" ? "rgba(22, 163, 74, 0.12)" : "#E9E7DF",
												color: flw.status === "published" ? "#16a34a" : "#666851",
												borderColor: flw.status === "published" ? "rgba(22, 163, 74, 0.3)" : "#E2DCBE"
											},
											className: "px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border transition hover:opacity-80",
											children: [flw.status === "published" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3 h-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "capitalize",
												children: flw.status
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => setViewingProductId(flw.slug || flw._id),
													title: "View Product Details Page",
													style: {
														backgroundColor: "#4F5535",
														color: "#FFFFFF"
													},
													className: "px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:opacity-90 transition shadow-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }), " View"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleDuplicate(flw),
													title: "Duplicate Flower",
													style: {
														backgroundColor: "#F5F3E9",
														color: "#4F5535"
													},
													className: "p-1.5 rounded-lg border border-[#E2DCBE] hover:opacity-80 transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleOpenModal(flw),
													title: "Edit Flower",
													style: {
														backgroundColor: "#B68F38",
														color: "#FFFFFF"
													},
													className: "p-1.5 rounded-lg hover:opacity-90 transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-3.5 h-3.5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setDeleteConfirm(flw._id),
													title: "Delete Flower",
													style: {
														backgroundColor: "#F5F3E9",
														color: "#b91c1c"
													},
													className: "p-1.5 rounded-lg border border-rose-200 hover:bg-rose-600 hover:text-white transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
												})
											]
										})
									})
								]
							}, flw._id))
						})]
					})
				})
			}),
			deleteConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						backgroundColor: "#FFFFFF",
						borderColor: "#E2DCBE"
					},
					className: "border rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-6 h-6 text-red-500" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: { color: "#4F5535" },
							className: "text-base font-extrabold mb-1",
							children: "Delete this flower?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { color: "#666851" },
							className: "text-xs mb-5",
							children: "This action cannot be undone. The flower will be removed from your catalog."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDeleteConfirm(null),
								style: { color: "#666851" },
								className: "px-4 py-2 rounded-xl font-bold text-xs hover:text-[#4F5535]",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(deleteConfirm),
								className: "px-5 py-2 rounded-xl font-bold text-xs bg-red-600 text-white shadow hover:bg-red-700 transition",
								children: "Yes, Delete"
							})]
						})
					]
				})
			}),
			showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						backgroundColor: "#FFFFFF",
						borderColor: "#E2DCBE",
						color: "#4F5535"
					},
					className: "border rounded-3xl p-6 w-full max-w-3xl my-8 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { borderColor: "#E2DCBE" },
						className: "flex items-center justify-between pb-4 border-b mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							style: { color: "#4F5535" },
							className: "text-lg font-extrabold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								style: { color: "#B68F38" },
								className: "w-5 h-5"
							}), editingProduct ? "Edit Flower Details" : "Add New Flower Product"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowModal(false),
							className: "text-slate-400 hover:text-[#4F5535] transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSave,
						className: "space-y-5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									style: { color: "#4F5535" },
									className: "block font-bold mb-1",
									children: "Flower Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: formData.name,
									onChange: (e) => setFormData({
										...formData,
										name: e.target.value
									}),
									placeholder: "e.g. Yellow Dutch Marigold",
									style: {
										backgroundColor: "#F5F3E9",
										borderColor: "#E2DCBE",
										color: "#4F5535"
									},
									className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									style: { color: "#4F5535" },
									className: "block font-bold mb-1",
									children: "Scientific Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: formData.scientificName,
									onChange: (e) => setFormData({
										...formData,
										scientificName: e.target.value
									}),
									placeholder: "e.g. Tagetes erecta",
									style: {
										backgroundColor: "#F5F3E9",
										borderColor: "#E2DCBE",
										color: "#4F5535"
									},
									className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 md:grid-cols-4 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: { color: "#4F5535" },
										className: "block font-bold mb-1",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: formData.category,
										onChange: (e) => setFormData({
											...formData,
											category: e.target.value
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium",
										children: categoriesList.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: cat,
											children: cat
										}, cat))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: { color: "#4F5535" },
										className: "block font-bold mb-1",
										children: "Color"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: formData.color,
										onChange: (e) => setFormData({
											...formData,
											color: e.target.value
										}),
										placeholder: "Yellow / Red / White",
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: { color: "#4F5535" },
										className: "block font-bold mb-1",
										children: "Season"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: formData.season,
										onChange: (e) => setFormData({
											...formData,
											season: e.target.value
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "All Season",
												children: "All Season"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Spring",
												children: "Spring"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Summer",
												children: "Summer"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Monsoon",
												children: "Monsoon"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Winter",
												children: "Winter"
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: { color: "#4F5535" },
										className: "block font-bold mb-1",
										children: "Unit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: formData.unit,
										onChange: (e) => setFormData({
											...formData,
											unit: e.target.value
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "per Kg",
												children: "per Kg"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "per Piece",
												children: "per Piece"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "per Garland",
												children: "per Garland"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "per Bundle",
												children: "per Bundle"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "per Basket",
												children: "per Basket"
											})
										]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 md:grid-cols-4 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: { color: "#4F5535" },
										className: "block font-bold mb-1",
										children: "Regular Price (₹) *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										min: "0",
										value: formData.price,
										onChange: (e) => setFormData({
											...formData,
											price: Number(e.target.value)
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: { color: "#4F5535" },
										className: "block font-bold mb-1",
										children: "Discount Price (₹)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0",
										value: formData.discountPrice,
										onChange: (e) => setFormData({
											...formData,
											discountPrice: Number(e.target.value)
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: { color: "#4F5535" },
										className: "block font-bold mb-1",
										children: "Stock Quantity *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										min: "0",
										value: formData.stockQuantity,
										onChange: (e) => setFormData({
											...formData,
											stockQuantity: Number(e.target.value)
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: { color: "#4F5535" },
										className: "block font-bold mb-1",
										children: "Min Order Qty"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "1",
										value: formData.minOrderQuantity,
										onChange: (e) => setFormData({
											...formData,
											minOrderQuantity: Number(e.target.value)
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: { color: "#4F5535" },
								className: "block font-bold mb-1",
								children: "Description *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								rows: 3,
								value: formData.description,
								onChange: (e) => setFormData({
									...formData,
									description: e.target.value,
									shortDescription: e.target.value
								}),
								placeholder: "Describe the flower — fragrance, freshness, ideal uses...",
								style: {
									backgroundColor: "#F5F3E9",
									borderColor: "#E2DCBE",
									color: "#4F5535"
								},
								className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium resize-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									style: { color: "#4F5535" },
									className: "block font-bold mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
										className: "w-3.5 h-3.5 inline mr-1",
										style: { color: "#B68F38" }
									}), "Product Image"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-3 mb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: formData.image,
										onChange: (e) => setFormData({
											...formData,
											image: e.target.value
										}),
										placeholder: "Paste image URL (Cloudinary, Unsplash, etc.)",
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "flex-1 border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
									})
								}),
								(formData.image || formData.images.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2 mb-3",
									children: [formData.image, ...formData.images.filter((i) => i !== formData.image)].filter(Boolean).filter((val, idx, arr) => arr.indexOf(val) === idx).map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img,
											alt: `Product ${idx}`,
											className: "w-16 h-16 rounded-xl object-cover border border-[#E2DCBE] shadow-sm"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleRemoveImage(idx),
											className: "absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3 h-3" })
										})]
									}, idx))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										backgroundColor: "#F5F3E9",
										borderColor: "#E2DCBE"
									},
									className: "border-2 border-dashed rounded-2xl p-4 text-center hover:border-[#B68F38] transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
											style: { color: "#B68F38" },
											className: "w-7 h-7 mx-auto mb-1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: { color: "#4F5535" },
											className: "font-bold text-[11px]",
											children: "Drag & drop flower images or browse file"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											onChange: handleImageUpload,
											className: "hidden",
											id: "fileUploadAdmin"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "fileUploadAdmin",
											style: {
												backgroundColor: "#4F5535",
												color: "#FFFFFF"
											},
											className: "mt-2 inline-block px-3 py-1.5 rounded-lg cursor-pointer font-bold text-[11px] hover:opacity-90 transition",
											children: "Browse Local File"
										})
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									style: { color: "#4F5535" },
									className: "block font-bold mb-2",
									children: "Badges"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-3",
									children: [
										{
											key: "isFeatured",
											label: "Featured"
										},
										{
											key: "isBestSeller",
											label: "Best Seller"
										},
										{
											key: "isTrending",
											label: "Trending"
										}
									].map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-1.5 cursor-pointer select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: formData[badge.key],
											onChange: (e) => setFormData({
												...formData,
												[badge.key]: e.target.checked
											}),
											className: "w-3.5 h-3.5 accent-[#B68F38]"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { color: "#4F5535" },
											className: "font-medium",
											children: badge.label
										})]
									}, badge.key))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									style: { color: "#4F5535" },
									className: "block font-bold mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
										className: "w-3.5 h-3.5 inline mr-1",
										style: { color: "#B68F38" }
									}), "Tags (comma separated)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: formData.tags,
									onChange: (e) => setFormData({
										...formData,
										tags: e.target.value
									}),
									placeholder: "puja, wedding, fresh, garland",
									style: {
										backgroundColor: "#F5F3E9",
										borderColor: "#E2DCBE",
										color: "#4F5535"
									},
									className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									style: { color: "#4F5535" },
									className: "block font-bold mb-1",
									children: "Freshness"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: formData.freshness,
									onChange: (e) => setFormData({
										...formData,
										freshness: e.target.value
									}),
									style: {
										backgroundColor: "#F5F3E9",
										borderColor: "#E2DCBE",
										color: "#4F5535"
									},
									className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Same-day harvest",
											children: "Same-day harvest"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Cold-chain fresh",
											children: "Cold-chain fresh"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "24hr fresh",
											children: "24hr fresh"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Dawn Plucked 100% Fresh",
											children: "Dawn Plucked 100% Fresh"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									style: { color: "#4F5535" },
									className: "block font-bold mb-1",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: formData.status,
									onChange: (e) => setFormData({
										...formData,
										status: e.target.value
									}),
									style: {
										backgroundColor: "#F5F3E9",
										borderColor: "#E2DCBE",
										color: "#4F5535"
									},
									className: "w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "published",
										children: "Published (Visible on Shop)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "draft",
										children: "Draft (Hidden)"
									})]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { borderColor: "#E2DCBE" },
								className: "flex justify-end gap-3 pt-4 border-t",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowModal(false),
									className: "px-4 py-2.5 rounded-xl text-[#666851] hover:text-[#4F5535] font-bold transition",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									style: {
										backgroundColor: "#4F5535",
										color: "#FFFFFF"
									},
									className: "px-6 py-2.5 rounded-xl font-bold shadow hover:opacity-90 transition border border-[#9F905E] flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }), editingProduct ? "Save Changes" : "Add Flower Product"]
								})]
							})
						]
					})]
				})
			})
		]
	});
};
var CategoriesView = () => {
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [editingCat, setEditingCat] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		description: "",
		image: ""
	});
	const fetchCategories = async () => {
		setLoading(true);
		try {
			const res = await adminService.getCategories();
			if (res.success && res.categories) setCategories(res.categories);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchCategories();
	}, []);
	const handleOpenModal = (cat) => {
		if (cat) {
			setEditingCat(cat);
			setFormData({
				name: cat.name,
				description: cat.description || "",
				image: cat.image || ""
			});
		} else {
			setEditingCat(null);
			setFormData({
				name: "",
				description: "",
				image: ""
			});
		}
		setShowModal(true);
	};
	const handleSave = async (e) => {
		e.preventDefault();
		const payload = { ...formData };
		if (editingCat) payload._id = editingCat._id;
		await adminService.saveCategory(payload);
		setShowModal(false);
		fetchCategories();
	};
	const handleDelete = async (id) => {
		if (!confirm("Are you sure you want to delete this category?")) return;
		await adminService.deleteCategory(id);
		fetchCategories();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderTree, { className: "w-5 h-5 text-rose-400" }), " Category Management"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: "Organize flowers by varieties, occasion garlands, petals, and festival collections"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => handleOpenModal(),
					className: "px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add Category"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
				children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:border-rose-500/30 transition-all hover:-translate-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-32 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: cat.image || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
								alt: cat.name,
								className: "w-full h-full object-cover group-hover:scale-110 transition duration-500"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-rose-300 border border-rose-500/30",
								children: [cat.productCount || 6, " Products"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-base text-white",
								children: cat.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mt-1 line-clamp-2",
								children: cat.description || "Fresh floral category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 pt-3 border-t border-slate-800 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
									children: "Active"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleOpenModal(cat),
										className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-3.5 h-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleDelete(cat._id),
										className: "p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
									})]
								})]
							})
						]
					})]
				}, cat._id || cat.slug))
			}),
			showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-white mb-4",
						children: editingCat ? "Edit Category" : "Add New Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSave,
						className: "space-y-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Category Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: formData.name,
								onChange: (e) => setFormData({
									...formData,
									name: e.target.value
								}),
								placeholder: "e.g. Marigold",
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Image URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: formData.image,
								onChange: (e) => setFormData({
									...formData,
									image: e.target.value
								}),
								placeholder: "https://images.unsplash.com/...",
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: formData.description,
								onChange: (e) => setFormData({
									...formData,
									description: e.target.value
								}),
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowModal(false),
									className: "px-4 py-2 text-slate-400 hover:text-white",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl",
									children: "Save Category"
								})]
							})
						]
					})]
				})
			})
		]
	});
};
var formatLocation = (ord) => {
	if (!ord) return "Address not specified";
	if (typeof ord.shippingAddress === "string") return ord.shippingAddress;
	if (ord.shippingAddress && typeof ord.shippingAddress === "object") {
		const parts = [
			ord.shippingAddress.address || ord.shippingAddress.street,
			ord.shippingAddress.city,
			ord.shippingAddress.state,
			ord.shippingAddress.pincode ? `- ${ord.shippingAddress.pincode}` : ""
		].filter(Boolean);
		if (parts.length > 0) return parts.join(", ");
	}
	const parts = [
		ord.address || ord.shipping_address,
		ord.city || ord.shipping_city,
		ord.state || ord.shipping_state,
		ord.pincode || ord.shipping_pincode ? `- ${ord.pincode || ord.shipping_pincode}` : ""
	].filter(Boolean);
	return parts.length > 0 ? parts.join(", ") : "Address not specified";
};
var OrdersView = () => {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedStatusTab, setSelectedStatusTab] = (0, import_react.useState)("All Orders");
	const [selectedOrder, setSelectedOrder] = (0, import_react.useState)(null);
	const [showInvoiceModal, setShowInvoiceModal] = (0, import_react.useState)(false);
	const [showOrderModal, setShowOrderModal] = (0, import_react.useState)(false);
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [orderForm, setOrderForm] = (0, import_react.useState)({
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
		orderStatus: "Pending"
	});
	const filterTabs = [
		"All Orders",
		"Pending",
		"Confirmed",
		"Out for Delivery",
		"Delivered",
		"Cancelled"
	];
	const fetchOrders = async () => {
		try {
			let list = (await adminService.getOrders()).orders || [];
			const saved = localStorage.getItem("pushpangan_admin_orders");
			if (saved) list = JSON.parse(saved);
			else if (list.length === 0) {
				list = [
					{
						_id: "ord-101",
						orderNumber: "ORD-2026-901",
						customerName: "Aarav Sharma",
						customerEmail: "aarav@example.com",
						customerPhone: "+91 98765 11111",
						itemName: "Royal Dutch Red Roses Bouquet",
						items: [{
							name: "Royal Dutch Red Roses Bouquet",
							price: 499,
							quantity: 1,
							subtotal: 499
						}],
						createdAt: "2026-08-12",
						finalAmount: 549,
						totalAmount: 499,
						orderStatus: "Out for Delivery",
						paymentStatus: "Paid",
						paymentMethod: "UPI",
						shippingAddress: {
							address: "Flat 402, Sunshine Heights, MG Road",
							city: "Pune",
							state: "Maharashtra",
							pincode: "411001"
						}
					},
					{
						_id: "ord-102",
						orderNumber: "ORD-2026-902",
						customerName: "Sneha Kulkarni",
						customerEmail: "sneha@example.com",
						customerPhone: "+91 98765 22222",
						itemName: "Yellow Marigold Festival Garland",
						items: [{
							name: "Yellow Marigold Festival Garland",
							price: 299,
							quantity: 2,
							subtotal: 598
						}],
						createdAt: "2026-08-13",
						finalAmount: 648,
						totalAmount: 598,
						orderStatus: "Confirmed",
						paymentStatus: "Paid",
						paymentMethod: "Credit Card",
						shippingAddress: {
							address: "12, Rose Villa, Baner Link Road",
							city: "Pune",
							state: "Maharashtra",
							pincode: "411045"
						}
					},
					{
						_id: "ord-103",
						orderNumber: "ORD-2026-903",
						customerName: "Vikram Patil",
						customerEmail: "vikram@example.com",
						customerPhone: "+91 98765 33333",
						itemName: "Pink Lotus Sacred Altar Set",
						items: [{
							name: "Pink Lotus Sacred Altar Set",
							price: 350,
							quantity: 1,
							subtotal: 350
						}],
						createdAt: "2026-08-11",
						finalAmount: 400,
						totalAmount: 350,
						orderStatus: "Delivered",
						paymentStatus: "Paid",
						paymentMethod: "UPI",
						shippingAddress: {
							address: "Kothrud Depot Road, Ideal Colony",
							city: "Pune",
							state: "Maharashtra",
							pincode: "411038"
						}
					},
					{
						_id: "ord-104",
						orderNumber: "ORD-2026-904",
						customerName: "Ananya Deshmukh",
						customerEmail: "ananya@example.com",
						customerPhone: "+91 98765 44444",
						itemName: "Jasmine Mogra Veni Set",
						items: [{
							name: "Jasmine Mogra Veni Set",
							price: 899,
							quantity: 1,
							subtotal: 899
						}],
						createdAt: "2026-08-10",
						finalAmount: 949,
						totalAmount: 899,
						orderStatus: "Pending",
						paymentStatus: "Pending",
						paymentMethod: "COD",
						shippingAddress: {
							address: "FC Road, Near Goodluck Cafe, Deccan",
							city: "Pune",
							state: "Maharashtra",
							pincode: "411004"
						}
					},
					{
						_id: "ord-105",
						orderNumber: "ORD-2026-905",
						customerName: "Rohan Kulkarni",
						customerEmail: "rohan@example.com",
						customerPhone: "+91 98765 55555",
						itemName: "Red Hibiscus 21-Set Bloom",
						items: [{
							name: "Red Hibiscus 21-Set Bloom",
							price: 315,
							quantity: 1,
							subtotal: 315
						}],
						createdAt: "2026-08-09",
						finalAmount: 365,
						totalAmount: 315,
						orderStatus: "Cancelled",
						paymentStatus: "Refunded",
						paymentMethod: "UPI",
						shippingAddress: {
							address: "Plot 88, Viman Nagar Phase 2",
							city: "Pune",
							state: "Maharashtra",
							pincode: "411014"
						}
					}
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
	(0, import_react.useEffect)(() => {
		fetchOrders();
		const handleUpdate = () => {
			fetchOrders();
		};
		window.addEventListener("storage", handleUpdate);
		window.addEventListener("pushpangan_orders_updated", handleUpdate);
		const interval = setInterval(fetchOrders, 2e3);
		return () => {
			window.removeEventListener("storage", handleUpdate);
			window.removeEventListener("pushpangan_orders_updated", handleUpdate);
			clearInterval(interval);
		};
	}, []);
	const saveToLocal = (newOrders) => {
		setOrders(newOrders);
		localStorage.setItem("pushpangan_admin_orders", JSON.stringify(newOrders));
		if (typeof window !== "undefined") {
			window.dispatchEvent(new Event("storage"));
			window.dispatchEvent(new Event("pushpangan_orders_updated"));
		}
	};
	const handleUpdateStatus = async (orderId, newStatus) => {
		try {
			await adminService.updateOrderStatus(orderId, { orderStatus: newStatus });
		} catch (e) {}
		const updated = orders.map((o) => o._id === orderId || o.id === orderId || o.orderNumber === orderId ? {
			...o,
			orderStatus: newStatus
		} : o);
		saveToLocal(updated);
		try {
			const custData = localStorage.getItem("pushpangan_orders_list");
			if (custData) {
				const cUpdated = JSON.parse(custData).map((o) => o._id === orderId || o.id === orderId || o.orderId === orderId || o.order_number === orderId || o.orderNumber === orderId ? {
					...o,
					orderStatus: newStatus
				} : o);
				localStorage.setItem("pushpangan_orders_list", JSON.stringify(cUpdated));
			}
			if (typeof window !== "undefined") {
				window.dispatchEvent(new Event("storage"));
				window.dispatchEvent(new Event("pushpangan_orders_updated"));
			}
		} catch (err) {
			console.warn("Failed to sync status to customer orders:", err);
		}
	};
	const handleDeleteOrder = (orderId) => {
		if (!confirm("Are you sure you want to remove this order record?")) return;
		const updated = orders.filter((o) => o._id !== orderId);
		saveToLocal(updated);
	};
	const handleSaveOrderModal = (e) => {
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
			items: [{
				name: orderForm.itemName,
				price: orderForm.price,
				quantity: orderForm.quantity,
				subtotal
			}],
			totalAmount: subtotal,
			finalAmount: finalAmt,
			orderStatus: orderForm.orderStatus,
			paymentStatus: orderForm.paymentStatus,
			paymentMethod: orderForm.paymentMethod,
			createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			shippingAddress: {
				address: orderForm.address,
				city: orderForm.city,
				state: orderForm.state,
				pincode: orderForm.pincode
			}
		};
		let updated = [];
		if (isEditing) updated = orders.map((o) => o._id === payload._id ? payload : o);
		else updated = [payload, ...orders];
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
			orderStatus: "Pending"
		});
		setShowOrderModal(true);
	};
	const handleOpenEditModal = (ord) => {
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
			orderStatus: ord.orderStatus || "Pending"
		});
		setShowOrderModal(true);
	};
	const getStatusBadgeClass = (status) => {
		const s = (status || "").toLowerCase();
		if (s.includes("delivered")) return "bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold";
		if (s.includes("out for delivery") || s.includes("shipped")) return "bg-blue-100 text-blue-800 border-blue-300 font-extrabold";
		if (s.includes("cancelled")) return "bg-rose-100 text-rose-800 border-rose-300 font-extrabold";
		if (s.includes("processing")) return "bg-amber-100 text-amber-800 border-amber-300 font-extrabold";
		return "bg-slate-200 text-slate-700 border-slate-300 font-extrabold";
	};
	const filteredOrders = orders.filter((o) => {
		const locStr = formatLocation(o).toLowerCase();
		if (!((o.orderNumber || "").toLowerCase().includes(search.toLowerCase()) || (o.customerName || "").toLowerCase().includes(search.toLowerCase()) || (o.itemName || o.items?.[0]?.name || "").toLowerCase().includes(search.toLowerCase()) || locStr.includes(search.toLowerCase()))) return false;
		if (selectedStatusTab === "All Orders") return true;
		return (o.orderStatus || "").toLowerCase() === selectedStatusTab.toLowerCase();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: { color: "#4F5535" },
					className: "text-2xl font-black tracking-tight",
					children: "Order Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { color: "#666851" },
					className: "text-xs mt-1 font-medium",
					children: "Track and manage customer orders along with delivery locations."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							style: { color: "#9F905E" },
							className: "absolute left-3.5 top-2.5 w-4 h-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search orders, location...",
							style: {
								backgroundColor: "#FFFFFF",
								borderColor: "#E2DCBE",
								color: "#4F5535"
							},
							className: "w-full text-xs rounded-xl py-2 pl-9 pr-3 outline-none border focus:border-[#B68F38] shadow-xs font-medium"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleOpenAddModal,
						style: {
							backgroundColor: "#4F5535",
							color: "#FFFFFF"
						},
						className: "px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-sm hover:opacity-90 transition flex items-center gap-1.5 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Create Order"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar",
				children: filterTabs.map((tab) => {
					const isActive = selectedStatusTab === tab;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedStatusTab(tab),
						style: {
							backgroundColor: isActive ? "#E2DCBE" : "#FFFFFF",
							color: "#4F5535",
							borderColor: "#E2DCBE"
						},
						className: `px-4 py-2 rounded-full text-xs font-extrabold border transition shadow-xs whitespace-nowrap ${isActive ? "shadow-sm ring-2 ring-[#B68F38]" : "hover:bg-[#F5F3E9]"}`,
						children: tab
					}, tab);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					backgroundColor: "#FFFFFF",
					borderColor: "#E2DCBE"
				},
				className: "rounded-3xl border shadow-sm p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						style: { color: "#4F5535" },
						className: "text-sm font-extrabold",
						children: [
							"Orders List (",
							filteredOrders.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "#9F905E" },
						className: "text-xs font-semibold",
						children: "Showing live customer orders with delivery addresses"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							style: {
								backgroundColor: "#F5F3E9",
								borderColor: "#E2DCBE",
								color: "#4F5535"
							},
							className: "border-b text-[11px] font-extrabold uppercase tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 rounded-l-xl",
									children: "Order ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Delivery Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Product/Service"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Update Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 text-right rounded-r-xl",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-[#E2DCBE]/60 text-xs",
							children: filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 9,
								className: "py-8 text-center text-slate-400 font-medium",
								children: "No matching orders found."
							}) }) : filteredOrders.map((ord) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-[#F5F3E9]/50 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3.5 px-4 font-black",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setSelectedOrder(ord);
												setShowInvoiceModal(true);
											},
											style: { color: "#B68F38" },
											className: "hover:underline font-extrabold",
											children: ord.orderNumber
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-3.5 px-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { color: "#4F5535" },
											className: "font-extrabold",
											children: ord.customerName
										}), ord.customerPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { color: "#666851" },
											className: "text-[10px] font-medium",
											children: ord.customerPhone
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3.5 px-4 max-w-[220px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: { color: "#4F5535" },
											className: "flex items-start gap-1 text-[11px] font-semibold",
											title: formatLocation(ord),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												className: "w-3.5 h-3.5 shrink-0 mt-0.5",
												style: { color: "#B68F38" }
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "line-clamp-2",
												children: formatLocation(ord)
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3.5 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { color: "#4F5535" },
											className: "font-bold truncate max-w-[180px]",
											children: ord.itemName || ord.items?.[0]?.name || "Flower Arrangement"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3.5 px-4 whitespace-nowrap",
										style: { color: "#666851" },
										children: ord.createdAt ? ord.createdAt.split("T")[0] : "2026-08-13"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-3.5 px-4 font-black whitespace-nowrap",
										style: { color: "#4F5535" },
										children: ["₹", ord.finalAmount || ord.totalAmount || 0]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3.5 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-block px-2.5 py-1 rounded-full text-[10px] border whitespace-nowrap ${getStatusBadgeClass(ord.orderStatus)}`,
											children: ord.orderStatus
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3.5 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: ord.orderStatus,
											onChange: (e) => handleUpdateStatus(ord._id, e.target.value),
											style: {
												backgroundColor: "#F5F3E9",
												borderColor: "#E2DCBE",
												color: "#4F5535"
											},
											className: "text-[11px] font-bold px-2 py-1 rounded-xl border outline-none cursor-pointer focus:border-[#B68F38]",
											children: [
												"Pending",
												"Confirmed",
												"Processing",
												"Out for Delivery",
												"Delivered",
												"Cancelled"
											].map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: st,
												children: st
											}, st))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3.5 px-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														setSelectedOrder(ord);
														setShowInvoiceModal(true);
													},
													title: "View / Print Invoice & Location",
													style: {
														backgroundColor: "#F5F3E9",
														color: "#4F5535"
													},
													className: "p-1.5 rounded-lg border border-[#E2DCBE] hover:bg-[#E2DCBE] transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "w-3.5 h-3.5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleOpenEditModal(ord),
													title: "Edit Order & Address",
													style: {
														backgroundColor: "#F5F3E9",
														color: "#4F5535"
													},
													className: "p-1.5 rounded-lg border border-[#E2DCBE] hover:bg-[#E2DCBE] transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-3.5 h-3.5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleDeleteOrder(ord._id),
													title: "Delete Order",
													className: "p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
												})
											]
										})
									})
								]
							}, ord._id))
						})]
					})
				})]
			}),
			showInvoiceModal && selectedOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						backgroundColor: "#FFFFFF",
						borderColor: "#E2DCBE"
					},
					className: "border rounded-3xl p-6 w-full max-w-lg shadow-2xl relative space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowInvoiceModal(false),
							className: "absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: { color: "#4F5535" },
								className: "text-xl font-extrabold",
								children: "Pushpangan – Order Invoice"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: { color: "#B68F38" },
								className: "text-xs font-bold mt-0.5",
								children: ["Order ID: #", selectedOrder.orderNumber]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5 text-xs text-[#4F5535]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Customer:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: selectedOrder.customerName
									})]
								}),
								selectedOrder.customerPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3 h-3 text-[#B68F38]" }), " Contact Phone:"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: selectedOrder.customerPhone
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-[#F5F3E9] p-3 rounded-2xl border border-[#E2DCBE] space-y-1 my-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-extrabold text-[#4F5535] flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-[#B68F38]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Customer Delivery Location:" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-[#666851] pl-5 leading-relaxed",
										children: formatLocation(selectedOrder)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Item / Flower:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: selectedOrder.itemName || selectedOrder.items?.[0]?.name
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Order Date:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedOrder.createdAt ? selectedOrder.createdAt.split("T")[0] : "2026-08-13" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Payment Method:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold uppercase",
										children: selectedOrder.paymentMethod || "UPI"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Status:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold text-[#B68F38]",
										children: selectedOrder.orderStatus
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t pt-2 font-black text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										style: { color: "#4F5535" },
										children: ["₹", selectedOrder.finalAmount || selectedOrder.totalAmount]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end gap-2 pt-3 border-t",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => window.print(),
								style: {
									backgroundColor: "#4F5535",
									color: "#FFFFFF"
								},
								className: "px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "w-4 h-4" }), " Print Receipt"]
							})
						})
					]
				})
			}),
			showOrderModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSaveOrderModal,
					style: {
						backgroundColor: "#FFFFFF",
						borderColor: "#E2DCBE"
					},
					className: "border rounded-3xl p-6 w-full max-w-md shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowOrderModal(false),
							className: "absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: { color: "#4F5535" },
							className: "text-lg font-extrabold",
							children: isEditing ? "Edit Order & Location" : "Create New Order"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block font-bold text-[#4F5535] mb-1",
										children: "Customer Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: orderForm.customerName,
										onChange: (e) => setOrderForm({
											...orderForm,
											customerName: e.target.value
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block font-bold text-[#4F5535] mb-1",
										children: "Phone Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: orderForm.customerPhone,
										onChange: (e) => setOrderForm({
											...orderForm,
											customerPhone: e.target.value
										}),
										placeholder: "+91 98765 00000",
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block font-bold text-[#4F5535] mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 inline mr-1 text-[#B68F38]" }), " Delivery Street Address *"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: orderForm.address,
									onChange: (e) => setOrderForm({
										...orderForm,
										address: e.target.value
									}),
									placeholder: "e.g. Flat 402, Rose Villa, Baner Road",
									style: {
										backgroundColor: "#F5F3E9",
										borderColor: "#E2DCBE",
										color: "#4F5535"
									},
									className: "w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-bold text-[#4F5535] mb-1",
											children: "City"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: orderForm.city,
											onChange: (e) => setOrderForm({
												...orderForm,
												city: e.target.value
											}),
											style: {
												backgroundColor: "#F5F3E9",
												borderColor: "#E2DCBE",
												color: "#4F5535"
											},
											className: "w-full rounded-xl px-2.5 py-2 border outline-none focus:border-[#B68F38]"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-bold text-[#4F5535] mb-1",
											children: "State"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: orderForm.state,
											onChange: (e) => setOrderForm({
												...orderForm,
												state: e.target.value
											}),
											style: {
												backgroundColor: "#F5F3E9",
												borderColor: "#E2DCBE",
												color: "#4F5535"
											},
											className: "w-full rounded-xl px-2.5 py-2 border outline-none focus:border-[#B68F38]"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-bold text-[#4F5535] mb-1",
											children: "Pincode"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: orderForm.pincode,
											onChange: (e) => setOrderForm({
												...orderForm,
												pincode: e.target.value
											}),
											style: {
												backgroundColor: "#F5F3E9",
												borderColor: "#E2DCBE",
												color: "#4F5535"
											},
											className: "w-full rounded-xl px-2.5 py-2 border outline-none focus:border-[#B68F38]"
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-bold text-[#4F5535] mb-1",
									children: "Product / Flower Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: orderForm.itemName,
									onChange: (e) => setOrderForm({
										...orderForm,
										itemName: e.target.value
									}),
									style: {
										backgroundColor: "#F5F3E9",
										borderColor: "#E2DCBE",
										color: "#4F5535"
									},
									className: "w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block font-bold text-[#4F5535] mb-1",
										children: "Price (₹) *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										value: orderForm.price,
										onChange: (e) => setOrderForm({
											...orderForm,
											price: Number(e.target.value)
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block font-bold text-[#4F5535] mb-1",
										children: "Order Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: orderForm.orderStatus,
										onChange: (e) => setOrderForm({
											...orderForm,
											orderStatus: e.target.value
										}),
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full rounded-xl px-3 py-2 border outline-none focus:border-[#B68F38]",
										children: [
											"Pending",
											"Confirmed",
											"Processing",
											"Out for Delivery",
											"Delivered",
											"Cancelled"
										].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-3 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowOrderModal(false),
								className: "px-4 py-2 text-slate-500 font-bold hover:text-slate-800",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								style: {
									backgroundColor: "#4F5535",
									color: "#FFFFFF"
								},
								className: "px-5 py-2 rounded-xl text-xs font-extrabold shadow flex items-center gap-1.5 hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), " Save Order"]
							})]
						})
					]
				})
			})
		]
	});
};
var DEFAULT_USERS = [
	{
		_id: "usr_101",
		name: "Rajan",
		email: "rajan@example.com",
		phone: "+91 98765 10101",
		role: "Customer",
		status: "Active",
		joinedDate: "6/8/2026",
		accountId: "usr8a7f0",
		accountType: "Customer Account",
		avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
		totalOrders: 8,
		totalSpent: 4850,
		lastLogin: "2 hours ago",
		addresses: ["Flat 402, Sunshine Apts, Kothrud, Pune - 411038"],
		recentOrders: [{
			id: "ORD-2026-901",
			amount: 1240,
			date: "6/8/2026",
			status: "Delivered"
		}, {
			id: "ORD-2026-842",
			amount: 499,
			date: "5/24/2026",
			status: "Delivered"
		}]
	},
	{
		_id: "usr_102",
		name: "PankDesai",
		email: "pankdesai@example.com",
		phone: "+91 98765 20202",
		role: "Seller",
		status: "Active",
		joinedDate: "5/7/2026",
		accountId: "sel82d4a",
		accountType: "Seller Account",
		avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
		totalOrders: 42,
		totalSpent: 38400,
		lastLogin: "30 mins ago",
		addresses: ["Flower Market Yard, Stall #14, Gultekdi, Pune"],
		recentOrders: [{
			id: "ORD-2026-912",
			amount: 5600,
			date: "6/7/2026",
			status: "Confirmed"
		}]
	},
	{
		_id: "usr_103",
		name: "Aj7Thevil",
		email: "aj7thevil@example.com",
		phone: "+91 98765 30303",
		role: "Admin",
		status: "Active",
		joinedDate: "5/5/2026",
		accountId: "adm1092e",
		accountType: "Admin Account",
		avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
		totalOrders: 15,
		totalSpent: 12400,
		lastLogin: "Just now",
		addresses: ["Pushpangan HQ, Market Yard, Pune - 411037"],
		recentOrders: []
	},
	{
		_id: "usr_104",
		name: "Purva_Palav",
		email: "purva@example.com",
		phone: "+91 98765 40404",
		role: "Customer",
		status: "Active",
		joinedDate: "5/4/2026",
		accountId: "usr93f81",
		accountType: "Customer Account",
		avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
		totalOrders: 5,
		totalSpent: 2950,
		lastLogin: "Yesterday",
		addresses: ["Villa 12, Rose Colony, Baner, Pune"],
		recentOrders: [{
			id: "ORD-2026-788",
			amount: 899,
			date: "5/4/2026",
			status: "Delivered"
		}]
	},
	{
		_id: "usr_105",
		name: "Calligre",
		email: "calligre@example.com",
		phone: "+91 98765 50505",
		role: "Seller",
		status: "Inactive",
		joinedDate: "4/28/2026",
		accountId: "sel44c10",
		accountType: "Seller Account",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
		totalOrders: 18,
		totalSpent: 14200,
		lastLogin: "5 days ago",
		addresses: ["Greenhouse Floral Hub, Hadapsar, Pune"],
		recentOrders: []
	},
	{
		_id: "usr_106",
		name: "Swapnil_Sakhare",
		email: "swapnil@example.com",
		phone: "+91 98765 60606",
		role: "Customer",
		status: "Suspended",
		joinedDate: "4/20/2026",
		accountId: "usr11a94",
		accountType: "Customer Account",
		avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
		totalOrders: 2,
		totalSpent: 850,
		lastLogin: "2 weeks ago",
		addresses: ["Block B, MG Road, Camp, Pune"],
		recentOrders: []
	},
	{
		_id: "usr_107",
		name: "Satya_Rege",
		email: "satya@example.com",
		phone: "+91 98765 70707",
		role: "Customer",
		status: "Active",
		joinedDate: "4/15/2026",
		accountId: "usr55b22",
		accountType: "Customer Account",
		avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
		totalOrders: 12,
		totalSpent: 9600,
		lastLogin: "3 hours ago",
		addresses: ["Sunshine Towers, FC Road, Pune"],
		recentOrders: [{
			id: "ORD-2026-610",
			amount: 1500,
			date: "4/15/2026",
			status: "Delivered"
		}]
	},
	{
		_id: "usr_108",
		name: "Nitin",
		email: "nitin@example.com",
		phone: "+91 98765 80808",
		role: "Seller",
		status: "Active",
		joinedDate: "4/10/2026",
		accountId: "sel77d99",
		accountType: "Seller Account",
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
		totalOrders: 29,
		totalSpent: 26500,
		lastLogin: "1 day ago",
		addresses: ["Blossom Farms, Talegaon, Pune"],
		recentOrders: []
	},
	{
		_id: "usr_109",
		name: "Harsh_Artworks",
		email: "harsh@example.com",
		phone: "+91 98765 90909",
		role: "Customer",
		status: "Active",
		joinedDate: "4/02/2026",
		accountId: "usr33e11",
		accountType: "Customer Account",
		avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
		totalOrders: 7,
		totalSpent: 5100,
		lastLogin: "Yesterday",
		addresses: ["Aundh IT Park Rd, Pune"],
		recentOrders: [{
			id: "ORD-2026-550",
			amount: 750,
			date: "4/02/2026",
			status: "Delivered"
		}]
	}
];
var CustomersView = () => {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [roleFilter, setRoleFilter] = (0, import_react.useState)("All Roles");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All Status");
	const [sortBy, setSortBy] = (0, import_react.useState)("Newest Joined");
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [rowsPerPage, setRowsPerPage] = (0, import_react.useState)(10);
	const [selectedUser, setSelectedUser] = (0, import_react.useState)(null);
	const [isDrawerOpen, setIsDrawerOpen] = (0, import_react.useState)(false);
	const [showAddEditModal, setShowAddEditModal] = (0, import_react.useState)(false);
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [userForm, setUserForm] = (0, import_react.useState)({
		_id: "",
		name: "",
		email: "",
		phone: "",
		role: "Customer",
		status: "Active",
		joinedDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
		accountId: "usr" + Math.random().toString(36).substring(2, 8),
		accountType: "Customer Account",
		avatar: "",
		totalOrders: 0,
		totalSpent: 0,
		lastLogin: "Just now"
	});
	const [showDeleteModal, setShowDeleteModal] = (0, import_react.useState)(false);
	const [userToDelete, setUserToDelete] = (0, import_react.useState)(null);
	const [openActionId, setOpenActionId] = (0, import_react.useState)(null);
	const fetchUsers = async () => {
		setLoading(true);
		try {
			const saved = localStorage.getItem("pushpangan_admin_users");
			if (saved) setUsers(JSON.parse(saved));
			else {
				setUsers(DEFAULT_USERS);
				localStorage.setItem("pushpangan_admin_users", JSON.stringify(DEFAULT_USERS));
			}
		} catch (e) {
			console.error(e);
			setUsers(DEFAULT_USERS);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchUsers();
		const handleStorageChange = (e) => {
			if (e.key === "pushpangan_admin_users") fetchUsers();
		};
		window.addEventListener("storage", handleStorageChange);
		const interval = setInterval(() => {
			const saved = localStorage.getItem("pushpangan_admin_users");
			if (saved) try {
				const parsed = JSON.parse(saved);
				setUsers((prev) => JSON.stringify(prev) !== JSON.stringify(parsed) ? parsed : prev);
			} catch (e) {}
		}, 2e3);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
			clearInterval(interval);
		};
	}, []);
	const saveUsers = (updated) => {
		setUsers(updated);
		localStorage.setItem("pushpangan_admin_users", JSON.stringify(updated));
	};
	const filteredUsers = (0, import_react.useMemo)(() => {
		return users.filter((u) => {
			const q = search.toLowerCase();
			if (!(u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q) || u.accountId.toLowerCase().includes(q))) return false;
			if (roleFilter !== "All Roles" && u.role !== roleFilter) return false;
			if (statusFilter !== "All Status" && u.status !== statusFilter) return false;
			return true;
		}).sort((a, b) => {
			if (sortBy === "Name A-Z") return a.name.localeCompare(b.name);
			if (sortBy === "Name Z-A") return b.name.localeCompare(a.name);
			if (sortBy === "Oldest Joined") return a._id.localeCompare(b._id);
			return b._id.localeCompare(a._id);
		});
	}, [
		users,
		search,
		roleFilter,
		statusFilter,
		sortBy
	]);
	const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
	const paginatedUsers = (0, import_react.useMemo)(() => {
		const start = (currentPage - 1) * rowsPerPage;
		return filteredUsers.slice(start, start + rowsPerPage);
	}, [
		filteredUsers,
		currentPage,
		rowsPerPage
	]);
	const handleOpenAddModal = () => {
		setIsEditing(false);
		setUserForm({
			_id: "",
			name: "",
			email: "",
			phone: "",
			role: "Customer",
			status: "Active",
			joinedDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
			accountId: "usr" + Math.random().toString(36).substring(2, 8),
			accountType: "Customer Account",
			avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
			totalOrders: 0,
			totalSpent: 0,
			lastLogin: "Just now"
		});
		setShowAddEditModal(true);
	};
	const handleOpenEditModal = (user) => {
		setIsEditing(true);
		setUserForm({ ...user });
		setShowAddEditModal(true);
		setOpenActionId(null);
	};
	const handleSaveUserForm = (e) => {
		e.preventDefault();
		let updated = [];
		const accountType = userForm.role === "Seller" ? "Seller Account" : userForm.role === "Admin" ? "Admin Account" : "Customer Account";
		const payload = {
			...userForm,
			_id: userForm._id || "usr_" + Date.now(),
			accountType
		};
		if (isEditing) updated = users.map((u) => u._id === payload._id ? payload : u);
		else updated = [payload, ...users];
		saveUsers(updated);
		setShowAddEditModal(false);
		if (selectedUser && selectedUser._id === payload._id) setSelectedUser(payload);
	};
	const handleToggleStatus = (user) => {
		const nextStatus = user.status === "Active" ? "Suspended" : "Active";
		const updated = users.map((u) => u._id === user._id ? {
			...u,
			status: nextStatus
		} : u);
		saveUsers(updated);
		if (selectedUser && selectedUser._id === user._id) setSelectedUser({
			...selectedUser,
			status: nextStatus
		});
		setOpenActionId(null);
	};
	const handleChangeRole = (user, newRole) => {
		const accountType = newRole === "Seller" ? "Seller Account" : newRole === "Admin" ? "Admin Account" : "Customer Account";
		const updated = users.map((u) => u._id === user._id ? {
			...u,
			role: newRole,
			accountType
		} : u);
		saveUsers(updated);
		if (selectedUser && selectedUser._id === user._id) setSelectedUser({
			...selectedUser,
			role: newRole,
			accountType
		});
		setOpenActionId(null);
	};
	const handleDeleteUser = () => {
		if (!userToDelete) return;
		const updated = users.filter((u) => u._id !== userToDelete._id);
		saveUsers(updated);
		setShowDeleteModal(false);
		if (selectedUser && selectedUser._id === userToDelete._id) {
			setIsDrawerOpen(false);
			setSelectedUser(null);
		}
		setUserToDelete(null);
		setOpenActionId(null);
	};
	const getRoleBadge = (role) => {
		if (role === "Admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				backgroundColor: "#B83245",
				color: "#FFFFFF"
			},
			className: "px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs border border-[#B83245]",
			children: "Admin"
		});
		if (role === "Seller") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200",
			children: "Seller"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-[#B83245] border border-rose-200",
			children: "Customer"
		});
	};
	const getStatusPill = (status) => {
		if (status === "Active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200",
			children: "Active"
		});
		if (status === "Suspended") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200",
			children: "Suspended"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200",
			children: "Inactive"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 font-sans text-slate-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: { color: "#222222" },
					className: "text-2xl lg:text-3xl font-black tracking-tight",
					children: "User Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { color: "#666666" },
					className: "text-xs mt-1 font-medium",
					children: "Manage Pushpangan customers, sellers, florists, and admin accounts."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleOpenAddModal,
					style: {
						backgroundColor: "#B83245",
						color: "#FFFFFF"
					},
					className: "px-4 py-2.5 rounded-xl text-xs font-bold shadow hover:bg-[#9E293A] transition flex items-center gap-2 self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4" }), " Add User"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					backgroundColor: "#FFFFFF",
					borderColor: "#F3E8E9"
				},
				className: "rounded-3xl border shadow-sm p-6 lg:p-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: { color: "#222222" },
							className: "text-xl font-bold tracking-tight",
							children: "All Users"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full sm:w-64",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: search,
										onChange: (e) => {
											setSearch(e.target.value);
											setCurrentPage(1);
										},
										placeholder: "Search users...",
										className: "w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 outline-none focus:border-[#B83245] focus:bg-white transition"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: roleFilter,
									onChange: (e) => {
										setRoleFilter(e.target.value);
										setCurrentPage(1);
									},
									className: "text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#B83245] font-semibold text-slate-700",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Roles" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Customer" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Seller" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Admin" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: statusFilter,
									onChange: (e) => {
										setStatusFilter(e.target.value);
										setCurrentPage(1);
									},
									className: "text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#B83245] font-semibold text-slate-700",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Status" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Active" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Inactive" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Suspended" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: sortBy,
									onChange: (e) => setSortBy(e.target.value),
									className: "text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#B83245] font-semibold text-slate-700",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Newest Joined" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Oldest Joined" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Name A-Z" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Name Z-A" })
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left border-collapse",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 pb-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "User"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "Role"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "Joined"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "Activity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4 text-right",
										children: "Actions"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-slate-100/80 text-xs",
								children: paginatedUsers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 6,
									className: "py-10 text-center text-slate-400 font-medium",
									children: "No users found matching criteria."
								}) }) : paginatedUsers.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-rose-50/20 transition cursor-pointer group",
									onClick: () => {
										setSelectedUser(user);
										setIsDrawerOpen(true);
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4 px-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [user.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: user.avatar,
													alt: user.name,
													className: "w-9 h-9 rounded-full object-cover border border-rose-100 shadow-xs"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														backgroundColor: "#FFFFFF",
														color: "#374151",
														border: "1.5px solid #E2DCBE"
													},
													className: "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-xs shrink-0",
													children: user.name.charAt(0)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-extrabold text-slate-900 group-hover:text-[#B83245] transition",
													children: user.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-slate-500 font-medium",
													children: user.email
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4 px-4",
											children: getRoleBadge(user.role)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4 px-4",
											children: getStatusPill(user.status)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4 px-4 text-slate-600 font-medium",
											children: user.joinedDate
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-4 px-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-slate-800",
												children: user.accountType
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] text-slate-400 font-mono",
												children: ["ID: ", user.accountId]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-4 px-4 text-right relative",
											onClick: (e) => e.stopPropagation(),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setOpenActionId(openActionId === user._id ? null : user._id),
												className: "p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "w-4 h-4" })
											}), openActionId === user._id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute right-4 mt-1 w-44 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-30 text-left space-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => {
															setSelectedUser(user);
															setIsDrawerOpen(true);
															setOpenActionId(null);
														},
														className: "w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }), " View User"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => handleOpenEditModal(user),
														className: "w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-3.5 h-3.5" }), " Edit User"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => {
															setSelectedUser(user);
															setIsDrawerOpen(true);
															setOpenActionId(null);
														},
														className: "w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "w-3.5 h-3.5" }), " View Orders"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => {
															const roles = [
																"Customer",
																"Seller",
																"Admin"
															];
															const nextIdx = (roles.indexOf(user.role) + 1) % roles.length;
															handleChangeRole(user, roles[nextIdx]);
														},
														className: "w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-3.5 h-3.5" }), " Change Role"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => handleToggleStatus(user),
														className: "w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "w-3.5 h-3.5" }), user.status === "Active" ? "Suspend Account" : "Activate Account"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-slate-100 my-1" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => {
															setUserToDelete(user);
															setShowDeleteModal(true);
															setOpenActionId(null);
														},
														className: "w-full px-3.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" }), " Delete User"]
													})
												]
											})]
										})
									]
								}, user._id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rows per page:" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: rowsPerPage,
									onChange: (e) => {
										setRowsPerPage(Number(e.target.value));
										setCurrentPage(1);
									},
									className: "bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none font-bold text-slate-700",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 5,
											children: "5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 10,
											children: "10"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 20,
											children: "20"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 50,
											children: "50"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 font-medium",
									children: [
										"Showing ",
										filteredUsers.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1,
										"-",
										Math.min(currentPage * rowsPerPage, filteredUsers.length),
										" of ",
										filteredUsers.length,
										" users"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 self-end sm:self-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: currentPage === 1,
									onClick: () => setCurrentPage(currentPage - 1),
									className: "p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" })
								}),
								Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCurrentPage(pg),
									style: {
										backgroundColor: currentPage === pg ? "#B83245" : "transparent",
										color: currentPage === pg ? "#FFFFFF" : "#4F5535",
										borderColor: currentPage === pg ? "#B83245" : "#E2DCBE"
									},
									className: "w-7 h-7 rounded-lg border text-xs font-bold transition flex items-center justify-center",
									children: pg
								}, pg)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: currentPage === totalPages || totalPages === 0,
									onClick: () => setCurrentPage(currentPage + 1),
									className: "p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
								})
							]
						})]
					})
				]
			}),
			isDrawerOpen && selectedUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { backgroundColor: "#FFFFFF" },
					className: "w-full max-w-md h-full shadow-2xl p-6 lg:p-8 overflow-y-auto space-y-6 relative border-l border-rose-100",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsDrawerOpen(false),
							className: "absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 border-b border-slate-100 pb-6",
							children: [selectedUser.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: selectedUser.avatar,
								alt: "",
								className: "w-16 h-16 rounded-full object-cover border-2 border-[#B83245] shadow-sm"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									backgroundColor: "#FFFFFF",
									color: "#374151",
									border: "2px solid #E2DCBE"
								},
								className: "w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl uppercase shadow-sm",
								children: selectedUser.name.charAt(0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-extrabold text-slate-900",
								children: selectedUser.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mt-1",
								children: [getRoleBadge(selectedUser.role), getStatusPill(selectedUser.status)]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									style: { color: "#B83245" },
									className: "font-extrabold text-xs uppercase tracking-wider",
									children: "Account Details"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4 p-4 rounded-2xl bg-rose-50/40 border border-rose-100/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-semibold block mb-0.5",
											children: "Email:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-slate-800",
											children: selectedUser.email
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-semibold block mb-0.5",
											children: "Phone:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-slate-800",
											children: selectedUser.phone
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-semibold block mb-0.5",
											children: "Account ID:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-slate-700",
											children: selectedUser.accountId
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-semibold block mb-0.5",
											children: "Joined Date:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-slate-800",
											children: selectedUser.joinedDate
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-semibold block mb-0.5",
											children: "Total Orders:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black text-[#B83245] text-sm",
											children: selectedUser.totalOrders
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-semibold block mb-0.5",
											children: "Total Spent:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-black text-emerald-700 text-sm",
											children: ["₹", selectedUser.totalSpent.toLocaleString()]
										})] })
									]
								}),
								selectedUser.addresses && selectedUser.addresses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									style: { color: "#B83245" },
									className: "font-extrabold text-xs uppercase tracking-wider mb-2",
									children: "Saved Addresses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: selectedUser.addresses.map((addr, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-[#B83245] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: addr })]
									}, idx))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									style: { color: "#B83245" },
									className: "font-extrabold text-xs uppercase tracking-wider mb-2",
									children: "Recent Orders"
								}), selectedUser.recentOrders && selectedUser.recentOrders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: selectedUser.recentOrders.map((ord) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-extrabold text-slate-900",
											children: ord.id
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-slate-400",
											children: ord.date
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-bold text-[#B83245]",
												children: ["₹", ord.amount]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold text-emerald-700",
												children: ord.status
											})]
										})]
									}, ord.id))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 rounded-xl bg-slate-50 text-slate-400 font-medium text-center",
									children: "No recent order history recorded."
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 border-t border-slate-100 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleOpenEditModal(selectedUser),
								style: {
									backgroundColor: "#B83245",
									color: "#FFFFFF"
								},
								className: "flex-1 py-2.5 px-3 rounded-xl font-bold text-xs shadow hover:opacity-90 flex items-center justify-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-3.5 h-3.5" }), " Edit Profile"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleToggleStatus(selectedUser),
								className: `flex-1 py-2.5 px-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 ${selectedUser.status === "Active" ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100" : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "w-3.5 h-3.5" }), selectedUser.status === "Active" ? "Suspend" : "Activate"]
							})]
						})
					]
				})
			}),
			showAddEditModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSaveUserForm,
					style: { backgroundColor: "#FFFFFF" },
					className: "border border-rose-100 rounded-3xl p-6 w-full max-w-md shadow-2xl relative space-y-4 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddEditModal(false),
							className: "absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: { color: "#222222" },
							className: "text-lg font-extrabold",
							children: isEditing ? "Edit User Details" : "Add New User Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-bold text-slate-700 mb-1",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: userForm.name,
									onChange: (e) => setUserForm({
										...userForm,
										name: e.target.value
									}),
									className: "w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-bold text-slate-700 mb-1",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									value: userForm.email,
									onChange: (e) => setUserForm({
										...userForm,
										email: e.target.value
									}),
									className: "w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-bold text-slate-700 mb-1",
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									required: true,
									value: userForm.phone,
									onChange: (e) => setUserForm({
										...userForm,
										phone: e.target.value
									}),
									className: "w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block font-bold text-slate-700 mb-1",
										children: "Role"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: userForm.role,
										onChange: (e) => setUserForm({
											...userForm,
											role: e.target.value
										}),
										className: "w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Customer",
												children: "Customer"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Seller",
												children: "Seller"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Admin",
												children: "Admin"
											})
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block font-bold text-slate-700 mb-1",
										children: "Account Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: userForm.status,
										onChange: (e) => setUserForm({
											...userForm,
											status: e.target.value
										}),
										className: "w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Active",
												children: "Active"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Inactive",
												children: "Inactive"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Suspended",
												children: "Suspended"
											})
										]
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-3 border-t border-slate-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowAddEditModal(false),
								className: "px-4 py-2 font-bold text-slate-500 hover:text-slate-800",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								style: {
									backgroundColor: "#B83245",
									color: "#FFFFFF"
								},
								className: "px-5 py-2 rounded-xl font-bold shadow flex items-center gap-1.5 hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), " Save User"]
							})]
						})
					]
				})
			}),
			showDeleteModal && userToDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 rounded-full bg-rose-100 text-[#B83245] flex items-center justify-center mx-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-6 h-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-slate-900",
							children: "Delete User Account?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-500",
							children: [
								"Are you sure you want to permanently delete ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: userToDelete.name }),
								" (",
								userToDelete.email,
								")? This action cannot be undone."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowDeleteModal(false),
								className: "px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleDeleteUser,
								className: "px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow",
								children: "Confirm Delete"
							})]
						})
					]
				})
			})
		]
	});
};
var InventoryView = () => {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showRestockModal, setShowRestockModal] = (0, import_react.useState)(false);
	const [selectedProduct, setSelectedProduct] = (0, import_react.useState)(null);
	const [restockQty, setRestockQty] = (0, import_react.useState)(50);
	const fetchInventory = async () => {
		setLoading(true);
		try {
			const res = await adminService.getInventory();
			setData(res);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchInventory();
	}, []);
	const handleRestockSubmit = async () => {
		if (!selectedProduct) return;
		await adminService.restockInventory(selectedProduct._id, restockQty);
		setShowRestockModal(false);
		fetchInventory();
	};
	const products = data?.products || [];
	const metrics = data?.metrics || {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "w-5 h-5 text-rose-400" }), " Live Inventory Telemetry"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: "Monitor real-time warehouse flower stock, low-stock threshold triggers, and batch restock products"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 rounded-xl bg-blue-500/20 text-blue-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "w-6 h-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-400 font-semibold",
							children: "Total Tracked Items"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-extrabold text-white",
							children: metrics.totalItems || products.length
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 rounded-xl bg-amber-500/20 text-amber-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-6 h-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-amber-300 font-semibold",
							children: "Low Stock Alerts (≤10)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-extrabold text-amber-400",
							children: metrics.lowStockCount || 1
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 rounded-xl bg-rose-500/20 text-rose-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-6 h-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-rose-300 font-semibold",
							children: "Out of Stock (0)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-extrabold text-rose-400",
							children: metrics.outOfStockCount || 0
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400 bg-slate-900",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "SKU"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Flower Product"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Stock Level"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Status Alert"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 text-right",
									children: "Quick Action"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-slate-800/60 text-xs",
							children: products.map((item) => {
								const isLow = item.stockQuantity <= 10 && item.stockQuantity > 0;
								const isOut = item.stockQuantity === 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-slate-800/30 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4 font-mono font-bold text-slate-400",
											children: item.sku
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4 font-bold text-white",
											children: item.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4 text-slate-300",
											children: item.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 px-4 font-extrabold text-lg text-white",
											children: [
												item.stockQuantity,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-normal text-slate-400",
													children: "units"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4",
											children: isOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30",
												children: "OUT OF STOCK"
											}) : isLow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse",
												children: "LOW STOCK"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
												children: "OPTIMAL STOCK"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => {
													setSelectedProduct(item);
													setShowRestockModal(true);
												},
												className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-300 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5 ml-auto",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "w-3.5 h-3.5" }), " Restock"]
											})
										})
									]
								}, item._id);
							})
						})]
					})
				})
			}),
			showRestockModal && selectedProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-lg font-bold text-white mb-2 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-5 h-5 text-rose-400" }),
								" Batch Restock ",
								selectedProduct.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-400 mb-4",
							children: [
								"Current Stock: ",
								selectedProduct.stockQuantity,
								" units"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Add Stock Quantity (+)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 1,
								value: restockQty,
								onChange: (e) => setRestockQty(Number(e.target.value)),
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowRestockModal(false),
									className: "px-4 py-2 text-slate-400 hover:text-white",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleRestockSubmit,
									className: "px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl shadow",
									children: "Confirm Restock"
								})]
							})]
						})
					]
				})
			})
		]
	});
};
var CouponsView = () => {
	const [coupons, setCoupons] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		code: "",
		discountType: "percentage",
		discountValue: 20,
		minPurchase: 499,
		maxDiscount: 150,
		expiryDate: "2026-12-31",
		usageLimit: 500,
		status: "active"
	});
	const fetchCoupons = async () => {
		setLoading(true);
		try {
			const res = await adminService.getCoupons();
			if (res.success && res.coupons) setCoupons(res.coupons);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchCoupons();
	}, []);
	const handleSave = async (e) => {
		e.preventDefault();
		await adminService.saveCoupon(formData);
		setShowModal(false);
		fetchCoupons();
	};
	const handleToggle = async (id) => {
		await adminService.toggleCoupon(id);
		fetchCoupons();
	};
	const handleDelete = async (id) => {
		if (!confirm("Delete this coupon code?")) return;
		await adminService.deleteCoupon(id);
		fetchCoupons();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "w-5 h-5 text-rose-400" }), " Coupon Code Manager"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: "Create percentage & flat discount promo codes, set minimum cart requirements & usage caps"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowModal(true),
					className: "px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Create Coupon"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: coupons.map((cp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-rose-500/30 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-black text-rose-400 tracking-wider font-mono bg-rose-500/10 px-3 py-1 rounded-xl border border-rose-500/20",
								children: cp.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleToggle(cp._id),
								className: `px-2.5 py-1 rounded-full text-[10px] font-bold ${cp.status === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-700 text-slate-400"}`,
								children: cp.status === "active" ? "Enabled" : "Disabled"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-bold text-white",
							children: cp.discountType === "percentage" ? `${cp.discountValue}% OFF` : `₹${cp.discountValue} FLAT DISCOUNT`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-slate-400 mt-1",
							children: [
								"Min Purchase: ₹",
								cp.minPurchase,
								" • Max Discount: ₹",
								cp.maxDiscount || "Unlimited"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Used: ",
								cp.usedCount || 0,
								" / ",
								cp.usageLimit
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(cp._id),
								className: "text-rose-400 hover:text-white p-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
							})]
						})
					]
				}, cp._id))
			}),
			showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-white mb-4",
						children: "Create New Promo Coupon"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSave,
						className: "space-y-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Coupon Code (Uppercase)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: formData.code,
								onChange: (e) => setFormData({
									...formData,
									code: e.target.value.toUpperCase()
								}),
								placeholder: "PUSHP20",
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white uppercase outline-none focus:border-rose-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Discount Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: formData.discountType,
									onChange: (e) => setFormData({
										...formData,
										discountType: e.target.value
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "percentage",
										children: "Percentage (%)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "flat",
										children: "Flat Amount (₹)"
									})]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Discount Value"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									value: formData.discountValue,
									onChange: (e) => setFormData({
										...formData,
										discountValue: Number(e.target.value)
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Min Purchase (₹)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: formData.minPurchase,
									onChange: (e) => setFormData({
										...formData,
										minPurchase: Number(e.target.value)
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Max Discount (₹)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: formData.maxDiscount,
									onChange: (e) => setFormData({
										...formData,
										maxDiscount: Number(e.target.value)
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowModal(false),
									className: "px-4 py-2 text-slate-400",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl",
									children: "Save Coupon"
								})]
							})
						]
					})]
				})
			})
		]
	});
};
var OffersView = () => {
	const [offers, setOffers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		title: "",
		offerType: "Festival Offer",
		discountPercentage: 20,
		endDate: "2026-11-15",
		status: "active"
	});
	const fetchOffers = async () => {
		setLoading(true);
		try {
			const res = await adminService.getOffers();
			if (res.success && res.offers) setOffers(res.offers);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchOffers();
	}, []);
	const handleSave = async (e) => {
		e.preventDefault();
		await adminService.saveOffer(formData);
		setShowModal(false);
		fetchOffers();
	};
	const handleToggle = async (id) => {
		await adminService.toggleOffer(id);
		fetchOffers();
	};
	const handleDelete = async (id) => {
		if (!confirm("Delete this promotional offer?")) return;
		await adminService.deleteOffer(id);
		fetchOffers();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "w-5 h-5 text-rose-400" }), " Festive & Seasonal Promotional Offers"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: "Launch Diwali offers, Today's Special sales, Combo packages & Flash Sales"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowModal(true),
					className: "px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Create Offer"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: offers.map((of) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-rose-500/30 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20",
								children: of.offerType
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleToggle(of._id),
								className: `px-2.5 py-1 rounded-full text-[10px] font-bold ${of.status === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-700 text-slate-400"}`,
								children: of.status === "active" ? "Active" : "Disabled"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-extrabold text-white",
							children: of.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-2xl font-black text-amber-400 mt-2",
							children: [of.discountPercentage, "% OFF"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3.5 h-3.5" }),
									" Valid till ",
									of.endDate?.slice(0, 10)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(of._id),
								className: "text-rose-400 hover:text-white p-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
							})]
						})
					]
				}, of._id))
			}),
			showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-white mb-4",
						children: "Create New Offer Campaign"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSave,
						className: "space-y-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Campaign Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: formData.title,
								onChange: (e) => setFormData({
									...formData,
									title: e.target.value
								}),
								placeholder: "e.g. Diwali Floral Dhamaka",
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Offer Category Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: formData.offerType,
								onChange: (e) => setFormData({
									...formData,
									offerType: e.target.value
								}),
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Festival Offer",
										children: "Festival Offer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Today's Special",
										children: "Today's Special"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Weekend Offer",
										children: "Weekend Offer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Combo Offer",
										children: "Combo Offer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Bulk Discount",
										children: "Bulk Discount"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Flash Sale",
										children: "Flash Sale"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Discount (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									value: formData.discountPercentage,
									onChange: (e) => setFormData({
										...formData,
										discountPercentage: Number(e.target.value)
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "End Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									required: true,
									value: formData.endDate,
									onChange: (e) => setFormData({
										...formData,
										endDate: e.target.value
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowModal(false),
									className: "px-4 py-2 text-slate-400",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl",
									children: "Launch Offer"
								})]
							})
						]
					})]
				})
			})
		]
	});
};
var PaymentsView = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-5 h-5 text-rose-400" }), " Payment & Refund Gateway Telemetry"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: "Monitor real-time transactions across UPI, Credit Card, Debit Card, Net Banking, and Cash On Delivery"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-slate-900/80 border border-slate-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-slate-400",
								children: "UPI Instant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-extrabold text-emerald-400 mt-1",
								children: "₹342,000"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-slate-500 mt-1",
								children: "68% of total volume"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-slate-900/80 border border-slate-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-slate-400",
								children: "Credit Cards"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-extrabold text-blue-400 mt-1",
								children: "₹112,000"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-slate-500 mt-1",
								children: "22% of total volume"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-slate-900/80 border border-slate-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-slate-400",
								children: "Debit Cards"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-extrabold text-purple-400 mt-1",
								children: "₹48,000"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-slate-500 mt-1",
								children: "6% of total volume"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-slate-900/80 border border-slate-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-slate-400",
								children: "Net Banking"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-extrabold text-amber-400 mt-1",
								children: "₹18,000"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-slate-500 mt-1",
								children: "3% of total volume"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-slate-900/80 border border-slate-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-slate-400",
								children: "Cash On Delivery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-extrabold text-slate-300 mt-1",
								children: "₹20,000"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-slate-500 mt-1",
								children: "1% of total volume"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b border-slate-800 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-sm text-white",
						children: "Live Transaction Logs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20",
						children: "Razorpay + UPI Connected"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400 bg-slate-900",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Txn ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Order ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Method"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 text-right",
									children: "Timestamp"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-slate-800/60 text-xs",
							children: [
								{
									id: "TXN-8841",
									orderId: "ORD-2026-9812",
									customer: "Aarav Sharma",
									amount: 500,
									method: "UPI",
									status: "Success",
									date: "2026-07-29 10:14 AM"
								},
								{
									id: "TXN-8842",
									orderId: "ORD-2026-9813",
									customer: "Sneha Kulkarni",
									amount: 798,
									method: "Credit Card",
									status: "Success",
									date: "2026-07-29 11:30 AM"
								},
								{
									id: "TXN-8843",
									orderId: "ORD-2026-9814",
									customer: "Pooja Verma",
									amount: 1250,
									method: "Net Banking",
									status: "Success",
									date: "2026-07-29 01:15 PM"
								},
								{
									id: "TXN-8844",
									orderId: "ORD-2026-9815",
									customer: "Vikram Patil",
									amount: 350,
									method: "Cash On Delivery",
									status: "Pending COD",
									date: "2026-07-29 02:45 PM"
								},
								{
									id: "TXN-8845",
									orderId: "ORD-2026-9816",
									customer: "Rohit Shinde",
									amount: 499,
									method: "Debit Card",
									status: "Refunded",
									date: "2026-07-28 04:20 PM"
								}
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-slate-800/30 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 font-mono font-bold text-slate-300",
										children: t.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 font-bold text-rose-400",
										children: t.orderId
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 font-medium text-white",
										children: t.customer
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-3 px-4 font-bold text-emerald-400",
										children: ["₹", t.amount]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 text-slate-300 font-semibold",
										children: t.method
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `px-2.5 py-1 rounded-full text-[10px] font-bold ${t.status === "Success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : t.status === "Refunded" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`,
											children: t.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 text-right text-slate-400",
										children: t.date
									})
								]
							}, t.id))
						})]
					})
				})]
			})
		]
	});
};
var DeliveryView = () => {
	const [shippingFee, setShippingFee] = (0, import_react.useState)(50);
	const [radiusKm, setRadiusKm] = (0, import_react.useState)(25);
	const [partners, setPartners] = (0, import_react.useState)([]);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [selectedPartnerIndex, setSelectedPartnerIndex] = (0, import_react.useState)(null);
	const [partnerForm, setPartnerForm] = (0, import_react.useState)({
		name: "",
		type: "In-House Fleet",
		ActiveOrders: 0,
		status: "Online"
	});
	(0, import_react.useEffect)(() => {
		const savedPartners = localStorage.getItem("delivery_partners");
		if (savedPartners) setPartners(JSON.parse(savedPartners));
		else {
			const defaultPartners = [
				{
					name: "Pushpangan Express",
					type: "In-House Fleet",
					ActiveOrders: 8,
					status: "Online"
				},
				{
					name: "Dunzo Local Express",
					type: "On-Demand Partner",
					ActiveOrders: 5,
					status: "Online"
				},
				{
					name: "Porter Hyperlocal",
					type: "Bulk Delivery Partner",
					ActiveOrders: 2,
					status: "Online"
				}
			];
			setPartners(defaultPartners);
			localStorage.setItem("delivery_partners", JSON.stringify(defaultPartners));
		}
	}, []);
	const handleOpenAddModal = () => {
		setIsEditing(false);
		setPartnerForm({
			name: "",
			type: "In-House Fleet",
			ActiveOrders: 0,
			status: "Online"
		});
		setShowModal(true);
	};
	const handleOpenEditModal = (index) => {
		setIsEditing(true);
		setSelectedPartnerIndex(index);
		setPartnerForm(partners[index]);
		setShowModal(true);
	};
	const handleSavePartner = (e) => {
		e.preventDefault();
		let updatedPartners = [...partners];
		if (isEditing && selectedPartnerIndex !== null) updatedPartners[selectedPartnerIndex] = partnerForm;
		else updatedPartners.push(partnerForm);
		setPartners(updatedPartners);
		localStorage.setItem("delivery_partners", JSON.stringify(updatedPartners));
		setShowModal(false);
	};
	const handleDeletePartner = (index) => {
		if (!confirm("Are you sure you want to remove this delivery partner?")) return;
		const updatedPartners = partners.filter((_, idx) => idx !== index);
		setPartners(updatedPartners);
		localStorage.setItem("delivery_partners", JSON.stringify(updatedPartners));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-5 h-5 text-rose-400" }), " Logistics & Delivery Management"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: "Dispatch fresh flower orders via Dunzo, Porter or Pushpangan Express fleet & configure delivery radius"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleOpenAddModal,
					className: "px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5 self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add Delivery Partner"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-4",
				children: partners.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20",
								children: p.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === "Online" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"}`,
								children: ["● ", p.status]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-extrabold text-white",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-400 mt-1",
							children: [
								"Active Deliveries: ",
								p.ActiveOrders,
								" orders in transit"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleOpenEditModal(idx),
								className: "p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-3 h-3" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDeletePartner(idx),
								className: "p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3 h-3" })
							})]
						})
					]
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold text-sm text-white flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-rose-400" }), " Delivery Zone & Shipping Fee Controls"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-semibold text-slate-300 mb-1",
							children: "Default Shipping Charge per Order (₹)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: shippingFee,
							onChange: (e) => setShippingFee(Number(e.target.value)),
							className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-semibold text-slate-300 mb-1",
							children: "Same-Day Delivery Radius (Kilometers)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: radiusKm,
							onChange: (e) => setRadiusKm(Number(e.target.value)),
							className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => alert("Delivery parameters saved!"),
						className: "px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition shadow-lg shadow-rose-600/20",
						children: "Save Logistics Parameters"
					})
				]
			}),
			showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSavePartner,
					className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowModal(false),
							className: "absolute top-4 right-4 p-2 text-slate-400 hover:text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-white",
							children: isEditing ? "Edit Delivery Partner" : "Add Delivery Partner"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Partner / Agency Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: partnerForm.name,
									onChange: (e) => setPartnerForm({
										...partnerForm,
										name: e.target.value
									}),
									placeholder: "e.g. Shadowfax Logistics",
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Partner Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: partnerForm.type,
									onChange: (e) => setPartnerForm({
										...partnerForm,
										type: e.target.value
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "In-House Fleet",
											children: "In-House Fleet"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "On-Demand Partner",
											children: "On-Demand Partner"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Bulk Delivery Partner",
											children: "Bulk Delivery Partner"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block font-semibold text-slate-300 mb-1",
										children: "Active Deliveries"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										value: partnerForm.ActiveOrders,
										onChange: (e) => setPartnerForm({
											...partnerForm,
											ActiveOrders: Number(e.target.value)
										}),
										className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block font-semibold text-slate-300 mb-1",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: partnerForm.status,
										onChange: (e) => setPartnerForm({
											...partnerForm,
											status: e.target.value
										}),
										className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Online",
											children: "Online"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Offline",
											children: "Offline"
										})]
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowModal(false),
								className: "px-4 py-2 text-slate-400 hover:text-white",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), " Save Partner"]
							})]
						})
					]
				})
			})
		]
	});
};
var ReviewsView = () => {
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [replyText, setReplyText] = (0, import_react.useState)("");
	const [activeReplyId, setActiveReplyId] = (0, import_react.useState)(null);
	const fetchReviews = async () => {
		setLoading(true);
		try {
			const res = await adminService.getReviews();
			if (res.success && res.reviews) setReviews(res.reviews);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchReviews();
	}, []);
	const handleUpdateStatus = async (id, status) => {
		await adminService.updateReviewStatus(id, status);
		fetchReviews();
	};
	const handleSendReply = async (id) => {
		if (!replyText) return;
		await adminService.replyReview(id, replyText);
		setActiveReplyId(null);
		setReplyText("");
		fetchReviews();
	};
	const handleDelete = async (id) => {
		if (!confirm("Delete this customer review?")) return;
		await adminService.deleteReview(id);
		fetchReviews();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-xl font-bold text-white flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-5 h-5 text-rose-400" }), " Customer Reviews Moderation"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-400",
				children: "Approve or reject customer product ratings, post official store replies and monitor floral feedback"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: reviews.map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-white text-sm",
							children: rev.userName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-rose-400 font-semibold",
							children: rev.flowerName
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1",
							children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `w-4 h-4 ${i < rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}` }, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-slate-300 italic bg-slate-800/40 p-3 rounded-2xl border border-slate-800",
						children: [
							"\"",
							rev.comment,
							"\""
						]
					}),
					rev.reply && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 ml-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-rose-300",
							children: "Store Manager Reply:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-slate-300 mt-0.5",
							children: rev.reply
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 pt-3 border-t border-slate-800 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${rev.status === "approved" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : rev.status === "rejected" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"}`,
							children: rev.status
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleUpdateStatus(rev._id, "approved"),
									className: "px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30 transition",
									children: "Approve"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleUpdateStatus(rev._id, "rejected"),
									className: "px-3 py-1 rounded-xl bg-slate-800 text-rose-400 font-bold hover:bg-rose-500/20 transition",
									children: "Reject"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveReplyId(rev._id),
									className: "px-3 py-1 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition",
									children: "Reply"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDelete(rev._id),
									className: "p-1.5 text-slate-500 hover:text-rose-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
								})
							]
						})]
					}),
					activeReplyId === rev._id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 pt-3 border-t border-slate-800 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: replyText,
							onChange: (e) => setReplyText(e.target.value),
							placeholder: "Type official admin response...",
							className: "flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleSendReply(rev._id),
							className: "px-3 py-1.5 bg-rose-600 text-white font-bold rounded-xl text-xs",
							children: "Send Reply"
						})]
					})
				]
			}, rev._id))
		})]
	});
};
var AnalyticsView = () => {
	const exportCSV = () => {
		const encodedUri = encodeURI("data:text/csv;charset=utf-8,Month,Revenue,Orders,Customers\nJan,210000,180,120\nFeb,290000,240,160\nMar,380000,310,210\nJul,710000,540,380");
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "pushpangan_sales_report_2026.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const exportPDF = () => {
		window.print();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-xl font-bold text-white flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-5 h-5 text-rose-400" }), " Executive Analytics & Intelligence"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-400",
				children: "Conversion rates, repeat customer metrics, top viewed flowers & report export engine"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: exportCSV,
					className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "w-4 h-4 text-emerald-400" }), " Export CSV"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: exportPDF,
					className: "px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4" }), " Export PDF"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-3xl bg-slate-900/80 border border-slate-800",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-400 font-semibold",
							children: "Conversion Rate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-extrabold text-emerald-400 mt-1",
							children: "4.85%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-slate-500 mt-1",
							children: "+1.2% vs industry avg"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-3xl bg-slate-900/80 border border-slate-800",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-400 font-semibold",
							children: "Repeat Customer Rate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-extrabold text-purple-400 mt-1",
							children: "42.6%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-slate-500 mt-1",
							children: "High floral loyalty"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-3xl bg-slate-900/80 border border-slate-800",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-400 font-semibold",
							children: "Avg Order Value (AOV)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-extrabold text-amber-400 mt-1",
							children: "₹685"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-slate-500 mt-1",
							children: "+₹45 this month"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-3xl bg-slate-900/80 border border-slate-800",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-400 font-semibold",
							children: "Most Viewed Flower"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-extrabold text-rose-400 mt-1",
							children: "Dutch Red Rose"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-slate-500 mt-1",
							children: "12,400 monthly views"
						})
					]
				})
			]
		})]
	});
};
var SettingsView = () => {
	const [formData, setFormData] = (0, import_react.useState)({
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
		smsGateway: "Twilio"
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const fetchSettings = async () => {
			try {
				const res = await adminService.getSettings();
				if (res.success && res.settings) setFormData(res.settings);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		fetchSettings();
	}, []);
	const handleSave = async (e) => {
		e.preventDefault();
		await adminService.saveSettings(formData);
		alert("Website & Business Settings Updated Successfully!");
	};
	const handleBackupDB = () => {
		const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(formData, null, 2))}`;
		const downloadAnchor = document.createElement("a");
		downloadAnchor.setAttribute("href", jsonString);
		downloadAnchor.setAttribute("download", `pushpangan_backup_${Date.now()}.json`);
		document.body.appendChild(downloadAnchor);
		downloadAnchor.click();
		downloadAnchor.remove();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-xl font-bold text-white flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-5 h-5 text-rose-400" }), " Platform & Security Settings"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-400",
				children: "Branding, GST credentials, shipping fees, notification gateways & database backup tools"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleBackupDB,
				className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-4 h-4 text-emerald-400" }), " Backup Database (JSON)"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSave,
			className: "space-y-6 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold text-sm text-white flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 text-rose-400" }), " General Branding & Business Profile"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Website Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: formData.websiteName,
								onChange: (e) => setFormData({
									...formData,
									websiteName: e.target.value
								}),
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Registered Legal Entity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: formData.businessName,
								onChange: (e) => setFormData({
									...formData,
									businessName: e.target.value
								}),
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "GST Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: formData.gstNumber,
								onChange: (e) => setFormData({
									...formData,
									gstNumber: e.target.value
								}),
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-1",
								children: "Support Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: formData.email,
								onChange: (e) => setFormData({
									...formData,
									email: e.target.value
								}),
								className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
							})] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold text-sm text-white flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }), " Gateway & Integration Credentials"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-semibold text-slate-300 mb-1",
							children: "Transactional Email Provider"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.emailProvider,
							onChange: (e) => setFormData({
								...formData,
								emailProvider: e.target.value
							}),
							className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "SMTP",
									children: "Custom SMTP Server"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Sendgrid",
									children: "SendGrid API"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Mailgun",
									children: "Mailgun"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-semibold text-slate-300 mb-1",
							children: "SMS Notification Gateway"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.smsGateway,
							onChange: (e) => setFormData({
								...formData,
								smsGateway: e.target.value
							}),
							className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Twilio",
									children: "Twilio SMS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Msg91",
									children: "MSG91 India"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Fast2SMS",
									children: "Fast2SMS"
								})
							]
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					className: "px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), " Save Store Settings"]
				})
			]
		})]
	});
};
var AdminsView = () => {
	const [admins, setAdmins] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		email: "",
		password: "",
		role: "manager",
		permissions: [
			"view_only",
			"edit",
			"manage_orders"
		]
	});
	const rolesList = [
		{
			id: "super_admin",
			label: "Super Admin"
		},
		{
			id: "manager",
			label: "Store Manager"
		},
		{
			id: "inventory_manager",
			label: "Inventory Manager"
		},
		{
			id: "customer_support",
			label: "Customer Support"
		}
	];
	const permissionsList = [
		"view_only",
		"edit",
		"delete",
		"create",
		"manage_orders",
		"manage_products",
		"manage_users",
		"manage_settings",
		"manage_admins"
	];
	const fetchAdmins = async () => {
		setLoading(true);
		try {
			const res = await adminService.getAdmins();
			if (res.success && res.admins) setAdmins(res.admins);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchAdmins();
	}, []);
	const handleSave = async (e) => {
		e.preventDefault();
		await adminService.saveAdmin(formData);
		setShowModal(false);
		fetchAdmins();
	};
	const handleDelete = async (id) => {
		if (!confirm("Revoke access and delete this admin account?")) return;
		await adminService.deleteAdmin(id);
		fetchAdmins();
	};
	const handlePermissionToggle = (perm) => {
		setFormData((prev) => {
			const exists = prev.permissions.includes(perm);
			return {
				...prev,
				permissions: exists ? prev.permissions.filter((p) => p !== perm) : [...prev.permissions, perm]
			};
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-rose-400" }), " Multi-Admin Accounts & Permissions Matrix"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: "Create Super Admin, Store Manager, Inventory Manager, and Customer Support accounts with fine-grained access"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowModal(true),
					className: "px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Create Admin Account"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: admins.map((ad) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: ad.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
								alt: "",
								className: "w-10 h-10 rounded-full object-cover border border-rose-500/30"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-white text-sm",
								children: ad.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400",
								children: ad.email
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30",
								children: ad.role?.replace("_", " ")
							}), ad.role !== "super_admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(ad._id),
								className: "text-slate-500 hover:text-rose-400 p-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-3 border-t border-slate-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2",
								children: "Granted Permissions:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: ad.permissions?.map((perm) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300",
									children: perm
								}, perm))
							})]
						})
					]
				}, ad._id))
			}),
			showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-white mb-4",
						children: "Create Admin Account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSave,
						className: "space-y-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: formData.name,
									onChange: (e) => setFormData({
										...formData,
										name: e.target.value
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									value: formData.email,
									onChange: (e) => setFormData({
										...formData,
										email: e.target.value
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									value: formData.password,
									onChange: (e) => setFormData({
										...formData,
										password: e.target.value
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold text-slate-300 mb-1",
									children: "Assigned Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: formData.role,
									onChange: (e) => setFormData({
										...formData,
										role: e.target.value
									}),
									className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none",
									children: rolesList.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: r.id,
										children: r.label
									}, r.id))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold text-slate-300 mb-2",
								children: "Granular Access Permissions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: permissionsList.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-1.5 text-slate-300 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: formData.permissions.includes(p),
										onChange: () => handlePermissionToggle(p),
										className: "rounded text-rose-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize text-[11px]",
										children: p.replace("_", " ")
									})]
								}, p))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowModal(false),
									className: "px-4 py-2 text-slate-400",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl",
									children: "Create Admin"
								})]
							})
						]
					})]
				})
			})
		]
	});
};
var ActivityLogsView = () => {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const fetchLogs = async () => {
			try {
				const res = await adminService.getActivityLogs();
				if (res.success && res.logs) setLogs(res.logs);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		fetchLogs();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-xl font-bold text-white flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "w-5 h-5 text-rose-400" }), " Admin Audit Logs & Security Timeline"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-400",
				children: "Immutable security log stream recording logins, order changes, product edits, and restock actions"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left border-collapse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400 bg-slate-900",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "Admin User"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "Action"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "Module"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "Details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "IP Address"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4 text-right",
								children: "Timestamp"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-slate-800/60 text-xs",
						children: logs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-slate-800/30 transition",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 font-bold text-white",
									children: log.adminName || "Admin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-mono font-bold text-[10px]",
										children: log.action
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-slate-300 font-semibold",
									children: log.module
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-slate-300",
									children: log.details
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 font-mono text-slate-400",
									children: log.ipAddress || "127.0.0.1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-right text-slate-400",
									children: log.createdAt?.slice(0, 19).replace("T", " ")
								})
							]
						}, log._id))
					})]
				})
			})
		})]
	});
};
var ApiDocsView = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-xl font-bold text-white flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "w-5 h-5 text-rose-400" }), " OpenAPI / Swagger REST Specifications"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-400",
				children: "Pushpangan Admin REST API Documentation & Endpoint Sandbox"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between pb-4 border-b border-slate-800",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "w-5 h-5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-white text-sm",
						children: "Base URL: http://localhost:5000/api/admin"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300",
					children: "OpenAPI v3.0 Spec"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: [
					{
						method: "POST",
						path: "/api/admin/login",
						desc: "Admin sign-in with email, password & rate limiting protection"
					},
					{
						method: "POST",
						path: "/api/admin/refresh-token",
						desc: "Exchange refresh token for new access JWT"
					},
					{
						method: "GET",
						path: "/api/admin/dashboard-stats",
						desc: "Fetch 10 KPI cards and 5 Recharts data payloads"
					},
					{
						method: "GET",
						path: "/api/admin/flowers",
						desc: "List flowers with search, pagination, category & season filters"
					},
					{
						method: "POST",
						path: "/api/admin/flowers",
						desc: "Create new flower product with Cloudinary image upload"
					},
					{
						method: "POST",
						path: "/api/admin/flowers/:id/duplicate",
						desc: "Duplicate existing flower product"
					},
					{
						method: "GET",
						path: "/api/admin/orders",
						desc: "Search and filter orders by status and date"
					},
					{
						method: "PUT",
						path: "/api/admin/orders/:id/status",
						desc: "Update order status progression (Pending to Delivered)"
					},
					{
						method: "POST",
						path: "/api/admin/orders/:id/refund",
						desc: "Process instant order refund"
					},
					{
						method: "GET",
						path: "/api/admin/customers",
						desc: "List customer CRM records and total spend"
					},
					{
						method: "POST",
						path: "/api/admin/inventory/restock",
						desc: "Add stock quantity to product inventory"
					}
				].map((ep, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${ep.method === "GET" ? "bg-blue-500/20 text-blue-400" : ep.method === "POST" ? "bg-emerald-500/20 text-emerald-400" : ep.method === "PUT" ? "bg-amber-500/20 text-amber-400" : "bg-rose-500/20 text-rose-400"}`,
							children: ep.method
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-bold text-white",
							children: ep.path
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-slate-400",
						children: ep.desc
					})]
				}, idx))
			})]
		})]
	});
};
function AdminRouteWrapper() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminContent, {}) });
}
function AdminContent() {
	const { admin, loading } = useAdminAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("dashboard");
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold text-rose-300",
			children: "Loading Pushpangan Admin Security Console..."
		})]
	});
	if (!admin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, {});
	const renderActiveView = () => {
		switch (activeTab) {
			case "dashboard": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardView, {});
			case "orders": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersView, {});
			case "flowers": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowersView, {});
			case "categories": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesView, {});
			case "customers": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomersView, {});
			case "inventory": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryView, {});
			case "offers": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OffersView, {});
			case "coupons": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponsView, {});
			case "reviews": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewsView, {});
			case "delivery": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeliveryView, {});
			case "payments": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentsView, {});
			case "analytics": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsView, {});
			case "settings": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsView, {});
			case "admins": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminsView, {});
			case "activity": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityLogsView, {});
			case "apidocs": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiDocsView, {});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardView, {});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, {
		activeTab,
		setActiveTab,
		children: renderActiveView()
	});
}
//#endregion
export { AdminRouteWrapper as component };
