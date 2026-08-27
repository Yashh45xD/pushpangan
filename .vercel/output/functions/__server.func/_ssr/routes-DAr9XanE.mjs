import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as productService, r as OCCASIONS, t as COLORS } from "./productService-DaSRxsDy.mjs";
import { r as useCart } from "./CartContext-CGJFQYZO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as inr, r as waLink, t as SITE } from "./site-CY1ANRF-.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DAr9XanE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlowerCard({ flower }) {
	const { addToCart } = useCart();
	const [justAdded, setJustAdded] = (0, import_react.useState)(false);
	const handleAddToCart = () => {
		addToCart(flower, 1);
		setJustAdded(true);
		setTimeout(() => setJustAdded(false), 1800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/flowers/$slug",
			params: { slug: flower.slug },
			className: "relative block aspect-square overflow-hidden bg-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: flower.image,
					alt: flower.name,
					loading: "lazy",
					className: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary shadow",
					children: flower.category
				}),
				flower.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						backgroundColor: "#E2DCBE",
						color: "#4F5535",
						borderColor: "#9F905E"
					},
					className: "absolute right-3 top-3 rounded-full border px-3 py-1 text-[11px] font-extrabold shadow",
					children: "In stock"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-3 top-3 rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground shadow",
					children: "Sold out"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold text-foreground",
						children: flower.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: flower.color
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-semibold text-primary",
						children: inr(flower.price)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: flower.unit
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/flowers/$slug",
						params: { slug: flower.slug },
						className: "flex-1 rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground transition hover:brightness-110",
						children: "View"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleAddToCart,
						disabled: !flower.available,
						className: `flex-1 rounded-full px-3 py-2 text-center text-sm font-semibold transition ${justAdded ? "bg-leaf/90 text-white scale-95" : flower.available ? "bg-accent text-accent-foreground hover:brightness-105" : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"}`,
						children: !flower.available ? "Out of Stock" : justAdded ? "✓ Added!" : "Add to Cart"
					})]
				})
			]
		})]
	});
}
function Catalog() {
	const [flowers, setFlowers] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)(["All"]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("All");
	const [color, setColor] = (0, import_react.useState)("All");
	const [occ, setOcc] = (0, import_react.useState)("All");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)(1500);
	const [onlyAvail, setOnlyAvail] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function loadData() {
			try {
				const [prodResult, catResult] = await Promise.all([productService.getProducts({ limit: 100 }), productService.getCategories()]);
				const loadedFlowers = (prodResult.data || []).map((p) => productService.toFlower(p));
				setFlowers(loadedFlowers);
				const catNames = ["All", ...(catResult || []).map((c) => c.name)];
				setCategories(catNames);
			} catch (err) {
				console.error("Failed to load catalog data:", err);
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
	const filtered = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		return flowers.filter((f) => {
			if (term && !f.name.toLowerCase().includes(term)) return false;
			if (cat !== "All" && f.category !== cat) return false;
			if (color !== "All" && f.color !== color) return false;
			if (occ !== "All" && !f.occasions.includes(occ)) return false;
			if (f.price > maxPrice) return false;
			if (onlyAvail && !f.available) return false;
			return true;
		});
	}, [
		flowers,
		q,
		cat,
		color,
		occ,
		maxPrice,
		onlyAvail
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
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
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-border/60 bg-card p-5 shadow-sm md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Search"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Rose, marigold, jasmine…",
							className: "mt-1 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "Category",
						value: cat,
						onChange: (v) => setCat(v),
						options: categories
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "Colour",
						value: color,
						onChange: (v) => setColor(v),
						options: COLORS
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "Occasion",
						value: occ,
						onChange: (v) => setOcc(v),
						options: OCCASIONS
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: ["Max price · ₹", maxPrice]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 10,
						max: 1500,
						step: 10,
						value: maxPrice,
						onChange: (e) => setMaxPrice(Number(e.target.value)),
						className: "mt-2 w-full accent-primary"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: onlyAvail,
						onChange: (e) => setOnlyAvail(e.target.checked),
						className: "h-4 w-4 accent-primary"
					}), "Available only"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 text-sm text-muted-foreground",
			children: [
				"Showing ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: filtered.length
				}),
				" of ",
				flowers.length,
				" flowers"
			]
		}),
		filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground",
			children: "No flowers match your filters. Try widening your search."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
			children: filtered.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowerCard, { flower: f }, f.slug))
		})
	] });
}
function Select({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o,
				children: o
			}, o))
		})]
	});
}
var supabase = createClient("https://placeholder-pushpangan-supabase.supabase.co", "placeholder-anon-key", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true
} });
var GANPATI_HERO_IMAGE = "https://res.cloudinary.com/r1o7fosa/image/upload/v1784737738/a02ef13e-4e9f-4fce-a726-91614f72baf4.png";
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-gradient absolute inset-0",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:px-8 md:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur",
							children: "🌺 Ganesh Chaturthi Grand Special"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary md:text-6xl",
							children: [
								"Welcome Bappa",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"with Freshness!"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl md:text-2xl font-bold text-accent italic",
							children: "\"Freshness For the Vighnaharta ,delivered\""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-lg text-base text-foreground/80 leading-relaxed",
							children: "Hand-picked before sunrise from growers across Maharashtra. Pre-book your 10-day daily pooja flowers, 21-red hibiscus sets, lotus, durva & marigolds for Bappa's grand Aagman."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shop All Flowers & Add to Basket" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2 text-xs font-semibold text-foreground/60 uppercase tracking-widest",
							children: "ROOTED IN SOIL, GROWN WITH LOVE"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border/80 shadow-2xl bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: GANPATI_HERO_IMAGE,
								alt: "Fresh marigolds and flowers for Ganpati Bappa",
								className: "h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-6 left-6 right-6 text-white space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground",
										children: "Dawn Plucked Quality"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl font-bold text-white",
										children: "100% Sunrise Fresh Blooms"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-white/80",
										children: "Direct from farm to your Bappa Sthapana mandap."
									})
								]
							})
						]
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-card border-y border-border/80 py-12 px-4 md:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-widest text-accent",
						children: "Festival Essentials"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl md:text-3xl font-bold text-primary",
						children: "Special Blooms for Bappa's Pooja"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "text-xs font-bold text-primary hover:underline",
						children: "View All Flowers in Shop →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							title: "Orange Marigold Garland",
							subtitle: "Dawn Picked Fresh Marigold",
							price: "₹120 / kg",
							img: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png"
						},
						{
							title: "Red Hibiscus Set",
							subtitle: "21 Sacred Plucked Blooms",
							price: "₹15 / piece",
							img: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png"
						},
						{
							title: "Lotus Stems for Sthapana",
							subtitle: "Pink Sacred Altar Bloom",
							price: "₹40 / piece",
							img: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png"
						},
						{
							title: "Rose Petals Shower Pack",
							subtitle: "Fragrant Welcome & Rangoli",
							price: "₹400 / kg",
							img: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png"
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-background p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.img,
								alt: item.title,
								className: "h-full w-full object-cover transition duration-300 group-hover:scale-105",
								loading: "lazy"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-bold text-foreground group-hover:text-primary transition",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-foreground/70",
								children: item.subtitle
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-2 flex items-center justify-between border-t border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-bold text-primary",
								children: item.price
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "text-xs font-bold text-accent hover:underline",
								children: "Add in Shop →"
							})]
						})]
					}, item.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "flowers",
			className: "mx-auto w-full max-w-7xl px-4 py-20 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold uppercase tracking-widest text-accent",
						children: "Our Flowers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl font-semibold text-primary md:text-4xl",
						children: "Browse every bloom in stock today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-foreground/70",
						children: "Search, filter and request a quote — or tap WhatsApp for instant order."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, {})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "about",
			className: "relative overflow-hidden bg-secondary/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center md:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold uppercase tracking-widest text-accent",
						children: "Our Story"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl font-semibold text-primary md:text-4xl",
						children: "Trusted by temples, weddings and businesses across Maharashtra."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-foreground/80",
						children: [SITE.brand, " is a family-run flower supplier working directly with growers so that every stem, garland and basket reaches you at peak freshness — at honest wholesale rates."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 grid gap-4 sm:grid-cols-2",
						children: [
							{
								h: "Freshness guarantee",
								p: "Hand-picked at dawn, cold-chain stored."
							},
							{
								h: "Wholesale pricing",
								p: "Direct from grower — no middlemen."
							},
							{
								h: "Express delivery",
								p: "Delivered as early as possible on priority."
							},
							{
								h: "Quality assurance",
								p: "Every consignment inspected by hand."
							}
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-border/60 bg-card/80 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg font-semibold text-accent",
								children: f.h
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-foreground/75",
								children: f.p
							})]
						}, f.h))
					})
				] })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "contact",
			className: "mx-auto w-full max-w-7xl px-4 py-20 md:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 rounded-3xl border border-border/60 bg-card p-8 shadow-sm md:grid-cols-2 md:p-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold uppercase tracking-widest text-accent",
						children: "Get in touch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl font-semibold text-primary md:text-4xl",
						children: "Place an enquiry — we usually reply within an hour."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-foreground/70",
						children: "Bulk orders, weddings, temple events, corporate décor and daily subscriptions — we handle it all."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-8 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "w-24 font-semibold text-primary",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${SITE.phone}`,
									className: "hover:text-accent",
									children: SITE.phone
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "w-24 font-semibold text-primary",
									children: "WhatsApp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: waLink("Hi Pushpangan!"),
									target: "_blank",
									rel: "noreferrer",
									className: "hover:text-accent",
									children: "+91 83694 07007"
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "w-24 font-semibold text-primary",
									children: "Instagram"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: SITE.instagramUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "hover:text-accent font-medium text-accent",
									children: SITE.instagramHandle
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "w-24 font-semibold text-primary",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://mail.google.com/mail/?view=cm&fs=1&to=pushpangan001@gmail.com",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "hover:text-accent font-medium text-accent",
									children: SITE.email
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "w-24 font-semibold text-primary",
									children: "Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-foreground/70",
									children: SITE.address
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "w-24 font-semibold text-primary",
									children: "Hours"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-foreground/70",
									children: SITE.hours
								})]
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: async (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const name = String(fd.get("name") || "");
						const phone = String(fd.get("phone") || "");
						const email = String(fd.get("email") || "");
						const message = String(fd.get("message") || "");
						try {
							await supabase.from("contact_messages").insert({
								name,
								phone,
								email,
								message,
								status: "unread"
							});
						} catch (err) {
							console.warn("Could not save contact message to Supabase:", err);
						}
						const msg = `New enquiry from ${name} (${phone}):\n\n${message}`;
						window.open(waLink(msg), "_blank");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "name",
							label: "Your name",
							placeholder: "Aarav Sharma",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "phone",
							label: "Phone",
							placeholder: "+91 …",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "email",
							label: "Email",
							type: "email",
							placeholder: "you@example.com"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "What do you need?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "message",
								required: true,
								rows: 4,
								className: "mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary",
								placeholder: "Type of flowers, quantity, delivery date & location…"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110",
							children: "Send enquiry on WhatsApp"
						})
					]
				})]
			})
		})
	] });
}
function Field({ label, name, type = "text", required, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			name,
			type,
			required,
			placeholder,
			className: "mt-1 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
		})]
	});
}
//#endregion
export { Home as component };
