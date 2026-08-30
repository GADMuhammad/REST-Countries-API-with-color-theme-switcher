import { useEffect, useState } from "react";

const STORAGE_KEY = "countries";
const DATA_URL = "/data.json";

// Module-level cache: the dataset is fetched at most once per page load and
// shared by every component that calls the hook (home page, detail page, …).
let cache = null;

function readCache() {
  if (cache) return cache;
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(stored) && stored.length) {
      cache = stored;
    }
  } catch {
    // Corrupt or unavailable storage – fall through and refetch.
  }
  return cache;
}

/**
 * Loads the country dataset once and keeps it warm in memory + localStorage.
 *
 * @returns {{ countries: Array, status: "loading" | "ready" | "error" }}
 */
export function useCountries() {
  const [countries, setCountries] = useState(readCache);
  const [status, setStatus] = useState(() => (readCache() ? "ready" : "loading"));

  useEffect(() => {
    if (countries) return;

    let cancelled = false;

    fetch(DATA_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        cache = data;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch {
          // Quota exceeded / private mode – we still have the data in memory.
        }
        setCountries(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [countries]);

  return { countries: countries ?? [], status };
}
