import IRecord from '../../IRecord';

describe('IRecord.pick', () => {
	it('picks only specified keys', () => {
		const source = { foo: 'foo', bar: 'bar', baz: 'baz' };
		const result = IRecord.pick(['foo', 'bar'])(source);

		expect(result).toHaveProperty('foo');
		expect(result).toHaveProperty('bar');
		expect(result).not.toHaveProperty('baz');
	});
});
