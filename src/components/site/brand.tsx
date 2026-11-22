import wordmark from "@/assets/xoensoft_wordmark.png";
import xmark from "@/assets/xoensoft_x.png";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return <img src={wordmark} alt="XOENSOFT" className={cn("h-5 w-auto select-none", className)} draggable={false} />;
}
export function XMark({ className }: { className?: string }) {
  return <img src={xmark} alt="XOENSOFT" className={cn("h-6 w-auto select-none", className)} draggable={false} />;
}
