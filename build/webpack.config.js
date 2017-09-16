import path from 'path';
import jquery from 'jquery';
import popper from 'popper.js';
import webpack from 'webpack';
import {WebpackBundleSizeAnalyzerPlugin} from 'webpack-bundle-size-analyzer';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

function getConfig(buildSettings) {
  let plugins = [];
  if(!buildSettings.devMode) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        comments: false
      })
    );
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    );
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    );
    plugins.push(
      new WebpackBundleSizeAnalyzerPlugin(buildSettings.tmp + 'bundle-size-report.txt')
    );
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: buildSettings.tmp + 'bundle-size-report.html',
        generateStatsFile: true,
        statsFilename: buildSettings.tmp + 'stats.json',
        openAnalyzer: false
      })
    );
  }
  plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  );
  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['assets', 'vendor1', 'vendor2']
  }));
  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: "manifest",
    minChunks: Infinity,
    filename: 'manifest.js'
  }));
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));

  return {
    entry: {
      app: path.join(__dirname, "../" , buildSettings.entry.app),
      assets: path.join(__dirname, "../" , buildSettings.entry.assets),
      vendor1: path.join(__dirname, "../" , buildSettings.entry.vendor1),
      vendor2: path.join(__dirname, "../" , buildSettings.entry.vendor2)
    },
  	output: {
  		filename: '[name].bundle.js'
  	},
    devtool: buildSettings.devMode ? 'source-map' : false,
    resolve: {
      alias: {
        'react': 'react-lite',
        'react-dom': 'react-lite'
      }
    },
    module: {
      loaders: [
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
          options: {
            publicPath: ' assets/',
            outputPath: '../assets/',
            limit: 25000
          }
        },
        {
          test : /\.jsx?/,
          include : path.join(__dirname, "../app/"),
          loader : 'babel-loader',
          query: {
            presets: ["es2015", "react"]
          }
        },
        {
          test: /\.json$/i,
          loader: 'json-loader'
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.(scss)$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    plugins: plugins
  };
}

export default getConfig;
