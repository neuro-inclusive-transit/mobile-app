const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	webpack.Utils.addCopyRule('**/*.html');
	webpack.Utils.addCopyRule('**/*.js');
	webpack.Utils.addCopyRule('**/*.css');

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	webpack.Utils.addCopyRule('**/*.wav');

	return webpack.resolveConfig();
};
