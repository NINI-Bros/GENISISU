/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.fesp.shop',
        pathname: '/files/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://accounts.genesis.com/api/authorize/ccsp/oauth/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
