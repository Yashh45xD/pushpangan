import { Link } from "@tanstack/react-router";

export function Logo({ className = "", height = "h-12", showSubtitle = true }: { className?: string; height?: string; showSubtitle?: boolean }) {
  return (
    <Link to="/" className={`group inline-flex items-center transition-opacity hover:opacity-90 ${className}`}>
      <div className={`flex items-center gap-3 ${height}`}>
        {/* Flower Symbol matching exact shape: 5 distinct petals + center ring + curved stem */}
        <svg viewBox="0 0 160 160" className="h-full w-auto text-[#b88523]" fill="currentColor">
          {/* Central circle core */}
          <circle cx="80" cy="74" r="6" fill="currentColor" />
          
          {/* Top Petal */}
          <path d="M 80 70 C 66 48 70 20 80 14 C 90 20 94 48 80 70 Z" />
          
          {/* Top Left Petal */}
          <path d="M 76 70 C 52 56 26 44 24 54 C 28 64 56 68 76 70 Z" />
          
          {/* Top Right Petal */}
          <path d="M 84 70 C 108 56 134 44 136 54 C 132 64 104 68 84 70 Z" />
          
          {/* Bottom Left Petal */}
          <path d="M 76 76 C 54 78 28 92 34 100 C 44 104 66 88 76 76 Z" />
          
          {/* Bottom Right Petal */}
          <path d="M 84 76 C 106 78 132 92 126 100 C 116 104 94 88 84 76 Z" />
          
          {/* Curved Stem drop from center */}
          <path d="M 77 78 Q 72 105 68 126 Q 77 110 82 82 Z" />
        </svg>

        {/* Brand Text & Slogan */}
        <div className="flex flex-col justify-center">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#385434] leading-tight">
            Pushpangan
          </span>
          {showSubtitle && (
            <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.18em] text-[#4a5d46] leading-none mt-0.5">
              ROOTED IN SOIL, GROWN WITH LOVE
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function StackedLogo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex flex-col items-center text-center p-4 rounded-xl bg-[#f4f2ea] border border-[#e2dec9] shadow-sm transition-transform hover:scale-[1.02] ${className}`}>
      {/* Flower Symbol */}
      <svg viewBox="0 0 160 160" className="h-16 w-16 text-[#b88523]" fill="currentColor">
        <circle cx="80" cy="74" r="6" fill="currentColor" />
        <path d="M 80 70 C 66 48 70 20 80 14 C 90 20 94 48 80 70 Z" />
        <path d="M 76 70 C 52 56 26 44 24 54 C 28 64 56 68 76 70 Z" />
        <path d="M 84 70 C 108 56 134 44 136 54 C 132 64 104 68 84 70 Z" />
        <path d="M 76 76 C 54 78 28 92 34 100 C 44 104 66 88 76 76 Z" />
        <path d="M 84 76 C 106 78 132 92 126 100 C 116 104 94 88 84 76 Z" />
        <path d="M 77 78 Q 72 105 68 126 Q 77 110 82 82 Z" />
      </svg>
      
      <span className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#385434] leading-tight">
        Pushpangan
      </span>
      
      <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#4a5d46]">
        ROOTED IN SOIL, GROWN WITH LOVE
      </span>
    </Link>
  );
}

export function HorizontalLogo({ className = "" }: { className?: string }) {
  return <Logo className={className} height="h-10" />;
}
