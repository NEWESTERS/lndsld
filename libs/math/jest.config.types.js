/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	displayName: {
		color: 'blue',
		name: 'types',
	},
	runner: 'jest-runner-tsd',
	testMatch: ['**/*.test-d.ts'],
};
