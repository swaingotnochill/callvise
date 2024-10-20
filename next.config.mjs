/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_PUBLIC_VAPI_KEY: process.env.NEXT_PUBLIC_PUBLIC_VAPI_KEY,
    NEXT_PUBLIC_PRIVATE_VAPI_KEY: process.env.NEXT_PUBLIC_PRIVATE_VAPI_KEY,
  },
};

export default nextConfig;
