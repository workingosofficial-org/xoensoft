import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { XMark } from "@/components/site/brand";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: seo(
      "About — XOENSOFT",
      "XOENSOFT builds a connected ecosystem of software designed for clarity, quality and calm.",
    ),
  }),
  component: About,
});

const values: [string, string][] = [
  ["Simplicity", "Remove everything that does not help you get the work done."],
  ["Craft", "Every detail — type, spacing, motion — is considered."],
  ["Connection", "Seven products, one design language, one way of working."],
  ["Honesty", "We show what exists today and label what is still coming."],
];

function About() {
  return (
    <>
      <section className="py-28">
        <div className="container-x">
          <XMark className="animate-fade h-10" />
          <h1 className="display animate-rise mt-12 max-w-4xl text-5xl md:text-7xl">
            Software that feels inevitable.
          </h1>
          <p
            className="animate-rise mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: ".15s" }}
          >
            XOENSOFT is building an ecosystem of applications for the essential work of modern life
            — writing code, thinking with AI, meeting, calculating, writing, presenting and getting
            things done. Each one stands on its own. Together they become something more.
          </p>
        </div>
      </section>
      <section className="border-t border-border py-24">
        <div className="container-x grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {values.map(([t, b], i) => (
            <Reveal key={t} delay={i * 60}>
              <div className="h-full bg-background p-10">
                <h2 className="text-2xl font-medium tracking-tight">{t}</h2>
                <p className="mt-3 text-muted-foreground">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
