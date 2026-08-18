import { createFileRoute, Link } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { SITE, waLink } from "@/lib/site";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  component: Home,
});

const GANPATI_HERO_IMAGE = "https://res.cloudinary.com/r1o7fosa/image/upload/v1784737738/a02ef13e-4e9f-4fce-a726-91614f72baf4.png";

function Home() {
  return (
    <>
      {/* HERO SECTION WITH GANPATI BAPPA */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:px-8 md:py-20">
          {/* Left Text */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur">
              🌺 Ganesh Chaturthi Grand Special
            </span>

            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary md:text-6xl">
              Welcome Bappa<br />with Freshness!
            </h1>

            <p className="font-display text-xl md:text-2xl font-bold text-accent italic">
              "Freshness For the Vighnaharta ,delivered"
            </p>

            <p className="max-w-lg text-base text-foreground/80 leading-relaxed">
              Hand-picked before sunrise from growers across Maharashtra. Pre-book your 10-day daily pooja flowers, 21-red hibiscus sets, lotus, durva & marigolds for Bappa's grand Aagman.
            </p>

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Shop All Flowers & Add to Basket</span>
                <span>→</span>
              </Link>
            </div>

            <div className="pt-2 text-xs font-semibold text-foreground/60 uppercase tracking-widest">
              ROOTED IN SOIL, GROWN WITH LOVE
            </div>
          </div>

          {/* Right Image Card */}
          <div className="relative flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border/80 shadow-2xl bg-card">
              <img
                src={GANPATI_HERO_IMAGE}
                alt="Fresh marigolds and flowers for Ganpati Bappa"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground">
                  Dawn Plucked Quality
                </span>
                <h2 className="font-display text-xl font-bold text-white">100% Sunrise Fresh Blooms</h2>
                <p className="text-xs text-white/80">Direct from farm to your Bappa Sthapana mandap.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FESTIVAL FLOWER HIGHLIGHTS */}
      <section className="bg-card border-y border-border/80 py-12 px-4 md:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Festival Essentials</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary">Special Blooms for Bappa's Pooja</h2>
            </div>
            <Link to="/shop" className="text-xs font-bold text-primary hover:underline">
              View All Flowers in Shop →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Orange Marigold Garland",
                subtitle: "Dawn Picked Fresh Marigold",
                price: "₹120 / kg",
                img: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png",
              },
              {
                title: "Red Hibiscus Set",
                subtitle: "21 Sacred Plucked Blooms",
                price: "₹15 / piece",
                img: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png",
              },
              {
                title: "Lotus Stems for Sthapana",
                subtitle: "Pink Sacred Altar Bloom",
                price: "₹40 / piece",
                img: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
              },
              {
                title: "Rose Petals Shower Pack",
                subtitle: "Fragrant Welcome & Rangoli",
                price: "₹400 / kg",
                img: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png",
              },
            ].map((item) => (
              <div key={item.title} className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-background p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="mt-3 space-y-1">
                    <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition">{item.title}</h3>
                    <p className="text-xs text-foreground/70">{item.subtitle}</p>
                  </div>
                </div>
                <div className="mt-4 pt-2 flex items-center justify-between border-t border-border/50">
                  <span className="font-display text-sm font-bold text-primary">{item.price}</span>
                  <Link to="/shop" className="text-xs font-bold text-accent hover:underline">
                    Add in Shop →
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
      <section id="about" className="relative overflow-hidden bg-secondary/80">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center md:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Story</span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-primary md:text-4xl">Trusted by temples, weddings and businesses across Maharashtra.</h2>
            <p className="mt-4 text-foreground/80">
              {SITE.brand} is a family-run flower supplier working directly with growers so that every stem, garland and basket reaches you at peak freshness — at honest wholesale rates.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { h: "Freshness guarantee", p: "Hand-picked at dawn, cold-chain stored." },
                { h: "Wholesale pricing", p: "Direct from grower — no middlemen." },
                { h: "Express delivery", p: "Delivered as early as possible on priority." },
                { h: "Quality assurance", p: "Every consignment inspected by hand." },
              ].map((f) => (
                <li key={f.h} className="rounded-2xl border border-border/60 bg-card/80 p-4">
                  <div className="font-display text-lg font-semibold text-accent">{f.h}</div>
                  <p className="mt-1 text-sm text-foreground/75">{f.p}</p>
                </li>
              ))}
            </ul>
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
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">WhatsApp</dt><dd><a href={waLink("Hi Pushpangan!")} target="_blank" rel="noreferrer" className="hover:text-accent">+91 83694 07007</a></dd></div>
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">Instagram</dt><dd><a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-accent font-medium text-accent">{SITE.instagramHandle}</a></dd></div>
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">Email</dt><dd><a href="https://mail.google.com/mail/?view=cm&fs=1&to=pushpangan001@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent font-medium text-accent">{SITE.email}</a></dd></div>
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">Address</dt><dd className="text-foreground/70">{SITE.address}</dd></div>
              <div className="flex items-center gap-3"><dt className="w-24 font-semibold text-primary">Hours</dt><dd className="text-foreground/70">{SITE.hours}</dd></div>
            </dl>
          </div>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
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
                  status: "unread",
                });
              } catch (err) {
                console.warn("Could not save contact message to Supabase:", err);
              }

              const msg = `New enquiry from ${name} (${phone}):\n\n${message}`;
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
