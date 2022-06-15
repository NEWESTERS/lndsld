import { BabelConfig, BabelPlugin, BabelPreset } from '../types';

class BabelConfigBuilder {
	private _config: BabelConfig = {};

	public get config(): Readonly<BabelConfig> {
		return this._config;
	}

	public merge(config: BabelConfig): this {
		this._config = {
			plugins: [...(this._config.plugins ?? []), ...(config.plugins ?? [])],
			presets: [...(this._config.presets ?? []), ...(config.presets ?? [])]
		};

		return this;
	}

	public addPlugin(plugin: BabelPlugin): this {
		return this.merge({
			plugins: [plugin]
		});
	}

	public addPreset(preset: BabelPreset): this {
		return this.merge({
			presets: [preset]
		});
	}

	public customize(customization: BabelConfig | ((config: BabelConfig) => BabelConfig)): this {
		if (typeof customization === 'function') {
			this._config = customization(this._config);

			return this;
		} else {
			return this.merge(customization);
		}
	}
}

export default BabelConfigBuilder;
