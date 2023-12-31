/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.wizardingworld.com',
			},
			{
				protocol: 'https',
				hostname: 'static.wikia.nocookie.net',
			},
		],
	},
}

module.exports = nextConfig
