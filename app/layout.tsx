import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ridhima Kohli | Product Experiments",
  description: "A collection of product thinking and prototypes by Ridhima Kohli.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
