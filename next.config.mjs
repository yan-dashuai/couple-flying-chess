/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['cpfly.top'], // 允许的图片域名
  },
  // SEO优化配置
  compress: true, // 启用gzip压缩
  poweredByHeader: false, // 移除X-Powered-By头
  generateEtags: true, // 生成ETags提高缓存效率
  
  // 实验性功能
  experimental: {
    optimizeCss: true, // CSS优化
    scrollRestoration: true, // 滚动位置恢复
  },
  
  // 添加安全头部和SEO优化头部
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      }
    ]
  },
  
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/game.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // 添加一些可能的旧URL重定向
      {
        source: '/couple-chess',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ludo-game',
        destination: '/',
        permanent: true,
      }
    ]
  },
  
  // 网站地图和robots重写
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      }
    ]
  }
}

export default nextConfig
