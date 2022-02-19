const ignoreWarnings = (value) => (config) => {
  config.ignoreWarnings = value;
  return config;
};

module.exports = function override(config, env) {
  return ignoreWarnings([/Failed to parse source map/])(config);
};
