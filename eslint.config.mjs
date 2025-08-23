import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(import.meta.url);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow img tags but warn about performance implications
      "@next/next/no-img-element": "warn",
      // Ensure consistent rule application
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];

export default eslintConfig;
