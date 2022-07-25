const path = require("path");
const HtmlWebpack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const HtmlWebpackLiveReload = require("html-webpack-live-reload-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = {
  //   mode: "development",
  entry: "./src/js/index.js",
  devtool: "eval-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(sa|c|sc)ss$/i,
        use: [MiniCssExtract.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      //   {
      //     test: /\.(png|jp(e*)g|svg)$/,
      //     dependency: { not: ["url"] },
      //     use: [
      //       {
      //         loader: "url-loader",
      //         options: {
      //           limit: 8192,
      //         },
      //       },
      //     ],
      //     type: "javascript/auto",
      //   },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpack({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackLiveReload(),
    new MiniCssExtract({
      filename: "style.css",
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            // Svgo configuration here https://github.com/svg/svgo#configuration
            [
              "svgo",
              {
                plugins: extendDefaultPlugins([
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                  {
                    name: "addAttributesToSVGElement",
                    params: {
                      attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                    },
                  },
                ]),
              },
            ],
          ],
        },
      },
    }),
  ],
};
