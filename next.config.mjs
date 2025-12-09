/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.pocketcard.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
