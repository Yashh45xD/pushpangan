import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { type Flower } from "@/lib/flowers";
import { inr, SITE } from "@/lib/site";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { productService } from "@/services/productService";

export const Route = createFileRoute("/flowers/$slug")({
  loader: async ({ params }) => {
    const prod = await productService.getProductBySlug(params.slug);
    if (!prod) throw notFound();
    const flower = productService.toFlower(prod);
    return { flower };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Flower not found" }, { name: "robots", content: "noindex" }] };
    const f = loaderData.flower;
    return {
      meta: [
        { title: `${f.name} — ${SITE.brand}` },
        { name: "description", content: `${f.name} · ${f.description}` },
        { property: "og:title", content: `${f.name} — ${SITE.brand}` },
        { property: "og:description", content: f.description },
        { property: "og:image", content: f.image },
        { name: "twitter:image", content: f.image },
      ],
    };
  },
  component: FlowerPage,
  notFoundComponent: FlowerNotFound,
});

function FlowerPage() {
  const { flower: initialFlower } = Route.useLoaderData();
  const [currentFlower, setCurrentFlower] = useState<Flower>(initialFlower);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const total = qty * currentFlower.price;
  
  const [related, setRelated] = useState<Flower[]>([]);

  useEffect(() => {
    async function refreshFlower() {
      try {
        const prod = await productService.getProductBySlug(initialFlower.slug);
        if (prod) {
          setCurrentFlower(productService.toFlower(prod));
        }
      } catch {}
    }

    async function loadRelated() {
      try {
        const { data } = await productService.getProducts({ category: currentFlower.category });
        const loadedRelated = (data || [])
          .map((p: any) => productService.toFlower(p))
          .filter((f: any) => f.slug !== currentFlower.slug)
          .slice(0, 4);
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
    const interval = setInterval(handleUpdate, 2000);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pushpangan_products_updated", handleUpdate);
      clearInterval(interval);
    };
  }, [initialFlower.slug, currentFlower.category, currentFlower.slug]);

  const handleAddToCart = () => {
    addToCart(currentFlower, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-border/60 bg-secondary/50">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 py-4 text-sm text-muted-foreground md:px-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Flowers</Link>
          <span>/</span>
          <span className="text-foreground">{currentFlower.name}</span>
        </div>
      </section>

      {/* Main Product */}
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 md:grid-cols-2 md:px-8">
        {/* Image */}
        <div>
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm">
            <img
              src={currentFlower.image}
              alt={currentFlower.name}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            {currentFlower.category} · {currentFlower.color}
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">
            {currentFlower.name}
          </h1>
          <p className="mt-4 text-foreground/75">{currentFlower.description}</p>

          {/* Price + Stock */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-primary">{inr(currentFlower.price)}</span>
            <span className="text-sm text-muted-foreground">{currentFlower.unit}</span>
            {currentFlower.available ? (
              <span style={{ backgroundColor: "#E2DCBE", color: "#4F5535", borderColor: "#9F905E" }} className="ml-auto rounded-full px-3.5 py-1 text-xs font-extrabold border shadow-xs">
                In stock
              </span>
            ) : (
              <span className="ml-auto rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                Sold out
              </span>
            )}
          </div>

          {/* Details grid */}
          <dl className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-card p-4 text-sm">
            <div><dt className="text-muted-foreground">Freshness</dt><dd className="font-medium text-foreground">{currentFlower.freshness}</dd></div>
            <div><dt className="text-muted-foreground">Unit</dt><dd className="font-medium text-foreground">{currentFlower.unit}</dd></div>
            <div><dt className="text-muted-foreground">Delivery</dt><dd className="font-medium text-foreground">Same-day in Mumbai</dd></div>
            <div><dt className="text-muted-foreground">Occasions</dt><dd className="font-medium text-foreground">{currentFlower.occasions.join(", ")}</dd></div>
          </dl>

          {/* Qty stepper */}
          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border bg-background">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-11 w-11 text-lg text-primary"
                aria-label="Decrease"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-11 w-11 text-lg text-primary"
                aria-label="Increase"
              >
                +
              </button>
            </div>
            <div className="text-sm text-muted-foreground">
              Total{" "}
              <span className="text-lg font-semibold text-foreground">{inr(total)}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!currentFlower.available}
              className={`flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold shadow-lg transition ${
                justAdded
                  ? "bg-accent text-accent-foreground scale-95"
                  : currentFlower.available
                  ? "bg-primary text-primary-foreground hover:brightness-110"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {!currentFlower.available
                ? "Out of Stock"
                : justAdded
                ? "✓ Added to Basket!"
                : "🛒 Add to Basket"}
            </button>
            <Link
              to="/basket"
              className="flex-1 rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:brightness-105"
            >
              View Basket →
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Prices are indicative and subject to daily market rates. Free delivery on orders above ₹499.
          </p>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            More from {currentFlower.category}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/flowers/$slug"
                params={{ slug: r.slug }}
                className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="font-display text-lg font-semibold text-foreground">{r.name}</div>
                  <div className="mt-1 text-sm text-primary">
                    {inr(r.price)}{" "}
                    <span className="text-xs text-muted-foreground">{r.unit}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function FlowerNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-primary">Flower not found</h1>
      <p className="mt-2 text-muted-foreground">
        This flower doesn't exist or has been retired from the catalog.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Back home
      </Link>
    </div>
  );
}