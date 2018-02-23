const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils');

module.exports = class {
  render() {
    const { store } = this.props;
    return h.ul([
      h.li(h.label(
        `Concurrent videos: ${store.concurrentVideos || 4}`,
        h.input({
          type: 'range',
          min: 1,
          max: 30,
          step: 1,
          value: store.concurrentVideos || 4,
          onchange: e => store.concurrentVideos = Math.min(Math.max(parseInt(e.target.value) || 4, e.target.getAttribute('min')), e.target.getAttribute('max')),
        })
      ))
    ]);
    return 'settings'
  }
}
