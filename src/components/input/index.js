const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils');

module.exports = class {
  render({ state }) {
    const input = h.input({
      id: 'input',
      type: 'file',
      multiple: true,
      onchange: e => state.files = [...(state.files || []), ...(e.target.files || [])],
    });
    return input;
    return h.div([
      input,
      // h.div({ id: 'videos' }),
      // state.files && h.div `${state.files.length} files loaded`,
    ]);
  }
  componentDidMount() {
    // window.addEventListener('drop', e => this.onBodyDrop(e));
  }
  onBodyDrop(e) {
    const { state } = this.props;
    if (state.files) {
      e.preventDefault();
      console.log(e);
    }
  }
}
