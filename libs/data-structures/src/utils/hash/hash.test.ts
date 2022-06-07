import hash from './hash';

describe('hash', () => {
	it('generates same hash for same primitive', () => {
		expect(hash(1)).toBe(hash(1));
	});

	it('generates same hash for same non primitive', () => {
		expect(hash({ foo: 'bar' })).toBe(hash({ foo: 'bar' }));
	});

	it('generates different hash for different primitive', () => {
		expect(hash(1)).not.toBe(hash(2));
	});

	it('generates different hash for different non primitive', () => {
		expect(hash({ foo: 'bar' })).not.toBe(hash({ bar: 'baz' }));
	});
});
