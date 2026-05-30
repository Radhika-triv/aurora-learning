import { createElement } from "react";
import { resolveIcon } from "@/lib/icons";

interface IconProps {
  /** lucide-react icon name (e.g. from `course.icon_name`). */
  name: string;
  className?: string;
  strokeWidth?: number;
}

/**
 * Renders a lucide icon resolved dynamically from a string name. Uses
 * `createElement` so the icon is looked up (not declared) during render.
 */
export function Icon({ name, className, strokeWidth = 2 }: IconProps) {
  return createElement(resolveIcon(name), { className, strokeWidth, "aria-hidden": "true" });
}
