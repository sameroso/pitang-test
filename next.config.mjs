/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        missing: [{ type: "cookie", key: "user" }],
        permanent: false,
      },
      {
        source: "/auth/login",
        has: [{ type: "cookie", key: "user" }],
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
