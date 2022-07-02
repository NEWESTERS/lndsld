import IRecord from '../../IRecord';

describe('IRecord.get', () => {
	it('returns record property by key', () => {
		const rec = { foo: 1, bar: 'text' };

		expect(IRecord.get('foo')(rec)).toBe(rec.foo);
	});
});
