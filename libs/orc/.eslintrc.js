module.exports = {
	extends: ['@lndsld/eslint-config/library'],
	parserOptions: { tsconfigRootDir: __dirname },
	ignorePatterns: ['bin/**', 'lib/**', 'temp/**']
};
