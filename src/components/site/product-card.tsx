import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductGlyph } from "./icons";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <div className="group relative flex h-full flex-col bg-background p-8 transition-colors duration-500 hover:bg-surface">
      <div className="flex items-start justify-between">
        <ProductGlyph short={product.short} />
        <span className="font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="eyebrow mt-10">{product.domain}</p>
      <h3 className="mt-2 text-2xl font-medium tracking-tight">{product.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>
      <div className="mt-8 flex items-center gap-5 text-sm">
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="inline-flex items-center gap-1.5 after:absolute after:inset-0"
        >
          Explore Product{" "}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          to="/downloads/$slug"
          params={{ slug: product.slug }}
          className="relative z-10 text-muted-foreground hover:text-foreground"
        >
          Download
        </Link>
      </div>
    </div>
  );
}
