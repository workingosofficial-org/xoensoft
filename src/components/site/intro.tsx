import { useEffect, useState } from "react";
import { Wordmark, XMark } from "./brand";

/** Short logo intro: X fades in, then the wordmark, then the page. Plays once per session. */
export function Intro() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("xs-intro")) {
      setHide(true);
      return;
    }
    sessionStorage.setItem("xs-intro", "1");
    const t = setTimeout(() => setHide(true), 2300);
    return () => clearTimeout(t);
  }, []);
  if (hide) return null;
  return (
    <div
      className="intro pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background"
      aria-hidden
    >
      <XMark className="intro-x absolute h-16" />
      <Wordmark className="intro-word absolute h-8" />
    </div>
  );
}
