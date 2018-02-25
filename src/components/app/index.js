const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });

module.exports = class {
  render(props) {
    const { state } = props;
    return h.div.app({
      // draggable: true,
      ondrop1: e => {
        if (state.files) {
          e.preventDefault();
          console.log(e.target.tagName);
        }
        return;
        console.log('even?');
        if (e.target.tagName === 'INPUT') {

        } else {
          e.preventDefault();
          console.log(e.target.tagName);
        }
      },
      class: [
        state.files && state.files.length && 'files-selected',
      ].filter(Boolean)
    }, [
      // h.div.controls(h(require('../controls'), props)),
      h.div.input(h(require('../input'), props)),
      // h.div.settings(h(require('../settings'), props)),
      // h.div.playlist(h(require('../playlist'), props)),
      h.div.videos(h(require('../videos'), props)),
    ]);
  }
  componentDidMount() {
    this.update();

  }
  componentDidUpdate() { this.update() }
  update() {

  }
};
