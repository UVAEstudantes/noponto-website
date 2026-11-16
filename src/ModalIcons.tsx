import type { SVGProps } from "react";
export function MetroIcon({
  size = 30,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 20V11a10 10 0 0 1 20 0v9M7 19l-2 3m12-3 2 3" />
      <rect x="7" y="5" width="10" height="14" rx="3" />
      <path d="M7 11h10m-7 4h.01M14 15h.01" />
    </svg>
  );
}
