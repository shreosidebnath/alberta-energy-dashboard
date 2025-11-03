import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BarChart3, Map, TrendingUp } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alberta Energy Dashboard",
  description: "Real-time oil & gas production tracking for Alberta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <nav className="border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6" />
                  <span className="font-bold text-xl">Alberta Energy</span>
                </Link>
                
                <div className="flex space-x-6">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center space-x-2 hover:text-primary transition"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    href="/map" 
                    className="flex items-center space-x-2 hover:text-primary transition"
                  >
                    <Map className="h-4 w-4" />
                    <span>Map</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}