import {
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
} from "react";
import UseAnimations, {
  type Animation,
  type EventProps,
  type Interaction,
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

export function AnimatedHover({
  animation,
  interaction,
  size = 24,
  fallback,
  className = "",
  children,
}: {
  animation: Animation;
  interaction?: Interaction;
  size?: number;
  fallback: ReactNode;
  className?: string;
  children: (icon: ReactElement, eventProps: EventProps) => ReactElement;
}) {
  const reduced = useSyncExternalStore(subscribe, isReduced, () => false);
  const fallbackIcon = (
    <span className={`animated-icon ${className}`} aria-hidden="true">
      {fallback}
    </span>
  );

  if (reduced) return children(fallbackIcon, {} as EventProps);

  return (
    <UseAnimations
      animation={animation}
      interaction={interaction}
      size={size}
      render={(eventProps, animationProps) =>
        children(
          <span
            {...animationProps}
            className={`animated-icon ${className}`}
            aria-hidden="true"
          />,
          eventProps,
        )
      }
    />
  );
}
