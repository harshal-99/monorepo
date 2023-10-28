const baseConfig = require('../../eslint.config.js');
module.exports = [
	...baseConfig,
	{
		files: [
			'packages/email-client/**/*.ts',
			'packages/email-client/**/*.tsx',
			'packages/email-client/**/*.js',
			'packages/email-client/**/*.jsx',
		],
		rules: {},
	},
	{
		files: ['packages/email-client/**/*.ts', 'packages/email-client/**/*.tsx'],
		rules: {},
	},
	{
		files: ['packages/email-client/**/*.js', 'packages/email-client/**/*.jsx'],
		rules: {},
	},
	...compat.extends('plugin:@nx/react'),
];
