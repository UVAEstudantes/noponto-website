import { describe, it, expect, vi, afterEach } from "vitest";
import { normalizeReleases, fetchReleases } from "./releases";
import { renderToStaticMarkup } from "react-dom/server";
import { DownloadPanel } from "./Downloads";
vi.mock("qrcode.react",()=>({QRCodeSVG:({value}:{value:string})=><svg data-qr-value={value}/>}));
const asset = (name = "new-name.apk") => ({
  id: 1,
  name,
  state: "uploaded",
  size: 1024,
  browser_download_url: `https://github.com/UVAEstudantes/.github/releases/download/v1/${name}`,
});
const release = (
  id = 1,
  published_at = "2026-11-15T00:00:00Z",
  assets = [asset()],
) => ({
  id,
  published_at,
  assets,
  name: "NoPonto v5.3 Beta",
  tag_name: `v${id}`,
  body: "Novidades",
  draft: false,
  prerelease: false,
});
describe("releases", () => {
  it("selects the most recently published valid APK and ignores empty releases", () => {
    const result = normalizeReleases([
      release(1),
      release(3, "2026-11-17T00:00:00Z", []),
      release(2, "2026-11-16T00:00:00Z"),
    ]);
    expect(result.map((r) => r.id)).toEqual([2, 1]);
    expect(result[0].apk.name).toBe("new-name.apk");
  });
  it("accepts prerelease and beta names even when GitHub marks them stable", () => {
    expect(normalizeReleases([release()])[0].beta).toBe(true);
    expect(
      normalizeReleases([{ ...release(), name: "Test", prerelease: true }])[0]
        .beta,
    ).toBe(true);
  });
  it("uses publication dates for similar version names", () => {
    expect(
      normalizeReleases([release(1), release(2, "2026-11-14T00:00:00Z")])[0].id,
    ).toBe(1);
  });
  it("returns empty for empty input and rejects unexpected payload", () => {
    expect(normalizeReleases([])).toEqual([]);
    expect(() => normalizeReleases({})).toThrow();
  });
  it("ignores drafts, invalid URLs, zero sizes and pending assets", () => {
    expect(
      normalizeReleases([
        { ...release(), draft: true },
        release(2, undefined, [
          { ...asset(), browser_download_url: "javascript:alert(1)" },
        ]),
        release(3, undefined, [{ ...asset(), size: 0 }]),
        release(4, undefined, [{ ...asset(), state: "new" }]),
      ]),
    ).toEqual([]);
  });
  it("chooses universal deterministically and supports explicit filename preference", () => {
    const r = release(1, undefined, [
      asset("z.apk"),
      asset("universal.apk"),
      asset("a.apk"),
    ]);
    expect(normalizeReleases([r])[0].apk.name).toBe("universal.apk");
    expect(normalizeReleases([r], "z.apk")[0].apk.name).toBe("z.apk");
  });
  it("reports network and rate-limit failures", async () => {
    await expect(
      fetchReleases(vi.fn().mockRejectedValue(new Error("offline"))),
    ).rejects.toThrow("offline");
    await expect(
      fetchReleases(vi.fn().mockResolvedValue({ ok: false, status: 403 })),
    ).rejects.toThrow("limite");
  });
  it("keeps QR and download synchronized when the selected release changes", () => {
    const first = normalizeReleases([release()])[0];
    const next = normalizeReleases([
      release(2, undefined, [asset("changed.apk")]),
    ])[0];
    for (const r of [first, next]) {
      const html = renderToStaticMarkup(
        <DownloadPanel release={r} loading={false} error="" />,
      );
      expect(html).toContain(`href="${r.apk.url}"`);
      expect(html).toContain(`data-qr-value="${r.apk.url}"`);
      expect(html).toContain(r.name);
      expect(html).toContain("Abrir link do APK");
    }
    expect(
      renderToStaticMarkup(
        <DownloadPanel release={first} loading={false} error="" />,
      ),
    ).not.toBe(
      renderToStaticMarkup(
        <DownloadPanel release={next} loading={false} error="" />,
      ),
    );
  });
  it("renders a functional GitHub fallback without APK or QR on API failure", () => {
    const html = renderToStaticMarkup(
      <DownloadPanel loading={false} error="Limite temporário" />,
    );
    expect(html).toContain("https://github.com/UVAEstudantes/.github/releases");
    expect(html).toContain("Limite temporário");
    expect(html).not.toContain("Abrir link do APK");
  });
});

describe("cache", () => {
  afterEach(() => vi.unstubAllGlobals());
  it("roundtrips raw API releases without another request and revalidates after expiry", async () => {
    const map = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => map.get(k) || null,
      setItem: (k: string, v: string) => map.set(k, v),
    });
    const network = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => [release()] });
    const first = await fetchReleases(network);
    expect(first[0].apk.name).toBe("new-name.apk");
    expect(await fetchReleases(network)).toEqual(first);
    expect(network).toHaveBeenCalledTimes(1);
    const key = [...map.keys()][0];
    const stored = JSON.parse(map.get(key)!);
    stored.time = 0;
    map.set(key, JSON.stringify(stored));
    await fetchReleases(network);
    expect(network).toHaveBeenCalledTimes(2);
  });
});
