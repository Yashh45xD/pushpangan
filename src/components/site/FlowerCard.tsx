import { Link } from "@tanstack/react-router";
import type { Flower } from "@/lib/flowers";
import { inr, waLink } from "@/lib/site";

export function FlowerCard({ flower }: { flower: Flower }) {
  const msg = `Hi Pushpangan, I'd like to order ${flower.name} (${flower.unit}). Please share availability & rate.`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to="/flowers/$slug" params={{ slug: flower.slug }} className="relative block aspect-square overflow-hidden bg-muted">
        <img
          src={flower.image}
          alt={flower.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary shadow">
          {flower.category}
        </span>
        {flower.available ? (
          <span className="absolute right-3 top-3 rounded-full bg-leaf/95 px-3 py-1 text-[11px] font-semibold text-white shadow">In stock</span>
        ) : (
          <span className="absolute right-3 top-3 rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground shadow">Sold out</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground">{flower.name}</h3>
          <span className="text-xs text-muted-foreground">{flower.color}</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-primary">{inr(flower.price)}</span>
          <span className="text-xs text-muted-foreground">{flower.unit}</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/flowers/$slug" params={{ slug: flower.slug }} className="flex-1 rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground transition hover:brightness-110">
            View
          </Link>
          <a href={waLink(msg)} target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-accent px-3 py-2 text-center text-sm font-semibold text-accent-foreground transition hover:brightness-105">
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}