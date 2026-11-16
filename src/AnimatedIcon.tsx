import { useSyncExternalStore, type ReactNode } from "react";
import UseAnimations, {
  type UseAnimationsProps,
} from "react-useanimations";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => observer.disconnect();
}

function isReduced() {
  return document.documentElement.dataset.motion === "reduce";
}

export function AnimatedIcon({
  fallback,
  className = "",
  ...props
}: UseAnimationsProps & { fallback: ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, isReduced, () => false);
  if (reduced) {
    return (
      <span className={`animated-icon ${className}`} aria-hidden="true">
        {fallback}
      </span>
    );
  }
  return (
    <UseAnimations
      {...props}
      className={`animated-icon ${className}`}
      aria-hidden="true"
    />
  );
}
