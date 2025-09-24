module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' }, // Makes Babel compatible with current Node version
      },
    ],
  ],
};