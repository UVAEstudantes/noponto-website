import { Download, ArrowUpRight } from "lucide-react";
import downloadAnimation from "react-useanimations/lib/download";
import { AnimatedHover } from "./AnimatedIcon";
import type { Release } from "./releases";
export function DownloadLink({
  release,
  className = "button",
}: {
  release?: Release;
  className?: string;
}) {
  return (
    <AnimatedHover
      animation={downloadAnimation}
      interaction="hover"
      size={18}
      fallback={<Download size={18} />}
    >
      {(icon, eventProps) => (
        <a
          {...eventProps}
          className={className}
          href={release?.apk.url || "#download"}
        >
          {icon}
          Baixar para Android
          <ArrowUpRight size={17} />
        </a>
      )}
    </AnimatedHover>
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
