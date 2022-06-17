# @lndsld/config-builders

Builder of configs with chaining API for tools such as webpack

## WebpackConfigBuilder

Allows to build [webpack](https://webpack.js.org) config:

```js
/** webpack.config.js */
const { WebpackConfigBuilder } = require("@lndsld/config-builders");

const builder = new WebpackConfigBuilder();

builder
    .merge({
        entry: "src/index.js",
        mode: 'production',
        devtool: 'source-map'
    })
    .addRule({
        test: /.js$/,
        loader: require.resolve("babel-loader")
    });

module.exports = builder.config;
```

## Plugins API

Allows to split configuration to plugins:

```js
/** webpack.config.js */
const { WebpackConfigBuilder } = require("@lndsld/config-builders");
const processJsPlugin = require("./processJsPlugin");

const builder = new WebpackConfigBuilder();

builder
    .merge({
        entry: "src/index.js",
        mode: 'production',
        devtool: 'source-map'
    })
    .apply(processJsPlugin)

module.exports = builder.config;

/** processJsPlugin.js */
function processJsPlugin(builder) {
    builder
        .addRule({
            test: /.js$/,
            loader: require.resolve("babel-loader")
        })
}

module.exports = processJsPlugin;
```

## Env

Allows to pass environment to plugins:

```js
/** webpack.config.js */
const { WebpackConfigBuilder } = require("@lndsld/config-builders");
const path = require("path");
const entrypointPlugin = require("./processJsPlugin");

const builder = new WebpackConfigBuilder({ srcPath: path.resolve(__dirname, "src") });

builder
    .apply(entrypointPlugin)

module.exports = builder.config;

/** entrypointPlugin.js */
const path = require("path");

function entrypointPlugin(builder) {
    builder.merge({
        entry: path.resolve(builder.env.srcPath, "index.js")
    })
}
```

## BabelConfigBuilder

Allows to build config for [babel-loader](https://webpack.js.org/loaders/babel-loader/):

```js
/** webpack.config.js */
const { WebpackConfigBuilder } = require("@lndsld/config-builders");
const processJsPlugin = require("./processJsPlugin");

const builder = new WebpackConfigBuilder({ isTypescript: true });

builder
    .merge({
        entry: "src/index.ts",
        mode: 'production',
        devtool: 'source-map'
    })
    .apply(processJsPlugin)

module.exports = builder.config;

/** processJsPlugin.js */
const { BabelConfigBuilder } = require("@lndsld/config-builders");

function processJsPlugin(builder) {
    const babelBuilder = new BabelConfigBuilder(builder.env);

    babelBuilder.addPreset([
        require.resolve('@babel/preset-env'),
        { targets: { browsers: 'last 2 versions' } }
    ]);

    if(builder.env.isTypescript) {
        babelBuilder.addPreset(require.resolve('@babel/preset-typescript'))
    }

    builder
        .addRule({
            test: /.js$/,
            loader: require.resolve("babel-loader"),
            ...babelBuilder.config
        })
}

module.exports = processJsPlugin;
```
