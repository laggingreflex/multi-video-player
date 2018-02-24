const undb = require('undb');

module.exports = (opts) => opts.onChange(undb(Object.assign({
  path: 'v2',
  debounce: 1,
  initial: {
    state: {},
    store: {
      settings: {}
    },
  },
  write: (db, opts, write) => {
    write(Object.assign({}, db || {}, {
      state: {},
    }), opts);
    return db;
  },
}, opts)));
