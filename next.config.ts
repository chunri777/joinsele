import type { NextConfig } from 'next';

const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true';
const isStaticExportBuild = process.env.STATIC_EXPORT === 'true';
const assetPrefix = process.env.STATIC_ASSET_PREFIX ?? (isGitHubPagesBuild
  ? 'https://chunri777.github.io/joinsele'
  : undefined);

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild || isStaticExportBuild
    ? {
        ...(assetPrefix ? { assetPrefix } : {}),
        output: 'export' as const,
      }
    : {}),
};

export default nextConfig;
