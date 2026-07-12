import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  // Global ignores
  {
    ignores: ["dist/", "node_modules/", ".astro/", ".agents/", "public/"],
  },

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // React for island components
  {
    files: ["**/*.{tsx,jsx}"],
    plugins: {
      react: react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Not needed in React 19
      "react/prop-types": "off", // Using TypeScript for prop types
    },
  },

  // Astro recommended config
  ...eslintPluginAstro.configs.recommended,

  // Project-wide rules (from AGENTS.md conventions)
  {
    rules: {
      // Strict TypeScript — no any
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Functional and immutable by default
      "no-var": "error",
      "prefer-const": "error",
      "no-param-reassign": "error",

      // General best practices
      "no-console": "warn",
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
    },
  },

  // Prettier must be last — disables conflicting rules
  prettier,
);
