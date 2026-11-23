import {
  Video,
  Zap,
  ShieldCheck,
  ScreenShare,
  PenTool,
  MessageSquare,
  Users,
  Crown,
  PenLine,
  Folder,
  FileText,
  Download,
  Building2,
  Save,
  Lock,
} from "lucide-react";
import type { FeatureIcon, Platform } from "@/data/products";

export function PlatformIcon({
  platform,
  className = "h-6 w-6",
}: {
  platform: Platform;
  className?: string;
}) {
  const p = { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
  switch (platform) {
    case "windows":
      return (
        <svg {...p}>
          <path d="M3 5.5 10.5 4.5v7H3zM11.5 4.3 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.3z" />
        </svg>
      );
    case "macos":
      return (
        <svg {...p}>
          <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9c-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.2 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.8-1-2.8-4.2zM14 5.3c.7-.8 1.2-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
        </svg>
      );
    case "linux":
      return (
        <svg {...p}>
          <path d="M12 2c-2.2 0-3.4 1.9-3.4 4.3 0 1.3.3 2.2-.4 3.4C7 11.6 5.5 13.6 5.5 16c0 .7.1 1.3.4 1.9-.8.3-1.6.8-1.4 1.6.3 1 2.3.8 3.4 1.6 1 .7 2.6.9 3.3-.2h1.6c.7 1.1 2.3.9 3.3.2 1.1-.8 3.1-.6 3.4-1.6.2-.8-.6-1.3-1.4-1.6.3-.6.4-1.2.4-1.9 0-2.4-1.5-4.4-2.7-6.3-.7-1.2-.4-2.1-.4-3.4C15.4 3.9 14.2 2 12 2zm-1.6 4.2c.4 0 .7.5.7 1.1s-.3 1.1-.7 1.1-.7-.5-.7-1.1.3-1.1.7-1.1zm3.2 0c.4 0 .7.5.7 1.1s-.3 1.1-.7 1.1-.7-.5-.7-1.1.3-1.1.7-1.1zM12 9.3c.9 0 2 .6 2 1s-1.1 1-2 1-2-.6-2-1 1.1-1 2-1z" />
        </svg>
      );
    case "android":
      return (
        <svg {...p}>
          <path d="M17.6 9.5 19.4 6.4a.4.4 0 0 0-.7-.4l-1.8 3.2A11 11 0 0 0 12 8.2c-1.8 0-3.4.4-4.9 1L5.3 6a.4.4 0 0 0-.7.4l1.8 3.1A9.8 9.8 0 0 0 1.5 17.5h21a9.8 9.8 0 0 0-4.9-8zM7.5 14.6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
      );
    case "web":
      return (
        <svg {...p} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
      );
  }
}

const featureIcons: Record<FeatureIcon, typeof Video> = {
  video: Video,
  zap: Zap,
  shield: ShieldCheck,
  screen: ScreenShare,
  pen: PenTool,
  chat: MessageSquare,
  users: Users,
  crown: Crown,
  penline: PenLine,
  folder: Folder,
  file: FileText,
  download: Download,
  building: Building2,
  save: Save,
  lock: Lock,
};

export function FeatureGlyph({
  icon,
  className = "h-5 w-5",
}: {
  icon: FeatureIcon;
  className?: string;
}) {
  const C = featureIcons[icon];
  return <C className={className} aria-hidden />;
}

/** Monogram tile used as each product's icon. */
export function ProductGlyph({
  short,
  className = "h-11 w-11 text-sm",
}: {
  short: string;
  className?: string;
}) {
  const letters = short === "XS One" ? "1" : short.slice(0, 2);
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-elevated font-mono font-medium tracking-tight text-foreground ${className}`}
    >
      {letters}
    </span>
  );
}
