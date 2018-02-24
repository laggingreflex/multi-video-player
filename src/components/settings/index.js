const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils');

module.exports = class {
  render({ store }) {
    return h.ul([
      h.li(h.label(
        `Max players: ${store.settings.maxPlayers || 4}`,
        h.input({
          type: 'range',
          min: 1,
          max: 30,
          step: 1,
          value: store.settings.maxPlayers || 4,
          oninput: e => store.settings.maxPlayers = Math.min(Math.max(parseInt(e.target.value) || 4, e.target.getAttribute('min')), e.target.getAttribute('max')),
        })
      ))
    ]);
  }
}
