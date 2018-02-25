const undb = require('undb');

const listeners = [];

const db = undb({
  path: 'v3',
  // debounce: 1,
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
  onChange: db => {
    listeners.forEach(l => l(Object.assign({}, db)));
  },
});

exports.onChange = l => {
  listeners.push(l);
  l(Object.assign({}, db));
};

exports.store = db.store;
exports.state = db.state;
