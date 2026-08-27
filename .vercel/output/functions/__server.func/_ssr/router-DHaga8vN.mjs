import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { n as FLOWERS } from "./productService-DaSRxsDy.mjs";
import { n as ToastProvider, r as useCart, t as CartProvider } from "./CartContext-CGJFQYZO.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$10 } from "./admin.products._productId-C4Pe1pSH.mjs";
import { n as inr, r as waLink, t as SITE } from "./site-CY1ANRF-.mjs";
import { t as Route$11 } from "./flowers._slug-DT1lAErG.mjs";
import { n as Logo, t as HorizontalLogo } from "./Logo-CQa98m5F.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DHaga8vN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BEZvPhQz.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function Header() {
	const { totalItems, setIsCartOpen } = useCart();
	const [isMounted, setIsMounted] = (0, import_react.useState)(false);
	const [user, setUser] = (0, import_react.useState)(null);
	const [showProfileMenu, setShowProfileMenu] = (0, import_react.useState)(false);
	const menuRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setIsMounted(true);
		const loadUser = () => {
			try {
				const saved = localStorage.getItem("siteUser");
				if (saved) setUser(JSON.parse(saved));
				else setUser(null);
			} catch {
				setUser(null);
			}
		};
		loadUser();
		window.addEventListener("storage", loadUser);
		return () => window.removeEventListener("storage", loadUser);
	}, []);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) setShowProfileMenu(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);
	const handleLogout = () => {
		localStorage.removeItem("siteUser");
		setUser(null);
		setShowProfileMenu(false);
		window.location.href = "/";
	};
	const getInitial = (name) => name ? name.trim().charAt(0).toUpperCase() : "U";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalLogo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-sm font-semibold text-foreground/80 hover:text-primary transition",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "text-sm font-semibold text-primary hover:text-accent transition",
							children: "Shop Flowers 🌺"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#about",
							className: "text-sm font-medium text-foreground/80 hover:text-primary transition",
							children: "About Us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "text-sm font-medium text-foreground/80 hover:text-primary transition",
							children: "Contact"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setIsCartOpen(true),
						className: "relative flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-foreground shadow-sm hover:border-primary hover:shadow-md transition",
						"aria-label": "Open Cart",
						id: "header-cart-btn",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base",
								children: "🛒"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Basket"
							}),
							isMounted && totalItems > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground shadow animate-pulse",
								children: totalItems > 99 ? "99+" : totalItems
							})
						]
					}), isMounted && user?.loggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: menuRef,
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowProfileMenu((v) => !v),
							style: {
								backgroundColor: "#B68F38",
								color: "#FFFFFF",
								borderColor: "#4F5535"
							},
							className: "w-9 h-9 rounded-full border-2 flex items-center justify-center font-black text-sm uppercase shadow-md transition hover:opacity-90 cursor-pointer",
							"aria-label": "User profile menu",
							title: user.name,
							children: getInitial(user.name)
						}), showProfileMenu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								backgroundColor: "#FFFFFF",
								borderColor: "#E2DCBE"
							},
							className: "absolute right-0 mt-2 w-56 rounded-2xl border shadow-xl z-50 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									backgroundColor: "#F5F3E9",
									borderColor: "#E2DCBE"
								},
								className: "px-4 py-3 border-b",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											backgroundColor: "#B68F38",
											color: "#FFFFFF"
										},
										className: "w-10 h-10 rounded-full flex items-center justify-center font-black text-base uppercase shadow mb-2",
										children: getInitial(user.name)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: { color: "#4F5535" },
										className: "text-xs font-extrabold truncate",
										children: user.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: { color: "#666851" },
										className: "text-[11px] truncate",
										children: user.email
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/account",
										style: { color: "#4F5535" },
										className: "flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-[#F5F3E9] transition",
										children: "👤 My Account"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/orders",
										style: { color: "#4F5535" },
										className: "flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-[#F5F3E9] transition",
										children: "📦 My Orders"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/account",
										style: { color: "#4F5535" },
										className: "flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-[#F5F3E9] transition",
										children: "⚙️ Account Settings"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: { borderColor: "#E2DCBE" },
										className: "border-t my-1.5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleLogout,
										className: "flex items-center gap-2 w-full px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition",
										children: "🚪 Sign Out"
									})
								]
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-sm transition hover:brightness-110",
						children: "Log In"
					})]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border/60 bg-secondary/80",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					showSubtitle: true,
					className: "items-start"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-foreground/60",
					children: SITE.address
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-accent",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-foreground/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							className: "hover:text-accent",
							children: "Home"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#flowers",
							className: "hover:text-accent",
							children: "Flowers"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#about",
							className: "hover:text-accent",
							children: "About"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "hover:text-accent",
							children: "Contact"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-accent",
					children: "Policies"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-foreground/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-accent",
							children: "Privacy Policy"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-accent",
							children: "Terms"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-accent",
							children: "Refund Policy"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-accent",
							children: "FAQ"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-accent",
					children: "Reach us"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-foreground/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${SITE.phone}`,
							className: "hover:text-accent",
							children: SITE.phone
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: SITE.instagramUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-accent font-semibold text-accent",
							children: ["Instagram: ", SITE.instagramHandle]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://mail.google.com/mail/?view=cm&fs=1&to=pushpangan001@gmail.com",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hover:text-accent",
							children: SITE.email
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-foreground/60",
							children: SITE.hours
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border/60 py-6 text-center text-xs text-foreground/60",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" ",
				SITE.brand,
				". Grown, cut and delivered with care across Maharashtra."
			]
		})]
	});
}
function CartDrawer() {
	const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, deliveryCharge, gstAmount, grandTotal, isCartOpen, setIsCartOpen } = useCart();
	if (!isCartOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close cart drawer",
			className: "absolute inset-0 h-full w-full cursor-default",
			onClick: () => setIsCartOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex h-full w-full max-w-md flex-col bg-card shadow-2xl border-l border-border/80 text-foreground animate-in slide-in-from-right duration-300",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border/60 p-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl",
								children: "🌺"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-bold text-primary",
								children: "Your Basket"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary",
								children: [
									totalItems,
									" ",
									totalItems === 1 ? "item" : "items"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIsCartOpen(false),
						"aria-label": "Close cart",
						className: "rounded-full p-2 text-foreground/60 hover:bg-muted hover:text-foreground transition",
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-4 md:p-5 space-y-3",
					children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-16 text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-6xl",
								children: "🌸"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-semibold text-foreground/80",
								children: "Your basket is empty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foreground/55 max-w-xs mx-auto",
								children: "Add fresh marigolds, roses, lotus and jasmine to your basket."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								onClick: () => setIsCartOpen(false),
								className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground hover:brightness-110 transition",
								children: "🌺 Browse Flowers"
							})
						]
					}) : cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 rounded-2xl border border-border/60 bg-background/60 p-3 shadow-sm items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/flowers/$slug",
							params: { slug: item.flower.slug },
							onClick: () => setIsCartOpen(false),
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.flower.image,
								alt: item.flower.name,
								className: "h-16 w-16 rounded-xl object-cover border border-border/40 hover:scale-105 transition duration-200"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-sm font-bold text-foreground truncate",
										children: item.flower.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-foreground/50 mt-0.5",
										children: item.flower.category
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => removeFromCart(item.flower.slug),
										className: "shrink-0 rounded-full p-1 text-foreground/40 hover:bg-rose-50 hover:text-rose-500 transition",
										title: "Remove",
										"aria-label": `Remove ${item.flower.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "h-3.5 w-3.5",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2.5,
												d: "M6 18L18 6M6 6l12 12"
											})
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-foreground/55 mt-0.5",
									children: [
										inr(item.flower.price),
										" / ",
										item.flower.unit
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center rounded-full border border-border bg-card",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => updateQuantity(item.flower.slug, item.quantity - 1),
												disabled: item.quantity <= 1,
												className: "h-6 w-6 rounded-full text-xs font-bold hover:bg-muted disabled:opacity-40 transition flex items-center justify-center",
												"aria-label": "Decrease",
												children: "−"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-7 text-center text-xs font-bold",
												children: item.quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => updateQuantity(item.flower.slug, item.quantity + 1),
												className: "h-6 w-6 rounded-full text-xs font-bold hover:bg-muted transition flex items-center justify-center",
												"aria-label": "Increase",
												children: "+"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-sm font-bold text-primary",
										children: inr(item.flower.price * item.quantity)
									})]
								})
							]
						})]
					}, item.flower.slug))
				}),
				cart.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border/80 bg-card p-4 md:p-5 space-y-3 shadow-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 text-xs text-foreground/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: inr(totalPrice)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: deliveryCharge === 0 ? "font-bold text-green-600" : "font-semibold text-foreground",
										children: deliveryCharge === 0 ? "FREE 🎉" : inr(deliveryCharge)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GST (5%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: inr(gstAmount)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-border/60 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-foreground",
								children: "Grand Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl font-extrabold text-primary",
								children: inr(grandTotal)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							onClick: () => setIsCartOpen(false),
							className: "block w-full rounded-xl border border-border bg-background py-2.5 text-center text-xs font-bold text-foreground/80 hover:border-primary hover:text-primary transition",
							children: "Continue Shopping"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							onClick: () => setIsCartOpen(false),
							className: "block w-full rounded-2xl bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-110",
							children: "Proceed to Checkout →"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: clearCart,
							className: "w-full text-center text-xs text-foreground/50 hover:underline hover:text-foreground/70 pt-0.5",
							children: "Clear Basket"
						})
					]
				})
			]
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${SITE.brand} — ${SITE.tagline}` },
			{
				name: "description",
				content: `${SITE.brand} — wholesale & retail supplier of premium fresh flowers across Maharashtra. Marigold, rose, jasmine, lotus and more, delivered fresh.`
			},
			{
				name: "author",
				content: SITE.brand
			},
			{
				property: "og:title",
				content: `${SITE.brand} — ${SITE.tagline}`
			},
			{
				property: "og:description",
				content: `Wholesale & retail fresh flowers across Maharashtra. Order on WhatsApp for same-day delivery.`
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Figtree:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	if (useLocation().pathname.startsWith("/admin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: waLink("Hi Pushpangan! I would like to enquire about ordering flowers."),
					target: "_blank",
					rel: "noreferrer",
					className: "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-2xl transition hover:scale-105 hover:bg-[#20ba5a] active:scale-95",
					"aria-label": "Chat on WhatsApp",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "h-5 w-5 fill-current",
						viewBox: "0 0 24 24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.654zm6.097-4.281l.387.23c1.472.873 3.167 1.336 4.896 1.337 5.176 0 9.39-4.213 9.393-9.39.002-2.507-.972-4.864-2.746-6.639-1.774-1.775-4.132-2.75-6.643-2.75-5.178 0-9.39 4.213-9.392 9.39-.001 1.8.472 3.557 1.37 5.112l.252.435-1.084 3.96 4.058-1.003z" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "WhatsApp Us"
					})]
				})
			]
		}) }) })
	});
}
var $$splitComponentImporter$7 = () => import("./routes-DAr9XanE.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./account-CooP4rX8.mjs");
var Route$7 = createFileRoute("/account")({
	head: () => ({ meta: [{ title: `My Account — ${SITE.brand}` }, {
		name: "description",
		content: `Manage your ${SITE.brand} account, orders, addresses, and preferences.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin-BR1V4xh5.mjs");
