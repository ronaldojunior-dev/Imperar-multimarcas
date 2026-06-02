import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [".next/**", ".open-next/**", ".wrangler/**", "node_modules/**", "public/uploads/**"]
  },
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off"
    }
  }
];

export default config;
