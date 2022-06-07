// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		'@rushstack/eslint-config/profile/node-trusted-tool',
		'@rushstack/eslint-config/mixins/tsdoc',
		'plugin:unicorn/recommended',
	],
	plugins: ['unicorn'],
	ignorePatterns: [
		'**/*.test-d.ts',
		'.eslintrc.js',
		'jest.config.js',
		'jest.config.types.js',
		'plopfile.js',
		'build',
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
		'@typescript-eslint/no-namespace': [
			'warn',
			{ allowDeclarations: true },
		],
		'@rushstack/typedef-var': 'off',
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
