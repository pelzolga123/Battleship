const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: / \.js$ /,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          { loader: 'url-loader' },
        ],
      },
    ],
  },
};
