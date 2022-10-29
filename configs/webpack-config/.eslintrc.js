module.exports = {
	extends: ['@lndsld/eslint-config/library'],
	parserOptions: { tsconfigRootDir: __dirname },
	rules: {
		'unicorn/prevent-abbreviations': [
			'error',
			{
				replacements: {
					env: false,
					dev: false
				}
			}
		],
		'unicorn/prefer-module': 'off',
		'unicorn/prefer-node-protocol': 'off'
	}
};
