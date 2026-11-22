import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { products } from "@/data/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: seo("Support — XOENSOFT", "Help with XOENSOFT products, downloads and accounts."),
  }),
  component: Support,
});

const faqs: [string, string][] = [
  [
    "Which products can I use today?",
    "XS One is available as a web app in public beta. The other products are in development; their pages show their current status.",
  ],
  [
    "Why does a download say Coming Soon?",
    "We only show a download button when a real installer has been published for that platform. Until then, it is marked Coming Soon.",
  ],
  [
    "Will I need one account for every product?",
    "One XOENSOFT account will work across the whole ecosystem.",
  ],
  [
    "Which platforms are supported?",
    "Each product lists its supported platforms on its download page — Windows, macOS, Linux, Android and Web, depending on the product.",
  ],
];

function Support() {
  return (
    <section className="py-24">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Support</p>
          <h1 className="display mt-4 text-5xl md:text-6xl">How can we help?</h1>
          <p className="mt-6 text-muted-foreground">
            Browse common questions, or jump to a product.
          </p>
          <ul className="mt-10 space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {p.name} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="py-6 text-left text-lg font-normal hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
