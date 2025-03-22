import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
	js.configs.recommended,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json',
			},
			globals: {
				process: 'readonly',
				Buffer: 'readonly',
				setTimeout: 'readonly',
				console: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-floating-promises': 'error',
			'no-console': ['warn', { allow: ['error', 'warn'] }],
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					tabWidth: 2,
				},
			],
		},
	},
	{
		files: ['**/tests/**/*.ts'],
		languageOptions: {
			globals: {
				describe: 'readonly',
				it: 'readonly',
				expect: 'readonly',
				beforeAll: 'readonly',
				afterAll: 'readonly',
			},
		},
		rules: {
			'no-console': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
	{
		ignores: ['dist/**', 'coverage/**'],
	},
	{
		files: ['drizzle.config.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.drizzle.json',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					tabWidth: 2,
				},
			],
		},
	},
	prettierConfig,
	{
		rules: {
			'@typescript-eslint/explicit-function-return-type': ['off'],
		},
	},
];
