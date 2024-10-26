import type { Metadata } from "next";
import { Creepster, Arvo, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Fall Festival Karaoke",
  description: "Sign up to sing at the Fall Festival Karaoke event",
};

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-creepster",
});

const arvo = Arvo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arvo",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${creepster.variable} ${arvo.variable} ${roboto_mono.variable} antialiased font-sans bg-white dark:bg-black text-black dark:text-white`}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
