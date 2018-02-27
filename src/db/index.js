const undb = require('undb');
const merge = require('merge-options');
// const store = require('./store');
// const state = require('./state');
const { toggleList } = require('./utils');

const listeners = [];

const methods = {
  state: {},
  store: {
    settings: {
      playModeToggle: (toggle => function() { this.playMode = toggle(this.playMode) })(toggleList([
        'play-all-muted',
        'play-single',
        'play-all',
        // 'control-all',
      ])),
      styleToggle: (toggle => function() { this.style = toggle(this.style) })(toggleList([
        'mason',
        'flat',
        'funnel',
      ])),
    },
  }
};

const initial = {
  state: {},
  store: {
    settings: {
      playMode: 'play-all-muted',
      style: 'mason',
    }
  },
};

const db = undb({
  path: 'v3',
  // debounce: 1,
  initial,
  read: (opts, read) => {
    let data = read(opts);
    data = merge(data, methods);
    return data;
  },
  write: (db, opts, write) => {
    const data = Object.assign({}, db || {}, {
      state: {},
    });
    write(data, opts);
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
