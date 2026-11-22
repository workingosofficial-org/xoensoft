import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: seo("Privacy Policy — XOENSOFT", "How XOENSOFT collects, uses and protects information."),
  }),
  component: Privacy,
});

const sections: [string, string[]][] = [
  [
    "Overview",
    [
      "XOENSOFT builds software products and this website. This policy explains what information we collect, why we collect it and the choices you have.",
      "The marketing website itself does not require an account and does not ask you to create one.",
    ],
  ],
  [
    "Information we collect",
    [
      "Website analytics: we may use privacy-respecting analytics to understand which pages are visited and how the site performs.",
      "Contact and support communications: when you open a GitHub issue or otherwise contact us, we receive the content you submit.",
      "Product data: XOENSOFT applications in beta, such as XS One, may store data locally on your device. XS One currently stores your tasks in your browser's local storage on that device only.",
    ],
  ],
  [
    "How we use information",
    [
      "To operate, maintain and improve the website and our products.",
      "To respond to support requests and feedback you send us.",
      "We do not sell personal information.",
    ],
  ],
  [
    "Cookies and local storage",
    [
      "The website uses browser storage for preferences and, where applicable, an introductory animation that plays once per session.",
      "XS One uses localStorage to persist your tasks on your device until accounts and cloud sync are available.",
    ],
  ],
  [
    "Data retention and security",
    [
      "We keep information only as long as needed for the purposes described above.",
      "We apply reasonable technical and organisational measures to protect information, though no method of transmission or storage is completely secure.",
    ],
  ],
  [
    "Your rights",
    [
      "You may request access to, correction of, or deletion of personal information we hold about you by contacting us through the channels on the contact page.",
      "You can clear locally stored data at any time through your browser settings.",
    ],
  ],
  [
    "Changes to this policy",
    [
      "We may update this policy as the ecosystem grows. The current version is always available on this page.",
    ],
  ],
];

function Privacy() {
  return (
    <section className="py-24">
      <div className="container-x max-w-3xl">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="display mt-4 text-5xl md:text-6xl">Privacy Policy</h1>
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
