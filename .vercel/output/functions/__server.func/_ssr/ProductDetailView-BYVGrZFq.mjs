import { i as __toESM } from "../_runtime.mjs";
import { t as API_URL } from "./api-CnTWETQ1.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as Percent, F as MessageSquare, M as Package, O as Plus, P as Minus, Q as Flower2, R as MapPin, Tt as Building2, V as Lock, W as KeyRound, X as Gift, _ as ShoppingCart, _t as CircleAlert, b as ShieldCheck, g as Sparkles, h as SquarePen, ht as CircleCheck, it as ExternalLink, jt as ArrowLeft, kt as Award, l as Trash2, n as X, nt as Eye, o as Truck, rt as EyeOff, t as ZoomIn, vt as ChevronRight, wt as Calendar, z as Mail } from "../_libs/lucide-react.mjs";
import { a as productService, i as findFlower, n as FLOWERS } from "./productService-DaSRxsDy.mjs";
import { r as useCart } from "./CartContext-CGJFQYZO.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductDetailView-BYVGrZFq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_STORAGE_KEYS = {
	token: "adminToken",
	user: "adminUser",
	refreshToken: "adminRefreshToken"
};
var ADMIN_ROLES = [
	"super_admin",
	"admin",
	"manager",
	"inventory_manager"
];
var ADMIN_SESSION_SECRET = "pushpangan-admin-v1";
/** Known admin accounts used when the backend API is unavailable (local/demo only). */
var ADMIN_ACCOUNTS = [
	{
		id: "admin-super",
		name: "Pushpangan Admin",
		email: "admin@pushpangan.com",
		password: "admin123",
		role: "super_admin",
		permissions: [
			"view_only",
			"edit",
			"delete",
			"create",
			"manage_orders",
			"manage_products",
			"manage_users",
			"manage_settings",
			"manage_admins"
		]
	},
	{
		id: "admin-manager",
		name: "Store Manager",
		email: "manager@pushpangan.com",
		password: "manager123",
		role: "manager",
		permissions: [
			"view_only",
			"edit",
			"manage_orders",
			"manage_products"
		]
	},
	{
		id: "admin-inventory",
		name: "Inventory Manager",
		email: "inventory@pushpangan.com",
		password: "inventory123",
		role: "inventory_manager",
		permissions: [
			"view_only",
			"edit",
			"manage_products"
		]
	}
];
function isAdminRole(role) {
	if (!role) return false;
	return ADMIN_ROLES.includes(role) || role === "super_admin";
}
function toPublicAdmin(account) {
	const { password: _password, ...admin } = account;
	return admin;
}
function createAdminSessionToken(adminId) {
	return btoa(`${adminId}:${ADMIN_SESSION_SECRET}`);
}
function getAdminIdFromToken(token) {
	if (!token) return null;
	try {
		const [adminId, secret] = atob(token).split(":");
		if (secret !== ADMIN_SESSION_SECRET || !adminId) return null;
		return adminId;
	} catch {
		return null;
	}
}
function validateLocalAdminCredentials(email, password) {
	const normalizedEmail = email.trim().toLowerCase();
	const account = ADMIN_ACCOUNTS.find((entry) => entry.email.toLowerCase() === normalizedEmail && entry.password === password);
	return account ? toPublicAdmin(account) : null;
}
function getStoredAdminSession() {
	if (typeof window === "undefined") return null;
	const token = localStorage.getItem(ADMIN_STORAGE_KEYS.token);
	const adminId = getAdminIdFromToken(token);
	if (!adminId || !token) return null;
	const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.user);
	if (!saved) return null;
	try {
		const admin = JSON.parse(saved);
		if (admin.id !== adminId || !isAdminRole(admin.role)) return null;
		return {
			admin,
			token
		};
	} catch {
		return null;
	}
}
function persistAdminSession(admin, token) {
	localStorage.setItem(ADMIN_STORAGE_KEYS.user, JSON.stringify(admin));
	localStorage.setItem(ADMIN_STORAGE_KEYS.token, token);
}
function clearAdminSession() {
	localStorage.removeItem(ADMIN_STORAGE_KEYS.user);
	localStorage.removeItem(ADMIN_STORAGE_KEYS.token);
	localStorage.removeItem(ADMIN_STORAGE_KEYS.refreshToken);
}
var API_BASE = `${API_URL}/api/admin`;
var getHeaders = () => {
	const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
	return {
		"Content-Type": "application/json",
		...token ? { Authorization: `Bearer ${token}` } : {}
	};
};
var adminService = {
	async login(credentials) {
		const email = credentials.email?.trim() || "";
		const password = credentials.password || "";
		if (!email || !password) return {
			success: false,
			message: "Email and password are required."
		};
		try {
			const res = await fetch(`${API_BASE}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials)
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.message || "Login failed");
			if (!data.admin || !isAdminRole(data.admin.role)) return {
				success: false,
				message: "This account is not authorized for admin access."
			};
			if (data.token) persistAdminSession(data.admin, data.token);
			if (data.refreshToken) localStorage.setItem("adminRefreshToken", data.refreshToken);
			return data;
		} catch {
			const admin = validateLocalAdminCredentials(email, password);
			if (!admin) return {
				success: false,
				message: "Invalid admin credentials or unauthorized access."
			};
			const token = createAdminSessionToken(admin.id);
			persistAdminSession(admin, token);
			return {
				success: true,
				token,
				admin
			};
		}
	},
	async logout() {
		try {
			await fetch(`${API_BASE}/logout`, {
				method: "POST",
				headers: getHeaders()
			});
		} catch (e) {}
		clearAdminSession();
	},
	async getMe() {
		try {
			const res = await fetch(`${API_BASE}/me`, { headers: getHeaders() });
			if (!res.ok) throw new Error("Unauthorized");
			const data = await res.json();
			if (!data.success || !data.admin || !isAdminRole(data.admin.role)) throw new Error("Unauthorized");
			return data;
		} catch {
			const session = getStoredAdminSession();
			if (session) return {
				success: true,
				admin: session.admin
			};
			clearAdminSession();
			return {
				success: false,
				admin: null
			};
		}
	},
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
					recentCustomers: []
				},
				charts: {
					dailySales: [],
					monthlySales: [],
					categoryPerformance: [],
					topSellingFlowers: []
				}
			};
		}
	},
	async getFlowers(params) {
		try {
			const query = new URLSearchParams(params || {}).toString();
			const res = await fetch(`${API_BASE}/flowers?${query}`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				flowers: [],
				total: 0
			};
		}
	},
	async saveFlower(flower) {
		const url = flower._id ? `${API_BASE}/flowers/${flower._id}` : `${API_BASE}/flowers`;
		const method = flower._id ? "PUT" : "POST";
		return await (await fetch(url, {
			method,
			headers: getHeaders(),
			body: JSON.stringify(flower)
		})).json();
	},
	async deleteFlower(id) {
		return await (await fetch(`${API_BASE}/flowers/${id}`, {
			method: "DELETE",
			headers: getHeaders()
		})).json();
	},
	async duplicateFlower(id) {
		return await (await fetch(`${API_BASE}/flowers/${id}/duplicate`, {
			method: "POST",
			headers: getHeaders()
		})).json();
	},
	async toggleFlowerStatus(id) {
		return await (await fetch(`${API_BASE}/flowers/${id}/toggle-status`, {
			method: "PATCH",
			headers: getHeaders()
		})).json();
	},
	async getCategories() {
		try {
			const res = await fetch(`${API_BASE}/categories`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				categories: []
			};
		}
	},
	async saveCategory(category) {
		const url = category._id ? `${API_BASE}/categories/${category._id}` : `${API_BASE}/categories`;
		const method = category._id ? "PUT" : "POST";
		return await (await fetch(url, {
			method,
			headers: getHeaders(),
			body: JSON.stringify(category)
		})).json();
	},
	async deleteCategory(id) {
		return await (await fetch(`${API_BASE}/categories/${id}`, {
			method: "DELETE",
			headers: getHeaders()
		})).json();
	},
	async getOrders(params) {
		try {
			const query = new URLSearchParams(params || {}).toString();
			const res = await fetch(`${API_BASE}/orders?${query}`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				orders: []
			};
		}
	},
	async updateOrderStatus(id, body) {
		return await (await fetch(`${API_BASE}/orders/${id}/status`, {
			method: "PUT",
			headers: getHeaders(),
			body: JSON.stringify(body)
		})).json();
	},
	async refundOrder(id, body) {
		return await (await fetch(`${API_BASE}/orders/${id}/refund`, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(body)
		})).json();
	},
	async getCustomers(params) {
		try {
			const query = new URLSearchParams(params || {}).toString();
			const res = await fetch(`${API_BASE}/customers?${query}`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				customers: []
			};
		}
	},
	async blockCustomer(id) {
		return await (await fetch(`${API_BASE}/customers/${id}/block`, {
			method: "PUT",
			headers: getHeaders()
		})).json();
	},
	async deleteCustomer(id) {
		return await (await fetch(`${API_BASE}/customers/${id}`, {
			method: "DELETE",
			headers: getHeaders()
		})).json();
	},
	async getInventory() {
		try {
			const res = await fetch(`${API_BASE}/inventory`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				products: [],
				metrics: {
					totalItems: 0,
					lowStockCount: 0,
					outOfStockCount: 0
				}
			};
		}
	},
	async restockInventory(productId, quantity) {
		return await (await fetch(`${API_BASE}/inventory/restock`, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify({
				productId,
				quantity
			})
		})).json();
	},
	async getCoupons() {
		try {
			const res = await fetch(`${API_BASE}/coupons`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				coupons: []
			};
		}
	},
	async saveCoupon(coupon) {
		return await (await fetch(`${API_BASE}/coupons`, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(coupon)
		})).json();
	},
	async toggleCoupon(id) {
		return await (await fetch(`${API_BASE}/coupons/${id}/toggle`, {
			method: "PATCH",
			headers: getHeaders()
		})).json();
	},
	async deleteCoupon(id) {
		return await (await fetch(`${API_BASE}/coupons/${id}`, {
			method: "DELETE",
			headers: getHeaders()
		})).json();
	},
	async getOffers() {
		try {
			const res = await fetch(`${API_BASE}/offers`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				offers: []
			};
		}
	},
	async saveOffer(offer) {
		return await (await fetch(`${API_BASE}/offers`, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(offer)
		})).json();
	},
	async toggleOffer(id) {
		return await (await fetch(`${API_BASE}/offers/${id}/toggle`, {
			method: "PATCH",
			headers: getHeaders()
		})).json();
	},
	async deleteOffer(id) {
		return await (await fetch(`${API_BASE}/offers/${id}`, {
			method: "DELETE",
			headers: getHeaders()
		})).json();
	},
	async getReviews() {
		try {
			const res = await fetch(`${API_BASE}/reviews`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				reviews: []
			};
		}
	},
	async updateReviewStatus(id, status) {
		return await (await fetch(`${API_BASE}/reviews/${id}/status`, {
			method: "PUT",
			headers: getHeaders(),
			body: JSON.stringify({ status })
		})).json();
	},
	async replyReview(id, reply) {
		return await (await fetch(`${API_BASE}/reviews/${id}/reply`, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify({ reply })
		})).json();
	},
	async deleteReview(id) {
		return await (await fetch(`${API_BASE}/reviews/${id}`, {
			method: "DELETE",
			headers: getHeaders()
		})).json();
	},
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
					smsGateway: "Twilio"
				}
			};
		}
	},
	async saveSettings(settings) {
		return await (await fetch(`${API_BASE}/settings`, {
			method: "PUT",
			headers: getHeaders(),
			body: JSON.stringify(settings)
		})).json();
	},
	async getAdmins() {
		try {
			const res = await fetch(`${API_BASE}/admins`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				admins: []
			};
		}
	},
	async saveAdmin(admin) {
		return await (await fetch(`${API_BASE}/admins`, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(admin)
		})).json();
	},
	async deleteAdmin(id) {
		return await (await fetch(`${API_BASE}/admins/${id}`, {
			method: "DELETE",
			headers: getHeaders()
		})).json();
	},
	async getActivityLogs() {
		try {
			const res = await fetch(`${API_BASE}/activity-logs`, { headers: getHeaders() });
			if (!res.ok) throw new Error();
			return await res.json();
		} catch (err) {
			return {
				success: true,
				logs: []
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
				notifications: []
			};
		}
	},
	async markNotificationsRead() {
		return await (await fetch(`${API_BASE}/notifications/read-all`, {
			method: "PUT",
			headers: getHeaders()
		})).json();
	}
};
var AdminAuthContext = (0, import_react.createContext)(void 0);
var AdminAuthProvider = ({ children }) => {
	const [admin, setAdmin] = (0, import_react.useState)(null);
	const [token, setToken] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [theme, setTheme] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "light";
		return localStorage.getItem("adminTheme") || "light";
	});
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("adminTheme", theme);
	}, [theme]);
	(0, import_react.useEffect)(() => {
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
	const login = async (credentials) => {
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
	const hasPermission = (permission) => {
		if (!admin) return false;
		if (admin.role === "super_admin") return true;
		return admin.permissions?.includes(permission) || false;
	};
	const hasRole = (allowedRoles) => {
		if (!admin) return false;
		if (admin.role === "super_admin") return true;
		return allowedRoles.includes(admin.role);
	};
	const toggleTheme = () => {
		setTheme((prev) => prev === "dark" ? "light" : "dark");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAuthContext.Provider, {
		value: {
			admin,
			token,
			loading,
			theme,
			login,
			logout,
			hasPermission,
			hasRole,
			toggleTheme
		},
		children
	});
};
var useAdminAuth = () => {
	const context = (0, import_react.useContext)(AdminAuthContext);
	if (!context) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
	return context;
};
var AdminLogin = () => {
	const { login } = useAdminAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [rememberMe, setRememberMe] = (0, import_react.useState)(true);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [showForgotModal, setShowForgotModal] = (0, import_react.useState)(false);
	const [resetEmail, setResetEmail] = (0, import_react.useState)("");
	const [resetSuccess, setResetSuccess] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const res = await login({
				email,
				password,
				rememberMe
			});
			if (!res.success) setError(res.message || "Invalid credentials or unauthorized role.");
		} catch (err) {
			setError(err.message || "Login failed. Please check your credentials.");
		} finally {
			setLoading(false);
		}
	};
	const handleForgotPassword = (e) => {
		e.preventDefault();
		if (!resetEmail) return;
		setResetSuccess(true);
		setTimeout(() => {
			setResetSuccess(false);
			setShowForgotModal(false);
			setResetEmail("");
		}, 2500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { backgroundColor: "#F5F3E9" },
		className: "min-h-screen relative flex items-center justify-center p-4 font-sans text-[#4F5535] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { backgroundColor: "rgba(182, 143, 56, 0.15)" },
				className: "absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { backgroundColor: "rgba(79, 85, 53, 0.1)" },
				className: "absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { backgroundColor: "#B68F38" },
							className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg border border-[#E2DCBE] mb-4 transform hover:rotate-6 transition-transform text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, { className: "w-9 h-9" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							style: { color: "#4F5535" },
							className: "text-3xl font-extrabold tracking-tight",
							children: "Pushpangan Admin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { color: "#B68F38" },
							className: "text-xs mt-1 font-extrabold tracking-wide",
							children: "Wholesale & Retail Fresh Flower Portal"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						backgroundColor: "#FFFFFF",
						borderColor: "#E2DCBE"
					},
					className: "rounded-3xl p-8 shadow-xl border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { borderColor: "#E2DCBE" },
							className: "flex items-center justify-between pb-6 mb-6 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								style: { color: "#4F5535" },
								className: "text-lg font-bold flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									style: { color: "#B68F38" },
									className: "w-5 h-5"
								}), " Authorized Sign In"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { color: "#666851" },
								className: "text-xs",
								children: "Protected Admin Portal Access"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									backgroundColor: "rgba(182, 143, 56, 0.15)",
									color: "#B68F38",
									borderColor: "#E2DCBE"
								},
								className: "text-xs font-extrabold px-3 py-1 rounded-full border",
								children: "Enterprise Admin"
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 text-xs flex items-start gap-2 animate-shake",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									style: { color: "#4F5535" },
									className: "block text-xs font-bold mb-1.5 uppercase tracking-wider",
									children: "Admin Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
										style: { color: "#9F905E" },
										className: "absolute left-3.5 top-3.5 w-4 h-4"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "admin@pushpangan.com",
										required: true,
										style: {
											backgroundColor: "#F5F3E9",
											borderColor: "#E2DCBE",
											color: "#4F5535"
										},
										className: "w-full border focus:border-[#B68F38] rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition font-medium"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: { color: "#4F5535" },
										className: "block text-xs font-bold uppercase tracking-wider",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowForgotModal(true),
										style: { color: "#B68F38" },
										className: "text-xs hover:underline transition font-bold",
										children: "Forgot Password?"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
											style: { color: "#9F905E" },
											className: "absolute left-3.5 top-3.5 w-4 h-4"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: showPassword ? "text" : "password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											placeholder: "••••••••",
											required: true,
											style: {
												backgroundColor: "#F5F3E9",
												borderColor: "#E2DCBE",
												color: "#4F5535"
											},
											className: "w-full border focus:border-[#B68F38] rounded-xl py-2.5 pl-10 pr-10 text-sm outline-none transition font-medium"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowPassword(!showPassword),
											style: { color: "#666851" },
											className: "absolute right-3.5 top-3.5 hover:opacity-80 transition",
											children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" })
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between pt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										style: { color: "#666851" },
										className: "flex items-center gap-2 text-xs font-semibold cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: rememberMe,
											onChange: (e) => setRememberMe(e.target.checked),
											className: "w-4 h-4 rounded text-[#B68F38] focus:ring-[#B68F38]"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Remember this browser (30 Days)" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: loading,
									style: {
										backgroundColor: "#4F5535",
										color: "#FFFFFF"
									},
									className: "w-full mt-4 font-bold py-3 px-4 rounded-xl shadow hover:bg-[#383d26] transition flex items-center justify-center gap-2",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-4 h-4" }), " Access Admin Dashboard"] })
								})
							]
						}),
						false
					]
				})]
			}),
			showForgotModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						backgroundColor: "#FFFFFF",
						color: "#4F5535"
					},
					className: "border border-[#E2DCBE] rounded-3xl p-6 w-full max-w-md shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							style: { color: "#4F5535" },
							className: "text-lg font-bold mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
								style: { color: "#B68F38" },
								className: "w-5 h-5"
							}), " Reset Admin Password"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { color: "#666851" },
							className: "text-xs mb-4",
							children: "Enter your registered admin email address to receive password reset instructions."
						}),
						resetSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs flex items-center gap-2 font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Reset link sent to ",
								resetEmail,
								"! Please check your email inbox."
							] })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleForgotPassword,
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: { color: "#4F5535" },
								className: "block text-xs font-bold mb-1",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: resetEmail,
								onChange: (e) => setResetEmail(e.target.value),
								placeholder: "admin@pushpangan.com",
								required: true,
								style: {
									backgroundColor: "#F5F3E9",
									borderColor: "#E2DCBE",
									color: "#4F5535"
								},
								className: "w-full border rounded-xl px-3.5 py-2 text-sm outline-none focus:border-[#B68F38]"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowForgotModal(false),
									className: "px-4 py-2 text-xs font-bold text-slate-500",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									style: {
										backgroundColor: "#B68F38",
										color: "#FFFFFF"
									},
									className: "px-4 py-2 text-xs font-bold rounded-xl shadow",
									children: "Send Reset Link"
								})]
							})]
						})
					]
				})
			})
		]
	});
};
var ProductDetailView = ({ productId = "orange-marigold", onBack, onEdit }) => {
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const [product, setProduct] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedImage, setSelectedImage] = (0, import_react.useState)("");
	const [isZoomed, setIsZoomed] = (0, import_react.useState)(false);
	const [showLightbox, setShowLightbox] = (0, import_react.useState)(false);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [activeTab, setActiveTab] = (0, import_react.useState)("about");
	const [addedToast, setAddedToast] = (0, import_react.useState)(false);
	const [showStockModal, setShowStockModal] = (0, import_react.useState)(false);
	const [showPriceModal, setShowPriceModal] = (0, import_react.useState)(false);
	const [newStock, setNewStock] = (0, import_react.useState)(100);
	const [newPrice, setNewPrice] = (0, import_react.useState)(199);
	const [newDiscountPrice, setNewDiscountPrice] = (0, import_react.useState)(149);
	const [showWriteReview, setShowWriteReview] = (0, import_react.useState)(false);
	const [reviewForm, setReviewForm] = (0, import_react.useState)({
		name: "",
		rating: 5,
		comment: ""
	});
	const [reviews, setReviews] = (0, import_react.useState)([
		{
			id: "rev-1",
			name: "Priyamvada Sharma",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
			rating: 5,
			date: "Yesterday",
			verified: true,
			text: "Extremely fresh marigold flowers! Delivered at 6 AM right before our pooja. Vibrant color and wonderful fragrance. Highly recommended!"
		},
		{
			id: "rev-2",
			name: "Rajesh Deshmukh",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
			rating: 5,
			date: "3 days ago",
			verified: true,
			text: "Ordered 10 kg in bulk for wedding decoration. All flowers were intact, fresh and petal count was fantastic. Excellent packaging."
		},
		{
			id: "rev-3",
			name: "Snehal Patil",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
			rating: 4,
			date: "1 week ago",
			verified: true,
			text: "Very fresh blooms. Delivered on time in Navi Mumbai. Will order lotus and mogra next week for Ganesh festival."
		}
	]);
	const loadProductData = async () => {
		setLoading(true);
		try {
			const savedAdmin = localStorage.getItem("pushpangan_admin_products");
			let found = null;
			if (savedAdmin) found = JSON.parse(savedAdmin).find((p) => p._id === productId || p.slug === productId || p.id === productId || p.name.toLowerCase().includes(productId.toLowerCase()));
			if (!found) {
				const dbProd = await productService.getProductBySlug(productId);
				if (dbProd) found = {
					_id: dbProd._id || dbProd.slug,
					name: dbProd.name,
					slug: dbProd.slug,
					category: typeof dbProd.category === "object" ? dbProd.category.name : dbProd.category,
					color: dbProd.color || "Orange",
					price: dbProd.price,
					discountPrice: dbProd.discount_price || Math.round(dbProd.price * .8),
					stockQuantity: dbProd.stock_quantity || 100,
					unit: dbProd.unit || "kg",
					image: dbProd.image,
					images: dbProd.images && dbProd.images.length > 0 ? dbProd.images : [dbProd.image],
					description: dbProd.short_description || dbProd.long_description || "",
					shortDescription: dbProd.short_description || "",
					scientificName: dbProd.botanical_name || "",
					occasions: [
						"Festival",
						"Wedding",
						"Pooja",
						"Temple"
					],
					freshness: "Dawn Plucked 100% Fresh",
					season: "All Season",
					isFeatured: dbProd.featured,
					status: "published",
					minOrderQuantity: 1,
					available: dbProd.availability,
					vendorName: "Pushpangan Fresh Farms",
					vendorLocation: "Pune / Navi Mumbai",
					rating: 4.8,
					reviewCount: 124
				};
			}
			if (!found) {
				const staticFlw = findFlower(productId) || FLOWERS[0];
				found = {
					_id: staticFlw.slug,
					name: staticFlw.name,
					slug: staticFlw.slug,
					category: staticFlw.category,
					color: staticFlw.color,
					price: Math.round(staticFlw.price * 1.25),
					discountPrice: staticFlw.price,
					stockQuantity: 100,
					unit: staticFlw.unit.replace("per ", ""),
					image: staticFlw.image,
					images: [
						staticFlw.image,
						"https://res.cloudinary.com/r1o7fosa/image/upload/v1784709569/6cd676ac-edb2-44f6-8d88-d472354c11ec.png",
						"https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png",
						"https://res.cloudinary.com/r1o7fosa/image/upload/v1784737646/3cb09d52-4e7a-4425-9451-dc103c77bb5f.png"
					],
					description: staticFlw.description,
					shortDescription: staticFlw.description,
					scientificName: "Tagetes erecta",
					occasions: staticFlw.occasions,
					freshness: staticFlw.freshness,
					season: "All Season",
					isFeatured: true,
					status: "published",
					minOrderQuantity: 1,
					available: staticFlw.available,
					vendorName: "Pushpangan Fresh Farms",
					vendorLocation: "Pune & Mumbai Mandi Direct",
					rating: 4.8,
					reviewCount: 124
				};
			}
			if (!found.images || found.images.length === 0) found.images = [found.image];
			if (!found.images.includes(found.image)) found.images.unshift(found.image);
			setProduct(found);
			setSelectedImage(found.image || found.images[0]);
			setNewStock(found.stockQuantity || 100);
			setNewPrice(found.price || 249);
			setNewDiscountPrice(found.discountPrice || 199);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadProductData();
	}, [productId]);
	const updateProductInStorage = (updatedFields) => {
		if (!product) return;
		const newProductState = {
			...product,
			...updatedFields
		};
		setProduct(newProductState);
		try {
			const savedAdmin = localStorage.getItem("pushpangan_admin_products");
			let list = savedAdmin ? JSON.parse(savedAdmin) : [];
			const idx = list.findIndex((p) => p._id === product._id || p.slug === product.slug);
			if (idx !== -1) list[idx] = {
				...list[idx],
				...updatedFields
			};
			else list.unshift(newProductState);
			localStorage.setItem("pushpangan_admin_products", JSON.stringify(list));
			if (typeof window !== "undefined") {
				window.dispatchEvent(new Event("storage"));
				window.dispatchEvent(new Event("pushpangan_products_updated"));
			}
		} catch (e) {
			console.error("Failed to save product update:", e);
		}
	};
	const handleToggleFeatured = () => {
		const nextState = !product.isFeatured;
		updateProductInStorage({ isFeatured: nextState });
	};
	const handleToggleStatus = () => {
		const nextStatus = product.status === "published" ? "draft" : "published";
		updateProductInStorage({
			status: nextStatus,
			available: nextStatus === "published"
		});
	};
	const handleSaveStock = () => {
		updateProductInStorage({
			stockQuantity: newStock,
			available: newStock > 0
		});
		setShowStockModal(false);
	};
	const handleSavePrice = () => {
		updateProductInStorage({
			price: newPrice,
			discountPrice: newDiscountPrice
		});
		setShowPriceModal(false);
	};
	const handleDeleteProduct = () => {
		if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;
		try {
			const savedAdmin = localStorage.getItem("pushpangan_admin_products");
			if (savedAdmin) {
				const list = JSON.parse(savedAdmin).filter((p) => p._id !== product._id && p.slug !== product.slug);
				localStorage.setItem("pushpangan_admin_products", JSON.stringify(list));
				window.dispatchEvent(new Event("storage"));
				window.dispatchEvent(new Event("pushpangan_products_updated"));
			}
		} catch {}
		if (onBack) onBack();
		else navigate({ to: "/admin" });
	};
	const handleAddToCart = () => {
		if (!product) return;
		const flowerObj = {
			slug: product.slug,
			name: product.name,
			category: product.category,
			color: product.color || "Orange",
			price: product.discountPrice || product.price,
			unit: product.unit.startsWith("per") ? product.unit : `per ${product.unit}`,
			available: product.available,
			image: product.image,
			description: product.description,
			occasions: product.occasions || ["Festival", "Wedding"],
			freshness: product.freshness || "Dawn Plucked 100% Fresh"
		};
		addToCart(flowerObj, quantity);
		setAddedToast(true);
		setTimeout(() => setAddedToast(false), 2500);
	};
	const handleSubmitReview = (e) => {
		e.preventDefault();
		if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;
		const newRev = {
			id: "rev-" + Date.now(),
			name: reviewForm.name,
			avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
			rating: Number(reviewForm.rating),
			date: "Just now",
			verified: true,
			text: reviewForm.comment
		};
		setReviews([newRev, ...reviews]);
		setReviewForm({
			name: "",
			rating: 5,
			comment: ""
		});
		setShowWriteReview(false);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#F5F3E9] flex flex-col items-center justify-center p-8 text-[#4F5535]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, { className: "w-10 h-10 animate-spin text-[#B68F38] mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-extrabold text-sm",
			children: "Loading Product Details from Database..."
		})]
	});
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#F5F3E9] p-8 text-center text-[#4F5535]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-12 h-12 text-rose-500 mx-auto mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Product Not Found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onBack ? onBack() : navigate({ to: "/admin" }),
				className: "mt-4 px-4 py-2 bg-[#4F5535] text-white rounded-xl font-bold text-xs",
				children: "Return to Admin Catalog"
			})
		]
	});
	const currentPrice = product.discountPrice || product.price;
	const originalPrice = product.price;
	const discountPercent = originalPrice > currentPrice ? Math.round((originalPrice - currentPrice) / originalPrice * 100) : 0;
	const relatedProducts = FLOWERS.filter((f) => f.slug !== product.slug).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#F5F3E9] text-[#4F5535] font-sans pb-24",
		children: [
			addedToast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					backgroundColor: "#B83245",
					color: "#FFFFFF"
				},
				className: "fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-white" }),
					"Added ",
					quantity,
					" ",
					product.unit,
					" of \"",
					product.name,
					"\" to cart!"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					backgroundColor: "#4F5535",
					color: "#FFFFFF"
				},
				className: "sticky top-0 z-40 px-4 py-3 shadow-md flex flex-wrap items-center justify-between gap-3 border-b border-[#9F905E]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onBack ? onBack() : navigate({ to: "/admin" }),
						className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), " Back to Products"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:flex items-center gap-2 text-xs font-extrabold text-[#E2DCBE]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-[#B68F38]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admin Live Product Console" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onEdit ? onEdit(product) : null,
							className: "px-3 py-1.5 rounded-xl bg-[#B68F38] text-white hover:opacity-90 font-bold text-xs flex items-center gap-1.5 shadow-xs transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-3.5 h-3.5" }), " Edit Product"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowPriceModal(true),
							className: "px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "w-3.5 h-3.5 text-[#E2DCBE]" }), " Change Price"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowStockModal(true),
							className: "px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 transition",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-3.5 h-3.5 text-[#E2DCBE]" }),
								" Update Stock (",
								product.stockQuantity,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleToggleFeatured,
							className: `px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${product.isFeatured ? "bg-amber-500 text-white shadow-xs" : "bg-white/15 hover:bg-white/25 text-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), product.isFeatured ? "Featured ★" : "Make Featured"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleToggleStatus,
							className: `px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${product.status === "published" ? "bg-emerald-600 text-white" : "bg-slate-600 text-slate-200"}`,
							children: [product.status === "published" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }), product.status === "published" ? "Published" : "Draft"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/flowers/$slug",
							params: { slug: product.slug },
							target: "_blank",
							className: "px-3 py-1.5 rounded-xl bg-[#B83245] text-white font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" }), " Customer View"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleDeleteProduct,
							className: "p-1.5 rounded-xl bg-rose-600/30 hover:bg-rose-600 text-rose-100 hover:text-white transition",
							title: "Delete Product",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2 text-xs font-semibold text-[#666851]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-[#B68F38] transition",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 text-[#9F905E]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "hover:text-[#B68F38] transition",
								children: "Flowers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 text-[#9F905E]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hover:text-[#B68F38] cursor-pointer",
								children: product.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 text-[#9F905E]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#4F5535] font-extrabold",
								children: product.name
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-5 space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative bg-white rounded-3xl border border-[#E2DCBE] p-4 shadow-sm group overflow-hidden cursor-zoom-in",
								onClick: () => setShowLightbox(true),
								onMouseEnter: () => setIsZoomed(true),
								onMouseLeave: () => setIsZoomed(false),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-square w-full rounded-2xl overflow-hidden relative flex items-center justify-center bg-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: selectedImage,
											alt: product.name,
											className: `w-full h-full object-cover transition-transform duration-500 ease-out ${isZoomed ? "scale-125" : "scale-100"}`
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute top-6 left-6 flex flex-col gap-1.5 z-10",
										children: [discountPercent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: {
												backgroundColor: "#B83245",
												color: "#FFFFFF"
											},
											className: "px-3 py-1 rounded-full text-xs font-black shadow-md tracking-wider uppercase",
											children: [discountPercent, "% OFF"]
										}), product.isFeatured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												backgroundColor: "#B68F38",
												color: "#FFFFFF"
											},
											className: "px-3 py-1 rounded-full text-xs font-black shadow-md uppercase tracking-wider",
											children: "Featured ★"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute bottom-6 right-6 bg-slate-900/60 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "w-3.5 h-3.5 text-[#E2DCBE]" }), "Click to view full image"]
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-7 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 border-b border-[#E2DCBE] pb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-3 py-0.5 rounded-full bg-[#E2DCBE]/60 text-[#4F5535] text-[11px] font-extrabold uppercase tracking-wider",
												children: product.category
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-[#9F905E] font-semibold",
												children: ["SKU: ", product.slug?.toUpperCase()]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "text-2xl sm:text-3xl font-black text-[#4F5535] tracking-tight leading-snug",
											children: product.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "#reviews",
													className: "flex items-center gap-1 font-black text-[#B68F38] hover:underline",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "bg-[#B68F38] text-white px-2 py-0.5 rounded-md flex items-center gap-1",
														children: ["★ ", product.rating || 4.8]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[#666851] font-semibold",
													children: "•"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: "#reviews",
													className: "text-[#4F5535] font-extrabold hover:underline",
													children: [reviews.length || product.reviewCount || 124, " Verified Customer Reviews"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[#666851] font-semibold",
													children: "•"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-emerald-700 font-extrabold flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-600" }), " Dawn Plucked Fresh"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-[#4F5535]/90 leading-relaxed pt-1",
											children: product.description || "Fresh, vibrant, dawn-harvested flowers direct from local growers. Ideal for garlands, temple poojas, grand wedding decor, and festive celebrations."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white rounded-3xl border border-[#E2DCBE] p-5 shadow-xs space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													style: { color: "#B83245" },
													className: "text-3xl font-black tracking-tight",
													children: ["₹", currentPrice]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-[#666851] font-bold",
													children: ["/ ", product.unit]
												}),
												originalPrice > currentPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-sm text-[#9F905E] line-through font-bold",
													children: ["₹", originalPrice]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													style: {
														backgroundColor: "rgba(184, 50, 69, 0.1)",
														color: "#B83245"
													},
													className: "px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border border-rose-200",
													children: [
														"Save ₹",
														originalPrice - currentPrice,
														" (",
														discountPercent,
														"% OFF)"
													]
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-[#666851] font-medium",
											children: "Inclusive of all taxes. Free shipping on orders above ₹999."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between border-2 border-[#E2DCBE] bg-[#F5F3E9] rounded-2xl px-3 py-1.5 shrink-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setQuantity(Math.max(1, quantity - 1)),
															className: "p-1.5 text-[#4F5535] hover:text-[#B83245] font-black transition",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-4 h-4" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-extrabold text-sm px-4 min-w-[60px] text-center",
															children: [
																quantity,
																" ",
																product.unit
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setQuantity(quantity + 1),
															className: "p-1.5 text-[#4F5535] hover:text-[#B83245] font-black transition",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: handleAddToCart,
													style: {
														backgroundColor: "#B83245",
														color: "#FFFFFF"
													},
													className: "flex-1 px-6 py-3 rounded-2xl font-extrabold text-xs shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 transform active:scale-95",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-4 h-4" }), " Add to Cart"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														handleAddToCart();
														navigate({ to: "/checkout" });
													},
													style: {
														backgroundColor: "#4F5535",
														color: "#FFFFFF"
													},
													className: "flex-1 px-6 py-3 rounded-2xl font-extrabold text-xs shadow-md hover:opacity-90 transition flex items-center justify-center gap-2 transform active:scale-95 border border-[#9F905E]",
													children: "Buy Now →"
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white rounded-2xl p-3 border border-[#E2DCBE]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-[#9F905E] font-bold uppercase",
												children: "Color"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-extrabold text-[#4F5535] mt-0.5",
												children: product.color || "Orange"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-[#F5F3E9] rounded-2xl p-3 border border-[#E2DCBE]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-[#9F905E] font-bold uppercase",
												children: "Stock"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													backgroundColor: "#E2DCBE",
													color: "#4F5535",
													borderColor: "#9F905E"
												},
												className: "font-extrabold mt-0.5 inline-block px-2.5 py-0.5 rounded-full text-xs border",
												children: product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} ${product.unit})` : "Out of Stock"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white rounded-2xl p-3 border border-[#E2DCBE]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-[#9F905E] font-bold uppercase",
												children: "Min Order"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-extrabold text-[#4F5535] mt-0.5",
												children: [
													product.minOrderQuantity || 1,
													" ",
													product.unit
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white rounded-2xl p-3 border border-[#E2DCBE]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-[#9F905E] font-bold uppercase",
												children: "Freshness"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-extrabold text-[#4F5535] mt-0.5",
												children: product.freshness || "Same-day harvest"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white rounded-3xl border border-[#E2DCBE] p-4 space-y-3 shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-extrabold text-xs text-[#4F5535] flex items-center gap-2 border-b border-[#E2DCBE] pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-4 h-4 text-[#B68F38]" }), " Delivery & Availability Information"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-[#4F5535]",
													children: "Delivery Available"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-[#666851]",
													children: "Same-day express delivery in Mumbai & Pune"
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4 text-[#B68F38] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-[#4F5535]",
													children: "Expected Delivery"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-[#666851]",
													children: "Tomorrow by 7:00 AM"
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-[#B83245] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-[#4F5535]",
													children: "Delivering To"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-[#666851]",
													children: "Mumbai, Navi Mumbai, Thane & Pune"
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-4 h-4 text-[#B68F38] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-[#4F5535]",
													children: "Free Delivery"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-[#666851]",
													children: "On all flower orders above ₹999"
												})] })]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white rounded-3xl border border-[#E2DCBE] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-12 h-12 rounded-2xl bg-[#4F5535] text-white font-black flex items-center justify-center text-lg shadow-sm border border-[#9F905E]",
											children: "P"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-bold text-[#9F905E] uppercase tracking-wider",
												children: "Sold & Fulfilled By"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-extrabold text-sm text-[#4F5535] flex items-center gap-1.5",
												children: [product.vendorName || "Pushpangan Fresh Farms", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold",
													children: "✓ Verified Seller"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] text-[#666851] font-medium mt-0.5",
												children: [
													"📍 ",
													product.vendorLocation || "Pune & Mumbai Mandi Growers Hub",
													" · ★ 4.9 Seller Rating"
												]
											})
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/shop",
										className: "px-4 py-2 rounded-xl border-2 border-[#E2DCBE] hover:bg-[#F5F3E9] text-xs font-bold text-[#4F5535] text-center shrink-0 transition",
										children: "View Seller Profile"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-extrabold text-xs text-[#4F5535] flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-4 h-4 text-[#B83245]" }), " Special Offers & Services"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-white p-3 rounded-2xl border border-[#E2DCBE] space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-bold text-[#B83245] flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-3.5 h-3.5" }), " Bulk Order Offer"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[#666851]",
													children: "Get 15% special discount on bulk flower orders above 10 kg."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-white p-3 rounded-2xl border border-[#E2DCBE] space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-bold text-[#B68F38] flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), " Festival Special"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[#666851]",
													children: "Pre-book 10-day daily pooja garlands for Ganesh festival."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-white p-3 rounded-2xl border border-[#E2DCBE] space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-bold text-emerald-700 flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-3.5 h-3.5" }), " Free Express Shipping"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[#666851]",
													children: "Free morning 6 AM delivery on orders above ₹999."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-white p-3 rounded-2xl border border-[#E2DCBE] space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-bold text-[#4F5535] flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-3.5 h-3.5" }), " Event Decorators Rate"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[#666851]",
													children: "Wholesale rate available for registered wedding decorators."
												})]
											})
										]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "reviews",
						className: "bg-white rounded-3xl border border-[#E2DCBE] p-6 shadow-sm space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex border-b border-[#E2DCBE] gap-8 text-sm font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setActiveTab("about"),
										className: `pb-3 transition relative ${activeTab === "about" ? "text-[#B83245] border-b-2 border-[#B83245] font-black" : "text-[#666851] hover:text-[#4F5535]"}`,
										children: "About This Flower"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setActiveTab("specs"),
										className: `pb-3 transition relative ${activeTab === "specs" ? "text-[#B83245] border-b-2 border-[#B83245] font-black" : "text-[#666851] hover:text-[#4F5535]"}`,
										children: "Specifications Table"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setActiveTab("reviews"),
										className: `pb-3 transition relative ${activeTab === "reviews" ? "text-[#B83245] border-b-2 border-[#B83245] font-black" : "text-[#666851] hover:text-[#4F5535]"}`,
										children: [
											"Customer Reviews (",
											reviews.length,
											")"
										]
									})
								]
							}),
							activeTab === "about" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 text-xs text-[#4F5535] leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-extrabold text-[#4F5535]",
										children: "Detailed Product Description"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.description || "Our fresh flowers are handpicked at dawn by expert florists from trusted growers across Maharashtra. Each bloom is selected for vibrant petal color, fresh aroma, and long stem durability." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-[#F5F3E9] p-4 rounded-2xl border border-[#E2DCBE] space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-extrabold text-sm text-[#4F5535]",
													children: "🌸 Quality & Freshness"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[#666851]",
													children: "100% organic, dawn-plucked blooms with zero artificial spray or preservatives."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-[#F5F3E9] p-4 rounded-2xl border border-[#E2DCBE] space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-extrabold text-sm text-[#4F5535]",
													children: "📦 Packaging Information"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[#666851]",
													children: "Ventilated eco-friendly moisture-lock boxes ensuring 48-hour peak freshness."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-[#F5F3E9] p-4 rounded-2xl border border-[#E2DCBE] space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-extrabold text-sm text-[#4F5535]",
													children: "🌿 Storage Instructions"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[#666851]",
													children: "Keep in cool shade or damp cloth. Sprinkle light water mist twice daily."
												})]
											})
										]
									})
								]
							}),
							activeTab === "specs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-xs border-collapse border border-[#E2DCBE] rounded-2xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "bg-[#F5F3E9] text-[#4F5535] font-extrabold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4 border-b border-[#E2DCBE] w-1/3",
											children: "Specification"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4 border-b border-[#E2DCBE]",
											children: "Details"
										})]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
										className: "divide-y divide-[#E2DCBE] text-[#4F5535]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Product Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4",
												children: product.name
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Scientific Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 italic",
												children: product.scientificName || "Tagetes erecta"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Category"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4",
												children: product.category
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Color"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4",
												children: product.color || "Orange"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Unit"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4",
												children: product.unit
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Minimum Order"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-2.5 px-4",
												children: [
													product.minOrderQuantity || 1,
													" ",
													product.unit
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Current Stock"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													style: {
														backgroundColor: "#E2DCBE",
														color: "#4F5535",
														borderColor: "#9F905E"
													},
													className: "px-2.5 py-0.5 rounded-full text-xs font-extrabold border",
													children: [
														"In Stock (",
														product.stockQuantity,
														" ",
														product.unit,
														")"
													]
												})
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Freshness Guarantee"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4",
												children: product.freshness || "Dawn Plucked 100% Fresh"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Suitable Occasions"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4",
												children: Array.isArray(product.occasions) ? product.occasions.join(", ") : "Wedding, Temple, Pooja, Festival"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold bg-[#F5F3E9]/40",
												children: "Primary Seller"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 px-4 font-bold text-[#B83245]",
												children: product.vendorName || "Pushpangan Fresh Farms"
											})] })
										]
									})]
								})
							}),
							activeTab === "reviews" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-[#F5F3E9] p-6 rounded-3xl border border-[#E2DCBE] flex flex-col sm:flex-row sm:items-center justify-between gap-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-3xl font-black text-[#4F5535] flex items-center gap-2",
											children: ["4.8 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl text-[#B68F38]",
												children: "★★★★★"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-[#666851] font-semibold mt-1",
											children: [
												"Based on ",
												reviews.length + 120,
												" verified customer reviews"
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setShowWriteReview(!showWriteReview),
											style: {
												backgroundColor: "#B83245",
												color: "#FFFFFF"
											},
											className: "px-5 py-2.5 rounded-2xl font-extrabold text-xs shadow hover:opacity-90 transition flex items-center justify-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-4 h-4" }), " Write a Review"]
										})]
									}),
									showWriteReview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleSubmitReview,
										className: "bg-white p-5 rounded-3xl border-2 border-[#B68F38] space-y-4 text-xs shadow-md",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-extrabold text-sm text-[#4F5535]",
												children: "Submit Your Product Review"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-bold mb-1 text-[#4F5535]",
													children: "Your Name *"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: reviewForm.name,
													onChange: (e) => setReviewForm({
														...reviewForm,
														name: e.target.value
													}),
													placeholder: "e.g. Ananya Deshmukh",
													className: "w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none focus:border-[#B68F38]"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-bold mb-1 text-[#4F5535]",
													children: "Star Rating"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: reviewForm.rating,
													onChange: (e) => setReviewForm({
														...reviewForm,
														rating: Number(e.target.value)
													}),
													className: "w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none focus:border-[#B68F38] font-bold text-[#B68F38]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 5,
															children: "★★★★★ (5 - Excellent)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 4,
															children: "★★★★☆ (4 - Very Good)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 3,
															children: "★★★☆☆ (3 - Average)"
														})
													]
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block font-bold mb-1 text-[#4F5535]",
												children: "Your Review Comment *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												required: true,
												rows: 3,
												value: reviewForm.comment,
												onChange: (e) => setReviewForm({
													...reviewForm,
													comment: e.target.value
												}),
												placeholder: "Share details about freshness, delivery, packaging...",
												className: "w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none focus:border-[#B68F38] resize-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-end gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setShowWriteReview(false),
													className: "px-4 py-2 rounded-xl text-[#666851] font-bold",
													children: "Cancel"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													style: {
														backgroundColor: "#4F5535",
														color: "#FFFFFF"
													},
													className: "px-5 py-2 rounded-xl font-extrabold text-xs shadow hover:opacity-90",
													children: "Submit Review"
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-4",
										children: reviews.map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 rounded-2xl border border-[#E2DCBE] bg-white space-y-2 text-xs shadow-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: rev.avatar,
														alt: "",
														className: "w-9 h-9 rounded-full object-cover border border-[#E2DCBE]"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "font-extrabold text-[#4F5535] flex items-center gap-1.5",
														children: [rev.name, rev.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full font-bold",
															children: "✓ Verified Buyer"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[10px] text-[#666851]",
														children: rev.date
													})] })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[#B68F38] font-black text-sm",
													children: ["★".repeat(rev.rating), "☆".repeat(5 - rev.rating)]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[#4F5535] leading-relaxed pt-1",
												children: rev.text
											})]
										}, rev.id))
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-xl font-extrabold text-[#4F5535] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, { className: "w-5 h-5 text-[#B83245]" }), " You May Also Like"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "text-xs font-extrabold text-[#B83245] hover:underline",
								children: "View All Catalog →"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
							children: relatedProducts.map((rel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-3xl border border-[#E2DCBE] p-3 space-y-2 shadow-xs hover:shadow-md transition group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "aspect-square rounded-2xl overflow-hidden bg-white relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: rel.image,
											alt: rel.name,
											className: "w-full h-full object-cover group-hover:scale-105 transition duration-300"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute top-2 left-2 bg-[#B68F38] text-white text-[10px] font-black px-2 py-0.5 rounded-full",
											children: "★ 4.8"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-[#9F905E] font-bold uppercase",
											children: rel.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-extrabold text-xs text-[#4F5535] truncate group-hover:text-[#B83245] transition",
											children: rel.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-black text-sm text-[#B83245]",
												children: ["₹", rel.price]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-[#666851] font-semibold",
												children: rel.unit
											})]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => addToCart(rel, 1),
										style: {
											backgroundColor: "#4F5535",
											color: "#FFFFFF"
										},
										className: "w-full py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 shadow-xs hover:opacity-90 transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-3.5 h-3.5" }), " Add to Cart"]
									})
								]
							}, rel.slug))
						})]
					})
				]
			}),
			showLightbox && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowLightbox(false),
					className: "absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: selectedImage,
					alt: product.name,
					className: "max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
				})]
			}),
			showStockModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl border border-[#E2DCBE] p-6 w-full max-w-sm shadow-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-extrabold text-[#4F5535]",
							children: "Update Product Stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-bold text-[#4F5535] mb-1",
							children: [
								"Available Quantity (",
								product.unit,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: "0",
							value: newStock,
							onChange: (e) => setNewStock(Number(e.target.value)),
							className: "w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] text-xs outline-none font-bold text-[#4F5535]"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowStockModal(false),
								className: "px-4 py-2 text-xs font-bold text-[#666851]",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSaveStock,
								style: {
									backgroundColor: "#4F5535",
									color: "#FFFFFF"
								},
								className: "px-5 py-2 rounded-xl text-xs font-extrabold shadow hover:opacity-90",
								children: "Save Stock"
							})]
						})
					]
				})
			}),
			showPriceModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl border border-[#E2DCBE] p-6 w-full max-w-sm shadow-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-extrabold text-[#4F5535]",
							children: "Update Product Pricing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-bold text-[#4F5535] mb-1",
								children: "Regular Price (₹)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								value: newPrice,
								onChange: (e) => setNewPrice(Number(e.target.value)),
								className: "w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none font-bold text-[#4F5535]"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-bold text-[#4F5535] mb-1",
								children: "Selling / Discount Price (₹)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								value: newDiscountPrice,
								onChange: (e) => setNewDiscountPrice(Number(e.target.value)),
								className: "w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none font-bold text-[#B83245]"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowPriceModal(false),
								className: "px-4 py-2 text-xs font-bold text-[#666851]",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSavePrice,
								style: {
									backgroundColor: "#B83245",
									color: "#FFFFFF"
								},
								className: "px-5 py-2 rounded-xl text-xs font-extrabold shadow hover:opacity-90",
								children: "Save New Price"
							})]
						})
					]
				})
			})
		]
	});
};
//#endregion
export { useAdminAuth as a, adminService as i, AdminLogin as n, ProductDetailView as r, AdminAuthProvider as t };
