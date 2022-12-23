import { IDependencyProvider, ITaskRunner } from '../../interfaces';
import { Orchestrator } from './Orchestrator';

describe('Orchestrator', () => {
	describe('run', () => {
		const dependencyProvider: IDependencyProvider = {
			getDependencies: (name) => {
				switch (name) {
					case 'build':
						return ['build:docs', 'build:cjs', 'build:types'];

					case 'build:docs':
						return ['build:types'];

					default:
						return [];
				}
			}
		};

		it('runs every script once', async () => {
			const mockBuild = jest.fn();

			const taskRunner: ITaskRunner = {
				run: async (scriptName) => {
					if (scriptName === 'build:types') {
						mockBuild();
					}
				}
			};

			const orc = new Orchestrator({ dependencyProvider, taskRunner });

			expect(mockBuild).toBeCalledTimes(0);

			await orc.run('build');

			expect(mockBuild).toBeCalledTimes(1);
		});

		it('runs scripts topologically', async () => {
			const scriptQueue: string[] = [];

			const taskRunner: ITaskRunner = {
				run: async (scriptName) => {
					scriptQueue.push(scriptName);
				}
			};

			const orc = new Orchestrator({ dependencyProvider, taskRunner });

			await orc.run('build');

			expect(scriptQueue[scriptQueue.length - 1]).toEqual('build');
		});
	});
});
