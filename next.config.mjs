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
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.kakaousercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.genesis.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.hyundai.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
