module.exports = {
  // ...other config...
  images: {
    // Legacy domains array (still supported but less secure)
    domains: [
      "images.pexels.com",
      "picsum.photos",
      "loremflickr.com",
      "images.unsplash.com",
      "img.clerk.com",
      "avatars.githubusercontent.com",
      "cdn.jsdelivr.net",
      "i.postimg.cc",
    ],
    // More secure and flexible approach (recommended)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https", 
        hostname: "i.postimg.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      }
    ],
    // Performance optimizations
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false, // Keep false for security
    contentDispositionType: "attachment",
    // Image size limits
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
