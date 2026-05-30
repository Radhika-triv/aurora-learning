import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Navigation } from "@/components/dashboard/navigation";
import { Topbar } from "@/components/dashboard/topbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aurora · Learning Dashboard",
    template: "%s · Aurora",
  },
  description:
    "Track your courses, streaks and study activity in one calm, fast, dark-mode learning workspace.",
  applicationName: "Aurora",
  keywords: ["learning", "dashboard", "courses", "education", "study"],
};

export const viewport: Viewport = {
  themeColor: "#0b0b10",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <MotionProvider>
          <div className="flex min-h-dvh w-full">
            <Navigation />
            <div className="flex min-w-0 flex-1 flex-col">
              <Topbar />
              <main className="flex-1 px-4 pb-28 pt-5 sm:px-6 md:pb-10 lg:px-8">{children}</main>
            </div>
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
