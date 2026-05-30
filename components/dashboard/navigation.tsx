"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PanelLeft } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { SPRING } from "@/lib/motion";
import { DEFAULT_NAV_ID, PRIMARY_NAV, SECONDARY_NAV } from "@/lib/config/navigation";
import { USER } from "@/lib/data/dashboard";
import type { NavItem } from "@/types";

/**
 * Owns the shared navigation state (active item + collapse) and renders both
 * surfaces: a collapsible left rail (tablet/desktop) and a bottom bar (mobile).
 * Which one is visible is decided purely in CSS, so there is no hydration churn.
 */
export function Navigation() {
  const [activeId, setActiveId] = useState(DEFAULT_NAV_ID);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar
        activeId={activeId}
        collapsed={collapsed}
        onSelect={setActiveId}
        onToggle={() => setCollapsed((value) => !value)}
      />
      <BottomBar activeId={activeId} onSelect={setActiveId} />
    </>
  );
}

/* ── Desktop / tablet rail ─────────────────────────────────────────────────── */

interface SidebarProps {
  activeId: string;
  collapsed: boolean;
  onSelect: (id: string) => void;
  onToggle: () => void;
}

function Sidebar({ activeId, collapsed, onSelect, onToggle }: SidebarProps) {
  return (
    <aside
      data-collapsed={collapsed ? "true" : "false"}
      className={cn(
        "group/sb sticky top-0 z-30 hidden h-dvh shrink-0 flex-col overflow-hidden border-r border-white/[0.06] bg-canvas/60 px-3 py-5 backdrop-blur-xl md:flex",
        "w-[84px] lg:w-[268px] lg:data-[collapsed=true]:w-[84px]",
        "transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
      )}
    >
      <div className="flex items-center gap-2.5 px-1">
        <Logo />
        <span className="min-w-0 flex-1 overflow-hidden">
          <NavLabel className="block truncate text-base font-semibold tracking-tight text-foreground">
            Aurora
          </NavLabel>
        </span>
      </div>

      <nav aria-label="Primary" className="mt-7 flex min-h-0 flex-1 flex-col">
        <ul className="no-scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          {PRIMARY_NAV.map((item) => (
            <li key={item.id}>
              <SidebarItem item={item} active={activeId === item.id} onSelect={() => onSelect(item.id)} />
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-col gap-1">
          {SECONDARY_NAV.map((item) => (
            <SidebarItem key={item.id} item={item} active={activeId === item.id} onSelect={() => onSelect(item.id)} />
          ))}

          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="relative hidden h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-faint outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-violet/50 lg:flex"
          >
            <PanelLeft
              className={cn("size-5 shrink-0 transition-transform duration-300", collapsed && "rotate-180")}
            />
            <NavLabel className="min-w-0 flex-1 overflow-hidden text-left">Collapse</NavLabel>
          </button>

          <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-lg text-sm font-semibold text-white"
              style={{ backgroundImage: "linear-gradient(135deg, oklch(0.72 0.17 292), oklch(0.66 0.16 250))" }}
              aria-hidden="true"
            >
              {USER.initials}
            </span>
            <span className="min-w-0 flex-1 overflow-hidden">
              <NavLabel className="block truncate text-sm font-semibold text-foreground">{USER.name}</NavLabel>
              <NavLabel className="block truncate text-xs text-faint">{USER.role}</NavLabel>
            </span>
          </div>
        </div>
      </nav>
    </aside>
  );
}

/** Label that fades out when the rail is collapsed (or on tablet width). */
function NavLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "opacity-0 transition-opacity duration-200 lg:group-data-[collapsed=false]/sb:opacity-100",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface SidebarItemProps {
  item: NavItem;
  active: boolean;
  onSelect: () => void;
}

function SidebarItem({ item, active, onSelect }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      title={item.label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-violet/50",
        active ? "text-foreground" : "text-faint hover:text-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active"
          transition={SPRING}
          className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.07]"
          aria-hidden="true"
        />
      )}
      <Icon name={item.icon} className="relative z-10 size-5 shrink-0" />
      <span className="relative z-10 min-w-0 flex-1 overflow-hidden text-left">
        <NavLabel className="block truncate">{item.label}</NavLabel>
      </span>
      {item.badge ? (
        <NavLabel className="relative z-10 grid h-5 min-w-[1.25rem] shrink-0 place-items-center rounded-full bg-violet/15 px-1.5 text-[0.7rem] font-semibold text-violet">
          {item.badge}
        </NavLabel>
      ) : null}
    </button>
  );
}

/* ── Mobile bottom bar ─────────────────────────────────────────────────────── */

function BottomBar({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] bg-canvas/80 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2 py-1.5">
        {PRIMARY_NAV.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex w-full flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[0.65rem] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet/50",
                  active ? "text-foreground" : "text-faint",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="bottombar-active"
                    transition={SPRING}
                    className="absolute inset-0 rounded-xl bg-white/[0.07]"
                    aria-hidden="true"
                  />
                )}
                <Icon name={item.icon} className="relative z-10 size-[1.15rem]" />
                <span className="relative z-10 w-full truncate text-center">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
