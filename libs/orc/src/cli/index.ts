import {
	JsonFileReader,
	Orchestrator,
	ShellRunner,
	OrcConfigProvider,
	PackageJsonProvider,
	FilesystemFinder,
	OrcCli
} from '../services';

const jsonReader = new JsonFileReader();

const fsFinder = new FilesystemFinder();

const packageJson = new PackageJsonProvider({ pathFinder: fsFinder, reader: jsonReader });

const orcConfig = new OrcConfigProvider({
	pathFinder: fsFinder,
	reader: jsonReader,
	packageJsonProvider: packageJson
});

const taskRunner = new ShellRunner({ commandProvider: orcConfig, pathFinder: fsFinder });

const orchestrator = new Orchestrator({ dependencyProvider: orcConfig, taskRunner });

const orcCli = new OrcCli({ runner: orchestrator });

orcCli.start(process.argv, process.env).catch((error) => console.error(error));
