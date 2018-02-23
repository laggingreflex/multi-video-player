const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });

module.exports = props => h.div.app([
  h.div.controls(h(require('../controls'), props)),
  h.div.input(h(require('../input'), props)),
  h.div.settings(h(require('../settings'), props)),
  h.div.playlist(h(require('../playlist'), props)),
  h.div.videos(h(require('../videos'), props)),
]);
