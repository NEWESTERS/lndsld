import IRecord from '../../IRecord';

describe('IRecord.omit', () => {
	it('omits only specified keys', () => {
		const source = { foo: 'foo', bar: 'bar', baz: 'baz' };
		const result = IRecord.omit(['foo', 'bar'])(source);

		expect(result).not.toHaveProperty('foo');
		expect(result).not.toHaveProperty('bar');
		expect(result).toHaveProperty('baz');
	});
});
