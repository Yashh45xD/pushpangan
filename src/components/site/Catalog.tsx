import { useMemo, useState } from "react";
import { FLOWERS, CATEGORIES, COLORS, OCCASIONS } from "@/lib/flowers";
import { FlowerCard } from "./FlowerCard";

export function Catalog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [color, setColor] = useState<(typeof COLORS)[number]>("All");
  const [occ, setOcc] = useState<(typeof OCCASIONS)[number]>("All");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [onlyAvail, setOnlyAvail] = useState(true);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return FLOWERS.filter((f) => {
      if (term && !f.name.toLowerCase().includes(term)) return false;
      if (cat !== "All" && f.category !== cat) return false;
      if (color !== "All" && f.color !== color) return false;
      if (occ !== "All" && !f.occasions.includes(occ)) return false;
      if (f.price > maxPrice) return false;
      if (onlyAvail && !f.available) return false;
      return true;
    });
  }, [q, cat, color, occ, maxPrice, onlyAvail]);

  return (
    <div>
      <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm md:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rose, marigold, jasmine…"
              className="mt-1 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
          <Select label="Category" value={cat} onChange={(v) => setCat(v as typeof cat)} options={CATEGORIES} />
          <Select label="Colour" value={color} onChange={(v) => setColor(v as typeof color)} options={COLORS} />
          <Select label="Occasion" value={occ} onChange={(v) => setOcc(v as typeof occ)} options={OCCASIONS} />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Max price · ₹{maxPrice}</span>
            <input
              type="range"
              min={10}
              max={1500}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={onlyAvail} onChange={(e) => setOnlyAvail(e.target.checked)} className="h-4 w-4 accent-primary" />
            Available only
          </label>
        </div>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing <strong className="text-foreground">{filtered.length}</strong> of {FLOWERS.length} flowers
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No flowers match your filters. Try widening your search.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((f) => (
            <FlowerCard key={f.slug} flower={f} />
          ))}
        </div>
      )}
    </div>
  );
}

function Select<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: readonly T[] }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="mt-1 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}