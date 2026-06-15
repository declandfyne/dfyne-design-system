import { useDfyneContext } from "../providers/DfyneProvider";

/**
 * Access a content value by dot-notation key.
 * Falls back to `fallback` if not found or provider not mounted.
 *
 * Usage (future): const label = useContent("uiLabels.addToCart", "ADD TO CART");
 */
export function useContent<T = string>(key: string, fallback: T): T {
  const { content } = useDfyneContext();
  if (!content) return fallback;

  const parts = key.split(".");
  let current: unknown = content;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return fallback;
    current = (current as Record<string, unknown>)[part];
  }

  return (current as T) ?? fallback;
}
