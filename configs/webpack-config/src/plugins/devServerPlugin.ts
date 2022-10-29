import path from 'path';
import { WebpackConfigBuilderPlugin } from '@lndsld/config-builders';
import type { RequestHandler } from 'webpack-dev-server';

import { removeTrailingSlash } from '../utils';

/** Middleware для Express, который производит редирект всех запросов на контекст приложения */
function createRedirectMiddleware(publicUrl: string): RequestHandler {
	return (request, response, next) => {
		if (request.url.startsWith(publicUrl)) {
			next();
		} else {
			response.redirect(path.join(publicUrl, request.path));
		}
	};
}

export interface DevServerOptions {
	publicUrl: string;
	useHttps: boolean;
	devServerPort: number;
}

const devServerPlugin: WebpackConfigBuilderPlugin<DevServerOptions> = (builder) => {
	const { useHttps, publicUrl, devServerPort } = builder.env;

	builder.merge({
		devServer: {
			static: {
				publicPath: publicUrl
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': '*'
			},
			compress: true,
			hot: true,
			port: devServerPort,
			https: useHttps,
			historyApiFallback: true,
			devMiddleware: {
				publicPath: publicUrl
			},
			onAfterSetupMiddleware: (devServer) => {
				devServer.app?.use(createRedirectMiddleware(removeTrailingSlash(publicUrl)));
			}
		}
	});
};

export default devServerPlugin;
