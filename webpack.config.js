module.exports = {
  entry: {
    perf: "./src/body-script.ts",
    head: "./src/head-embeds.ts"
  },
  module: {
    rules: [
      {
        test: /\.js|.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "[name].js"
  }
};
