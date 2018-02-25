const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils');
// const dragula = require('dragula');
// const { Draggable } = require('@shopify/draggable');

module.exports = class {
  render({ state }) {
    const files = state.files || [];
    return h.div(files.map(f => h.div(f.name)));
    return h.ol({}, Array.from(files).map(file => h.li({
      // class: [state.playingFiles && state.playingFiles.includes(file) && 'playing'].filter(Boolean)
    }, [file.name])));
  }
  componentDidUpdate() {
    // this.componentDidMount()
    // console.log('?');
  }
  componentDidMount() {
    // console.log(`this.base:`, this.base);
    // dragula([this.base]);
    // dragula([this.base], {
    //   mirrorContainer: this.base,
    // });
    // new Draggable([document.body])
  }

}
