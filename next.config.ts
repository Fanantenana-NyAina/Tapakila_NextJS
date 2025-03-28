import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optionnel : Redirection pour les anciennes versions
  async rewrites() {
    return [
      {
        source: '/displayEvent/eventId',
        destination: '/displayEvent/[eventId]'
      }
    ]
  }
};

export default nextConfig;