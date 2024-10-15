import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/styles/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import { hexToCssHsl } from "@/style/utils";
import AppStoreProvider from "@/providers/app-store-provider";

export const dynamic = "force-dynamic";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStorage = cookies();

  const preferences = JSON.parse(
    cookieStorage.get("preferences")?.value || "{}",
  );

  const secondaryColorStyle = preferences?.secondary_color?.[preferences?.mode]
    ? {
        "--secondary": hexToCssHsl(
          preferences.secondary_color[preferences.mode],
          true,
        ),
      }
    : {};

  const primaryColorStyle = preferences?.primary_color?.[preferences?.mode]
    ? {
        "--primary": hexToCssHsl(
          preferences.primary_color[preferences.mode],
          true,
        ),
      }
    : {};

  const style = {
    ...primaryColorStyle,
    ...secondaryColorStyle,
  } as React.CSSProperties;

  return (
    <AppStoreProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          style={style}
          className={`${geistSans.variable} ${geistMono.variable} antialiased ${
            preferences?.mode || "light"
          }`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme={preferences?.mode}
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </AppStoreProvider>
  );
}
