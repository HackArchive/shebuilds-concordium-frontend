/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withTM = require("next-transpile-modules")([
  "@concordium/browser-wallet-api-helpers",
  "@concordium/web-sdk",
]); // pass the modules you would like to see transpiled

// module.exports = nextConfig;
module.exports = withTM(nextConfig);
