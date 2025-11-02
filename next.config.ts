
import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BUSINESS_HUB_API_BASE_URL: process.env.BUSINESS_HUB_API_BASE_URL || '',
  },
}

export default config;