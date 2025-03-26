import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login - Billetterie",
  description: "Plateforme de réservation d'événements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}
