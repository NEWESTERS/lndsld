import { OrcConfig } from './OrcConfig';

/**
 * Definition of `"scripts"` section in `package.json`.
 * 
 * @public
 */
export type PackageScripts = Record<string, string>;

/** 
 * Definition of `package.json`
 * 
 * @public
 */
export interface PackageJson {
	name?: string;
	scripts?: PackageScripts;
	orc?: OrcConfig;
}
