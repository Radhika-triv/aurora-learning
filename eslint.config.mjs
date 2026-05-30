import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** Flat config (ESLint 9+) using eslint-config-next's native flat presets. */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
