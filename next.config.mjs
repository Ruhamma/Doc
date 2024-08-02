// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// next.config.js
import mdx from '@next/mdx'; // Import @next/mdx using default import

const withMDX = mdx({
  extension: /\.mdx?$/,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

export default withMDX; // Export the configured withMDX

