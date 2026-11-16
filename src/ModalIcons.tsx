import type { SVGProps } from "react";
export function BrtIcon({
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
      <path d="M2 16V7a2 2 0 0 1 2-2h5v11H2Zm10 0V5h8a2 2 0 0 1 2 2v9H12ZM9 7h3m-3 3h3m-3 3h3M3 9h4m8 0h5M2 13h5m8 0h7" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
      <path d="M1 22h22" />
    </svg>
  );
}
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
