// services/hooks/map/useGeoapifyAutocomplete.ts
import { useCallback, useRef, useState } from "react";

const GEOAPIFY_API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

export interface GeoapifyPlace {
  formatted: string;
  lat: number;
  lon: number;
}

export function useGeoapifyAutocomplete() {
  const [results, setResults] = useState<GeoapifyPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!text || text.length < 3) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          text,
        )}&apiKey=${GEOAPIFY_API_KEY}`;
        const res = await fetch(url);
        const json = await res.json();

        const places: GeoapifyPlace[] = (json.features ?? []).map(
          (f: any) => ({
            formatted: f.properties.formatted,
            lat: f.properties.lat,
            lon: f.properties.lon,
          }),
        );
        setResults(places);
      } catch (err) {
        console.warn("[useGeoapifyAutocomplete] request failed", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  }, []);

  return { results, loading, search };
}