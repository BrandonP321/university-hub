/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@university-hub/shared"
])

const nextConfig = {
  reactStrictMode: true,
  
}

module.exports = withTM(nextConfig);
