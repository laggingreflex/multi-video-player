const __ = require('../common/utils');

const _ = module.exports = { ...__ };

_.multiRef = (...refs) => {
  return r => {
    for (const ref of refs) ref(r);
  }
}
