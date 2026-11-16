import { useEffect, useState } from "react";
import { CACHE_KEY, CACHE_TTL, fetchReleases, type Release } from "./releases";
export function useReleases() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    async function load() {
      try {
        const data = await fetchReleases();
        if (active) {
          setReleases(data);
          setError("");
        }
      } catch (e) {
        if (active) {
          setReleases([]);
          setError(
            e instanceof Error ? e.message : "Sem conexão com o GitHub.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
          timer = setTimeout(load, CACHE_TTL);
        }
      }
    }
    void load();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);
  return { releases, loading, error };
}
