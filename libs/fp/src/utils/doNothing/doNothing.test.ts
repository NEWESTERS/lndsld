import doNothing from './doNothing';

describe('doNothing', () => {
	it('actually does nothing with argument', () => {
		const value = { foo: 'bar' };

		expect(doNothing(value)).toBe(value);
	});
});
