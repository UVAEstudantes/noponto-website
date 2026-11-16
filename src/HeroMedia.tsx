import { useEffect, useState } from "react";
import { asset, heroMedia } from "./content";

function useHeroPreferences() {
  const [preferences, setPreferences] = useState<{
    theme: "light" | "dark";
    reduced: boolean;
  }>(() => ({
    theme: document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    reduced: document.documentElement.dataset.motion === "reduce",
  }));
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() =>
      setPreferences({
        theme: root.dataset.theme === "dark" ? "dark" : "light",
        reduced: root.dataset.motion === "reduce",
      }),
    );
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme", "data-motion"],
    });
    return () => observer.disconnect();
  }, []);
  return preferences;
}

export function HeroMedia() {
  const { theme, reduced } = useHeroPreferences();
  const [failed, setFailed] = useState<string | null>(null);
  const media = heroMedia[theme];
  return (
    <div className="phone">
      <img
        src={asset(media.image)}
        alt="Mapa real do NoPonto com itinerários e veículos no Rio"
        width="480"
        height="1068"
        fetchPriority="high"
      />
      {!reduced && failed !== media.video && (
        <video
          key={media.video}
          src={asset(media.video)}
          poster={asset(media.image)}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setFailed(media.video)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
