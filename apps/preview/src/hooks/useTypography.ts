import { useDfyneContext } from "../providers/DfyneProvider";
import type { LineHeightTokens } from "../lib/lineHeight";

/**
 * Access computed line-height tokens.
 *
 * Usage (future): const tokens = useTypography();
 * Then use tokens["--lh-body"] etc.
 */
export function useTypography(): LineHeightTokens | null {
  const { typography } = useDfyneContext();
  return typography;
}
