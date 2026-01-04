import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
    js.configs.recommended,
    {
        files: [
            "**/*.ts",
        ],
        ignores: [
            "dist/**",
            "node_modules/**"
        ],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: "module",
            },
            globals: globals.node,
        },
        plugins: {
            "@typescript-eslint": tsPlugin
        },
        rules: {
            "no-unused-vars": "off",
            semi: ["error", "always"],
            "@typescript-eslint/no-unused-vars": ["error", {
                args: "all",
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrors: "all",
                caughtErrorsIgnorePattern: "^_",
                destructuredArrayIgnorePattern: "^_",
            }],
            "@typescript-eslint/no-explicit-any": "warn",
        },
    }
];