var Route$6 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./basket-D4dzMxB4.mjs");
var Route$5 = createFileRoute("/basket")({
	head: () => ({ meta: [{ title: `Your Basket — ${SITE.brand}` }, {
		name: "description",
		content: "Review your flower basket, update quantities, and proceed to checkout."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./checkout-CE5hBwVK.mjs");
var Route$4 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: `Checkout — ${SITE.brand}` }, {
		name: "description",
		content: "Complete your flower order from Pushpangan."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./login-0587k38Z.mjs");
var Route$3 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: `Log In & Account Access — ${SITE.brand}` }, {
		name: "description",
		content: `Log in to your ${SITE.brand} account for wholesale flower pricing, order history, and account management.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./orders-DZ06yX1J.mjs");
var Route$2 = createFileRoute("/orders")({
	head: () => ({ meta: [{ title: "My Orders — Pushpangan Flowers" }, {
		name: "description",
		content: "View, search, filter, and track your Pushpangan fresh flower orders. Manage deliveries, reorder, rate items, and download invoices."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./shop-D7p_NKyo.mjs");
var Route$1 = createFileRoute("/shop")({
	head: () => ({ meta: [{ title: `Customize Flower Order & Pooja Hampers — ${SITE.brand}` }, {
		name: "description",
		content: "Search and add fresh marigold, rose, lotus, jasmine & festival flowers to your cart. Select custom quantities and order fresh dawn harvest."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const base = SITE.domain;
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[{
		path: "/",
		changefreq: "daily",
		priority: "1.0"
	}, ...FLOWERS.map((f) => ({
		path: `/flowers/${f.slug}`,
		changefreq: "weekly",
		priority: "0.8"
	}))].map((e) => `  <url>\n    <loc>${base}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AccountRoute = Route$7.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$9
});
var AdminRoute = Route$6.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$9
});
var BasketRoute = Route$5.update({
	id: "/basket",
	path: "/basket",
	getParentRoute: () => Route$9
});
var CheckoutRoute = Route$4.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$9
});
var LoginRoute = Route$3.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$9
});
var OrdersRoute = Route$2.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => Route$9
});
var ShopRoute = Route$1.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$9
});
var SitemapDotxmlRoute = Route.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$9
});
var FlowersSlugRoute = Route$11.update({
	id: "/flowers/$slug",
	path: "/flowers/$slug",
	getParentRoute: () => Route$9
});
var AdminRouteChildren = { AdminProductsProductIdRoute: Route$10.update({
	id: "/products/$productId",
	path: "/products/$productId",
	getParentRoute: () => AdminRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AccountRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	BasketRoute,
	CheckoutRoute,
	LoginRoute,
	OrdersRoute,
	ShopRoute,
	SitemapDotxmlRoute,
	FlowersSlugRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
