/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
module.exports = nextConfig;

module.export = {
  env: {
    DEPLOYMENT_URL: "https://api-weather-kappa.vercel.app/",
  },
};
