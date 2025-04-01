import React from 'react'
import type { Metadata } from "next";
import "../globals.css";


export const metadata: Metadata = {
    title: "profile - Billetterie",
    description: "Plateforme de réservation d'événements",
};

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    )
}
