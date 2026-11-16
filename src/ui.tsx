import { Download, ArrowUpRight } from "lucide-react";
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
      <Download size={18} />
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
