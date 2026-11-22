import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct } from "@/data/products";
import { ProductGlyph } from "@/components/site/icons";
import { OpenAppButton, StatusBadge } from "@/components/site/actions";
import { BuildGrid } from "@/components/site/platform-builds";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/downloads/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData && getProduct(loaderData.slug);
    return {
      meta: p
        ? seo(
            `Download ${p.name} — XOENSOFT`,
            `Get ${p.name} ${p.release.version} for every supported platform.`,
          )
        : [{ title: "Download not found | XOENSOFT" }, { name: "robots", content: "noindex" }],
    };
  },
  component: DownloadPage,
});

function DownloadPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const r = p.release;
  return (
    <section className="py-20">
      <div className="container-x">
        <Link to="/downloads" className="text-sm text-muted-foreground hover:text-foreground">
          ← All downloads
        </Link>
        <div className="animate-rise mt-10 flex flex-wrap items-center gap-4">
          <ProductGlyph short={p.short} className="h-14 w-14 text-base" />
          <StatusBadge status={p.status} />
        </div>
        <h1
          className="display animate-rise mt-6 text-5xl md:text-7xl"
          style={{ animationDelay: ".1s" }}
        >
          {p.name}
        </h1>
        <p
          className="animate-rise mt-5 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: ".2s" }}
        >
          {p.description}
        </p>
        <dl
          className="animate-rise mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border"
          style={{ animationDelay: ".3s" }}
        >
          <div className="bg-background p-5">
            <dt className="eyebrow">Latest version</dt>
            <dd className="mt-2 font-mono text-xl">{r.version}</dd>
          </div>
          <div className="bg-background p-5">
            <dt className="eyebrow">Release date</dt>
            <dd className="mt-2 font-mono text-xl">{r.releaseDate ?? "To be announced"}</dd>
          </div>
        </dl>
        <div className="mt-16">
          <p className="eyebrow mb-6">Choose your platform</p>
          <BuildGrid product={p} />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <OpenAppButton product={p} />
          <Link
            to="/products/$slug"
            params={{ slug }}
            className="inline-flex items-center self-center text-sm text-muted-foreground hover:text-foreground"
          >
            About {p.name} →
          </Link>
        </div>
        <div className="mt-20 max-w-2xl border-t border-border pt-10">
          <p className="eyebrow">Release notes · {r.version}</p>
          <ul className="mt-6 space-y-3">
            {r.releaseNotes.map((n) => (
              <li key={n} className="flex gap-3 text-muted-foreground">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-foreground" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
