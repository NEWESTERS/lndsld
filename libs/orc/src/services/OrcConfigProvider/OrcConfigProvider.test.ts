import { IConfigProvider, IPathFinder, IReader } from '../../interfaces';
import { PackageJson } from '../../models';
import { OrcConfigProvider } from './OrcConfigProvider';

describe('OrcConfigProvider', () => {
	describe('getCommand', () => {
		const pathFinder: IPathFinder = {
			*findAll() {
				yield 'test';
			},
			findFirst() {
				return 'test';
			}
		};

		const reader: IReader = {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			readSync(path: string): any {
				return {
					scripts: {
						foo: {
							command: 'run-foo'
						}
					}
				};
			}
		};

		const packageJsonProvider: IConfigProvider<PackageJson> = {
			data: {
				scripts: {
					foo: 'ignored',
					bar: 'run-bar'
				}
			}
		};

		const provider = new OrcConfigProvider({
			reader,
			pathFinder,
			packageJsonProvider
		});

		it('should get command from orc config', () => {
			const command = provider.getCommand('foo');

			expect(command).toBe('run-foo');
		});

		it('should fallback to package.json script if not found', () => {
			const command = provider.getCommand('bar');

			expect(command).toBe('run-bar');
		});
	});
});
