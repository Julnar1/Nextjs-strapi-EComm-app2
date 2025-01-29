/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // This array defines a list of patterns to match for external image URLs. 
      // This allows Next.js to optimize image loading for these specific domains.(ie fetch images from specified domain)
      {
        protocol: 'https', // Specify the protocol (e.g., 'https:') to match
        hostname: 'grounded-melody-0500becd92.media.strapiapp.com',// Specify the hostname (domain) to match
      },
    ],
  },

};

export default nextConfig;
