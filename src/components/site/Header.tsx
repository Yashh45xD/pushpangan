import { Link } from "@tanstack/react-router";
import { SITE, waLink } from "@/lib/site";

const nav = [
  { to: "/", label: "Home", hash: "" },
  { to: "/", label: "Flowers", hash: "#flowers" },
  { to: "/", label: "About", hash: "#about" },
  { to: "/", label: "Contact", hash: "#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-primary">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M12 3c1.7 2.4 1.7 5.6 0 8 1.7-2.4 4.6-3.2 7-1.5-2.4 1.7-3.2 4.6-1.5 7-2.4-1.7-5.6-1.7-8 0 2.4-1.7 3.2-4.6 1.5-7-2.4 1.7-5.3.9-7-1.5 2.4-1.7 5.6-1.7 8 0-1.7-2.4-1.7-5.6 0-8z" fill="currentColor"/></svg>
          </span>
          {SITE.brand}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.label} href={n.hash || "/"} className="text-sm font-medium text-foreground/80 transition hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink("Hi Pushpangan, I would like to enquire about fresh flowers.")} target="_blank" rel="noreferrer" className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition hover:brightness-105 sm:inline-flex">
            WhatsApp Order
          </a>
          <a href="#flowers" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-110">
            Shop
          </a>
        </div>
      </div>
    </header>
  );
}