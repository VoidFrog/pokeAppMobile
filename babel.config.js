module.exports = {
  plugins: [
      ['react-native-worklets-core/plugin'],
      ['react-native-reanimated/plugin', { processNestedWorklets: true }],
      ['unplugin-typegpu/babel']
  ],
  presets: [
    'babel-preset-expo'
  ]
}