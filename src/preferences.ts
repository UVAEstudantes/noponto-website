export const preferenceKey = "noponto-site-preferences";
export const defaults = {
  theme: "system",
  motion: "system",
  text: "standard",
} as const;
export type Preferences = {
  theme: "light" | "dark" | "system";
  motion: "system" | "reduce";
  text: "standard" | "large" | "larger";
};
export function parsePreferences(raw: string | null): Preferences {
  try {
    const p = JSON.parse(raw || "null");
    return {
      theme: ["light", "dark", "system"].includes(p?.theme)
        ? p.theme
        : defaults.theme,
      motion: p?.motion === "reduce" ? "reduce" : "system",
      text: ["standard", "large", "larger"].includes(p?.text)
        ? p.text
        : defaults.text,
    };
  } catch {
    return { ...defaults };
  }
}
export function readPreferences(): Preferences {
  try {
    return parsePreferences(localStorage.getItem(preferenceKey));
  } catch {
    return { ...defaults };
  }
}
export function savePreferences(p: Preferences) {
  try {
    localStorage.setItem(preferenceKey, JSON.stringify(p));
  } catch {}
}
export function applyPreferences(
  p: Preferences,
  dark: boolean,
  reduced: boolean,
  root: HTMLElement = document.documentElement,
) {
  root.dataset.theme =
    p.theme === "system" ? (dark ? "dark" : "light") : p.theme;
  root.dataset.motion = p.motion === "reduce" || reduced ? "reduce" : "full";
  root.dataset.text = p.text;
}
