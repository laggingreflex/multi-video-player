const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils')
require('./key-controls')

module.exports = class {
  componentWillMount() {
    this.url = URL.createObjectURL(this.props.file);
    // this.props.file.url = URL.createObjectURL(this.props.file);
  }
  componentWillUnmount() {
    URL.revokeObjectURL(this.url);
    // URL.revokeObjectURL(this.props.file.url);
    // delete this.props.file.url;
  }
  render({ store, state, file }) {
    // return h.div.wrapper('video')
    // if (!this.props.file.url) return
    const video = h.video({
      // title: file.name,
      muted: true,
      controls: false,
      // src: this.url,
      src: this.url,
      autoplay: store.settings.playMode !== 'play-single',
      loop: true,
    });
    return video;
    return h.div([
      h.div.controls([
        h.button.top({
          onclick: e => {
            state.files = [
              file,
              ...state.files.slice(0, state.files.indexOf(file)),
              ...state.files.slice(state.files.indexOf(file) + 1),
            ];
          }
        }, 'T')
      ]),
      file.name,
      video
    ]);
  }
  componentDidMount() {
    // this.props.file.url = URL.createObjectURL(this.props.file);
    // if (this.base.querySelector) {
    //   this.video = this.base.querySelector('video');
    // }
    // this.url = URL.createObjectURL(this.props.file);
  }
  componentDidUpdate() {}
}

function style(e, styles) {
  // console.log(e);
  for (const prop in styles) {
    e.style[prop] = styles[prop];
  }
  e['data-unStyle'] = () => {
    for (const prop in styles) {
      e.style[prop] = null;
    }
  };
}
