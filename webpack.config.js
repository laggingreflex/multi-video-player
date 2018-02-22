require('dotenv').load();
const Path = require('path');
const webpack = require('webpack');
const clean = require('clean-webpack-plugin');
const extract = require('extract-text-webpack-plugin');
const html = require('html-webpack-plugin');
const analyze = require('webpack-bundle-analyzer/lib/BundleAnalyzerPlugin');

const isDev = /webpack-dev/.test(process.env.npm_lifecycle_script || process.argv.join());
const isProd = !isDev;

const srcPath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'dist');

module.exports = () => ({
  context: srcPath,
  entry: '.',
  output: {
    filename: 'app.js',
    path: buildPath,
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate: _ => `file:///${_.absoluteResourcePath.replace(/\\/g, '/')}`,
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  module: {
    rules: [{
      test: /\.css$/,
      use: extract.extract({
        fallback: 'style-loader',
        use: [{ loader: 'css-loader', }]
      })
    }, {
      test: /\.styl$/,
      use: extract.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:5]',
            camelCase: true,
            minimize: true,
            sourceMap: true
          }
        }, 'stylus-loader']
      })
    }, {
      test: /\.(png|jpe?g|woff|woff2|eot|ttf|svg|pdf|mp3|ogg|docx)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'url-loader',
        options: { name: '[path][name].[ext]', limit: 0 }
      }
    }, {
      test: /\.(txt|md)$/,
      use: 'text-loader'
    }]
  },
  plugins: [
    isProd && new clean(['build']),
    new extract({
      filename: 'app.css',
      disable: isDev,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new html({ template: 'html.js', }),
    isProd && new analyze({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true
    }),
  ].filter(Boolean),
  devServer: {
    port: process.env.PORT || 8000,
    disableHostCheck: true,
    historyApiFallback: true,
    https: true,
  }
});
