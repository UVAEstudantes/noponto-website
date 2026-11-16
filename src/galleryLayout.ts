export function placePreview(
  rect: { top: number; bottom: number; left: number; width: number },
  viewport: { width: number; height: number },
  ratio: number,
) {
  const pad = 16;
  const gap = 14;
  const maxHeight = Math.min(580, viewport.height - pad * 2);
  let width = Math.min(ratio < 1 ? 440 : 280, viewport.width - pad * 2);
  let height = width * ratio;
  if (height > maxHeight) {
    height = maxHeight;
    width = height / ratio;
  }
  let top = rect.top - height - gap;
  if (top < pad) {
    const below = rect.bottom + gap;
    top =
      below + height <= viewport.height - pad
        ? below
        : Math.max(pad, Math.min(rect.top, viewport.height - height - pad));
  }
  const left = rect.left + rect.width / 2 - width / 2;
  return {
    left: Math.max(pad, Math.min(left, viewport.width - width - pad)),
    top: Math.max(pad, Math.min(top, viewport.height - height - pad)),
    width,
    height,
  };
}
