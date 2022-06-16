import { Configuration, RuleSetRule, WebpackPluginInstance } from 'webpack';
import { merge } from 'webpack-merge';

export type WebpackConfigBuilderPlugin<Env = {}> = (builder: WebpackConfigBuilder<Env>) => void;

class WebpackConfigBuilder<Env = {}> {
	private _config: Configuration = {};
	private _env: Env;

	constructor(env: Env) {
		this._env = env;
	}

	/** Readonly build env */
	public get env(): Readonly<Env> {
		return this._env;
	}

	/** Get current config */
	public get config(): Readonly<Configuration> {
		return this._config;
	}

	/** Merge additional config */
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

	/** Add rule */
	public addRule(rule: RuleSetRule): this {
		return this.merge({
			module: {
				rules: [rule]
			}
		});
	}

	/** Manually transform config */
	public map(transformer: (config: Configuration) => Configuration): this {
		this._config = transformer(this._config);

		return this;
	}

	/** Apply plugin */
	public apply(plugin: WebpackConfigBuilderPlugin<Env>): this {
		plugin(this);

		return this;
	}
}

export default WebpackConfigBuilder;
