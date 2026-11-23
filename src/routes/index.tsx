import { createFileRoute, Link } from "@tanstack/react-router";
import { products, getProduct, type Platform, platformLabel } from "@/data/products";
import { Wordmark } from "@/components/site/brand";
import { Intro } from "@/components/site/intro";
import { Reveal } from "@/components/site/reveal";
import { ProductCard } from "@/components/site/product-card";
import { FeatureGlyph, PlatformIcon } from "@/components/site/icons";
import { btnGhost, btnPrimary } from "@/components/site/actions";
import { seo } from "@/lib/seo";
import xsMeetLogo from "@/assets/xs-meet-logo.png";
import xsMeetShot from "@/assets/xs-meet-shot-room.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo(
      "XOENSOFT — Everything You Need. One Ecosystem.",
      "Seven connected applications for development, intelligence, communication, data, documents, creativity and productivity.",
    ),
  }),
  component: Home,
});

const platforms: Platform[] = ["windows", "macos", "linux", "android", "web"];

function Home() {
  return (
    <>
      <Intro />
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
        <div className="hairline-grid fade-mask absolute inset-0" aria-hidden />
        <div className="container-x relative py-24">
          <div className="animate-rise" style={{ animationDelay: "0.1s" }}>
            <Wordmark className="h-6 opacity-70" />
          </div>
          <h1
            className="display animate-rise mt-10 text-6xl md:text-8xl lg:text-[8.5rem]"
            style={{ animationDelay: "0.2s" }}
          >
            Everything You Need.
            <br />
            <span className="text-muted-foreground">One Ecosystem.</span>
          </h1>
          <p
            className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "0.35s" }}
          >
            Discover a connected world of intelligent software, designed to make work simpler,
            communication smarter, and productivity more powerful.
          </p>
          <div
            className="animate-rise mt-10 flex flex-wrap gap-3"
            style={{ animationDelay: "0.5s" }}
          >
            <a href="#ecosystem" className={btnPrimary}>
              Explore the Ecosystem
            </a>
            <a href="#products" className={btnGhost}>
              Discover Our Products
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="border-t border-border py-28">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">The products</p>
            <h2 className="display mt-4 max-w-3xl text-4xl md:text-6xl">
              One Brand. Seven Powerful Experiences.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
            <Reveal className="hidden lg:block lg:col-span-2">
              <div className="flex h-full flex-col justify-end bg-background p-8">
                <p className="eyebrow">More to come</p>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Every product shares one account, one design language and one way of working.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MeetSpotlight />

      <section id="ecosystem" className="border-t border-border py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Ecosystem</p>
            <h2 className="display mt-4 text-4xl md:text-6xl">Designed to Work Together.</h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Write code in CodeDesk, ask OverMind to explain it, discuss it in Meet, track the
              numbers in Sheets, document it in Writer, present it in Presentation — and keep every
              task moving in XS One.
            </p>
          </Reveal>
          <div className="divide-y divide-border border-y border-border">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 50}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group flex items-center justify-between py-5"
                >
                  <span className="text-lg transition-transform duration-500 group-hover:translate-x-2">
                    {p.name}
                  </span>
                  <span className="flex items-center gap-4 text-muted-foreground">
                    <span className="h-px w-8 bg-border transition-all duration-500 group-hover:w-16 group-hover:bg-foreground" />
                    {p.domain}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-28">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Cross-platform</p>
            <h2 className="display mt-4 text-4xl md:text-6xl">Your Platform. Your Choice.</h2>
            <p className="mt-6 max-w-xl text-muted-foreground">
              XOENSOFT is built for every device you use. Availability differs by product — each
              download page lists exactly what is ready today.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
            {platforms.map((pl, i) => (
              <Reveal key={pl} delay={i * 60}>
                <div className="flex flex-col items-start gap-8 bg-surface p-8">
                  <PlatformIcon platform={pl} className="h-7 w-7" />
                  <span className="text-lg">{platformLabel[pl]}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-32">
        <Reveal className="container-x text-center">
          <h2 className="display mx-auto max-w-4xl text-5xl md:text-7xl">
            Step Into the XOENSOFT Ecosystem.
          </h2>
          <a href="#products" className={`${btnPrimary} mt-10`}>
            Explore All Products
          </a>
        </Reveal>
      </section>
    </>
  );
}

const meet = getProduct("xs-meet")!;
const meetHighlights = meet.sections.slice(0, 4);

function MeetSpotlight() {
  return (
    <section className="border-t border-border bg-surface py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <img src={xsMeetLogo} alt="XS Meet" className="h-8 w-auto" />
          <p className="eyebrow mt-10">Introducing</p>
          <h2 className="display mt-4 text-4xl md:text-6xl">XS Meet</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            A smarter way to meet, communicate, and collaborate — real-time video, audio, screen
            sharing and an interactive whiteboard in one platform.
          </p>
          <ul className="mt-8 space-y-3">
            {meetHighlights.map((f) => (
              <li key={f.title} className="flex items-start gap-3 text-sm">
                {f.icon && <FeatureGlyph icon={f.icon} className="mt-0.5 h-4 w-4 shrink-0" />}
                <span>
                  <span className="text-foreground">{f.title}</span>
                  <span className="text-muted-foreground"> — {f.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/products/$slug" params={{ slug: "xs-meet" }} className={btnGhost}>
              Explore XS Meet
            </Link>
            <a
              href={meet.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
            >
              Launch XS Meet
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="ml-3 font-mono text-[11px] text-muted-foreground">
                xsmeet-xoensoft-official.pages.dev
              </span>
            </div>
            <img
              src={xsMeetShot}
              alt="XS Meet meeting room interface"
              className="w-full"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
