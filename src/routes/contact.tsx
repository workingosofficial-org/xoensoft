import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/site/reveal";
import { btnPrimary } from "@/components/site/actions";
import { NEW_ISSUE_URL, ISSUES_URL } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seo("Contact — XOENSOFT", "Get in touch with the XOENSOFT team."),
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("General");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: { name?: string; message?: string } = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (message.trim().length < 10) next.message = "Please write at least a short message.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const title = encodeURIComponent(`[${topic}] ${name.trim()}`);
    const body = encodeURIComponent(
      `**From:** ${name.trim()}\n\n${message.trim()}\n\n---\nSent via the XOENSOFT contact form.`,
    );
    window.open(`${NEW_ISSUE_URL}?title=${title}&body=${body}`, "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-md border border-input bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none";

  return (
    <section className="py-24">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="display mt-4 text-5xl md:text-6xl">Talk to us.</h1>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Questions about a product, a download or the ecosystem? Reach the team through the form
            or open an issue directly.
          </p>
          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="eyebrow">GitHub</dt>
              <dd className="mt-2">
                <a
                  href={ISSUES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  Open an issue on GitHub →
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Support</dt>
              <dd className="mt-2 text-muted-foreground">
                Product help and FAQs live on the{" "}
                <a href="/support" className="text-foreground underline-offset-4 hover:underline">
                  support page
                </a>
                .
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={submit}
            noValidate
            className="space-y-5 rounded-lg border border-border bg-surface p-8"
          >
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm text-muted-foreground">
                Name
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-topic" className="mb-2 block text-sm text-muted-foreground">
                Topic
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className={field}
              >
                {[
                  "General",
                  "Product question",
                  "Download or installation",
                  "Bug report",
                  "Partnership",
                  "Press",
                ].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm text-muted-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={field}
                placeholder="How can we help?"
              />
              {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button type="submit" className={btnPrimary}>
              Open GitHub issue
            </button>
            <p className="text-xs text-muted-foreground">
              This opens a pre-filled GitHub issue on the XOENSOFT repository — review and submit it
              there to send your message.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
