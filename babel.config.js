module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ["babel-plugin-transform-typescript-metadata", ['module:react-native-dotenv']],
    presets: ["babel-preset-expo"],
  };
};
