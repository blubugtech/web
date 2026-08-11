import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { AuraBackground } from "@/components/ui/AuraBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blu Bug Tech",
  description: "Independent open-source initiative focused on building useful software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuraBackground />
          <div className="fixed inset-0 z-0 pointer-events-none">
            <InteractiveGrid />
          </div>
          <div className="relative z-10 flex min-h-screen flex-col">
            <SmoothScroll>
              <Navbar />
              {children}
              <Footer />
            </SmoothScroll>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
