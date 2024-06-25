module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-transform-typescript-metadata",
      "react-native-reanimated/plugin",
    ],
    presets: ["babel-preset-expo"],
  };
};
