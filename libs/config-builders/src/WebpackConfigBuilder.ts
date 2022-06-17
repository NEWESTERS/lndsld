import { Configuration, RuleSetRule, WebpackPluginInstance } from 'webpack';
import { merge } from 'webpack-merge';

/**
 * Declaration of plugin for webpack configuration builder
 * @public
 */
export type WebpackConfigBuilderPlugin<Environment = {}> = (
	builder: WebpackConfigBuilder<Environment>
) => void;

/**
 * Builder for webpack configuration
 * @public
 */
class WebpackConfigBuilder<Environment = {}> {
	private _config: Configuration = {};
	private _env: Environment;

	public constructor(environment: Environment) {
		this._env = environment;
	}

	/** Readonly build env */
	public get env(): Readonly<Environment> {
		return this._env;
	}

	/** Current webpack configuration */
	public get config(): Readonly<Configuration> {
		return this._config;
	}

	/** Merge additional configuration */
	public merge(config: Configuration): this {
		this._config = merge(this._config, config);

		return this;
	}

	/** Add webpack plugin to configuration */
	public addPlugin(plugin: WebpackPluginInstance): this {
		return this.merge({
			plugins: [plugin]
		});
	}

	/** Add module rule to configuration */
	public addRule(rule: RuleSetRule): this {
		return this.merge({
			module: {
				rules: [rule]
			}
		});
	}

	/** Manually transform configuration */
	public map(transformer: (config: Configuration) => Configuration): this {
		this._config = transformer(this._config);

		return this;
	}

	/** Apply builder plugin */
	public apply(plugin: WebpackConfigBuilderPlugin<Environment>): this {
		plugin(this);

		return this;
	}
}

export default WebpackConfigBuilder;
