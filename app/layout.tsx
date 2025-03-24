import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "Tapakila - Billetterie",
  description: "Plateforme de réservation d'événements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <link rel="icon" href="/icon-removebg-preview.png" />
      <body cz-shortcut-listen="true">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
