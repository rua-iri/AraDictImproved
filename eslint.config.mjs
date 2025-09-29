import globals from "globals";
import pluginJs from "@eslint/js";
import ts from "typescript-eslint";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: ts.parser,
      sourceType: "module",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  ...ts.configs.recommended,
];
