import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products, platformLabel } from "@/data/products";
import { ProductPreview } from "@/components/site/previews";
import { Reveal } from "@/components/site/reveal";
import { FeatureGlyph, PlatformIcon } from "@/components/site/icons";
import { DownloadLink, OpenAppButton, StatusBadge, btnPrimary } from "@/components/site/actions";
import { ProductCard } from "@/components/site/product-card";
import { BuildGrid } from "@/components/site/platform-builds";
import { seo } from "@/lib/seo";
import shotRoom from "@/assets/xs-meet-shot-room.png";
import shotLanding from "@/assets/xs-meet-shot-landing.png";
import shotWriterEditor from "@/assets/xs-writer-shot-editor.png";

const screenshots = { room: shotRoom, landing: shotLanding, editor: shotWriterEditor } as const;

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData && getProduct(loaderData.slug);
    if (!p) {
      return {
        meta: [{ title: "Product not found | XOENSOFT" }, { name: "robots", content: "noindex" }],
      };
    }
    if (p.slug === "xs-meet") {
      return {
        meta: seo(
          "XS Meet — Online Meetings & Collaboration | XOENSOFT",
          "Discover XS Meet by XOENSOFT, a modern online meeting platform featuring video meetings, screen sharing, interactive whiteboards, and real-time collaboration.",
        ),
        links: [{ rel: "canonical", href: "https://xoensoftofficial.pages.dev/products/xs-meet" }],
      };
    }
    if (p.slug === "xs-writer") {
      return {
        meta: seo(
          "XS Writer — Document Creation & Editing | XOENSOFT",
          "Discover XS Writer by XOENSOFT, a professional document creation and editing platform featuring rich-text editing, document organization, collaboration, DOCX compatibility and multiple export formats.",
        ),
        links: [
          { rel: "canonical", href: "https://xoensoftofficial.pages.dev/products/xs-writer" },
        ],
      };
    }
    return {
      meta: seo(`${p.name} — ${p.tagline} | XOENSOFT`, p.description),
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const related = products.filter((x) => x.slug !== slug).slice(0, 3);
  const shot = p.screenshot ? screenshots[p.screenshot] : undefined;
  const shotHost =
    p.webAppUrl && p.webAppUrl.startsWith("http") ? new URL(p.webAppUrl).host : undefined;
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28">
        <div className="hairline-grid fade-mask absolute inset-0" aria-hidden />
        <div className="container-x relative">
          <div className="animate-rise flex items-center gap-4">
            <StatusBadge status={p.status} />
          </div>
          <p className="eyebrow animate-rise mt-10" style={{ animationDelay: ".1s" }}>
            {p.name} · {p.category}
          </p>
          <h1
            className="display animate-rise mt-4 max-w-4xl text-5xl md:text-7xl"
            style={{ animationDelay: ".2s" }}
          >
            {p.heroHeadline ?? p.tagline}
          </h1>
          <p
            className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground"
            style={{ animationDelay: ".3s" }}
          >
            {p.heroDescription ?? p.description}
          </p>
          <div
            className="animate-rise mt-10 flex flex-wrap gap-3"
            style={{ animationDelay: ".4s" }}
          >
            <OpenAppButton product={p} />
            {p.screenshot ? (
              <a
                href="#features"
                className="self-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Explore Features
              </a>
            ) : (
              <DownloadLink product={p} />
            )}
          </div>
          <Reveal className="mt-20">
            {shot ? (
              <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="ml-3 font-mono text-[11px] text-muted-foreground">
                    {shotHost ?? "xoensoftofficial.pages.dev"}
                  </span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Live application
                  </span>
                </div>
                <img
                  src={shot}
                  alt={`${p.name} application screenshot`}
                  className="w-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <ProductPreview product={p} />
            )}
          </Reveal>
        </div>
      </section>

      <section id="features" className="border-t border-border py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Key capabilities</p>
            <h2 className="display mt-4 max-w-2xl text-4xl md:text-5xl">
              Built for the way you work.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {p.sections.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 60}>
                <div className="flex h-full flex-col bg-background p-8 transition-colors duration-500 hover:bg-surface">
                  {f.icon ? (
                    <FeatureGlyph icon={f.icon} className="h-6 w-6 text-foreground" />
                  ) : (
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <h3 className="mt-6 text-lg font-medium tracking-tight">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {p.howItWorks && (
        <section className="border-t border-border bg-surface py-24">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2 className="display mt-4 max-w-2xl text-4xl md:text-5xl">
                Up and running in three steps.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
              {p.howItWorks.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="h-full bg-surface p-10">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 text-2xl font-medium tracking-tight">{s.title}</h3>
                    <p className="mt-3 text-muted-foreground">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface py-24">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Use cases</p>
            <h2 className="display mt-4 text-4xl">Where {p.short} fits.</h2>
          </Reveal>
          <ul className="divide-y divide-border border-y border-border">
            {p.useCases.map((u) => (
              <li key={u} className="py-5 text-lg">
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-24">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Platform availability</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">Get {p.short}.</h2>
              <p className="mt-4 text-muted-foreground">
                Version {p.release.version} ·{" "}
                {p.release.status === "planned" ? "in development" : p.release.status}
              </p>
            </div>
            <div className="flex gap-4 text-muted-foreground">
              {p.release.builds.map((b) => (
                <span key={b.platform} title={platformLabel[b.platform]}>
                  <PlatformIcon platform={b.platform} className="h-5 w-5" />
                </span>
              ))}
            </div>
          </Reveal>
          <div className="mt-12">
            <BuildGrid product={p} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <OpenAppButton product={p} />
            <Link
              to="/downloads/$slug"
              params={{ slug }}
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline self-center"
            >
              Release notes & full download page
            </Link>
          </div>
        </div>
      </section>

      {p.finalCta && p.webAppUrl && (
        <section className="border-t border-border py-32">
          <Reveal className="container-x text-center">
            <h2 className="display mx-auto max-w-4xl text-5xl md:text-7xl">{p.finalCta.heading}</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{p.finalCta.body}</p>
            <a
              href={p.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimary} mt-10`}
            >
              {p.launchLabel ?? p.openLabel}
            </a>
          </Reveal>
        </section>
      )}

      <section className="border-t border-border py-24">
        <div className="container-x">
          <p className="eyebrow">Related products</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.slug} product={r} index={products.indexOf(r)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
