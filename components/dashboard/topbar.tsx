import { Bell, Search } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { USER } from "@/lib/data/dashboard";
import { formatLongDate } from "@/lib/utils";

/**
 * Persistent top bar (server component). Shows the brand on mobile and a section
 * title + date on larger screens, plus search / notifications / avatar.
 */
export function Topbar() {
  const today = formatLongDate(new Date());

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-canvas/70 px-4 py-3.5 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex items-center gap-2.5 md:hidden">
          <Logo className="size-8" />
          <span className="text-base font-semibold tracking-tight text-foreground">Aurora</span>
        </span>
        <div className="hidden min-w-0 md:block">
          <p className="truncate text-[0.95rem] font-semibold tracking-tight text-foreground">Dashboard</p>
          <p className="truncate text-xs text-faint">{today}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <label className="relative hidden lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
          <input
            type="search"
            placeholder="Search courses…"
            aria-label="Search courses"
            className="h-9 w-56 rounded-full border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-violet/40 focus:bg-white/[0.06]"
          />
        </label>

        <button
          type="button"
          aria-label="Notifications"
          className="relative grid size-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-muted outline-none transition-colors hover:bg-white/[0.07] hover:text-foreground focus-visible:ring-2 focus-visible:ring-violet/50"
        >
          <Bell className="size-[18px]" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-violet ring-2 ring-canvas" />
        </button>

        <span
          className="grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundImage: "linear-gradient(135deg, oklch(0.72 0.17 292), oklch(0.66 0.16 250))" }}
          aria-label={USER.name}
        >
          {USER.initials}
        </span>
      </div>
    </header>
  );
}
