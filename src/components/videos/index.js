const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const dragula = require('dragula');

module.exports = class {

  componentDidMount() { this.updateVideos() }
  componentDidUpdate() { this.updateVideos() }
  updateVideos() {
    const { state, store } = this.props;
    console.log('?');
    if (!state.files) console.log('!state.files', state.files);
    if (!state.files) return;
    // if (!state.playableFiles) {
    //   state.playableFiles = state.files.slice(0, 1);
    // }
  }

  render({ state }) {
    if (!state.files) return;
    // if (!state.playableFiles) return 'Loading';

    // return `Playing ${state.playingFiles.length} files`
    const videos = state.files.map((file, i) => h(require('../video'), Object.assign({}, this.props, {
      file,
      i,
      // rendered: (...args) => this.oneVideoRendered(...args),
    })));
    // return h.ol.videos(videos.map(v => h.li(v)));
    return h.div.videos({
      draggable: true,
      class: [state.settings && state.settings.style || 'style-1'],
    }, videos);
    // return h.ol.videos(videos.map(video => h.li(video)));
    // return h.ol.videos(state.playingFiles.map((file, i) => h.li()));
  }

  oneVideoRendered() {
    const { state, store } = this.props;
    clearTimeout()
    this.load();
    if (state.playableFiles.length < state.files.length) {
      const push = state.files.find(e => !state.playableFiles.includes(e));
      if (!push) {
        throw new Error('no push?')
      } else {
        state.playableFiles.push(push);
      }
    }
  }

  load(){

  }

}
