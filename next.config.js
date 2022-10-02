const path = require('path');

module.exports = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},

	images: {
		domains: ['school.kutubee.com'],
	},
	rules: [
		{
			test: /\.(png|jpe?g|gif)$/i,
			use: [
				{
					loader: 'file-loader',
				},
			],
		},
	],
};
