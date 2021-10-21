/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
   mode: 'development',
   plugins: [
      require('autoprefixer'),
      new HtmlWebpackPlugin({
         title: 'Наш заголовок страницы',
         template: './static/index.html',
      }),
   ],
   entry: {
      main: path.resolve(__dirname, 'src/index.ts'),
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
         handlebars: 'handlebars/dist/handlebars.js',
      },
   },
   devServer: {
      static: {
         directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      compress: true,
      port: 9000,
   },
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: [
               'style-loader',
               {
                  loader: 'css-loader',
                  options: {
                     importLoaders: 1,
                     modules: true,
                  },
               },
               {
                  loader: 'postcss-loader',
               },
            ],
            // npm i style-loader css-loader -D
         },
         { test: /\.tsx?$/, loader: 'ts-loader' },
         {
            test: /\.(jpg|png|svg)$/,
            loader: 'file-loader',
         },
      ],
   },
};
