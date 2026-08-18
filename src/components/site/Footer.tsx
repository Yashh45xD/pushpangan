import { SITE } from "@/lib/site";
import { Logo } from "@/components/site/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/80">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <Logo showSubtitle={true} className="items-start" />
          <p className="mt-4 text-sm text-foreground/60">{SITE.address}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Explore</div>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li><a href="/" className="hover:text-accent">Home</a></li>
            <li><a href="#flowers" className="hover:text-accent">Flowers</a></li>
            <li><a href="#about" className="hover:text-accent">About</a></li>
            <li><a href="#contact" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Policies</div>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent">Terms</a></li>
            <li><a href="#" className="hover:text-accent">Refund Policy</a></li>
            <li><a href="#" className="hover:text-accent">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Reach us</div>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li><a href={`tel:${SITE.phone}`} className="hover:text-accent">{SITE.phone}</a></li>
            <li><a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-accent font-semibold text-accent">Instagram: {SITE.instagramHandle}</a></li>
            <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=pushpangan001@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">{SITE.email}</a></li>
            <li className="text-foreground/60">{SITE.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-foreground/60">
        © {new Date().getFullYear()} {SITE.brand}. Grown, cut and delivered with care across Maharashtra.
      </div>
    </footer>
  );
}