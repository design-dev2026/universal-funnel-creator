import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universal Funnel Creator",
  description: "A zero-cost, production-ready SaaS for creating marketing funnels",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <header className="border-b bg-card text-card-foreground shadow-sm">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">Universal Funnel Creator</h1>
                <nav>
                  <ul className="flex space-x-4">
                    <li><a href="#" className="hover:underline">Dashboard</a></li>
                    <li><a href="#" className="hover:underline">Projects</a></li>
                    <li><a href="#" className="hover:underline">Settings</a></li>
                  </ul>
                </nav>
              </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
