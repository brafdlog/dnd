module.exports = {
	entry: './js/app.js',
	output: {
		filename: './build/app.js'
	},
	// 	Makes debugging easier - when we debug we won't see all the webpack crap. We will see mostly just the source code.
	devtool: 'source-map',
	module: {
		preLoaders: [
			// {test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader'}
		],
		loaders: [
			// Test is the regex and loader is the loaders to run for this regex.
			// In this case, for files ending in .css run the css loader and then the style loader
			{test: /\.css$/, loader: 'style!css!'},
			{test: /\.js$/, exclude: /node_modules/, loader: 'jsx-loader'},
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
		]
	}
}