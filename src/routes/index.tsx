import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { SITE, waLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
});

const HERO_IMAGE = "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1920&q=80";

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent" /> Wholesale · Retail · Maharashtra
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-primary md:text-6xl">
              Fresh Flowers for<br />Every Celebration
            </h1>
            <p className="mt-5 max-w-xl text-lg text-foreground/75">
              Wholesale & retail supplier of premium fresh flowers across Maharashtra — marigold, rose, jasmine, lotus and more, hand-picked at dawn and delivered with trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#flowers" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110">
                Shop Flowers
              </a>
              <a href={waLink("Hi Pushpangan, I'd like to place a fresh flower order.")} target="_blank" rel="noreferrer" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:brightness-105">
                Contact on WhatsApp
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
              {[
                { k: "22+", v: "Flower varieties" },
                { k: "5 AM", v: "Daily harvest" },
                { k: "Same day", v: "Delivery" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border/60 bg-background/70 px-3 py-4 backdrop-blur">
                  <dt className="font-display text-2xl font-semibold text-primary">{s.k}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-border/60 shadow-2xl">
              <img src={HERO_IMAGE} alt="Fresh flowers arranged at the Pushpangan wholesale market" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl border border-border/60 bg-card p-4 shadow-xl md:block">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">Freshness</div>
              <div className="mt-1 text-sm text-foreground">Hand-picked before sunrise, cold-chain stored, at your door within hours.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="border-y border-border/60 bg-secondary/60">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6 md:px-8">
          {["Marigold", "Rose", "Jasmine", "Lotus", "Orchid", "Gerbera", "Tuberose"].map((c) => (
            <a key={c} href="#flowers" className="text-sm font-medium text-primary/80 transition hover:text-accent">
              {c}
            </a>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="flowers" className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Flowers</span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-primary md:text-4xl">Browse every bloom in stock today</h2>
          <p className="mt-3 text-foreground/70">Search, filter and request a quote — or tap WhatsApp for instant order.</p>
        </div>
        <div className="mt-10">
          <Catalog />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center md:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Story</span>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Trusted by temples, weddings and businesses across Maharashtra.</h2>
            <p className="mt-4 text-primary-foreground/80">
              {SITE.brand} is a family-run flower supplier working directly with growers so that every stem, garland and basket reaches you at peak freshness — at honest wholesale rates.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { h: "Freshness guarantee", p: "Hand-picked at dawn, cold-chain stored." },
                { h: "Wholesale pricing", p: "Direct from grower — no middlemen." },
                { h: "Fast delivery", p: "Same-day in Pune, next-day across MH." },
                { h: "Quality assurance", p: "Every consignment inspected by hand." },
              ].map((f) => (
                <li key={f.h} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                  <div className="font-display text-lg font-semibold text-accent">{f.h}</div>
                  <p className="mt-1 text-sm text-primary-foreground/75">{f.p}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://source.unsplash.com/featured/600x700/?marigold,garland" alt="Marigold garlands" className="aspect-[4/5] w-full rounded-3xl object-cover" loading="lazy" />
            <img src="https://source.unsplash.com/featured/600x700/?rose,farm" alt="Rose farm" className="mt-8 aspect-[4/5] w-full rounded-3xl object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-10 rounded-3xl border border-border/60 bg-card p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Get in touch</span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-primary md:text-4xl">Place an enquiry — we usually reply within an hour.</h2>
            <p className="mt-3 text-foreground/70">Bulk orders, weddings, temple events, corporate décor and daily subscriptions — we handle it all.</p>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">Phone</dt><dd><a href={`tel:${SITE.phone}`} className="hover:text-accent">{SITE.phone}</a></dd></div>
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">WhatsApp</dt><dd><a href={waLink("Hi Pushpangan!")} target="_blank" rel="noreferrer" className="hover:text-accent">{SITE.phone}</a></dd></div>
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">Email</dt><dd><a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a></dd></div>
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">Address</dt><dd className="text-foreground/70">{SITE.address}</dd></div>
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">Hours</dt><dd className="text-foreground/70">{SITE.hours}</dd></div>
            </dl>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const msg = `New enquiry from ${fd.get("name")} (${fd.get("phone")}):\n\n${fd.get("message")}`;
              window.open(waLink(msg), "_blank");
            }}
          >
            <Field name="name" label="Your name" placeholder="Aarav Sharma" required />
            <Field name="phone" label="Phone" placeholder="+91 …" required />
            <Field name="email" label="Email" type="email" placeholder="you@example.com" />
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What do you need?</span>
              <textarea name="message" required rows={4} className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Type of flowers, quantity, delivery date & location…" />
            </label>
            <button className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110">
              Send enquiry on WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} className="mt-1 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
    </label>
  );
}
