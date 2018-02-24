const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils');

module.exports = class {
  render({ state }) {
    return h.div([
      h.input({
        id: 'input',
        type: 'file',
        multiple: true,
        onchange: e => state.files = [...(state.files || []), ...(e.target.files || [])],
      }),
      h.div({ id: 'videos' }),
      state.files && h.div `${state.files.length} files loaded`,
    ]);
  }
}
