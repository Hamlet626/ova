/** @type {import('next').NextConfig} */
const nextConfig = {
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
}
module.exports = {
  // Other configuration settings
  devServer: {
    port: 3000, // Change this to 3000
  },
};
module.exports = nextConfig
