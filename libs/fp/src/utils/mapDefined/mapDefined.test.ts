import mapDefined from './mapDefined';

describe('mapDefined', () => {
	const stringifyDefined = mapDefined((value: number) => value.toString());

	it('should return undefined for undefined argument', () => {
		const value: number | undefined = undefined;

		expect(stringifyDefined(value)).toEqual(undefined);
	});

	it('should apply transform to defined argument', () => {
		expect(stringifyDefined(1)).toEqual('1');
	});
});
