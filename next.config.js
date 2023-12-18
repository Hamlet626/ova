/** @type {import('next').NextConfig} */
const nextConfig = {
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'files.slack.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    experimental: {
      serverActions: true,
    },
}
module.exports = {
  // Other configuration settings
  devServer: {
    port: 3000, // Change this to 3000
  },
};
module.exports = nextConfig
