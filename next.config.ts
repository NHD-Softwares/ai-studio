import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://ai-studio-ruddy.up.railway.app/api/v1/:path*',
      },
    ];
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
