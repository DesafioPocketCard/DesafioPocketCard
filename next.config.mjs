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
      {
        protocol: 'http',
        hostname: 'ubiqfy.com',
      },
      {
        protocol: 'https',
        hostname: 'ubiqfy.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.pocketcard.com.br',
      },
      {
         protocol: 'https',
         hostname: 'www.xbox.com', // Vi nos seus dados que tem URL do xbox também
      },
    ],
  },
};

export default nextConfig;
