const baseConfig = require('../../eslint.config.js');
module.exports = [
	...baseConfig,
	{
		files: [
			'packages/remix-app/**/*.ts',
			'packages/remix-app/**/*.tsx',
			'packages/remix-app/**/*.js',
			'packages/remix-app/**/*.jsx',
		],
		rules: {},
	},
	{
		files: ['packages/remix-app/**/*.ts', 'packages/remix-app/**/*.tsx'],
		rules: {},
	},
	{
		files: ['packages/remix-app/**/*.js', 'packages/remix-app/**/*.jsx'],
		rules: {},
	},
	...compat.extends('plugin:@nx/react'),
];
