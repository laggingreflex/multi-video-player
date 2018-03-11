const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });

module.exports = class {

  render({ state, store }) {
    if (!state.files) return;

    const videos = state.files.map(({ url, file }, i) => h(require('../video'), Object.assign({}, this.props, {
      file,
      url,
      key: url,
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
