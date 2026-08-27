import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@privy-io/react-auth', '@privy-io/wagmi'],
};

export default nextConfig;
