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
      <path d="M2.5 16V7.5A2.5 2.5 0 0 1 5 5h14a2.5 2.5 0 0 1 2.5 2.5V16h-19Z" />
      <path d="M4.5 8.3h4.8v3.4H4.5zm9.7 0h4.8v3.4h-4.8z" fill="currentColor" stroke="none" />
      <path d="M10 6v8.5m1.8-8.5v8.5" />
      <circle cx="6.5" cy="17.5" r="2" />
      <circle cx="17.5" cy="17.5" r="2" />
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
