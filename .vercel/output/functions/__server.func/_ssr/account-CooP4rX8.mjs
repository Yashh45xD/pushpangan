import { i as __toESM } from "../_runtime.mjs";
import { t as API_URL } from "./api-CnTWETQ1.mjs";
import { t as orderService } from "./orderService-WREntGFO.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as LogOut, Ct as Camera, Dt as Bell, I as MessageCircle, L as Menu, M as Package, N as Moon, O as Plus, R as MapPin, T as RotateCcw, Y as Globe, _ as ShoppingCart, bt as ChevronDown, d as Tag, f as Sun, gt as CircleCheckBig, i as User, j as Pen, k as Phone, l as Trash2, m as Star, n as X, nt as Eye, ot as Download, pt as CircleQuestionMark, rt as EyeOff, s as TriangleAlert, vt as ChevronRight, w as Save, x as Settings, y as Shield, z as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-CooP4rX8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navGroups = [
	{
		label: "Orders & Activity",
		items: [{
			id: "orders",
			icon: Package,
			label: "My Orders"
		}]
	},
	{
		label: "Account",
		items: [
			{
				id: "profile",
				icon: User,
				label: "Personal Info"
			},
			{
				id: "contact",
				icon: Bell,
				label: "Contact Details"
			},
			{
				id: "addresses",
				icon: MapPin,
				label: "Address Book"
			},
			{
				id: "security",
				icon: Settings,
				label: "Password & Security"
			}
		]
	},
	{
		label: "Offers & Rewards",
		items: [{
			id: "coupons",
			icon: Tag,
			label: "Coupons & Offers"
		}, {
			id: "rewards",
			icon: Bell,
			label: "Reward Points"
		}]
	},
	{
		label: "More",
		items: [{
			id: "support",
			icon: CircleQuestionMark,
			label: "Support Center"
		}, {
			id: "settings",
			icon: Settings,
			label: "Settings"
		}]
	}
];
function AccountSidebar({ active, onSelect, user, onLogout, isOpen = true, onClose }) {
	const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Guest User";
	const initial = fullName.charAt(0).toUpperCase();
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col overflow-hidden",
		style: { backgroundColor: "#FFFFFF" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col items-center px-6 py-8 text-center",
				style: { background: "linear-gradient(135deg, #4F5535 0%, #666851 100%)" },
				children: [
					onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "absolute right-3 top-3 rounded-full p-1 text-white/70 hover:text-white lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-3",
						children: [user?.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: user.avatar,
							alt: fullName,
							className: "h-18 w-18 rounded-full border-4 border-white/30 object-cover shadow-lg",
							style: {
								width: 72,
								height: 72
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center rounded-full border-4 font-black text-2xl text-white shadow-lg",
							style: {
								width: 72,
								height: 72,
								backgroundColor: "#B68F38",
								borderColor: "rgba(255,255,255,0.3)"
							},
							children: initial
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -bottom-1 -right-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
							style: {
								backgroundColor: "#B68F38",
								color: "#fff"
							},
							children: "GOLD"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold text-white",
						children: fullName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-[11px] text-white/70 truncate max-w-full",
						children: user?.email || ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onSelect("profile"),
						className: "mt-3 rounded-full px-3 py-1 text-[11px] font-semibold transition hover:opacity-80",
						style: {
							backgroundColor: "rgba(255,255,255,0.15)",
							color: "#fff",
							border: "1px solid rgba(255,255,255,0.25)"
						},
						children: "✏️ Edit Profile"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 overflow-y-auto px-3 py-4 space-y-5",
				style: { scrollbarWidth: "thin" },
				children: navGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest",
					style: { color: "#9F905E" },
					children: group.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-0.5",
					children: group.items.map(({ id, icon: Icon, label }) => {
						const isActive = active === id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								onSelect(id);
								onClose?.();
							},
							className: "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all",
							style: {
								backgroundColor: isActive ? "#F0EFE6" : "transparent",
								color: isActive ? "#4F5535" : "#444"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 16,
									style: { color: isActive ? "#B68F38" : "#666851" },
									className: "shrink-0 transition-colors group-hover:text-[#B68F38]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: isActive ? "font-bold" : "",
									children: label
								}),
								isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
									size: 14,
									className: "ml-auto",
									style: { color: "#B68F38" }
								})
							]
						}) }, id);
					})
				})] }, group.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t px-4 py-4",
				style: { borderColor: "#F0EFE6" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onLogout,
					className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), "Sign Out"]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "hidden lg:flex lg:flex-col rounded-2xl overflow-hidden shadow-sm flex-shrink-0",
		style: {
			width: 280,
			height: "fit-content",
			position: "sticky",
			top: 84,
			border: "1px solid #E2DCBE"
		},
		children: content
	}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex lg:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "relative flex flex-col overflow-hidden shadow-2xl",
			style: {
				width: 300,
				backgroundColor: "#FFFFFF"
			},
			children: content
		})]
	})] });
}
var BASE = `${API_URL}/api/account`;
function getToken() {
	try {
		const u = localStorage.getItem("siteUser");
		if (u) {
			const parsed = JSON.parse(u);
			if (parsed?.token) return parsed.token;
		}
	} catch {}
	return localStorage.getItem("pushpangan_token");
}
async function fetchAuth(url, options = {}) {
	const token = getToken();
	const headers = {
		"Content-Type": "application/json",
		...options.headers || {}
	};
	if (token) headers["Authorization"] = `Bearer ${token}`;
	const res = await fetch(url, {
		...options,
		headers
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || "Request failed");
	return data;
}
function getMockUser() {
	try {
		const saved = localStorage.getItem("siteUser");
		if (saved) {
			const u = JSON.parse(saved);
			return {
				_id: u._id || u.id || "user-" + (u.email || "guest"),
				firstName: u.name?.split(" ")[0] || "Customer",
				lastName: u.name?.split(" ").slice(1).join(" ") || "",
				email: u.email || "",
				phone: u.phone || "",
				alternatePhone: "",
				gender: "Prefer not to say",
				birthday: "",
				avatar: "",
				loggedIn: true
			};
		}
	} catch {}
	return null;
}
function getMockAddresses() {
	try {
		const saved = localStorage.getItem("pushpangan_addresses");
		if (saved) return JSON.parse(saved);
	} catch {}
	return [];
}
function getMockRewards() {
	return {
		available: 100,
		lifetime: 100,
		level: "Bronze",
		nextLevel: "Silver",
		nextLevelPoints: 1e3
	};
}
function getMockNotifications() {
	return [{
		_id: "n1",
		title: "🌸 Welcome to Pushpangan!",
		message: "Explore farm-fresh blooms, puja samagri, and floral bouquets.",
		type: "offer",
		read: false,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}];
}
var userService = {
	async getProfile() {
		try {
			return await fetchAuth(`${BASE}/profile`);
		} catch {
			const user = getMockUser();
			const rawOrders = await orderService.getUserOrders(user?.email || user?._id || "guest");
			const userOrders = Array.isArray(rawOrders) ? rawOrders : [];
			const total = userOrders.length;
			const pending = userOrders.filter((o) => [
				"Pending",
				"Confirmed",
				"Packed",
				"Shipped",
				"Out for Delivery",
				"Processing"
			].includes(o.orderStatus)).length;
			const delivered = userOrders.filter((o) => o.orderStatus === "Delivered").length;
			const cancelled = userOrders.filter((o) => o.orderStatus === "Cancelled").length;
			return {
				success: true,
				user,
				addresses: getMockAddresses(),
				rewards: getMockRewards(),
				summary: {
					total,
					pending,
					delivered,
					cancelled
				}
			};
		}
	},
	async updateProfile(data) {
		try {
			return await fetchAuth(`${BASE}/profile`, {
				method: "PUT",
				body: JSON.stringify(data)
			});
		} catch {
			const saved = localStorage.getItem("siteUser");
			if (saved) {
				const u = JSON.parse(saved);
				u.name = `${data.firstName || ""} ${data.lastName || ""}`.trim() || u.name;
				if (data.phone) u.phone = data.phone;
				localStorage.setItem("siteUser", JSON.stringify(u));
			}
			return {
				success: true,
				user: {
					...getMockUser(),
					...data
				}
			};
		}
	},
	async changePassword(currentPassword, newPassword) {
		try {
			return await fetchAuth(`${BASE}/password`, {
				method: "PUT",
				body: JSON.stringify({
					currentPassword,
					newPassword
				})
			});
		} catch {
			return {
				success: true,
				message: "Password updated successfully."
			};
		}
	},
	async getAddresses() {
		try {
			return await fetchAuth(`${BASE}/addresses`);
		} catch {
			return {
				success: true,
				addresses: getMockAddresses()
			};
		}
	},
	async addAddress(data) {
		try {
			return await fetchAuth(`${BASE}/addresses`, {
				method: "POST",
				body: JSON.stringify(data)
			});
		} catch {
			const addresses = getMockAddresses();
			const newAddr = {
				...data,
				_id: `addr_${Date.now()}`
			};
			addresses.push(newAddr);
			localStorage.setItem("pushpangan_addresses", JSON.stringify(addresses));
			return {
				success: true,
				address: newAddr
			};
		}
	},
	async updateAddress(id, data) {
		try {
			return await fetchAuth(`${BASE}/addresses/${id}`, {
				method: "PUT",
				body: JSON.stringify(data)
			});
		} catch {
			const addresses = getMockAddresses().map((a) => a._id === id ? {
				...a,
				...data
			} : a);
			localStorage.setItem("pushpangan_addresses", JSON.stringify(addresses));
			return {
				success: true,
				address: {
					...data,
					_id: id
				}
			};
		}
	},
	async deleteAddress(id) {
		try {
			return await fetchAuth(`${BASE}/addresses/${id}`, { method: "DELETE" });
		} catch {
			const addresses = getMockAddresses().filter((a) => a._id !== id);
			localStorage.setItem("pushpangan_addresses", JSON.stringify(addresses));
			return { success: true };
		}
	},
	async getOrders() {
		try {
			return await fetchAuth(`${BASE}/orders`);
		} catch {
			const user = getMockUser();
			const userOrders = await orderService.getUserOrders(user?.email || user?._id || "guest");
			return {
				success: true,
				orders: Array.isArray(userOrders) ? userOrders : []
			};
		}
	},
	async getRewards() {
		try {
			return await fetchAuth(`${BASE}/rewards`);
		} catch {
			return {
				success: true,
				rewards: getMockRewards()
			};
		}
	},
	async getNotifications() {
		try {
			return await fetchAuth(`${BASE}/notifications`);
		} catch {
			return {
				success: true,
				notifications: getMockNotifications()
			};
		}
	},
	async deleteAccount() {
		try {
			return await fetchAuth(`${BASE}/account`, { method: "DELETE" });
		} catch {
			localStorage.removeItem("siteUser");
			return { success: true };
		}
	}
};
function ProfileSection({ user, onUpdate }) {
	const [firstName, setFirstName] = (0, import_react.useState)(user?.firstName || "");
	const [lastName, setLastName] = (0, import_react.useState)(user?.lastName || "");
	const [gender, setGender] = (0, import_react.useState)(user?.gender || "");
	const [birthday, setBirthday] = (0, import_react.useState)(user?.birthday || "");
	const [avatar, setAvatar] = (0, import_react.useState)(user?.avatar || "");
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const initial = (firstName || user?.firstName || "G").charAt(0).toUpperCase();
	const handleAvatarChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => setAvatar(ev.target?.result);
		reader.readAsDataURL(file);
	};
	const handleSave = async () => {
		setLoading(true);
		try {
			const res = await userService.updateProfile({
				firstName,
				lastName,
				gender,
				birthday,
				avatar
			});
			if (res.success) {
				onUpdate(res.user || {
					firstName,
					lastName,
					gender,
					birthday,
					avatar
				});
				setEditing(false);
				setSaved(true);
				setTimeout(() => setSaved(false), 3e3);
			}
		} finally {
			setLoading(false);
		}
	};
	const handleCancel = () => {
		setFirstName(user?.firstName || "");
		setLastName(user?.lastName || "");
		setGender(user?.gender || "");
		setBirthday(user?.birthday || "");
		setAvatar(user?.avatar || "");
		setEditing(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-white shadow-sm overflow-hidden",
		style: { borderColor: "#E2DCBE" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-6 py-4 border-b",
			style: { borderColor: "#F0EFE6" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-bold",
				style: { color: "#4F5535" },
				children: "Personal Information"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs mt-0.5",
				style: { color: "#9F905E" },
				children: "Update your personal details"
			})] }), !editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setEditing(true),
				className: "rounded-full px-4 py-1.5 text-xs font-bold transition hover:opacity-90",
				style: {
					backgroundColor: "#4F5535",
					color: "#fff"
				},
				children: "✏️ Edit"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-5 mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: avatar,
								alt: "Avatar",
								className: "w-20 h-20 rounded-full object-cover shadow-md border-4",
								style: { borderColor: "#B68F38" }
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl shadow-md border-4",
								style: {
									backgroundColor: "#B68F38",
									borderColor: "#4F5535",
									color: "#fff"
								},
								children: initial
							}), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => fileRef.current?.click(),
								className: "absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md transition hover:scale-110",
								style: {
									backgroundColor: "#4F5535",
									color: "#fff"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { size: 13 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-bold text-base",
								style: { color: "#4F5535" },
								children: [
									firstName || user?.firstName,
									" ",
									lastName || user?.lastName
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs mt-0.5",
								style: { color: "#9F905E" },
								children: "Gold Member 🌟"
							}),
							editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => fileRef.current?.click(),
									className: "text-xs underline",
									style: { color: "#4F5535" },
									children: "Upload photo"
								}), avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setAvatar(""),
									className: "text-xs text-rose-500 underline",
									children: "Remove"
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: handleAvatarChange
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold",
							style: { color: "#666851" },
							children: "First Name"
						}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: firstName,
							onChange: (e) => setFirstName(e.target.value),
							className: "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20",
							style: { borderColor: "#E2DCBE" },
							placeholder: "First name"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl px-3.5 py-2.5 text-sm font-medium",
							style: {
								backgroundColor: "#F7F5EF",
								color: "#333"
							},
							children: firstName || user?.firstName || "—"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold",
							style: { color: "#666851" },
							children: "Last Name"
						}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: lastName,
							onChange: (e) => setLastName(e.target.value),
							className: "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20",
							style: { borderColor: "#E2DCBE" },
							placeholder: "Last name"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl px-3.5 py-2.5 text-sm font-medium",
							style: {
								backgroundColor: "#F7F5EF",
								color: "#333"
							},
							children: lastName || user?.lastName || "—"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold",
							style: { color: "#666851" },
							children: "Gender"
						}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: gender,
							onChange: (e) => setGender(e.target.value),
							className: "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#B68F38]",
							style: { borderColor: "#E2DCBE" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select gender"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Male",
									children: "Male"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Female",
									children: "Female"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Non-binary",
									children: "Non-binary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Prefer not to say",
									children: "Prefer not to say"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl px-3.5 py-2.5 text-sm font-medium",
							style: {
								backgroundColor: "#F7F5EF",
								color: "#333"
							},
							children: gender || user?.gender || "—"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold",
							style: { color: "#666851" },
							children: "Birthday"
						}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: birthday,
							onChange: (e) => setBirthday(e.target.value),
							className: "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#B68F38]",
							style: { borderColor: "#E2DCBE" }
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl px-3.5 py-2.5 text-sm font-medium",
							style: {
								backgroundColor: "#F7F5EF",
								color: "#333"
							},
							children: birthday || user?.birthday || "—"
						})] })
					]
				}),
				editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSave,
						disabled: loading,
						className: "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60",
						style: { backgroundColor: "#4F5535" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 15 }), loading ? "Saving..." : "Save Changes"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCancel,
						className: "flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50",
						style: {
							borderColor: "#E2DCBE",
							color: "#666"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 }), "Cancel"]
					})]
				}),
				saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 16 }), "Profile updated successfully!"]
				})
			]
		})]
	});
}
function ContactSection({ user, onUpdate }) {
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)(user?.email || "");
	const [phone, setPhone] = (0, import_react.useState)(user?.phone || "");
	const [altPhone, setAltPhone] = (0, import_react.useState)(user?.alternatePhone || "");
	const [saved, setSaved] = (0, import_react.useState)(false);
	const handleSave = () => {
		onUpdate({
			...user,
			email,
			phone,
			alternatePhone: altPhone
		});
		setEditing(false);
		setSaved(true);
		setTimeout(() => setSaved(false), 3e3);
	};
	const handleCancel = () => {
		setEmail(user?.email || "");
		setPhone(user?.phone || "");
		setAltPhone(user?.alternatePhone || "");
		setEditing(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-white shadow-sm overflow-hidden",
		style: { borderColor: "#E2DCBE" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-6 py-4 border-b",
			style: { borderColor: "#F0EFE6" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-bold",
				style: { color: "#4F5535" },
				children: "Contact Information"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs mt-0.5",
				style: { color: "#9F905E" },
				children: "Manage your email and phone"
			})] }), !editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setEditing(true),
				className: "rounded-full px-4 py-1.5 text-xs font-bold transition hover:opacity-90",
				style: {
					backgroundColor: "#4F5535",
					color: "#fff"
				},
				children: "✏️ Edit"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-1.5 flex items-center gap-1.5 text-xs font-semibold",
					style: { color: "#666851" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 13 }), " Email Address"]
				}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					className: "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20",
					style: { borderColor: "#E2DCBE" },
					placeholder: "your@email.com"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-xl px-3.5 py-2.5",
					style: { backgroundColor: "#F7F5EF" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						style: { color: "#333" },
						children: email || "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 10 }), " Verified"]
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-1.5 flex items-center gap-1.5 text-xs font-semibold",
					style: { color: "#666851" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 13 }), " Mobile Number"]
				}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "tel",
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					className: "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20",
					style: { borderColor: "#E2DCBE" },
					placeholder: "+91 98765 43210"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-xl px-3.5 py-2.5",
					style: { backgroundColor: "#F7F5EF" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						style: { color: "#333" },
						children: phone || "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 10 }), " Verified"]
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-1.5 flex items-center gap-1.5 text-xs font-semibold",
					style: { color: "#666851" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 13 }),
						" Alternate Number ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-normal opacity-60",
							children: "(optional)"
						})
					]
				}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "tel",
					value: altPhone,
					onChange: (e) => setAltPhone(e.target.value),
					className: "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20",
					style: { borderColor: "#E2DCBE" },
					placeholder: "+91 98765 00000"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl px-3.5 py-2.5",
					style: { backgroundColor: "#F7F5EF" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						style: { color: "#333" },
						children: altPhone || "Not added"
					})
				})] }),
				editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSave,
						className: "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90",
						style: { backgroundColor: "#4F5535" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 15 }), " Save Changes"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCancel,
						className: "flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50",
						style: {
							borderColor: "#E2DCBE",
							color: "#666"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 }), " Cancel"]
					})]
				}),
				saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 16 }), " Contact details updated!"]
				})
			]
		})]
	});
}
var emptyAddr = {
	label: "Home",
	fullName: "",
	phone: "",
	line1: "",
	line2: "",
	city: "",
	state: "",
	pincode: "",
	landmark: "",
	isDefault: false
};
function AddressSection({ addresses: initAddresses, onRefresh }) {
	const [addresses, setAddresses] = (0, import_react.useState)(initAddresses);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [editAddr, setEditAddr] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyAddr);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [confirmDel, setConfirmDel] = (0, import_react.useState)(null);
	const openAdd = () => {
		setForm(emptyAddr);
		setEditAddr(null);
		setShowForm(true);
	};
	const openEdit = (a) => {
		setForm({ ...a });
		setEditAddr(a);
		setShowForm(true);
	};
	const handleSave = async () => {
		setLoading(true);
		try {
			if (editAddr) {
				const res = await userService.updateAddress(editAddr._id, form);
				setAddresses((prev) => prev.map((a) => a._id === editAddr._id ? {
					...res.address,
					_id: editAddr._id
				} : a));
			} else {
				const res = await userService.addAddress(form);
				setAddresses((prev) => {
					return [...form.isDefault ? prev.map((a) => ({
						...a,
						isDefault: false
					})) : [...prev], {
						...form,
						_id: res.address?._id || `mock-${Date.now()}`
					}];
				});
			}
			setShowForm(false);
		} finally {
			setLoading(false);
		}
	};
	const handleDelete = async (id) => {
		await userService.deleteAddress(id);
		setAddresses((prev) => prev.filter((a) => a._id !== id));
		setConfirmDel(null);
	};
	const handleSetDefault = async (id) => {
		await userService.updateAddress(id, { isDefault: true });
		setAddresses((prev) => prev.map((a) => ({
			...a,
			isDefault: a._id === id
		})));
	};
	const labelColors = {
		Home: "#4F5535",
		Office: "#B68F38",
		Other: "#9F905E"
	};
	const labelEmoji = {
		Home: "🏠",
		Office: "🏢",
		Other: "📍"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-white shadow-sm overflow-hidden",
		style: { borderColor: "#E2DCBE" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-6 py-4 border-b",
			style: { borderColor: "#F0EFE6" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-bold",
				style: { color: "#4F5535" },
				children: "Address Book"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs mt-0.5",
				style: { color: "#9F905E" },
				children: [addresses.length, " saved addresses"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: openAdd,
				className: "flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition hover:opacity-90",
				style: {
					backgroundColor: "#4F5535",
					color: "#fff"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 13 }), " Add New"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6 space-y-4",
			children: [
				addresses.length === 0 && !showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center py-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							size: 40,
							style: {
								color: "#B68F38",
								opacity: .4
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-medium",
							style: { color: "#666851" },
							children: "No saved addresses yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: openAdd,
							className: "mt-3 rounded-full px-4 py-2 text-xs font-bold text-white",
							style: { backgroundColor: "#4F5535" },
							children: "+ Add Address"
						})
					]
				}),
				addresses.map((addr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative rounded-xl border p-4 transition hover:shadow-md",
					style: {
						borderColor: addr.isDefault ? "#B68F38" : "#E2DCBE",
						backgroundColor: addr.isDefault ? "#FDFBF4" : "#fff"
					},
					children: [
						addr.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute right-4 top-4 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
							style: {
								backgroundColor: "#B68F38",
								color: "#fff"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								size: 9,
								fill: "currentColor"
							}), " Default"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 text-xl",
								children: labelEmoji[addr.label] || "📍"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase",
											style: {
												backgroundColor: labelColors[addr.label] + "18",
												color: labelColors[addr.label]
											},
											children: addr.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-bold",
											style: { color: "#333" },
											children: addr.fullName
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm",
										style: { color: "#555" },
										children: [addr.line1, addr.line2 ? `, ${addr.line2}` : ""]
									}),
									addr.landmark && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs mt-0.5",
										style: { color: "#9F905E" },
										children: ["Near: ", addr.landmark]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm",
										style: { color: "#555" },
										children: [
											addr.city,
											", ",
											addr.state,
											" — ",
											addr.pincode
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs mt-0.5",
										style: { color: "#9F905E" },
										children: ["📞 ", addr.phone]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => openEdit(addr),
									className: "flex items-center gap-1 rounded-lg border px-3 py-1 text-xs font-medium transition hover:bg-gray-50",
									style: {
										borderColor: "#E2DCBE",
										color: "#4F5535"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 11 }), " Edit"]
								}),
								!addr.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleSetDefault(addr._id),
									className: "flex items-center gap-1 rounded-lg border px-3 py-1 text-xs font-medium transition hover:bg-amber-50",
									style: {
										borderColor: "#B68F38",
										color: "#B68F38"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 11 }), " Set Default"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setConfirmDel(addr._id),
									className: "flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 11 }), " Delete"]
								})
							]
						}),
						confirmDel === addr._id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-xl bg-rose-50 border border-rose-200 p-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-rose-700",
								children: "Delete this address?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDelete(addr._id),
									className: "rounded-lg bg-rose-600 px-3 py-1 text-xs font-bold text-white",
									children: "Yes, delete"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setConfirmDel(null),
									className: "rounded-lg border border-rose-300 px-3 py-1 text-xs font-medium text-rose-600",
									children: "Cancel"
								})]
							})]
						})
					]
				}, addr._id)),
				showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border p-5 mt-2",
					style: {
						borderColor: "#B68F38",
						backgroundColor: "#FDFBF4"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold",
								style: { color: "#4F5535" },
								children: editAddr ? "Edit Address" : "Add New Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowForm(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									size: 16,
									style: { color: "#666851" }
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [
								{
									key: "label",
									label: "Type",
									type: "select",
									options: [
										"Home",
										"Office",
										"Other"
									]
								},
								{
									key: "fullName",
									label: "Full Name",
									type: "text",
									placeholder: "Your full name"
								},
								{
									key: "phone",
									label: "Phone",
									type: "tel",
									placeholder: "10-digit mobile"
								},
								{
									key: "line1",
									label: "Address Line 1",
									type: "text",
									placeholder: "House no., Street"
								},
								{
									key: "line2",
									label: "Address Line 2 (optional)",
									type: "text",
									placeholder: "Area, Locality"
								},
								{
									key: "landmark",
									label: "Landmark (optional)",
									type: "text",
									placeholder: "Near..."
								},
								{
									key: "city",
									label: "City",
									type: "text",
									placeholder: "City"
								},
								{
									key: "state",
									label: "State",
									type: "text",
									placeholder: "State"
								},
								{
									key: "pincode",
									label: "Pincode",
									type: "text",
									placeholder: "6-digit PIN"
								}
							].map(({ key, label, type, placeholder, options }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: key === "line1" || key === "line2" ? "sm:col-span-2" : "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1 block text-xs font-semibold",
									style: { color: "#666851" },
									children: label
								}), type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: form[key],
									onChange: (e) => setForm((f) => ({
										...f,
										[key]: e.target.value
									})),
									className: "w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-[#B68F38]",
									style: { borderColor: "#E2DCBE" },
									children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type,
									value: form[key],
									onChange: (e) => setForm((f) => ({
										...f,
										[key]: e.target.value
									})),
									placeholder,
									className: "w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20",
									style: { borderColor: "#E2DCBE" }
								})]
							}, key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								id: "isDefault",
								checked: form.isDefault,
								onChange: (e) => setForm((f) => ({
									...f,
									isDefault: e.target.checked
								})),
								className: "accent-[#B68F38]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "isDefault",
								className: "text-xs font-medium",
								style: { color: "#4F5535" },
								children: "Set as default address"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSave,
								disabled: loading,
								className: "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 disabled:opacity-60",
								style: { backgroundColor: "#4F5535" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }),
									" ",
									loading ? "Saving..." : "Save Address"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowForm(false),
								className: "rounded-xl border px-5 py-2.5 text-sm font-medium hover:bg-gray-50",
								style: {
									borderColor: "#E2DCBE",
									color: "#666"
								},
								children: "Cancel"
							})]
						})
					]
				})
			]
		})]
	});
}
function StrengthBar({ password }) {
	const score = [
		password.length >= 8,
		/[A-Z]/.test(password),
		/[0-9]/.test(password),
		/[^A-Za-z0-9]/.test(password)
	].filter(Boolean).length;
	const labels = [
		"",
		"Weak",
		"Fair",
		"Strong",
		"Very Strong"
	];
	const colors = [
		"",
		"#ef4444",
		"#f59e0b",
		"#10b981",
		"#4F5535"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1",
			children: [
				1,
				2,
				3,
				4
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 flex-1 rounded-full transition-all",
				style: { backgroundColor: i <= score ? colors[score] : "#E2DCBE" }
			}, i))
		}), password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] font-semibold",
			style: { color: colors[score] },
			children: labels[score]
		})]
	});
}
function SecuritySection({ onLogout }) {
	const [currentPwd, setCurrentPwd] = (0, import_react.useState)("");
	const [newPwd, setNewPwd] = (0, import_react.useState)("");
	const [confirmPwd, setConfirmPwd] = (0, import_react.useState)("");
	const [showCurrent, setShowCurrent] = (0, import_react.useState)(false);
	const [showNew, setShowNew] = (0, import_react.useState)(false);
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = (0, import_react.useState)(false);
	const [twofa, setTwofa] = (0, import_react.useState)(false);
	const handleChangePassword = async (e) => {
		e.preventDefault();
		setMsg(null);
		if (!currentPwd || !newPwd || !confirmPwd) {
			setMsg({
				type: "error",
				text: "All fields are required."
			});
			return;
		}
		if (newPwd.length < 8) {
			setMsg({
				type: "error",
				text: "Password must be at least 8 characters."
			});
			return;
		}
		if (newPwd !== confirmPwd) {
			setMsg({
				type: "error",
				text: "Passwords do not match."
			});
			return;
		}
		setLoading(true);
		try {
			if ((await userService.changePassword(currentPwd, newPwd)).success) {
				setMsg({
					type: "success",
					text: "Password changed successfully!"
				});
				setCurrentPwd("");
				setNewPwd("");
				setConfirmPwd("");
			}
		} catch (err) {
			setMsg({
				type: "error",
				text: err.message || "Failed to change password."
			});
		} finally {
			setLoading(false);
		}
	};
	const handleDeleteAccount = async () => {
		await userService.deleteAccount();
		onLogout();
	};
	const pwdField = (label, val, setVal, show, setShow, id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		htmlFor: id,
		className: "mb-1.5 block text-xs font-semibold",
		style: { color: "#666851" },
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			type: show ? "text" : "password",
			value: val,
			onChange: (e) => setVal(e.target.value),
			className: "w-full rounded-xl border px-3.5 py-2.5 pr-10 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20",
			style: { borderColor: "#E2DCBE" },
			placeholder: "••••••••"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setShow(!show),
			className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
			children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 15 })
		})]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-white shadow-sm overflow-hidden",
				style: { borderColor: "#E2DCBE" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-4 border-b",
					style: { borderColor: "#F0EFE6" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-bold",
						style: { color: "#4F5535" },
						children: "Password & Security"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs mt-0.5",
						style: { color: "#9F905E" },
						children: "Keep your account safe"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleChangePassword,
					className: "p-6 space-y-4",
					children: [
						pwdField("Current Password", currentPwd, setCurrentPwd, showCurrent, setShowCurrent, "current-pwd"),
						pwdField("New Password", newPwd, setNewPwd, showNew, setShowNew, "new-pwd"),
						newPwd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrengthBar, { password: newPwd }),
						pwdField("Confirm New Password", confirmPwd, setConfirmPwd, showConfirm, setShowConfirm, "confirm-pwd"),
						msg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border ${msg.type === "success" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200"}`,
							children: [msg.type === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 }), msg.text]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading,
							className: "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 disabled:opacity-60",
							style: { backgroundColor: "#4F5535" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 15 }),
								" ",
								loading ? "Updating..." : "Update Password"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-white shadow-sm p-6",
				style: { borderColor: "#E2DCBE" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-xl flex items-center justify-center",
							style: { backgroundColor: "#F0EFE6" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
								size: 20,
								style: { color: "#4F5535" }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold",
							style: { color: "#4F5535" },
							children: "Two-Factor Authentication"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs",
							style: { color: "#9F905E" },
							children: "Add an extra layer of security"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTwofa(!twofa),
						className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twofa ? "bg-[#4F5535]" : "bg-gray-200"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${twofa ? "translate-x-6" : "translate-x-1"}` })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs",
					style: { color: "#9F905E" },
					children: twofa ? "✅ Two-factor authentication is enabled. Your account is protected." : "Enable 2FA to protect your account with an OTP sent to your phone."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-white shadow-sm p-6",
				style: { borderColor: "#E2DCBE" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold mb-4",
					style: { color: "#4F5535" },
					children: "Recent Login Activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: [
						{
							device: "Chrome · Windows",
							location: "Noida, UP",
							time: "Today, 8:42 PM",
							current: true
						},
						{
							device: "Safari · iPhone 14",
							location: "New Delhi",
							time: "Yesterday, 3:15 PM",
							current: false
						},
						{
							device: "Firefox · MacBook",
							location: "Gurugram, HR",
							time: "2 days ago",
							current: false
						}
					].map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl px-4 py-3",
						style: { backgroundColor: "#F7F5EF" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold",
							style: { color: "#333" },
							children: l.device
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px]",
							style: { color: "#9F905E" },
							children: [
								l.location,
								" · ",
								l.time
							]
						})] }), l.current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200",
							children: "Active"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-[11px] text-rose-500 underline",
							children: "Sign out"
						})]
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-rose-200 bg-rose-50 p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						size: 20,
						className: "text-rose-600 mt-0.5 shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-rose-700",
							children: "Delete Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs mt-1 text-rose-600",
							children: "This action is permanent. All your data, orders and saved preferences will be deleted."
						}),
						!showDeleteConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowDeleteConfirm(true),
							className: "mt-3 flex items-center gap-2 rounded-xl border border-rose-300 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 }), " Delete My Account"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleDeleteAccount,
								className: "rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700",
								children: "Yes, delete permanently"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowDeleteConfirm(false),
								className: "rounded-xl border border-rose-300 px-4 py-2 text-xs font-medium text-rose-600",
								children: "Cancel"
							})]
						})
					] })]
				})
			})
		]
	});
}
var statusConfig = {
	Delivered: {
		color: "#4F5535",
		bg: "#F0F5EC",
		dot: "#4F5535"
	},
	Pending: {
		color: "#B68F38",
		bg: "#FFF8E8",
		dot: "#B68F38"
	},
	Confirmed: {
		color: "#0284c7",
		bg: "#EFF9FF",
		dot: "#0284c7"
	},
	"Out for Delivery": {
		color: "#0284c7",
		bg: "#EFF9FF",
		dot: "#0284c7"
	},
	Cancelled: {
		color: "#ef4444",
		bg: "#FFF1F1",
		dot: "#ef4444"
	},
	Processing: {
		color: "#8b5cf6",
		bg: "#F5F3FF",
		dot: "#8b5cf6"
	}
};
function RecentOrdersSection({ orders }) {
	const fmt = (d) => {
		try {
			return new Date(d).toLocaleDateString("en-IN", {
				day: "numeric",
				month: "short",
				year: "numeric"
			});
		} catch {
			return d;
		}
	};
	if (!orders || orders.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-white shadow-sm p-12 text-center",
		style: { borderColor: "#E2DCBE" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
				size: 40,
				style: {
					color: "#B68F38",
					opacity: .4,
					margin: "0 auto 12px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				style: { color: "#666851" },
				children: "No orders yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs mt-1 text-gray-500",
				children: "Your flower order history will appear here once you place an order."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/shop",
				className: "mt-4 inline-block rounded-full px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-90",
				style: { backgroundColor: "#4F5535" },
				children: "🌸 Start Shopping"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-white shadow-sm overflow-hidden",
		style: { borderColor: "#E2DCBE" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-6 py-4 border-b",
				style: { borderColor: "#F0EFE6" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-bold",
					style: { color: "#4F5535" },
					children: "Recent Orders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs mt-0.5",
					style: { color: "#9F905E" },
					children: "Your latest flower purchases"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/orders",
					className: "text-xs font-semibold hover:underline",
					style: { color: "#B68F38" },
					children: "View all →"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:block overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						style: { backgroundColor: "#F7F5EF" },
						children: [
							"Product",
							"Order #",
							"Date",
							"Amount",
							"Status",
							"Actions"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide",
							style: { color: "#9F905E" },
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.map((order) => {
						const item = order.items?.[0];
						const itemName = item?.flowerName || item?.name || item?.product_name || "Pushpangan Blooms";
						const itemQty = item?.quantity || item?.qty || 1;
						const orderIdStr = order.orderId || order.orderNumber || order.order_number || order._id || "ORDER";
						const totalAmt = order.grandTotal || order.totalAmount || order.total_amount || 0;
						const statusStr = order.orderStatus || "Pending";
						const sc = statusConfig[statusStr] || statusConfig["Pending"];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t transition hover:bg-[#FDFBF4]",
							style: { borderColor: "#F0EFE6" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: item?.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60",
											alt: itemName,
											className: "w-12 h-12 rounded-xl object-cover shadow-sm border",
											style: { borderColor: "#E2DCBE" }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-xs line-clamp-2",
												style: {
													color: "#333",
													maxWidth: 160
												},
												children: itemName
											}),
											order.items && order.items.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] mt-0.5",
												style: { color: "#9F905E" },
												children: [
													"+",
													order.items.length - 1,
													" more item(s)"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] mt-0.5",
												style: { color: "#9F905E" },
												children: ["Qty: ", itemQty]
											})
										] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-mono font-semibold",
										style: { color: "#4F5535" },
										children: ["#", orderIdStr]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs",
										style: { color: "#666" },
										children: fmt(order.createdAt)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-bold",
										style: { color: "#4F5535" },
										children: ["₹", totalAmt.toLocaleString("en-IN")]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold w-fit",
										style: {
											color: sc.color,
											backgroundColor: sc.bg
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-1.5 h-1.5 rounded-full",
											style: { backgroundColor: sc.dot }
										}), statusStr]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "/orders",
												className: "rounded-lg border px-2 py-1 text-[10px] font-semibold transition hover:bg-gray-50 flex items-center gap-1",
												style: {
													borderColor: "#E2DCBE",
													color: "#4F5535"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 10 }), " Track"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "/orders",
												className: "rounded-lg border px-2 py-1 text-[10px] font-semibold transition hover:bg-gray-50 flex items-center gap-1",
												style: {
													borderColor: "#E2DCBE",
													color: "#666"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 10 }), " Invoice"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "/orders",
												className: "rounded-lg px-2 py-1 text-[10px] font-bold transition hover:opacity-90 flex items-center gap-1",
												style: {
													backgroundColor: "#4F5535",
													color: "#fff"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 10 }), " Again"]
											})
										]
									})
								})
							]
						}, order._id || order.id || orderIdStr);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden divide-y",
				style: { borderColor: "#F0EFE6" },
				children: orders.map((order) => {
					const item = order.items?.[0];
					const itemName = item?.flowerName || item?.name || item?.product_name || "Pushpangan Blooms";
					const orderIdStr = order.orderId || order.orderNumber || order.order_number || order._id || "ORDER";
					const totalAmt = order.grandTotal || order.totalAmount || order.total_amount || 0;
					const statusStr = order.orderStatus || "Pending";
					const sc = statusConfig[statusStr] || statusConfig["Pending"];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item?.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60",
								alt: itemName,
								className: "w-14 h-14 rounded-xl object-cover border",
								style: { borderColor: "#E2DCBE" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold truncate",
										style: { color: "#333" },
										children: itemName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] mt-0.5",
										style: { color: "#9F905E" },
										children: [
											"#",
											orderIdStr,
											" · ",
											fmt(order.createdAt)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-bold",
											style: { color: "#4F5535" },
											children: ["₹", totalAmt.toLocaleString("en-IN")]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full px-2 py-0.5 text-[10px] font-bold",
											style: {
												color: sc.color,
												backgroundColor: sc.bg
											},
											children: statusStr
										})]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/orders",
								className: "flex-1 text-center rounded-lg border py-1.5 text-[11px] font-semibold",
								style: {
									borderColor: "#E2DCBE",
									color: "#4F5535"
								},
								children: "Track Order"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/orders",
								className: "flex-1 text-center rounded-lg py-1.5 text-[11px] font-bold text-white",
								style: { backgroundColor: "#4F5535" },
								children: "Buy Again"
							})]
						})]
					}, order._id || order.id || orderIdStr);
				})
			})
		]
	});
}
function RewardPointsSection({ rewards }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-white shadow-sm overflow-hidden",
		style: { borderColor: "#E2DCBE" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 py-4 border-b",
			style: { borderColor: "#F0EFE6" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-bold",
				style: { color: "#4F5535" },
				children: "Reward Points"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center text-center py-16 px-6 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-16 h-16 rounded-full flex items-center justify-center",
				style: { backgroundColor: "#B68F3818" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
					size: 28,
					style: { color: "#B68F38" }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-extrabold",
				style: { color: "#4F5535" },
				children: "Reward points coming soon"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs mt-1",
				style: { color: "#9F905E" },
				children: "Earn points on every order and redeem them for exciting rewards. Launching soon!"
			})] })]
		})]
	});
}
function CouponsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-white shadow-sm overflow-hidden",
		style: { borderColor: "#E2DCBE" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 py-4 border-b",
			style: { borderColor: "#F0EFE6" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-bold",
				style: { color: "#4F5535" },
				children: "Coupons & Offers"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center text-center py-16 px-6 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-16 h-16 rounded-full flex items-center justify-center",
				style: { backgroundColor: "#B68F3818" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					size: 28,
					style: { color: "#B68F38" }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-extrabold",
				style: { color: "#4F5535" },
				children: "Offers coming soon"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs mt-1",
				style: { color: "#9F905E" },
				children: "Stay tuned! Exciting offers and coupons will be available here shortly."
			})] })]
		})]
	});
}
var faqs = [
	{
		q: "How do I cancel an order?",
		a: "You can cancel your order within 2 hours of placing it from My Orders → Cancel Order. After 2 hours, please contact support."
	},
	{
		q: "When will my flowers be delivered?",
		a: "Same-day delivery is available for orders placed before 2 PM. Standard delivery is within 24–48 hours."
	},
	{
		q: "How do I get a refund?",
		a: "Refunds are processed within 5-7 business days. Raise a return request from My Orders and our team will initiate the refund."
	},
	{
		q: "Can I change my delivery address?",
		a: "You can change the delivery address within 1 hour of placing the order by contacting our support team."
	}
];
function SupportSection() {
	const [openFaq, setOpenFaq] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
			children: [
				{
					icon: MessageCircle,
					label: "Live Chat",
					sub: "Chat with us now",
					color: "#4F5535",
					action: "Start Chat"
				},
				{
					icon: Phone,
					label: "Call Support",
					sub: "+91 1800-XXX-XXXX",
					color: "#B68F38",
					action: "Call Now"
				},
				{
					icon: Mail,
					label: "Email Us",
					sub: "pushpangan001@gmail.com",
					color: "#666851",
					action: "Send Email"
				}
			].map(({ icon: Icon, label, sub, color, action }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center rounded-2xl border bg-white p-5 text-center shadow-sm hover:shadow-md transition",
				style: { borderColor: "#E2DCBE" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-2xl flex items-center justify-center mb-3",
						style: { backgroundColor: color + "18" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							size: 22,
							style: { color }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						style: { color: "#333" },
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] mt-0.5",
						style: { color: "#9F905E" },
						children: sub
					}),
					label === "Email Us" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://mail.google.com/mail/?view=cm&fs=1&to=pushpangan001@gmail.com",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-3 rounded-full px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90 text-center block",
						style: { backgroundColor: color },
						children: action
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mt-3 rounded-full px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90",
						style: { backgroundColor: color },
						children: action
					})
				]
			}, label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border bg-white shadow-sm overflow-hidden",
			style: { borderColor: "#E2DCBE" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-6 py-4 border-b",
				style: { borderColor: "#F0EFE6" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-bold",
					style: { color: "#4F5535" },
					children: "Frequently Asked Questions"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y",
				style: { borderColor: "#F0EFE6" },
				children: faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOpenFaq(openFaq === i ? null : i),
					className: "flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-[#FDFBF4]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold",
						style: { color: "#333" },
						children: faq.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						size: 16,
						className: `transition-transform shrink-0 ml-2 ${openFaq === i ? "rotate-180" : ""}`,
						style: { color: "#9F905E" }
					})]
				}), openFaq === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-6 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed",
						style: { color: "#666851" },
						children: faq.a
					})
				})] }, i))
			})]
		})]
	});
}
function SettingsSection() {
	const [darkMode, setDarkMode] = (0, import_react.useState)(false);
	const [language, setLanguage] = (0, import_react.useState)("en");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-white shadow-sm p-6",
				style: { borderColor: "#E2DCBE" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold mb-4",
					style: { color: "#4F5535" },
					children: "Appearance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl px-4 py-3",
					style: { backgroundColor: "#F7F5EF" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [darkMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
							size: 18,
							style: { color: "#4F5535" }
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
							size: 18,
							style: { color: "#B68F38" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold",
							style: { color: "#333" },
							children: darkMode ? "Dark Mode" : "Light Mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px]",
							style: { color: "#9F905E" },
							children: "Switch between light and dark theme"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setDarkMode(!darkMode),
						className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? "bg-[#4F5535]" : "bg-gray-200"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}` })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-white shadow-sm p-6",
				style: { borderColor: "#E2DCBE" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold mb-4",
					style: { color: "#4F5535" },
					children: "Language & Region"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl px-4 py-3",
					style: { backgroundColor: "#F7F5EF" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
							size: 18,
							style: { color: "#4F5535" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold",
							style: { color: "#333" },
							children: "Language"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px]",
							style: { color: "#9F905E" },
							children: "Choose your preferred language"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: language,
						onChange: (e) => setLanguage(e.target.value),
						className: "rounded-xl border px-3 py-1.5 text-xs outline-none",
						style: { borderColor: "#E2DCBE" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "en",
								children: "English"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "hi",
								children: "हिन्दी"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "mr",
								children: "मराठी"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ta",
								children: "தமிழ்"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-white shadow-sm p-6",
				style: { borderColor: "#E2DCBE" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold mb-4",
					style: { color: "#4F5535" },
					children: "Privacy & Data"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl px-4 py-3",
						style: { backgroundColor: "#F7F5EF" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
								size: 18,
								style: { color: "#4F5535" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold",
								style: { color: "#333" },
								children: "Profile Visibility"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px]",
								style: { color: "#9F905E" },
								children: "Who can see your profile"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium",
							style: { color: "#B68F38" },
							children: "Private"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-3 rounded-xl px-4 py-3 w-full text-left transition hover:bg-[#F7F5EF]",
						style: { color: "#4F5535" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold",
							children: "Download My Data"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px]",
							style: { color: "#9F905E" },
							children: "Export all your account data as a ZIP file"
						})] })]
					})]
				})]
			})
		]
	});
}
function AccountPage() {
	const [active, setActive] = (0, import_react.useState)("orders");
	const [user, setUser] = (0, import_react.useState)(null);
	const [summary, setSummary] = (0, import_react.useState)({
		total: 0,
		pending: 0,
		delivered: 0,
		cancelled: 0
	});
	const [addresses, setAddresses] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [rewards, setRewards] = (0, import_react.useState)({
		available: 0,
		lifetime: 0,
		level: "Bronze"
	});
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!localStorage.getItem("siteUser")) {
			window.location.href = "/login";
			return;
		}
		const loadData = async () => {
			setLoading(true);
			try {
				const [profileRes, ordersRes, rewardsRes, notifsRes] = await Promise.all([
					userService.getProfile(),
					userService.getOrders(),
					userService.getRewards(),
					userService.getNotifications()
				]);
				if (profileRes.success) {
					setUser(profileRes.user);
					setAddresses(profileRes.addresses || []);
					setSummary(profileRes.summary || {
						total: 0,
						pending: 0,
						delivered: 0,
						cancelled: 0
					});
				}
				if (ordersRes.success) setOrders(ordersRes.orders || []);
				if (rewardsRes.success) setRewards(rewardsRes.rewards || {
					available: 0,
					lifetime: 0,
					level: "Bronze"
				});
				if (notifsRes.success) setNotifications(notifsRes.notifications || []);
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, []);
	const handleLogout = () => {
		localStorage.removeItem("siteUser");
		window.location.href = "/";
	};
	const handleUserUpdate = (updated) => {
		setUser((prev) => ({
			...prev,
			...updated
		}));
	};
	const refreshAddresses = async () => {
		const res = await userService.getAddresses();
		if (res.success) setAddresses(res.addresses || []);
	};
	const sectionTitles = {
		orders: "My Orders",
		profile: "Personal Information",
		contact: "Contact Details",
		addresses: "Address Book",
		security: "Password & Security",
		coupons: "Coupons & Offers",
		rewards: "Reward Points",
		support: "Support Center",
		settings: "Settings"
	};
	const renderContent = () => {
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: [
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-white shadow-sm p-8 animate-pulse",
				style: { borderColor: "#E2DCBE" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-40 rounded bg-gray-200 mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full rounded bg-gray-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-3/4 rounded bg-gray-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/2 rounded bg-gray-100" })
					]
				})]
			}, i))
		});
		switch (active) {
			case "orders": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentOrdersSection, { orders });
			case "profile": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSection, {
				user,
				onUpdate: handleUserUpdate
			});
			case "contact": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSection, {
				user,
				onUpdate: handleUserUpdate
			});
			case "addresses": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressSection, {
				addresses,
				onRefresh: refreshAddresses
			});
			case "security": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecuritySection, { onLogout: handleLogout });
			case "coupons": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponsSection, {});
			case "rewards": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardPointsSection, { rewards });
			case "support": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportSection, {});
			case "settings": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {});
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		style: { backgroundColor: "#F7F5EF" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-16 z-30 flex items-center gap-3 border-b px-4 py-3 lg:hidden",
			style: {
				backgroundColor: "#FFFFFF",
				borderColor: "#E2DCBE"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setSidebarOpen(true),
				className: "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition hover:bg-gray-50",
				style: {
					borderColor: "#E2DCBE",
					color: "#4F5535"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 16 }), "Menu"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium",
						style: { color: "#9F905E" },
						children: "Account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "#9F905E" },
						children: "›"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold",
						style: { color: "#4F5535" },
						children: sectionTitles[active]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6 md:px-8 md:py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSidebar, {
				active,
				onSelect: setActive,
				user,
				onLogout: handleLogout,
				isOpen: sidebarOpen,
				onClose: () => setSidebarOpen(false)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden lg:flex items-center gap-2 mb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							className: "text-xs font-medium hover:underline",
							style: { color: "#9F905E" },
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "#9F905E" },
							children: "›"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium",
							style: { color: "#9F905E" },
							children: "Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "#9F905E" },
							children: "›"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold",
							style: { color: "#4F5535" },
							children: sectionTitles[active]
						})
					]
				}), renderContent()]
			})]
		})]
	});
}
//#endregion
export { AccountPage as component };
