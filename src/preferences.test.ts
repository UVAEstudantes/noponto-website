import { describe, it, expect, vi, afterEach } from "vitest";
import {
  applyPreferences,
  defaults,
  parsePreferences,
  readPreferences,
  savePreferences,
  preferenceKey,
} from "./preferences";
afterEach(() => vi.unstubAllGlobals());
describe("site preferences", () => {
  it("starts with system appearance and motion and standard text", () =>
    expect(parsePreferences(null)).toEqual(defaults));
  it("discards malformed or unsupported stored choices", () => {
    expect(parsePreferences("{")).toEqual(defaults);
    expect(
      parsePreferences('{"theme":"wrong","motion":"full","text":"huge"}'),
    ).toEqual(defaults);
  });
  it("persists and restores selected preferences", () => {
    const items = new Map();
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => items.get(k) || null,
      setItem: (k: string, v: string) => items.set(k, v),
    });
    const p = { theme: "dark", motion: "reduce", text: "larger" } as const;
    savePreferences(p);
    expect(items.has(preferenceKey)).toBe(true);
    expect(readPreferences()).toEqual(p);
  });
  it("keeps defaults and remains usable when storage is blocked", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw Error("blocked");
      },
      setItem: () => {
        throw Error("blocked");
      },
    });
    expect(readPreferences()).toEqual(defaults);
    expect(() => savePreferences({ ...defaults })).not.toThrow();
  });
  it("follows system changes for appearance and reduced motion", () => {
    const root = { dataset: {} } as HTMLElement;
    applyPreferences({ ...defaults }, false, false, root);
    expect(root.dataset).toEqual({
      theme: "light",
      motion: "full",
      text: "standard",
    });
    applyPreferences({ ...defaults }, true, true, root);
    expect(root.dataset).toEqual({
      theme: "dark",
      motion: "reduce",
      text: "standard",
    });
  });
  it("keeps explicit appearance and manual motion reduction", () => {
    const root = { dataset: {} } as HTMLElement;
    applyPreferences(
      { theme: "light", motion: "reduce", text: "large" },
      true,
      false,
      root,
    );
    expect(root.dataset).toEqual({
      theme: "light",
      motion: "reduce",
      text: "large",
    });
  });
  it("restores defaults after customization", () => {
    const root = { dataset: {} } as HTMLElement;
    applyPreferences(
      { theme: "dark", motion: "reduce", text: "larger" },
      false,
      false,
      root,
    );
    applyPreferences({ ...defaults }, false, false, root);
    expect(root.dataset).toEqual({
      theme: "light",
      motion: "full",
      text: "standard",
    });
  });
});
