module.exports = function (plop) {
	plop.setGenerator('structure', {
		description: 'Generate structure typeclass and definition',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Structure name:',
			},
		],
		actions: [
			...['js', 'd.ts', 'test.ts', 'test-d.ts'].map((extension) => ({
				type: 'add',
				path: `src/structures/{{pascalCase name}}/{{pascalCase name}}.${extension}`,
				templateFile: `plop-templates/structures/Structure/Structure.${extension}.hbs`,
			})),
			{
				type: 'add',
				path: 'src/structures/{{pascalCase name}}/index.ts',
				templateFile:
					'plop-templates/structures/Structure/index.ts.hbs',
			},
			{
				type: 'append',
				path: 'src/structures/index.ts',
				templateFile: 'plop-templates/structures/index.ts.hbs',
			},
		],
	});
};
