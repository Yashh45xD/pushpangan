import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findFlower, FLOWERS } from "@/lib/flowers";
import { inr, SITE, waLink } from "@/lib/site";
import { useState } from "react";

export const Route = createFileRoute("/flowers/$slug")({
  loader: ({ params }) => {
    const flower = findFlower(params.slug);
    if (!flower) throw notFound();
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
  const { flower } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const total = qty * flower.price;
  const msg = `Hi Pushpangan, I'd like to order:\n\n• ${flower.name} × ${qty} ${flower.unit}\n• Estimated total: ${inr(total)}\n\nPlease confirm availability and delivery.`;
  const related = FLOWERS.filter((f) => f.category === flower.category && f.slug !== flower.slug).slice(0, 4);

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/50">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 py-4 text-sm text-muted-foreground md:px-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/" hash="flowers" className="hover:text-primary">Flowers</Link>
          <span>/</span>
          <span className="text-foreground">{flower.name}</span>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 md:grid-cols-2 md:px-8">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm">
            <img src={flower.image} alt={flower.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[flower.image, flower.image, flower.image, flower.image].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-muted">
                <img src={src} alt="" className="aspect-square w-full object-cover opacity-90" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">{flower.category} · {flower.color}</span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">{flower.name}</h1>
          <p className="mt-4 text-foreground/75">{flower.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-primary">{inr(flower.price)}</span>
            <span className="text-sm text-muted-foreground">{flower.unit}</span>
            {flower.available ? (
              <span className="ml-auto rounded-full bg-leaf/90 px-3 py-1 text-xs font-semibold text-white">In stock</span>
            ) : (
              <span className="ml-auto rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">Sold out</span>
            )}
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-card p-4 text-sm">
            <div><dt className="text-muted-foreground">Freshness</dt><dd className="font-medium text-foreground">{flower.freshness}</dd></div>
            <div><dt className="text-muted-foreground">Unit</dt><dd className="font-medium text-foreground">{flower.unit}</dd></div>
            <div><dt className="text-muted-foreground">Delivery</dt><dd className="font-medium text-foreground">Same-day in Pune</dd></div>
            <div><dt className="text-muted-foreground">Occasions</dt><dd className="font-medium text-foreground">{flower.occasions.join(", ")}</dd></div>
          </dl>

          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border bg-background">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 text-lg text-primary" aria-label="Decrease">−</button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 text-lg text-primary" aria-label="Increase">+</button>
            </div>
            <div className="text-sm text-muted-foreground">
              Total <span className="text-lg font-semibold text-foreground">{inr(total)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink(msg)} target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:brightness-105">
              Order on WhatsApp
            </a>
            <a href={waLink(`Hi Pushpangan, please share a quotation for ${flower.name} (${flower.unit}), qty ${qty}.`)} target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110">
              Request Quote
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Prices are indicative and subject to daily market rates. Confirm final rate on WhatsApp.</p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8">
          <h2 className="font-display text-2xl font-semibold text-primary">More from {flower.category}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} to="/flowers/$slug" params={{ slug: r.slug }} className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="font-display text-lg font-semibold text-foreground">{r.name}</div>
                  <div className="mt-1 text-sm text-primary">{inr(r.price)} <span className="text-xs text-muted-foreground">{r.unit}</span></div>
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
      <p className="mt-2 text-muted-foreground">This flower doesn't exist or has been retired from the catalog.</p>
      <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Back home</Link>
    </div>
  );
}