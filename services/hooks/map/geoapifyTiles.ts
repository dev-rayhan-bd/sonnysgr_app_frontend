// services/map/geoapifyTiles.ts

const GEOAPIFY_API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

if (!GEOAPIFY_API_KEY) {
  console.warn(
    "[geoapifyTiles] EXPO_PUBLIC_GEOAPIFY_API_KEY is not set — map tiles will fail to load.",
  );
}

// Pick any Geoapify style: osm-carto, osm-bright, klokantech-basic,
// positron, dark-matter, etc. Full list: https://apidocs.geoapify.com/docs/map-tiles/
export const GEOAPIFY_STYLE = "osm-bright";

// react-native-maps' UrlTile expects {x}/{y}/{z} placeholders (lowercase).
export const GEOAPIFY_TILE_URL = `https://maps.geoapify.com/v1/tile/${GEOAPIFY_STYLE}/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`;