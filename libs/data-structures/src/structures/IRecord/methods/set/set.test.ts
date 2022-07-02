import IRecord from '../../IRecord';

describe('IRecord.set', () => {
	it('sets specified key with specified value', () => {
		const rec1 = { foo: 'bar' };

		const rec2 = IRecord.set('foo', 'baz')(rec1);

		expect(rec2.foo).toEqual('baz');
	});

	it('returns original record if unchanged', () => {
		const rec1 = { foo: 'bar' };

		const rec2 = IRecord.set('foo', 'bar')(rec1);

		expect(rec2).toEqual(rec1);
	});
});
