## API Report File for "@lndsld/orc"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="node" />

// @public
export class FilesystemFinder implements IPathFinder {
    // (undocumented)
    findAll(name: string, options?: PathFinderOptions | undefined): Generator<string, void, void>;
    // (undocumented)
    findFirst(name: string, options?: PathFinderOptions | undefined): string | undefined;
}

// @public
export interface ICommandProvider {
    getCommand: (taskName: string) => string | undefined;
}

// @public
export interface IConfigProvider<T> {
    data: T | undefined;
}

// @public
export interface IDependencyProvider {
    getDependencies: (taskName: string) => string[];
}

// @public
export interface IPathFinder {
    findAll(name: string, options?: PathFinderOptions): Generator<string, void, void>;
    findFirst(name: string, options?: PathFinderOptions): string | undefined;
}

// @public
export interface IReader {
    readSync<T = unknown>(path: string): T;
}

// @public
export interface ITaskRunner {
    run: (taskName: string, options?: TaskRunOptions) => Promise<void>;
}

// @public
export class JsonFileReader implements IReader {
    // (undocumented)
    readSync<T = unknown>(path: string): T;
}

// @public
export class OrcCli {
    constructor({ runner }: OrcCliOptions);
    // (undocumented)
    start(argv: string[], environment: NodeJS.ProcessEnv): Promise<void>;
}

// @public
export interface OrcCliOptions {
    // (undocumented)
    runner: ITaskRunner;
}

// @public
export interface OrcConfig {
    // (undocumented)
    scripts?: Record<string, OrcTask>;
}

// Warning: (ae-forgotten-export) The symbol "ConfigProvider" needs to be exported by the entry point index.d.ts
//
// @public
export class OrcConfigProvider extends ConfigProvider<OrcConfig> implements IDependencyProvider, ICommandProvider {
    constructor({ packageJsonProvider, ...configProviderOptions }: OrcConfigProviderOptions);
    // (undocumented)
    get data(): OrcConfig | undefined;
    // (undocumented)
    static fileName: string;
    // (undocumented)
    getCommand(taskName: string): string | undefined;
    // (undocumented)
    getDependencies(taskName: string): string[];
    // (undocumented)
    getTask(taskName: string): OrcTask | undefined;
}

// Warning: (ae-forgotten-export) The symbol "ConfigProviderOptions" needs to be exported by the entry point index.d.ts
//
// @public
export interface OrcConfigProviderOptions extends Omit<ConfigProviderOptions, 'fileName'> {
    // (undocumented)
    packageJsonProvider?: IConfigProvider<PackageJson>;
}

// @public
export class Orchestrator implements ITaskRunner {
    constructor({ dependencyProvider, taskRunner }: OrchestratorOptions);
    run(taskName: string, options?: TaskRunOptions): Promise<void>;
    // (undocumented)
    _runUniqueScript(taskName: string, options?: TaskRunOptions): Promise<void>;
}

// @public
export interface OrchestratorOptions {
    // (undocumented)
    dependencyProvider: IDependencyProvider;
    // (undocumented)
    taskRunner: ITaskRunner;
}

// @public
export interface OrcTask {
    command?: string;
    dependsOn?: string[];
}

// @public
export interface PackageJson {
    // (undocumented)
    name?: string;
    // (undocumented)
    orc?: OrcConfig;
    // (undocumented)
    scripts?: PackageScripts;
}

// @public
export class PackageJsonProvider extends ConfigProvider<PackageJson> implements ICommandProvider {
    constructor(options: PackageJsonProviderOptions);
    // (undocumented)
    static fileName: string;
    // (undocumented)
    getCommand(taskName: string): string | undefined;
}

// @public
export interface PackageJsonProviderOptions extends Omit<ConfigProviderOptions, 'fileName'> {
}

// @public
export type PackageScripts = Record<string, string>;

// @public
export interface PathFinderOptions {
    startPath?: string;
    stopPath?: string;
}

// @public
export class ShellRunner implements ITaskRunner {
    constructor({ commandProvider, pathFinder }: ShellRunnerOptions);
    // (undocumented)
    run(taskName: string, options?: TaskRunOptions): Promise<void>;
}

// @public
export interface ShellRunnerOptions {
    // (undocumented)
    commandProvider: ICommandProvider;
    // (undocumented)
    pathFinder: IPathFinder;
}

// @public
export interface TaskRunOptions {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
}

// (No @packageDocumentation comment for this package)

```
