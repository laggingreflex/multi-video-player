const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils');

module.exports = class {
  render({ store }) {
    return h.div([
      h.input({
        id: 'input',
        type: 'file',
        multiple: true,
        onchange: e => store.files = [...(store.files || []), ...(e.target.files || [])],
      }),
      h.div({ id: 'videos' }),
      store.files && h.div `${store.files.length} files loaded`,
    ]);
  }
}
