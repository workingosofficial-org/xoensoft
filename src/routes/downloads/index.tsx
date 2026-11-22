import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products, isDownloadable, platformLabel } from "@/data/products";
import { ProductGlyph, PlatformIcon } from "@/components/site/icons";
import { Reveal } from "@/components/site/reveal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/downloads/")({
  head: () => ({
    meta: seo(
      "Downloads — XOENSOFT",
      "Download XOENSOFT applications for Windows, macOS, Linux, Android and the web.",
    ),
  }),
  component: Downloads,
});

function Downloads() {
  return (
    <section className="py-24">
      <div className="container-x">
        <p className="eyebrow animate-rise">Download center</p>
        <h1
          className="display animate-rise mt-4 text-5xl md:text-7xl"
          style={{ animationDelay: ".1s" }}
        >
          Downloads.
        </h1>
        <p
          className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: ".2s" }}
        >
          Choose a product to see its latest version, supported platforms and release notes. Builds
          not yet published are marked Coming Soon.
        </p>
        <div className="mt-16 divide-y divide-border border-y border-border">
          {products.map((p, i) => {
            const ready = p.release.builds.filter(isDownloadable).length;
            return (
              <Reveal key={p.slug} delay={i * 40}>
                <Link
                  to="/downloads/$slug"
                  params={{ slug: p.slug }}
                  className="group grid items-center gap-4 py-7 md:grid-cols-[2fr_1fr_1.4fr_auto]"
                >
                  <span className="flex items-center gap-4">
                    <ProductGlyph short={p.short} />
                    <span>
                      <span className="block text-lg">{p.name}</span>
                      <span className="block text-sm text-muted-foreground">{p.category}</span>
                    </span>
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">
                    v{p.release.version}
                  </span>
                  <span className="flex gap-3">
                    {p.release.builds.map((b) => (
                      <span
                        key={b.platform}
                        title={`${platformLabel[b.platform]} — ${isDownloadable(b) ? "available" : "coming soon"}`}
                        className={
                          isDownloadable(b) ? "text-foreground" : "text-muted-foreground/40"
                        }
                      >
                        <PlatformIcon platform={b.platform} className="h-5 w-5" />
                      </span>
                    ))}
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    {ready ? `${ready} available` : "Coming Soon"}{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
