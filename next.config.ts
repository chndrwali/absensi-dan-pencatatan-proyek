import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  reactCompiler: true,

  experimental: {
    workerThreads: false,
    cpus: 1,
    optimizePackageImports: ["lucide-react", "recharts", "date-fns"],
  },
};

export default nextConfig;
