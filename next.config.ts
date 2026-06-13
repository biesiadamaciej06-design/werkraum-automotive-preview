import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "werkraum-automotive-preview";
const isUserPagesRepository = repository.endsWith(".github.io");
const basePath =
  isProduction && repository && !isUserPagesRepository ? `/${repository}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
