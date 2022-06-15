export type BabelPreset = string | [string, Record<string, any>];

export type BabelPlugin = string | [string, Record<string, any>];

export interface BabelConfig {
	presets?: BabelPreset[];
	plugins?: BabelPlugin[];
}
