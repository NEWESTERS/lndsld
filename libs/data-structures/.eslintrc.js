// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		'@rushstack/eslint-config/profile/node-trusted-tool',
		'@rushstack/eslint-config/mixins/tsdoc',
		'plugin:unicorn/recommended',
	],
	parserOptions: { tsconfigRootDir: __dirname },
	plugins: ['unicorn'],
	ignorePatterns: [
		'.eslintrc.js',
		'jest.config.js',
		'jest.config.types.js',
		'plopfile.js',
		'build',
		'**/*.test-d.ts',
		'webpack.config.js',
	],
	rules: {
		'unicorn/filename-case': [
			'error',
			{
				cases: {
					camelCase: true,
					pascalCase: true,
				},
			},
		],
		'unicorn/no-array-callback-reference': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'@rushstack/typedef-var': 'off',
		'@typescript-eslint/no-namespace': [
			'warn',
			{ allowDeclarations: true },
		],
		'@typescript-eslint/no-explicit-any': 'off',
	},
	overrides: [
		{
			files: ['**/*.js'],
			parser: '@babel/eslint-parser',
			parserOptions: {
				requireConfigFile: false,
			},
		},
	],
};
