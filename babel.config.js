module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "auto", // Set modules option to "false" or "auto"
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
};
