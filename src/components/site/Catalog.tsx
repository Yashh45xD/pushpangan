import { useMemo, useState, useEffect } from "react";
import { COLORS, OCCASIONS, type Flower } from "@/lib/flowers";
import { FlowerCard } from "./FlowerCard";
import { productService } from "@/services/productService";

export function Catalog() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [color, setColor] = useState<string>("All");
  const [occ, setOcc] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [onlyAvail, setOnlyAvail] = useState(true);

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
    const interval = setInterval(loadData, 2000);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pushpangan_products_updated", handleUpdate);
      clearInterval(interval);
    };
  }, []);

  const filtered = useMemo(() => {
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
  }, [flowers, q, cat, color, occ, maxPrice, onlyAvail]);

  if (loading) {
    return (
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="animate-pulse rounded-3xl border border-border/60 bg-card p-4 space-y-4">
            <div className="aspect-square w-full rounded-2xl bg-muted" />
            <div className="h-4 w-2/3 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

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
          <Select label="Category" value={cat} onChange={(v) => setCat(v)} options={categories} />
          <Select label="Colour" value={color} onChange={(v) => setColor(v)} options={COLORS} />
          <Select label="Occasion" value={occ} onChange={(v) => setOcc(v)} options={OCCASIONS} />
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
        Showing <strong className="text-foreground">{filtered.length}</strong> of {flowers.length} flowers
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