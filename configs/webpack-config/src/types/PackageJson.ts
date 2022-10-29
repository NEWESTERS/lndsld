interface PackageJson {
	name: string;
	version: string;
	main?: string;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
}

export default PackageJson;
