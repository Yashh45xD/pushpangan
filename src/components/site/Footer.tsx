import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <div className="font-display text-2xl font-semibold">{SITE.brand}</div>
          <p className="mt-3 text-sm text-primary-foreground/70">{SITE.tagline}</p>
          <p className="mt-4 text-sm text-primary-foreground/60">{SITE.address}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/" className="hover:text-accent">Home</a></li>
            <li><a href="#flowers" className="hover:text-accent">Flowers</a></li>
            <li><a href="#about" className="hover:text-accent">About</a></li>
            <li><a href="#contact" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Policies</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent">Terms</a></li>
            <li><a href="#" className="hover:text-accent">Refund Policy</a></li>
            <li><a href="#" className="hover:text-accent">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Reach us</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={`tel:${SITE.phone}`} className="hover:text-accent">{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a></li>
            <li className="text-primary-foreground/60">{SITE.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-6 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {SITE.brand}. Grown, cut and delivered with care across Maharashtra.
      </div>
    </footer>
  );
}