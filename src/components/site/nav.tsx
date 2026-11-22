import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { Wordmark } from "./brand";
import { ProductGlyph } from "./icons";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { to: "/", l: "Home" },
  { to: "/downloads", l: "Downloads" },
  { to: "/about", l: "About" },
  { to: "/contact", l: "Contact" },
  { to: "/support", l: "Support" },
  { to: "/sign-in", l: "Sign In" },
] as const;
const navLink = "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-500",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" aria-label="XOENSOFT home" className="shrink-0">
          <Wordmark className="h-[18px]" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" onMouseLeave={() => setOpen(false)}>
          <Link
            to="/"
            className={navLink}
            activeProps={{ className: "text-foreground" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <div className="relative" onMouseEnter={() => setOpen(true)}>
            <button
              className={cn(navLink, "flex items-center gap-1")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              Products{" "}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
              />
            </button>
            <div
              className={cn(
                "absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-4 transition-all duration-300",
                open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
              )}
            >
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-surface p-2 shadow-2xl">
                {products.map((p) => (
                  <Link
                    key={p.slug}
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-elevated"
                  >
                    <ProductGlyph short={p.short} className="h-9 w-9 text-xs" />
                    <span>
                      <span className="block text-sm text-foreground">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">{p.domain}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/downloads" className={navLink} activeProps={{ className: "text-foreground" }}>
            Downloads
          </Link>
          <Link to="/about" className={navLink} activeProps={{ className: "text-foreground" }}>
            About
          </Link>
          <Link to="/contact" className={navLink} activeProps={{ className: "text-foreground" }}>
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/support" className={navLink}>
            Support
          </Link>
          <Link
            to="/sign-in"
            className="rounded-md border border-border px-4 py-1.5 text-sm transition-colors hover:border-foreground"
          >
            Sign In
          </Link>
        </div>

        <button className="md:hidden" aria-label="Menu" onClick={() => setMobile((v) => !v)}>
          {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobile && (
        <div className="animate-fade border-t border-border bg-background md:hidden">
          <div className="container-x flex flex-col gap-1 py-6">
            {mobileLinks.map(({ to, l }) => (
              <Link key={to} to={to} onClick={() => setMobile(false)} className="py-2 text-lg">
                {l}
              </Link>
            ))}
            <p className="eyebrow mt-4 mb-2">Products</p>
            {products.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                onClick={() => setMobile(false)}
                className="py-1.5 text-muted-foreground"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
