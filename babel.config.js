module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "auto",
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react", // Add this preset for handling JSX syntax
  ],
  plugins: ["@babel/plugin-proposal-do-expressions"],
};
