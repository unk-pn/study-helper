import type { Metadata } from "next";
import "./globals.css";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Providers } from "@/components/Providers/Providers";

export const metadata: Metadata = {
  title: "Study Helper",
  description: "Study Helper Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
