import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Werkraum Automotive | Premium Service für Performance-Fahrzeuge",
  description:
    "Spezialisierte Wartung, Diagnose und Individualisierung für Porsche, BMW M, Mercedes-AMG und exklusive Sportwagen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
