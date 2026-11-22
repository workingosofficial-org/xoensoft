import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: seo(
      "Terms of Service — XOENSOFT",
      "The terms that govern use of XOENSOFT products and this website.",
    ),
  }),
  component: Terms,
});

const sections: [string, string[]][] = [
  [
    "Acceptance",
    [
      "By accessing this website or using any XOENSOFT product, you agree to these terms. If you do not agree, please do not use the products.",
    ],
  ],
  [
    "The products",
    [
      'XOENSOFT products are provided "as is" and "as available". Several products are currently in development or public beta; features, availability and platform support may change.',
      "Download buttons appear only when a build has actually been published. Where a product or platform is marked Coming Soon, no download is currently offered.",
    ],
  ],
  [
    "Accounts",
    [
      "XOENSOFT accounts are not yet available. When they launch, additional account terms may apply.",
    ],
  ],
  [
    "Acceptable use",
    [
      "You agree not to misuse the website or products, including attempting to disrupt the service, reverse engineer except where permitted by law, or use the products for unlawful purposes.",
    ],
  ],
  [
    "Intellectual property",
    [
      "The XOENSOFT name, logo, product names and website content are the property of XOENSOFT. You may not use them without permission.",
    ],
  ],
  [
    "Third-party services",
    [
      "Some product features may rely on third-party services (for example, Google sign-in in mobile applications). Your use of those services is subject to their own terms and privacy policies.",
    ],
  ],
  [
    "Limitation of liability",
    [
      "To the maximum extent permitted by law, XOENSOFT is not liable for indirect or consequential damages arising from use of the website or products.",
    ],
  ],
  [
    "Changes",
    [
      "We may revise these terms as the ecosystem evolves. Continued use after changes constitutes acceptance of the revised terms.",
    ],
  ],
];

function Terms() {
  return (
    <section className="py-24">
      <div className="container-x max-w-3xl">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="display mt-4 text-5xl md:text-6xl">Terms of Service</h1>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            Last updated: November 2026
          </p>
        </Reveal>
        <div className="mt-14 space-y-12">
          {sections.map(([title, paras], i) => (
            <Reveal key={title} delay={Math.min(i * 40, 200)}>
              <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
              <div className="mt-4 space-y-4">
                {paras.map((p) => (
                  <p key={p.slice(0, 32)} className="leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
