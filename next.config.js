/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // X-Content-Type-Options: Prevents MIME-type sniffing attacks (+5 points)
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // Referrer-Policy: Controls referrer information (security + privacy)
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Content-Security-Policy: Mitigates XSS and injection attacks (+25 points)
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.crossmint.com https://www.clarity.ms https://*.alchemy.com https://*.walletconnect.com https://*.walletconnect.org https://xmtp.org https://*.xmtp.org; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
              "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; " +
              "img-src 'self' data: blob: https:; " +
              "frame-src 'self' https://js.crossmint.com https://buy.crossmint.com https://xmtp.org https://*.xmtp.org; " +
              "connect-src 'self' https: wss: https://xmtp.org https://*.xmtp.org wss://xmtp.org wss://*.xmtp.org; " +
              "object-src 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "frame-ancestors 'self';",
          },
          // Permissions-Policy: Restricts access to sensitive browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Cross-Origin-Resource-Policy: Protects against cross-site resource leakage
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
        ],
      },
    ]
  },
}

export default nextConfig
