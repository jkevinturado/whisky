/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'mdbcdn.b-cdn.net',
      'flowbite.s3.amazonaws.com',
      'firebasestorage.googleapis.com',
    ],
  },
};

module.exports = nextConfig;
