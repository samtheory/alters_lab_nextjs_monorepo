/** @type {import('next').NextConfig} */
const nextConfig = {
	reactCompiler: true,
	transpilePackages: [
		'@ui/shared',
		'@types/shared',
		'@utils/shared',
		'@config/shared',
		'@api/client',
		'@store/shared',
		'@forms/shared'
	],
	experimental: {
		turbo: {
			resolveAlias: {
				'@': './'
			}
		}
	}
};

module.exports = nextConfig;
