import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { COLORS, type Flower } from "@/lib/flowers";
import { inr, SITE } from "@/lib/site";
import { useCart } from "@/lib/CartContext";
import { productService } from "@/services/productService";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: `Customize Flower Order & Pooja Hampers — ${SITE.brand}` },
      { name: "description", content: "Search and add fresh marigold, rose, lotus, jasmine & festival flowers to your cart. Select custom quantities and order fresh dawn harvest." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState(1000);

  const { addToCart, totalItems, setIsCartOpen } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // Quantities selected per flower before adding to cart
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQty = (slug: string) => quantities[slug] || 1;
  const setQty = (slug: string, qty: number) => {
    if (qty < 1) qty = 1;
    setQuantities((prev) => ({ ...prev, [slug]: qty }));
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [prodResult, catResult] = await Promise.all([
          productService.getProducts({ limit: 100 }),
          productService.getCategories()
        ]);
        
        const loadedFlowers = (prodResult.data || []).map((p: any) => productService.toFlower(p));
        setFlowers(loadedFlowers);
        
        const catNames = ["All", ...(catResult || []).map((c: any) => c.name)];
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
    const interval = setInterval(loadData, 2000);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pushpangan_products_updated", handleUpdate);
      clearInterval(interval);
    };
  }, []);

  const filteredFlowers = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    return flowers.filter((f) => {
      if (term && !f.name.toLowerCase().includes(term) && !f.description.toLowerCase().includes(term)) return false;
      if (selectedCategory !== "All" && f.category !== selectedCategory) return false;
      if (selectedColor !== "All" && f.color !== selectedColor) return false;
      if (f.price > maxPrice) return false;
      return true;
    });
  }, [flowers, searchQuery, selectedCategory, selectedColor, maxPrice]);

  const handleAddToCart = (flower: Flower) => {
    const qty = getQty(flower.slug);
    addToCart(flower, qty);
    setAddedSlug(flower.slug);
    setTimeout(() => setAddedSlug(null), 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Title & Hero */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 md:p-10 shadow-sm hero-gradient relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-accent/30">
            🌺 Ganpati Bappa Festival Special & Daily Flower Shop
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-primary leading-tight">
            Select & Customize Your Fresh Flowers
          </h1>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            Search across our entire dawn-picked collection of marigolds, roses, lotus, durva grass & sacred pooja blooms. Customize your quantities and add directly to your basket.
          </p>
        </div>
      </div>

      {/* SEARCH BAR & FILTERS SECTION */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-4">
        {/* Main Search Bar */}
        <div>
          <label htmlFor="flower-search" className="block text-xs font-bold uppercase tracking-wider text-foreground/75 mb-1.5">
            Search Flowers (e.g., Marigold, Rose, Lotus, Jasmine, Hibiscus)
          </label>
          <div className="relative">
            <input
              id="flower-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flower name or pooja occasion…"
              className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 pl-12 text-sm md:text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-foreground/50">
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground/60 hover:text-foreground bg-muted px-2 py-1 rounded-full"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2 border-t border-border/60">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold outline-none focus:border-primary"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1">
              Colour
            </label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold outline-none focus:border-primary"
            >
              {COLORS.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1">
              Max Price: {inr(maxPrice)}
            </label>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary mt-2"
            />
          </div>

          <div className="flex items-end justify-between sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedColor("All");
                setMaxPrice(1000);
              }}
              className="rounded-xl border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground/80 hover:bg-background transition"
            >
              Reset Filters
            </button>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-sm hover:brightness-105 transition flex items-center gap-1.5"
            >
              <span>View Basket</span>
              <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px]">{totalItems}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-foreground/75 px-1">
        <span>
          Showing <strong className="text-primary font-bold">{filteredFlowers.length}</strong> fresh flower varieties
        </span>
        {searchQuery && (
          <span className="text-xs text-foreground/60">
            Results matching "{searchQuery}"
          </span>
        )}
      </div>

      {/* FLOWERS GRID WITH ADD TO CART */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="animate-pulse rounded-3xl border border-border/60 bg-card p-4 space-y-4">
              <div className="aspect-square w-full rounded-2xl bg-muted" />
              <div className="h-4 w-2/3 bg-muted rounded" />
              <div className="h-4 w-1/2 bg-muted rounded" />
            </div>
          ))}
        </div>
      ) : filteredFlowers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 bg-card p-12 text-center space-y-3">
          <div className="text-4xl">🌻</div>
          <h3 className="font-display text-lg font-bold text-foreground">No flowers found matching your search</h3>
          <p className="text-sm text-foreground/60 max-w-md mx-auto">
            Try adjusting your search terms or resetting the category filter to see all available dawn harvest flowers.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFlowers.map((flower) => {
            const qty = getQty(flower.slug);
            const isJustAdded = addedSlug === flower.slug;

            return (
              <div
                key={flower.slug}
                className="group flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={flower.image}
                      alt={flower.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 right-2.5 rounded-full bg-card/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-primary border border-border/50">
                      {flower.freshness}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 rounded-full bg-primary/90 text-primary-foreground px-2.5 py-1 text-[11px] font-bold">
                      {flower.category}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="mt-3.5 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-foreground leading-tight group-hover:text-primary transition">
                        {flower.name}
                      </h3>
                    </div>
                    <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed">
                      {flower.description}
                    </p>
                  </div>
                </div>

                {/* Pricing & Add to Cart Controls */}
                <div className="mt-4 pt-3 border-t border-border/60 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-xl font-extrabold text-primary">
                      {inr(flower.price)}
                    </span>
                    <span className="text-xs font-semibold text-foreground/60">
                      / {flower.unit}
                    </span>
                  </div>

                  {/* Quantity Counter & Add to Cart */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-full border border-border bg-background p-1">
                      <button
                        type="button"
                        onClick={() => setQty(flower.slug, qty - 1)}
                        className="h-7 w-7 rounded-full text-sm font-bold hover:bg-muted transition flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-foreground">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(flower.slug, qty + 1)}
                        className="h-7 w-7 rounded-full text-sm font-bold hover:bg-muted transition flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(flower)}
                      className={`flex-1 rounded-full py-2.5 px-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        isJustAdded
                          ? "bg-accent text-accent-foreground shadow-md scale-95"
                          : "bg-primary text-primary-foreground shadow hover:brightness-110"
                      } focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
                    >
                      {isJustAdded ? (
                        <>
                          <span>✓ Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <span>+ Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
