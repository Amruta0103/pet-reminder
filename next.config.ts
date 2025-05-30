/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  // your other config
};

module.exports = withPWA(nextConfig);
