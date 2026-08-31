import type { NextConfig } from 'next';

const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        assetPrefix: 'https://chunri777.github.io/joinsele',
        output: 'export' as const,
      }
    : {}),
};

export default nextConfig;
