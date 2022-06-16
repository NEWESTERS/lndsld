import path from 'path';
import fs from 'fs';

import { PackageJson } from '../types';

function getPackageJson(packageJsonPath: string = path.resolve('package.json')): PackageJson {
	return JSON.parse(fs.readFileSync(packageJsonPath).toString());
}

export default getPackageJson;
