import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The profile photo is served from a fixed /profile.<ext> path with a
    // ?v= cache-busting query string that changes whenever the admin
    // uploads a new photo.
    localPatterns: [{ pathname: "/profile.*" }],
  },
};

export default nextConfig;
