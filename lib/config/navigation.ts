import type { NavItem } from "@/types";

export const PRIMARY_NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "courses", label: "Courses", icon: "BookOpen", badge: 4 },
  { id: "schedule", label: "Schedule", icon: "CalendarDays" },
  { id: "progress", label: "Progress", icon: "LineChart" },
  { id: "community", label: "Community", icon: "Users" },
];

export const SECONDARY_NAV: NavItem[] = [
  { id: "settings", label: "Settings", icon: "Settings" },
];

export const DEFAULT_NAV_ID = "dashboard";
