import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as productService } from "./productService-DaSRxsDy.mjs";
import { r as useCart } from "./CartContext-CGJFQYZO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as inr } from "./site-CY1ANRF-.mjs";
import { t as Route } from "./flowers._slug-DT1lAErG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flowers._slug-BxlVWGdD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlowerPage() {
	const { flower: initialFlower } = Route.useLoaderData();
	const [currentFlower, setCurrentFlower] = (0, import_react.useState)(initialFlower);
	const { addToCart } = useCart();
	const [qty, setQty] = (0, import_react.useState)(1);
	const [justAdded, setJustAdded] = (0, import_react.useState)(false);
	const total = qty * currentFlower.price;
	const [related, setRelated] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		async function refreshFlower() {
			try {
				const prod = await productService.getProductBySlug(initialFlower.slug);
				if (prod) setCurrentFlower(productService.toFlower(prod));
			} catch {}
		}
		async function loadRelated() {
			try {
				const { data } = await productService.getProducts({ category: currentFlower.category });
				const loadedRelated = (data || []).map((p) => productService.toFlower(p)).filter((f) => f.slug !== currentFlower.slug).slice(0, 4);
				setRelated(loadedRelated);
			} catch (err) {
				console.error("Failed to load related products:", err);
			}
		}
		refreshFlower();
		loadRelated();
		const handleUpdate = () => {
			refreshFlower();
			loadRelated();
		};
		window.addEventListener("storage", handleUpdate);
		window.addEventListener("pushpangan_products_updated", handleUpdate);
		const interval = setInterval(handleUpdate, 2e3);
		return () => {
			window.removeEventListener("storage", handleUpdate);
			window.removeEventListener("pushpangan_products_updated", handleUpdate);
			clearInterval(interval);
		};
	}, [
		initialFlower.slug,
		currentFlower.category,
		currentFlower.slug
	]);
	const handleAddToCart = () => {
		addToCart(currentFlower, qty);
		setJustAdded(true);
		setTimeout(() => setJustAdded(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border/60 bg-secondary/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-7xl items-center gap-2 px-4 py-4 text-sm text-muted-foreground md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "hover:text-primary",
						children: "Flowers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: currentFlower.name
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 md:grid-cols-2 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: currentFlower.image,
					alt: currentFlower.name,
					className: "aspect-square w-full object-cover"
				})
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-semibold uppercase tracking-widest text-accent",
					children: [
						currentFlower.category,
						" · ",
						currentFlower.color
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-semibold text-primary md:text-5xl",
					children: currentFlower.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-foreground/75",
					children: currentFlower.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-baseline gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-4xl font-semibold text-primary",
							children: inr(currentFlower.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: currentFlower.unit
						}),
						currentFlower.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								backgroundColor: "#E2DCBE",
								color: "#4F5535",
								borderColor: "#9F905E"
							},
							className: "ml-auto rounded-full px-3.5 py-1 text-xs font-extrabold border shadow-xs",
							children: "In stock"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground",
							children: "Sold out"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-card p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Freshness"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium text-foreground",
							children: currentFlower.freshness
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Unit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium text-foreground",
							children: currentFlower.unit
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Delivery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium text-foreground",
							children: "Same-day in Mumbai"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Occasions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium text-foreground",
							children: currentFlower.occasions.join(", ")
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center rounded-full border border-border bg-background",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQty((q) => Math.max(1, q - 1)),
								className: "h-11 w-11 text-lg text-primary",
								"aria-label": "Decrease",
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-10 text-center font-semibold",
								children: qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQty((q) => q + 1),
								className: "h-11 w-11 text-lg text-primary",
								"aria-label": "Increase",
								children: "+"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground",
						children: [
							"Total",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-semibold text-foreground",
								children: inr(total)
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleAddToCart,
						disabled: !currentFlower.available,
						className: `flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold shadow-lg transition ${justAdded ? "bg-accent text-accent-foreground scale-95" : currentFlower.available ? "bg-primary text-primary-foreground hover:brightness-110" : "bg-muted text-muted-foreground cursor-not-allowed"}`,
						children: !currentFlower.available ? "Out of Stock" : justAdded ? "✓ Added to Basket!" : "🛒 Add to Basket"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/basket",
						className: "flex-1 rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:brightness-105",
						children: "View Basket →"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "Prices are indicative and subject to daily market rates. Free delivery on orders above ₹499."
				})
			] })]
		}),
		related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-7xl px-4 pb-20 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-2xl font-semibold text-primary",
				children: ["More from ", currentFlower.category]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/flowers/$slug",
					params: { slug: r.slug },
					className: "group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square overflow-hidden bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: r.image,
							alt: r.name,
							loading: "lazy",
							className: "h-full w-full object-cover transition group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg font-semibold text-foreground",
							children: r.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-sm text-primary",
							children: [
								inr(r.price),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: r.unit
								})
							]
						})]
					})]
				}, r.slug))
			})]
		})
	] });
}
//#endregion
export { FlowerPage as component };
