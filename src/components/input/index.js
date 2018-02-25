const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils');

const { state } = require('../../db');

window.ondragover = e => {
  if ((e.dataTransfer.files.length || e.dataTransfer.items.length) && !state.filesBeingDropped) {
    state.filesBeingDropped = e.dataTransfer.files.length || e.dataTransfer.items.length;
  }
  e.preventDefault()
}

module.exports = class {
  render({ state }) {
    const input = h.input({
      id: 'input',
      type: 'file',
      multiple: true,
      // onchange: e => state.files = [...(state.files || []), ...(e.target.files || [])],
      onchange: e => {
        // console.log(e.target.files);
        state.filesBeingDropped = false;
        state.files = Array.from(e.target.files);
      },
      style: {
        visibility: 'hidden',
        // zIndex: state.filesBeingDropped ? 100 : null,
      },
      //onchange: function(e) { state.files = [...(state.files || []), ...(e.target.files || [])] },
      ref: _ => this.input = this.input || _,
    });
    // return input;
    return h.div.wrapper({
      draggable: true,
      style: {
        zIndex: state.filesBeingDropped ? 100 : null,
      },
      class: [state.filesBeingDropped && 'filesBeingDropped'],
      ondrop: e => {
        e.preventDefault();
        state.filesBeingDropped = false;
        state.files = Array.from(e.dataTransfer.files);
      },
      onclick: e => this.input.click(),
    }, [
      input,
      h.p(
        state.filesBeingDropped
        ? `📁 Drop ${state.filesBeingDropped} files`
        : `📁 Open files (or drop here)`
      ),
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
