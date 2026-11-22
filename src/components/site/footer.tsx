import { Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { Wordmark } from "./brand";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div>
          <Wordmark className="h-4" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            One ecosystem of connected software for work, communication and productivity.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Products</p>
          <ul className="space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Downloads</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/downloads" className="text-muted-foreground hover:text-foreground">
                Download center
              </Link>
            </li>
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/downloads/$slug"
                  params={{ slug: p.slug }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {p.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Company</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/support" className="text-muted-foreground hover:text-foreground">
                Support
              </Link>
            </li>
            <li>
              <Link to="/sign-in" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-border py-6 text-xs text-muted-foreground md:flex-row">
        <span>© 2026 XOENSOFT. All rights reserved.</span>
        <span className="flex gap-5">
          <Link to="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-foreground">
            Terms of Service
          </Link>
        </span>
        <span className="font-mono">Windows · macOS · Linux · Android · Web</span>
      </div>
    </footer>
  );
}
