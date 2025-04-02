import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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