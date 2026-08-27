import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as productService, t as COLORS } from "./productService-DaSRxsDy.mjs";
import { r as useCart } from "./CartContext-CGJFQYZO.mjs";
import { n as inr } from "./site-CY1ANRF-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-D7p_NKyo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const [flowers, setFlowers] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)(["All"]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("All");
	const [selectedColor, setSelectedColor] = (0, import_react.useState)("All");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)(1e3);
	const { addToCart, totalItems, setIsCartOpen } = useCart();
	const [addedSlug, setAddedSlug] = (0, import_react.useState)(null);
	const [quantities, setQuantities] = (0, import_react.useState)({});
	const getQty = (slug) => quantities[slug] || 1;
	const setQty = (slug, qty) => {
		if (qty < 1) qty = 1;
		setQuantities((prev) => ({
			...prev,
			[slug]: qty
		}));
	};
	(0, import_react.useEffect)(() => {
		async function loadData() {
			try {
				const [prodResult, catResult] = await Promise.all([productService.getProducts({ limit: 100 }), productService.getCategories()]);
				const loadedFlowers = (prodResult.data || []).map((p) => productService.toFlower(p));
				setFlowers(loadedFlowers);
				const catNames = ["All", ...(catResult || []).map((c) => c.name)];
				setCategories(catNames);
			} catch (err) {
				console.error("Failed to load shop data:", err);
			} finally {
				setLoading(false);
			}
		}
		loadData();
		const handleUpdate = () => {
			loadData();
		};
		window.addEventListener("storage", handleUpdate);
		window.addEventListener("pushpangan_products_updated", handleUpdate);
		const interval = setInterval(loadData, 2e3);
		return () => {
			window.removeEventListener("storage", handleUpdate);
			window.removeEventListener("pushpangan_products_updated", handleUpdate);
			clearInterval(interval);
		};
	}, []);
	const filteredFlowers = (0, import_react.useMemo)(() => {
		const term = searchQuery.trim().toLowerCase();
		return flowers.filter((f) => {
			if (term && !f.name.toLowerCase().includes(term) && !f.description.toLowerCase().includes(term)) return false;
			if (selectedCategory !== "All" && f.category !== selectedCategory) return false;
			if (selectedColor !== "All" && f.color !== selectedColor) return false;
			if (f.price > maxPrice) return false;
			return true;
		});
	}, [
		flowers,
		searchQuery,
		selectedCategory,
		selectedColor,
		maxPrice
	]);
	const handleAddToCart = (flower) => {
		const qty = getQty(flower.slug);
		addToCart(flower, qty);
		setAddedSlug(flower.slug);
		setTimeout(() => setAddedSlug(null), 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-3xl border border-border/80 bg-card p-6 md:p-10 shadow-sm hero-gradient relative overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl space-y-3 relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-accent/30",
							children: "🌺 Ganpati Bappa Festival Special & Daily Flower Shop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl md:text-5xl font-extrabold text-primary leading-tight",
							children: "Select & Customize Your Fresh Flowers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm md:text-base text-foreground/80 leading-relaxed",
							children: "Search across our entire dawn-picked collection of marigolds, roses, lotus, durva grass & sacred pooja blooms. Customize your quantities and add directly to your basket."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "flower-search",
					className: "block text-xs font-bold uppercase tracking-wider text-foreground/75 mb-1.5",
					children: "Search Flowers (e.g., Marigold, Rose, Lotus, Jasmine, Hibiscus)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "flower-search",
							type: "text",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: "Search by flower name or pooja occasion…",
							className: "w-full rounded-2xl border border-border bg-background px-5 py-3.5 pl-12 text-sm md:text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-4 top-1/2 -translate-y-1/2 text-xl text-foreground/50",
							children: "🔍"
						}),
						searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSearchQuery(""),
							className: "absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground/60 hover:text-foreground bg-muted px-2 py-1 rounded-full",
							children: "Clear"
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2 border-t border-border/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedCategory,
							onChange: (e) => setSelectedCategory(e.target.value),
							className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold outline-none focus:border-primary",
							children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1",
							children: "Colour"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedColor,
							onChange: (e) => setSelectedColor(e.target.value),
							className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold outline-none focus:border-primary",
							children: COLORS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: col,
								children: col
							}, col))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1",
							children: ["Max Price: ", inr(maxPrice)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 10,
							max: 1e3,
							step: 10,
							value: maxPrice,
							onChange: (e) => setMaxPrice(Number(e.target.value)),
							className: "w-full accent-primary mt-2"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between sm:justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setSearchQuery("");
									setSelectedCategory("All");
									setSelectedColor("All");
									setMaxPrice(1e3);
								},
								className: "rounded-xl border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground/80 hover:bg-background transition",
								children: "Reset Filters"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setIsCartOpen(true),
								className: "rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-sm hover:brightness-105 transition flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Basket" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px]",
									children: totalItems
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-sm text-foreground/75 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Showing ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-primary font-bold",
						children: filteredFlowers.length
					}),
					" fresh flower varieties"
				] }), searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-foreground/60",
					children: [
						"Results matching \"",
						searchQuery,
						"\""
					]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-pulse rounded-3xl border border-border/60 bg-card p-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square w-full rounded-2xl bg-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-2/3 bg-muted rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/2 bg-muted rounded" })
					]
				}, n))
			}) : filteredFlowers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-dashed border-border/80 bg-card p-12 text-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl",
						children: "🌻"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold text-foreground",
						children: "No flowers found matching your search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-foreground/60 max-w-md mx-auto",
						children: "Try adjusting your search terms or resetting the category filter to see all available dawn harvest flowers."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: filteredFlowers.map((flower) => {
					const qty = getQty(flower.slug);
					const isJustAdded = addedSlug === flower.slug;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-primary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-square w-full overflow-hidden rounded-2xl bg-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: flower.image,
									alt: flower.name,
									className: "h-full w-full object-cover transition duration-300 group-hover:scale-105",
									loading: "lazy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-2.5 right-2.5 rounded-full bg-card/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-primary border border-border/50",
									children: flower.freshness
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute bottom-2.5 left-2.5 rounded-full bg-primary/90 text-primary-foreground px-2.5 py-1 text-[11px] font-bold",
									children: flower.category
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3.5 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-start justify-between gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-foreground leading-tight group-hover:text-primary transition",
									children: flower.name
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-foreground/70 line-clamp-2 leading-relaxed",
								children: flower.description
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-3 border-t border-border/60 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl font-extrabold text-primary",
									children: inr(flower.price)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-foreground/60",
									children: ["/ ", flower.unit]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center rounded-full border border-border bg-background p-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setQty(flower.slug, qty - 1),
											className: "h-7 w-7 rounded-full text-sm font-bold hover:bg-muted transition flex items-center justify-center",
											"aria-label": "Decrease quantity",
											children: "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-center text-xs font-bold text-foreground",
											children: qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setQty(flower.slug, qty + 1),
											className: "h-7 w-7 rounded-full text-sm font-bold hover:bg-muted transition flex items-center justify-center",
											"aria-label": "Increase quantity",
											children: "+"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleAddToCart(flower),
									className: `flex-1 rounded-full py-2.5 px-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${isJustAdded ? "bg-accent text-accent-foreground shadow-md scale-95" : "bg-primary text-primary-foreground shadow hover:brightness-110"} focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`,
									children: isJustAdded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Added to Cart" }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+ Add to Cart" }) })
								})]
							})]
						})]
					}, flower.slug);
				})
			})
		]
	});
}
//#endregion
export { ShopPage as component };
