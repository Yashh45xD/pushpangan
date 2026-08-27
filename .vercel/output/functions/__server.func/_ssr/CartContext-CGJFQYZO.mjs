import { i as __toESM } from "../_runtime.mjs";
import { t as API_URL } from "./api-CnTWETQ1.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CartContext-CGJFQYZO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toastReducer(state, action) {
	switch (action.type) {
		case "ADD": return { toasts: [...state.toasts.slice(-4), action.toast] };
		case "REMOVE": return { toasts: state.toasts.filter((t) => t.id !== action.id) };
		default: return state;
	}
}
var ToastContext = (0, import_react.createContext)(void 0);
function ToastProvider({ children }) {
	const [state, dispatch] = (0, import_react.useReducer)(toastReducer, { toasts: [] });
	const addToast = (0, import_react.useCallback)((message, type, duration = 3e3) => {
		const id = `toast-${Date.now()}-${Math.random()}`;
		dispatch({
			type: "ADD",
			toast: {
				id,
				message,
				type,
				duration
			}
		});
		setTimeout(() => dispatch({
			type: "REMOVE",
			id
		}), duration);
	}, []);
	const toast = {
		success: (message, duration) => addToast(message, "success", duration),
		error: (message, duration) => addToast(message, "error", duration),
		info: (message, duration) => addToast(message, "info", duration),
		warning: (message, duration) => addToast(message, "warning", duration)
	};
	const icons = {
		success: "✅",
		error: "❌",
		info: "ℹ️",
		warning: "⚠️"
	};
	const colors = {
		success: "bg-[#f0fdf4] border-[#86efac] text-[#166534]",
		error: "bg-[#fef2f2] border-[#fca5a5] text-[#991b1b]",
		info: "bg-[#eff6ff] border-[#93c5fd] text-[#1e40af]",
		warning: "bg-[#fffbeb] border-[#fcd34d] text-[#92400e]"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastContext.Provider, {
		value: { toast },
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-live": "polite",
			"aria-atomic": "false",
			className: "fixed right-4 top-20 z-[9999] flex flex-col gap-3 pointer-events-none",
			style: {
				minWidth: 280,
				maxWidth: 360
			},
			children: state.toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "alert",
				className: `flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-sm pointer-events-auto transition-all duration-300 animate-in slide-in-from-right ${colors[t.type]}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg leading-none mt-0.5 shrink-0",
						children: icons[t.type]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold leading-snug flex-1",
						children: t.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => dispatch({
							type: "REMOVE",
							id: t.id
						}),
						className: "ml-1 shrink-0 opacity-60 hover:opacity-100 text-xs font-bold",
						"aria-label": "Dismiss",
						children: "✕"
					})
				]
			}, t.id))
		})]
	});
}
function useToast() {
	const ctx = (0, import_react.useContext)(ToastContext);
	if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
	return ctx;
}
var API_BASE = `${API_URL}/api`;
function getAuthHeaders() {
	const token = localStorage.getItem("pushpangan_token");
	return {
		"Content-Type": "application/json",
		...token ? { Authorization: `Bearer ${token}` } : {}
	};
}
var cartService = {
	async getCart() {
		try {
			const res = await fetch(`${API_BASE}/cart`, { headers: getAuthHeaders() });
			const data = await res.json();
			if (!res.ok || !data.success) return null;
			return data.cart;
		} catch {
			return null;
		}
	},
	async addItem(productId, quantity = 1) {
		try {
			const data = await (await fetch(`${API_BASE}/cart/add`, {
				method: "POST",
				headers: getAuthHeaders(),
				body: JSON.stringify({
					productId,
					quantity
				})
			})).json();
			return {
				success: data.success,
				message: data.message,
				cart: data.cart
			};
		} catch {
			return {
				success: false,
				message: "Network error."
			};
		}
	},
	async updateItem(productId, quantity) {
		try {
			const data = await (await fetch(`${API_BASE}/cart/update`, {
				method: "PUT",
				headers: getAuthHeaders(),
				body: JSON.stringify({
					productId,
					quantity
				})
			})).json();
			return {
				success: data.success,
				message: data.message
			};
		} catch {
			return { success: false };
		}
	},
	async removeItem(productId) {
		try {
			return { success: (await (await fetch(`${API_BASE}/cart/remove/${productId}`, {
				method: "DELETE",
				headers: getAuthHeaders()
			})).json()).success };
		} catch {
			return { success: false };
		}
	},
	async clearCart() {
		try {
			return { success: (await (await fetch(`${API_BASE}/cart/clear`, {
				method: "DELETE",
				headers: getAuthHeaders()
			})).json()).success };
		} catch {
			return { success: false };
		}
	},
	async mergeGuestCart(guestItems) {
		try {
			const data = await (await fetch(`${API_BASE}/cart/merge`, {
				method: "POST",
				headers: getAuthHeaders(),
				body: JSON.stringify({ items: guestItems })
			})).json();
			return {
				success: data.success,
				cart: data.cart
			};
		} catch {
			return { success: false };
		}
	}
};
var CartContext = (0, import_react.createContext)(void 0);
var LS_KEY = "pushpangan_cart";
function CartProvider({ children }) {
	const { toast } = useToast();
	const [cart, setCart] = (0, import_react.useState)([]);
	const [isMounted, setIsMounted] = (0, import_react.useState)(false);
	const [isCartOpen, setIsCartOpen] = (0, import_react.useState)(false);
	const [discountAmount, setDiscountAmount] = (0, import_react.useState)(0);
	const [isLoggedIn, setIsLoggedIn] = (0, import_react.useState)(false);
	const syncInFlight = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		setIsMounted(true);
		try {
			const saved = localStorage.getItem(LS_KEY);
			if (saved) setCart(JSON.parse(saved));
		} catch {}
		const token = localStorage.getItem("pushpangan_token");
		setIsLoggedIn(!!token);
	}, []);
	(0, import_react.useEffect)(() => {
		if (isMounted) localStorage.setItem(LS_KEY, JSON.stringify(cart));
	}, [cart, isMounted]);
	const addToCart = (0, import_react.useCallback)((flower, quantity = 1) => {
		if (!flower.available) {
			toast.error(`${flower.name} is out of stock.`);
			return;
		}
		setCart((prev) => {
			if (prev.find((i) => i.flower.slug === flower.slug)) return prev.map((i) => i.flower.slug === flower.slug ? {
				...i,
				quantity: i.quantity + quantity
			} : i);
			return [...prev, {
				flower,
				quantity
			}];
		});
		toast.success(`🌸 ${flower.name} added to basket!`);
		setIsCartOpen(true);
		if (localStorage.getItem("pushpangan_token") && flower.slug) {}
	}, [toast]);
	const removeFromCart = (0, import_react.useCallback)((slug) => {
		setCart((prev) => {
			const item = prev.find((i) => i.flower.slug === slug);
			if (item?.productId && localStorage.getItem("pushpangan_token")) cartService.removeItem(item.productId).catch(() => {});
			return prev.filter((i) => i.flower.slug !== slug);
		});
	}, []);
	const updateQuantity = (0, import_react.useCallback)((slug, quantity) => {
		if (quantity < 1) {
			removeFromCart(slug);
			return;
		}
		setCart((prev) => prev.map((i) => {
			if (i.flower.slug !== slug) return i;
			if (i.productId && localStorage.getItem("pushpangan_token")) cartService.updateItem(i.productId, quantity).catch(() => {});
			return {
				...i,
				quantity
			};
		}));
	}, [removeFromCart]);
	const clearCart = (0, import_react.useCallback)(() => {
		setCart([]);
		if (localStorage.getItem("pushpangan_token")) cartService.clearCart().catch(() => {});
	}, []);
	const mergeGuestCart = (0, import_react.useCallback)(async (_userId) => {
		if (syncInFlight.current) return;
		const saved = localStorage.getItem(LS_KEY);
		const guestItems = saved ? JSON.parse(saved) : [];
		if (guestItems.length === 0) return;
		syncInFlight.current = true;
		try {
			if ((await cartService.mergeGuestCart(guestItems.map((i) => ({
				slug: i.flower.slug,
				quantity: i.quantity
			})))).success) toast.success("Your basket has been synced ✓");
		} catch {} finally {
			syncInFlight.current = false;
		}
	}, [toast]);
	const totalItems = (0, import_react.useMemo)(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);
	const totalPrice = (0, import_react.useMemo)(() => cart.reduce((s, i) => s + i.flower.price * i.quantity, 0), [cart]);
	const deliveryCharge = 0;
	const gstAmount = 0;
	const grandTotal = (0, import_react.useMemo)(() => totalPrice - discountAmount, [totalPrice, discountAmount]);
	const openBasket = (0, import_react.useCallback)(() => setIsCartOpen(true), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value: {
			cart,
			addToCart,
			removeFromCart,
			updateQuantity,
			clearCart,
			totalItems,
			totalPrice,
			discountAmount,
			setDiscountAmount,
			deliveryCharge,
			gstAmount,
			grandTotal,
			isCartOpen,
			setIsCartOpen,
			openBasket,
			mergeGuestCart,
			isLoggedIn
		},
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used within a CartProvider");
	return ctx;
}
//#endregion
export { useToast as i, ToastProvider as n, useCart as r, CartProvider as t };
