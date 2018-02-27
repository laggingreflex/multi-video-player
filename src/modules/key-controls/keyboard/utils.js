exports.matchKey = (...keys) => {
  keys = keys.map(_ => _.toLowerCase());
  return key => keys.includes(key.toLowerCase());
}
