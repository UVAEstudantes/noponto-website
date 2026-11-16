import { Download, ArrowUpRight } from "lucide-react";
import downloadAnimation from "react-useanimations/lib/download";
import { AnimatedIcon } from "./AnimatedIcon";
import type { Release } from "./releases";
export function DownloadLink({
  release,
  className = "button",
}: {
  release?: Release;
  className?: string;
}) {
  return (
    <a className={className} href={release?.apk.url || "#download"}>
      <AnimatedIcon
        animation={downloadAnimation}
        interaction="hover"
        size={18}
        fallback={<Download size={18} />}
      />
      Baixar para Android
      <ArrowUpRight size={17} />
    </a>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
