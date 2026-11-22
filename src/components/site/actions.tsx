import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product, ProductStatus } from "@/data/products";
import { statusLabel } from "@/data/products";
import { cn } from "@/lib/utils";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-85 active:scale-[0.98]";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-foreground active:scale-[0.98]";
export const btnDisabled =
  "inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-md border border-dashed border-border px-5 py-2.5 text-sm text-muted-foreground";

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "in-development" ? "bg-muted-foreground" : "bg-foreground",
        )}
      />
      {statusLabel[status]}
    </span>
  );
}

/** Opens the product's own web app; shows an unavailable state when no URL is configured. */
export function OpenAppButton({
  product,
  variant = "primary",
}: {
  product: Product;
  variant?: "primary" | "ghost";
}) {
  const cls = variant === "primary" ? btnPrimary : btnGhost;
  const url = product.webAppUrl;
  if (!url)
    return (
      <span className={btnDisabled} aria-disabled>
        {product.openLabel} · Coming Soon
      </span>
    );
  if (url.startsWith("/"))
    return (
      <a href={url} className={cls}>
        {product.openLabel} <ArrowUpRight className="h-4 w-4" />
      </a>
    );
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cls}>
      {product.openLabel} <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

export function DownloadLink({
  product,
  variant = "ghost",
}: {
  product: Product;
  variant?: "primary" | "ghost";
}) {
  return (
    <Link
      to="/downloads/$slug"
      params={{ slug: product.slug }}
      className={variant === "primary" ? btnPrimary : btnGhost}
    >
      Download
    </Link>
  );
}
