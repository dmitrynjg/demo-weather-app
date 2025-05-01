import type { NextConfig } from 'next';
import StylelintPlugin from 'stylelint-webpack-plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['openweathermap.org'],
  },
  webpack: (config) => {
    config.plugins.push(new StylelintPlugin());
    return config;
  },
};

export default nextConfig;
