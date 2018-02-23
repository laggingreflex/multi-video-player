const undb = require('undb');

module.exports = (opts) => opts.onChange(undb(Object.assign({
  path: 'v1',
  debounce: 1,
  write: (db, opts, write) => {
    write(Object.assign({}, db || {}, {
      files: null,
    }), opts);
    return db;
  },
}, opts)));
