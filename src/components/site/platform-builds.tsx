import { Download, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { isDownloadable, platformLabel, type PlatformBuild, type Product } from "@/data/products";
import { PlatformIcon } from "./icons";
import { btnDisabled, btnPrimary } from "./actions";

export function BuildCard({ build, product }: { build: PlatformBuild; product: Product }) {
  const ready = isDownloadable(build);
  const isWeb = build.platform === "web";
  const external = build.downloadUrl && !build.downloadUrl.startsWith("/");
  return (
    <div className="flex flex-col bg-background p-7 transition-colors duration-500 hover:bg-surface">
      <div className="flex items-center justify-between">
        <PlatformIcon platform={build.platform} className="h-7 w-7" />
        <span
          className={`font-mono text-[10px] uppercase tracking-widest ${ready ? "text-foreground" : "text-muted-foreground"}`}
        >
          {ready ? "Available" : "Coming Soon"}
        </span>
      </div>
      <h3 className="mt-8 text-xl font-medium tracking-tight">{platformLabel[build.platform]}</h3>
      <dl className="mt-4 flex-1 space-y-2 text-sm">
        <Row k={isWeb ? "Type" : "Package"} v={build.packageType} />
        <Row k="Version" v={ready ? product.release.version : "—"} />
        {!isWeb && <Row k="File size" v={ready && build.fileSize ? build.fileSize : "—"} />}
        <Row k="Requires" v={build.minimumRequirements} />
      </dl>
      <div className="mt-7">
        {ready ? (
          <a
            href={build.downloadUrl}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`${btnPrimary} w-full`}
            onClick={() =>
              !isWeb && toast(`Downloading ${product.name} for ${platformLabel[build.platform]}`)
            }
          >
            {isWeb ? (
              <>
                Launch Application <ArrowUpRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />{" "}
                {build.platform === "android" ? "Download APK" : "Download"}
              </>
            )}
          </a>
        ) : (
          <span className={`${btnDisabled} w-full`} aria-disabled>
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
export function BuildGrid({ product }: { product: Product }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {product.release.builds.map((b) => (
        <BuildCard key={b.platform} build={b} product={product} />
      ))}
      {Array.from({ length: (3 - (product.release.builds.length % 3)) % 3 }).map((_, i) => (
        <div key={i} className="hidden bg-background lg:block" />
      ))}
    </div>
  );
}
