import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useCart } from "./CartContext-CGJFQYZO.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as inr } from "./site-CY1ANRF-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/basket-D4dzMxB4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COUPONS = {
	BAPPA10: 10,
	FRESH50: 50,
	GANPATI: 15
};
function BasketPage() {
	const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, discountAmount, setDiscountAmount, grandTotal } = useCart();
	const navigate = useNavigate();
	const [coupon, setCoupon] = (0, import_react.useState)("");
	const [couponMsg, setCouponMsg] = (0, import_react.useState)(null);
	const [couponApplied, setCouponApplied] = (0, import_react.useState)(false);
	const handleApplyCoupon = () => {
		const code = coupon.trim().toUpperCase();
		if (!code) return;
		if (couponApplied) {
			setCouponMsg({
				text: "A coupon is already applied. Remove it first.",
				ok: false
			});
			return;
		}
		if (COUPONS[code] !== void 0) {
			const raw = COUPONS[code];
			const saving = raw <= 30 ? Math.round(totalPrice * raw / 100) : raw;
			setDiscountAmount(saving);
			setCouponApplied(true);
			setCouponMsg({
				text: `✓ Coupon "${code}" applied! You saved ${inr(saving)}.`,
				ok: true
			});
		} else setCouponMsg({
			text: "Invalid coupon code. Please try again.",
			ok: false
		});
	};
	const handleRemoveCoupon = () => {
		setDiscountAmount(0);
		setCouponApplied(false);
		setCoupon("");
		setCouponMsg(null);
	};
	if (cart.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-8xl mb-6 animate-bounce",
				children: "🛒"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-extrabold text-primary mb-3",
				children: "Your basket is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-foreground/60 max-w-sm mb-8 leading-relaxed",
				children: "You haven't added any flowers yet. Browse our fresh dawn-picked collection and fill your basket!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl transition hover:brightness-110",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌺 Continue Shopping" })
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background py-8 px-4 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-center justify-between flex-wrap gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl md:text-4xl font-extrabold text-primary",
					children: "🛒 Your Flower Basket"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-foreground/60",
					children: [
						totalItems,
						" ",
						totalItems === 1 ? "item" : "items",
						" · Review and checkout below"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground/80 hover:border-primary transition",
						children: "← Continue Shopping"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: clearCart,
						className: "rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition",
						children: "Clear Basket"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2 space-y-4",
					children: cart.map((item) => {
						const subtotal = item.flower.price * item.quantity;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 rounded-3xl border border-border/60 bg-card p-4 shadow-sm hover:shadow-md transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/flowers/$slug",
								params: { slug: item.flower.slug },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "shrink-0 h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-2xl border border-border/40 bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.flower.image,
										alt: item.flower.name,
										className: "h-full w-full object-cover hover:scale-105 transition duration-300"
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 flex-col min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/flowers/$slug",
										params: { slug: item.flower.slug },
										className: "font-display text-base md:text-lg font-bold text-foreground hover:text-primary transition line-clamp-1",
										children: item.flower.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-0.5 flex items-center gap-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary",
											children: item.flower.category
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-foreground/50",
											children: item.flower.color
										})]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => removeFromCart(item.flower.slug),
										"aria-label": `Remove ${item.flower.name}`,
										className: "shrink-0 rounded-full p-1.5 text-foreground/40 hover:bg-rose-50 hover:text-rose-500 transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "h-4 w-4",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M6 18L18 6M6 6l12 12"
											})
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between flex-wrap gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-sm text-foreground/60",
											children: [
												inr(item.flower.price),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs",
													children: ["/ ", item.flower.unit]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center rounded-full border border-border bg-background",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => updateQuantity(item.flower.slug, item.quantity - 1),
													disabled: item.quantity <= 1,
													className: "h-8 w-8 rounded-full text-sm font-bold hover:bg-muted disabled:opacity-40 transition flex items-center justify-center",
													"aria-label": "Decrease quantity",
													children: "−"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-8 text-center text-sm font-bold text-foreground",
													children: item.quantity
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => updateQuantity(item.flower.slug, item.quantity + 1),
													className: "h-8 w-8 rounded-full text-sm font-bold hover:bg-muted transition flex items-center justify-center",
													"aria-label": "Increase quantity",
													children: "+"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-lg font-extrabold text-primary",
											children: inr(subtotal)
										})
									]
								})]
							})]
						}, item.flower.slug);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border/60 bg-card p-5 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-sm font-bold text-foreground/80 mb-3 uppercase tracking-wide",
									children: "🎁 Coupon / Promo Code"
								}),
								couponApplied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-2xl bg-green-50 border border-green-200 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-bold text-green-700",
										children: [coupon.toUpperCase(), " applied!"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleRemoveCoupon,
										className: "text-xs font-semibold text-rose-500 hover:underline",
										children: "Remove"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: coupon,
										onChange: (e) => setCoupon(e.target.value.toUpperCase()),
										onKeyDown: (e) => e.key === "Enter" && handleApplyCoupon(),
										placeholder: "Enter coupon code",
										className: "flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary transition"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleApplyCoupon,
										className: "rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:brightness-110 transition",
										children: "Apply"
									})]
								}),
								couponMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-2 text-xs font-semibold ${couponMsg.ok ? "text-green-600" : "text-rose-500"}`,
									children: couponMsg.text
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-[10px] text-foreground/40",
									children: "Try: BAPPA10 · FRESH50 · GANPATI"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border/60 bg-card p-5 shadow-sm space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-base font-bold text-primary mb-4",
									children: "Order Summary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											label: `Total Items`,
											value: `${totalItems} ${totalItems === 1 ? "item" : "items"}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											label: "Subtotal",
											value: inr(totalPrice)
										}),
										discountAmount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											label: "Discount",
											value: `− ${inr(discountAmount)}`,
											valueClass: "text-green-600 font-bold"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											label: "Delivery",
											value: "FREE",
											valueClass: "text-green-600 font-bold"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border/60 pt-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-base font-bold text-foreground",
										children: "Grand Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-2xl font-extrabold text-primary",
										children: inr(grandTotal)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => navigate({ to: "/checkout" }),
									className: "w-full rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center gap-2 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Proceed to Checkout" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									className: "block text-center text-xs text-foreground/60 hover:text-primary hover:underline pt-1",
									children: "← Continue Shopping"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl border border-border/40 bg-card/60 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3 text-center text-[11px] text-foreground/60",
								children: [
									["🌅", "Dawn-picked Fresh"],
									["🚚", "Same-day Delivery"],
									["🔒", "Secure Payment"],
									["🌿", "100% Natural"]
								].map(([icon, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl",
										children: icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: label
									})]
								}, label))
							})
						})
					]
				})]
			})]
		})
	});
}
function Row({ label, value, valueClass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground/70",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `font-semibold text-foreground ${valueClass ?? ""}`,
			children: value
		})]
	});
}
//#endregion
export { BasketPage as component };
