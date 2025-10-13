import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const baseConfig = {
  typedRoutes: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  redirects: async () => [
    {
      source: "/en/bangla",
      destination: "/bn",
      permanent: true,
    },
  ],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(baseConfig);
