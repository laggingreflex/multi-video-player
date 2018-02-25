const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils');

const { state } = require('../../db');

let dragLeaveTimeout;
window.ondragover = e => {
  clearTimeout(dragLeaveTimeout);
  if ((e.dataTransfer.files.length || e.dataTransfer.items.length) && !state.filesBeingDropped) {
    state.filesBeingDropped = e.dataTransfer.files.length || e.dataTransfer.items.length;
  } else {
    // state.filesBeingDropped = false;
  }
  e.preventDefault()
}

window.ondragend =
window.ondragleave =
  e => {
    clearTimeout(dragLeaveTimeout);
    dragLeaveTimeout = setTimeout(() => {
      if (state.filesBeingDropped)
        state.filesBeingDropped = false
    }, 100);
    console.log('leaving?', { target: e.target, e });
    // if (state.filesBeingDropped)
    //   state.filesBeingDropped = false
    // e.preventDefault()
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
        visibility: (state.filesBeingDropped || !state.files) ? 'visible' : 'hidden',
      },
      class: [state.filesBeingDropped && 'filesBeingDropped'].filter(Boolean),
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
