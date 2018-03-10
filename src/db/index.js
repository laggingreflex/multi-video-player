const undb = require('undb');
const merge = require('merge-options');
// const store = require('./store');
// const state = require('./state');
const { toggleList } = require('./utils');

const listeners = [];

const methods = {
  state: {
    addFile(file) {
      for (const [, existing] of Object.entries(this.files || {})) {
        if (existing.name === file.name) {
          console.warn('Skipping', file.name);
          return;
          // throw new Error(`Already added: '${file.name}'`);
        }
      }
      console.log(`Loading`, file.name);
      const url = URL.createObjectURL(file);
      // this.files.set(file, { url });
      if (!this.files) this.files = {};
      this.files[url] = file;
    },
    removeFile(url) {
      URL.revokeObjectURL(url);
      const file = this.files[url];
      if (file) {
        console.log(`Removing`, file.name);
        delete this.files[url];
        // this.files.delete(file);
      }
    },
  },
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
  state: {
    files: {},
  },
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
