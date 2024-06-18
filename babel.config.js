module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-transform-typescript-metadata",
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
    presets: ["babel-preset-expo"],
  };
};
