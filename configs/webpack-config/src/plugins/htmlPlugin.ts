import { WebpackConfigBuilderPlugin } from '@lndsld/config-builders';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export interface HtmlPluginOptions {
	publicUrl: string;
	indexHtmlPath: string;
}

const htmlPlugin: WebpackConfigBuilderPlugin<HtmlPluginOptions> = (builder) => {
	const { indexHtmlPath, publicUrl } = builder.env;

	builder.addPlugin(
		new HtmlWebpackPlugin({
			template: indexHtmlPath,
			publicPath: publicUrl,
			chunks: ['main']
		})
	);
};

export default htmlPlugin;
