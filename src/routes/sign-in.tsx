import { createFileRoute } from "@tanstack/react-router";
import { XMark } from "@/components/site/brand";
import { btnDisabled } from "@/components/site/actions";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sign-in")({
  head: () => ({ meta: seo("Sign In — XOENSOFT", "Sign in to your XOENSOFT account.") }),
  component: SignIn,
});

// Integration point for future XOENSOFT accounts; no authentication is connected yet.
function SignIn() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <div className="mx-auto w-full max-w-sm px-6 text-center">
        <XMark className="mx-auto h-8" />
        <h1 className="mt-10 text-3xl font-medium tracking-tight">Sign in to XOENSOFT</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          XOENSOFT accounts are launching soon. One account will work across every product.
        </p>
        <div className="mt-8 space-y-3 text-left">
          <input
            disabled
            placeholder="Email"
            className="w-full rounded-md border border-input bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground"
          />
          <span className={`${btnDisabled} w-full`}>Accounts coming soon</span>
        </div>
      </div>
    </section>
  );
}
