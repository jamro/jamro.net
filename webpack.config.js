const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

function getDataJson() {
  let data = fs.readdirSync(path.join(__dirname, 'data'))
              .filter(filename => filename.substring(filename.length - 5) == '.json')
              .map(filename => fs.readFileSync(path.join(__dirname, 'data', filename)))
              .map(content => JSON.parse(content))
              .reduce((data, json) => Object.assign(data, json));

  if(!data.config) {
    throw new Error('ERROR: config is required');
  }
  return data;
}

module.exports = {
  entry: path.join(__dirname, 'src/main/script/index.js'),
  output: {
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.hbs.html$/,
        use: ['handlebars-loader?helperDirs[]=' + __dirname + '/build/helpers']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
         test: /\.(png|svg|jpe?g|jpeg|gif)$/i,
         type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/main/template/index.hbs.html'),
      templateParameters: getDataJson()
    }),
    new CopyPlugin({patterns: [
      { from: path.join(__dirname, 'assets'), to: path.join(__dirname, 'dist/img') }
    ]}),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /node_modules/,
          enforce: true
        },
      }
    }
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true
  }
};
