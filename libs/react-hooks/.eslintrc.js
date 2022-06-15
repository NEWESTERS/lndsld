module.exports = {
	extends: [
		'@lndsld/eslint-config/library',
		'plugin:react-hooks/recommended',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	parserOptions: { tsconfigRootDir: __dirname },
	rules: {
		'unicorn/prevent-abbreviations': [
			'error',
			{
				replacements: {
					ref: false,
					props: false,
					prop: false,
				},
			},
		],
	},
};
