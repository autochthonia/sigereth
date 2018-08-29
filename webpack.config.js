/* eslint-env node */
const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});
const dashboardPlugin = new DashboardPlugin();
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  openAnalyzer: false,
});
const tsConfigPathsPlugin = new TsconfigPathsPlugin({
  /*configFile: "./path/to/tsconfig.json" */
});

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loaders: ['babel-loader', 'awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '*': './src',
    },
    plugins: [tsConfigPathsPlugin],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
    overlay: true,
    historyApiFallback: {
      historyApiFallback: true,
    },
  },
  plugins: [htmlPlugin, dashboardPlugin, bundleAnalyzerPlugin],
};

module.exports.serve = {
  content: [__dirname],
  // eslint-disable-next-line no-unused-vars
  add: (app, middleware, options) => {
    app.use(convert(history({})));
  },
};
