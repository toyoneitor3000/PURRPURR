import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias['public'] = path.resolve(__dirname, 'public/');

    // Exclude _src_unused directory from compilation
    config.module.rules.push({
      test: /\.(tsx?|jsx?)$/,
      exclude: [/node_modules/, /_src_unused/],
    });

    return config;
  },
};

export default nextConfig;
