export interface Apk {
  name: string;
  url: string;
  size: number;
}
export interface Release {
  id: number;
  name: string;
  tag: string;
  published: string;
  beta: boolean;
  body: string;
  url: string;
  apk: Apk;
}
export const API =
  "https://api.github.com/repos/UVAEstudantes/.github/releases?per_page=30";
export const CACHE_KEY = "noponto-releases-v1";
export const CACHE_TTL = 15 * 60 * 1000;
// Optional exact asset name; otherwise universal builds first, then lexical filename and asset id.
export const preferredApkName: string | undefined = undefined;
function downloadUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const u = new URL(value);
    return (
      u.protocol === "https:" &&
      u.hostname === "github.com" &&
      u.pathname.startsWith("/UVAEstudantes/.github/releases/download/") &&
      /\.apk$/i.test(u.pathname) &&
      !u.search &&
      !u.hash
    );
  } catch {
    return false;
  }
}
export function normalizeReleases(
  input: unknown,
  preferred = preferredApkName,
): Release[] {
  if (!Array.isArray(input)) throw new Error("Resposta inesperada do GitHub.");
  return input
    .flatMap((r): Release[] => {
      if (
        !r ||
        typeof r !== "object" ||
        r.draft ||
        !Number.isFinite(r.id) ||
        typeof r.published_at !== "string" ||
        !Number.isFinite(Date.parse(r.published_at)) ||
        !Array.isArray(r.assets)
      )
        return [];
      const apks = r.assets.filter(
        (a: any) =>
          a &&
          typeof a.name === "string" &&
          /\.apk$/i.test(a.name) &&
          downloadUrl(a.browser_download_url) &&
          Number.isFinite(a.size) &&
          a.size > 0 &&
          a.state === "uploaded",
      );
      apks.sort(
        (a: any, b: any) =>
          Number(b.name === preferred) - Number(a.name === preferred) ||
          Number(/universal/i.test(b.name)) -
            Number(/universal/i.test(a.name)) ||
          a.name.localeCompare(b.name, "en") ||
          a.id - b.id,
      );
      const apk = apks[0];
      if (!apk) return [];
      const tag = typeof r.tag_name === "string" ? r.tag_name : "";
      const name = typeof r.name === "string" && r.name ? r.name : tag;
      return [
        {
          id: r.id,
          name,
          tag,
          published: r.published_at,
          beta:
            !!r.prerelease ||
            /(?:^|[\s._-])(?:beta|alpha|rc\d*)(?:$|[\s._-])/i.test(
              `${name} ${tag}`,
            ),
          body: typeof r.body === "string" ? r.body : "",
          url: `https://github.com/UVAEstudantes/.github/releases/tag/${encodeURIComponent(tag)}`,
          apk: {
            name: apk.name,
            url: apk.browser_download_url,
            size: apk.size,
          },
        },
      ];
    })
    .sort(
      (a, b) =>
        Date.parse(b.published) - Date.parse(a.published) || b.id - a.id,
    );
}
export async function fetchReleases(
  fetcher: typeof fetch = fetch,
): Promise<Release[]> {
  const cached = readCache();
  if (cached) return normalizeReleases(cached.data);
  const response = await fetcher(API, {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok)
    throw new Error(
      response.status === 403 || response.status === 429
        ? "O GitHub atingiu o limite temporário de consultas."
        : "Não foi possível consultar as versões agora.",
    );
  const raw: unknown = await response.json();
  const data = normalizeReleases(raw);
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ time: Date.now(), data: raw }),
    );
  } catch {}
  return data;
}
export function readCache(): { time: number; data: unknown } | null {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    return c &&
      typeof c.time === "number" &&
      Date.now() - c.time < CACHE_TTL &&
      Array.isArray(c.data)
      ? c
      : null;
  } catch {
    return null;
  }
}
export const date = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
export const size = (bytes: number) =>
  `${(bytes / 1024 / 1024).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} MB`;
