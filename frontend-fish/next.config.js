const config = require("config");

const nextConfig = {
  env: {
    API_URL: config.get("URL")
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'forelvpiter.ru']
  }
}

module.exports = nextConfig
