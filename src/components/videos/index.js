const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
require('./key-controls');

module.exports = class {

  render({ state, store }) {
    if (!state.files) return;

    const videos = state.files.map((file, i) => h(require('../video'), Object.assign({}, this.props, {
      file,
      i,
    })));
    return h.div.videos({
      // draggable: true,
      class: [
        `style-${store.settings.style || 'mason'}`,
        `zoom-${store.settings.zoom || 2}`,
      ].filter(Boolean),
    }, videos);
  }
}
