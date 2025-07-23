const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const path = require('path');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: {
        rules: {
            'no-unused-vars': 'warn',
            'no-debugger': 'error',
            'no-console': 'warn',
        },
    },
});

module.exports = [
    {
        ignores: [
            '**/*.config.*',
            'postcss.config.mjs',
            'eslint.config.js',
        ],
    },

    js.configs.recommended,

    {
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
            },
        },
    },

    ...compat.config({
        root: true,
        env: {
            browser: true,
            es2024: true,
            node: true,
        },
        parser: '@typescript-eslint/parser',
        parserOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            project: './tsconfig.json',
        },
        plugins: [
            '@typescript-eslint',
            'unused-imports',
            'prettier',
        ],
        extends: [
            'next',
            'next/core-web-vitals',
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:react-hooks/recommended',
            'plugin:prettier/recommended',
        ],
        rules: {
            'prettier/prettier': ['error'],
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            'no-empty': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            'no-debugger': 'error',
            'no-console': 'warn',
        },
        settings: {
            next: {
                rootDir: './',
            },
        },
    }),
];
