/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next-build",
  experimental: {
    webpackBuildWorker: false,
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
