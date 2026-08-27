import { i as __toESM } from "../_runtime.mjs";
import { t as orderService } from "./orderService-WREntGFO.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useCart } from "./CartContext-CGJFQYZO.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as inr } from "./site-CY1ANRF-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-CE5hBwVK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	useNavigate();
	const { cart, totalPrice, discountAmount, grandTotal, clearCart } = useCart();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		address: "",
		city: "",
		state: "Maharashtra",
		pincode: ""
	});
	const [payment, setPayment] = (0, import_react.useState)("cod");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [placed, setPlaced] = (0, import_react.useState)(false);
	const [orderId, setOrderId] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const validate = () => {
		const e = {};
		if (!form.name.trim()) e.name = "Name is required.";
		if (!form.phone.trim() || form.phone.length < 10) e.phone = "Enter a valid 10-digit phone.";
		if (!form.address.trim()) e.address = "Address is required.";
		if (!form.city.trim()) e.city = "City is required.";
		if (!form.pincode.trim() || form.pincode.length < 6) e.pincode = "Enter a valid 6-digit pincode.";
		setErrors(e);
		return Object.keys(e).length === 0;
	};
	const handleChange = (field, value) => {
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
		if (errors[field]) setErrors((prev) => ({
			...prev,
			[field]: void 0
		}));
	};
	const handlePlaceOrder = async () => {
		if (!validate()) return;
		setIsSubmitting(true);
		try {
			let buyerId = form.phone;
			try {
				const saved = localStorage.getItem("siteUser");
				if (saved) {
					const u = JSON.parse(saved);
					buyerId = u.email || u._id || u.id || form.phone;
				}
			} catch {}
			const createdOrder = await orderService.createOrder({
				user_id: buyerId,
				total_amount: totalPrice,
				discount_amount: discountAmount,
				delivery_fee: 0,
				final_amount: grandTotal,
				shipping_address: `${form.name}, ${form.address}`,
				shipping_city: form.city,
				shipping_state: form.state,
				shipping_pincode: form.pincode,
				shipping_phone: form.phone,
				payment_method: payment,
				items: cart.map((item) => ({
					product_id: item.flower.slug,
					product_name: item.flower.name,
					unit_price: item.flower.price,
					quantity: item.quantity,
					subtotal: item.flower.price * item.quantity,
					image: item.flower.image,
					category: item.flower.category
				}))
			});
			const id = createdOrder?.orderId || createdOrder?.order_number || `ORD-${Date.now()}`;
			setOrderId(id);
			clearCart();
			setPlaced(true);
		} catch (e) {
			console.error("Failed to place order:", e);
		} finally {
			setIsSubmitting(false);
		}
	};
	if (cart.length === 0 && !placed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-8xl mb-6",
				children: "🛒"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-extrabold text-primary mb-3",
				children: "Your basket is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl hover:brightness-110 transition",
				children: "🌺 Shop Now"
			})
		]
	});
	if (placed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-8xl mb-6 animate-bounce",
				children: "🌸"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl md:text-4xl font-extrabold text-primary mb-3",
				children: "Order Placed Successfully!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-foreground/60 max-w-sm mb-2 leading-relaxed",
				children: "Thank you for your order! Our team will call you within 30 minutes to confirm delivery."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-foreground/50 mb-8",
				children: ["Order ID: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold text-foreground",
					children: orderId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-4 justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/orders",
					className: "rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl hover:brightness-110 transition flex items-center gap-2",
					children: "📦 View My Orders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "rounded-full border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground hover:border-primary transition",
					children: "Shop More Flowers"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background py-8 px-4 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/basket",
						className: "text-xs font-semibold text-foreground/60 hover:text-primary",
						children: "← Back to Basket"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl md:text-4xl font-extrabold text-primary",
						children: "Checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-foreground/60",
						children: "Complete your delivery details and place your order."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-3 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border/60 bg-card p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold text-primary mb-5",
							children: "🚚 Delivery Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full Name",
									required: true,
									error: errors.name,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "checkout-name",
										type: "text",
										placeholder: "Ramesh Sharma",
										value: form.name,
										onChange: (e) => handleChange("name", e.target.value),
										className: inputCls(!!errors.name)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone Number",
									required: true,
									error: errors.phone,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "checkout-phone",
										type: "tel",
										placeholder: "9876543210",
										maxLength: 10,
										value: form.phone,
										onChange: (e) => handleChange("phone", e.target.value),
										className: inputCls(!!errors.phone)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Delivery Address",
									required: true,
									error: errors.address,
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "checkout-address",
										placeholder: "Flat / House No, Street, Locality",
										rows: 2,
										value: form.address,
										onChange: (e) => handleChange("address", e.target.value),
										className: inputCls(!!errors.address) + " resize-none"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "City",
									required: true,
									error: errors.city,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "checkout-city",
										type: "text",
										placeholder: "Pune",
										value: form.city,
										onChange: (e) => handleChange("city", e.target.value),
										className: inputCls(!!errors.city)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Pincode",
									required: true,
									error: errors.pincode,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "checkout-pincode",
										type: "text",
										placeholder: "411001",
										maxLength: 6,
										value: form.pincode,
										onChange: (e) => handleChange("pincode", e.target.value),
										className: inputCls(!!errors.pincode)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "State",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "checkout-state",
										value: form.state,
										onChange: (e) => handleChange("state", e.target.value),
										className: inputCls(false),
										children: [
											"Maharashtra",
											"Goa",
											"Gujarat",
											"Karnataka",
											"Delhi"
										].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
									})
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border/60 bg-card p-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-bold text-primary mb-5",
								children: "💳 Payment Method"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3",
								children: [{
									id: "cod",
									label: "Cash on Delivery",
									icon: "💵"
								}].map((pm) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPayment(pm.id),
									className: `flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-sm font-semibold transition ${payment === pm.id ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-foreground/70 hover:border-primary/40"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: pm.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pm.label })]
								}, pm.id))
							}),
							payment === "cod" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs text-foreground/60 bg-muted rounded-xl px-4 py-2",
								children: "Pay cash to the delivery person. No extra charges."
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border/60 bg-card p-5 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-base font-bold text-primary mb-4",
									children: [
										"Your Order (",
										cart.length,
										" ",
										cart.length === 1 ? "item" : "items",
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-h-56 overflow-y-auto space-y-3 pr-1",
									children: cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.flower.image,
												alt: item.flower.name,
												className: "h-12 w-12 rounded-xl object-cover border border-border/40 shrink-0"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-semibold text-foreground truncate",
													children: item.flower.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-foreground/50",
													children: [
														inr(item.flower.price),
														" × ",
														item.quantity
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-bold text-primary shrink-0",
												children: inr(item.flower.price * item.quantity)
											})
										]
									}, item.flower.slug))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-2 border-t border-border/60 pt-4 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
											label: "Subtotal",
											value: inr(totalPrice)
										}),
										discountAmount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
											label: "Discount",
											value: `− ${inr(discountAmount)}`,
											green: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
											label: "Delivery",
											value: "FREE",
											green: true
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between border-t border-border/60 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display font-bold text-foreground",
										children: "Grand Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xl font-extrabold text-primary",
										children: inr(grandTotal)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handlePlaceOrder,
							disabled: isSubmitting || cart.length === 0,
							className: "w-full rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-xl transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2",
							children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Placing Order…" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌸 Place Order" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-[10px] text-foreground/40",
							children: "By placing your order you agree to our terms. Prices are indicative and subject to daily market rates."
						})
					]
				})]
			})]
		})
	});
}
function Field({ label, required, error, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-xs font-semibold text-foreground/70 mb-1",
				children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-0.5 text-rose-500",
					children: "*"
				})]
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-rose-500",
				children: error
			})
		]
	});
}
function inputCls(hasError) {
	return `w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition ${hasError ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200" : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"}`;
}
function SummaryRow({ label, value, green }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground/60",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `font-semibold ${green ? "text-green-600" : "text-foreground"}`,
			children: value
		})]
	});
}
//#endregion
export { CheckoutPage as component };
