const isDev = process.env.NODE_ENV === 'development';
const path = require('path');

const config = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill',
    './src/index.js',
  ],
  output: {
    path: __dirname,
    filename: './src/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api*': {
        target: 'https://players-api.developer.alchemy.codes/',
        secure: false,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
};

module.exports = config;
