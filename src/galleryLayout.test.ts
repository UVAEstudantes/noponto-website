import { describe, expect, it } from "vitest";
import { placePreview } from "./galleryLayout";

const viewport = { width: 1440, height: 900 };
const card = { top: 285, bottom: 720, left: 100, width: 225 };
const phone = 1200 / 540;

describe("gallery preview layout", () => {
  it("keeps the enlarged phone preview inside the viewport", () => {
    const preview = placePreview(card, viewport, phone);
    expect(preview.width / preview.height).toBeCloseTo(540 / 1200);
    expect(preview.top).toBeGreaterThanOrEqual(16);
    expect(preview.left).toBeGreaterThanOrEqual(16);
    expect(preview.top + preview.height).toBeLessThanOrEqual(884);
    expect(preview.left + preview.width).toBeLessThanOrEqual(1424);
    expect(preview.width).toBeGreaterThan(card.width);
  });

  it("clamps a card near the right edge without changing its ratio", () => {
    const preview = placePreview(
      { ...card, left: 1300 },
      viewport,
      650 / 1080,
    );
    expect(preview.width / preview.height).toBeCloseTo(1080 / 650);
    expect(preview.left + preview.width).toBeLessThanOrEqual(1424);
  });

  it("fits the wide notification preview above the card", () => {
    const preview = placePreview(
      { top: 294, bottom: 729, left: 858, width: 225 },
      viewport,
      260 / 1080,
    );
    expect(preview.top + preview.height).toBeLessThanOrEqual(294);
    expect(preview.width).toBe(440);
  });

  it("stays inside a short mobile viewport", () => {
    const preview = placePreview(
      { top: 200, bottom: 400, left: 20, width: 225 },
      { width: 320, height: 480 },
      phone,
    );
    expect(preview.top).toBeGreaterThanOrEqual(16);
    expect(preview.left).toBeGreaterThanOrEqual(16);
    expect(preview.top + preview.height).toBeLessThanOrEqual(464);
    expect(preview.left + preview.width).toBeLessThanOrEqual(304);
  });
});
