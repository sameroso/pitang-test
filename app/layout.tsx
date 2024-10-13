import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/lib/redux/store-provider";
import { ThemeProvider } from "@/lib/styles/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import { hexToCssHsl } from "@/style/utils";

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
    cookieStorage.get("preferences")?.value || "{}"
  );

  const secondaryColorStyle = preferences?.secondary_color?.[preferences?.mode]
    ? {
        "--secondary": hexToCssHsl(
          preferences.secondary_color[preferences.mode],
          true
        ),
      }
    : {};

  const primaryColorStyle = preferences?.primary_color?.[preferences?.mode]
    ? {
        "--primary": hexToCssHsl(
          preferences.primary_color[preferences.mode],
          true
        ),
      }
    : {};

  const style = {
    ...primaryColorStyle,
    ...secondaryColorStyle,
  } as React.CSSProperties;

  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning style={style}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme={preferences?.mode || "system"}
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
