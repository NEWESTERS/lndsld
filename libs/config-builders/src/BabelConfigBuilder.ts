/**
 * Babel preset declaration
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BabelPreset = string | [string, Record<string, any>];

/**
 * Babel plugin declaration
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BabelPlugin = string | [string, Record<string, any>];

/**
 * Babel configuration declaration
 * @public
 */
export interface BabelConfig {
	presets?: BabelPreset[];
	plugins?: BabelPlugin[];
}

/**
 * Declaration of plugin for babel configuration builder
 * @public
 */
export type BabelConfigBuilderPlugin<Environment = {}> = (builder: BabelConfigBuilder<Environment>) => void;

/**
 * Builder for babel configuration
 * @public
 */
class BabelConfigBuilder<Environment = {}> {
	private _config: BabelConfig = {};
	private _env: Environment;

	public constructor(environment: Environment) {
		this._env = environment;
	}

	/** Readonly build env */
	public get env(): Readonly<Environment> {
		return this._env;
	}

	/** Current babel configuration */
	public get config(): Readonly<BabelConfig> {
		return this._config;
	}

	/** Merge another babel configuration */
	public merge(config: BabelConfig): this {
		this._config = {
			plugins: [...(this._config.plugins ?? []), ...(config.plugins ?? [])],
			presets: [...(this._config.presets ?? []), ...(config.presets ?? [])]
		};

		return this;
	}

	/** Add babel plugin to configuration */
	public addPlugin(plugin: BabelPlugin): this {
		return this.merge({
			plugins: [plugin]
		});
	}

	/** Add babel preset to configuration */
	public addPreset(preset: BabelPreset): this {
		return this.merge({
			presets: [preset]
		});
	}

	/** Apply builder plugin */
	public apply(plugin: BabelConfigBuilderPlugin<Environment>): this {
		plugin(this);

		return this;
	}
}

export default BabelConfigBuilder;
