import { Configuration, RuleSetRule, WebpackPluginInstance } from 'webpack';
import { merge } from 'webpack-merge';

export type WebpackConfigBuilderPlugin = (builder: WebpackConfigBuilder) => void;

class WebpackConfigBuilder {
	private _config: Configuration = {};

	public get config(): Readonly<Configuration> {
		return this._config;
	}

	public merge(config: Configuration): this {
		this._config = merge(this._config, config);

		return this;
	}

	public addPlugin(plugin: WebpackPluginInstance): this {
		return this.merge({
			plugins: [plugin]
		});
	}

	public addRule(rule: RuleSetRule): this {
		return this.merge({
			module: {
				rules: [rule]
			}
		});
	}

	public customize(customization: Configuration | ((config: Configuration) => Configuration)): this {
		if (typeof customization === 'function') {
			this._config = customization(this._config);

			return this;
		} else {
			return this.merge(customization);
		}
	}

	public apply(applier: WebpackConfigBuilderPlugin): this {
		applier(this);

		return this;
	}
}

export default WebpackConfigBuilder;
