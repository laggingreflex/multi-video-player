const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const dragula = require('dragula');

module.exports = class {

  componentDidMount() { this.updateVideos() }
  componentDidUpdate() { this.updateVideos() }
  updateVideos() {
    const { state, store } = this.props;
    if (!state.files) return 'Please drop some videos';
    const playingFiles = state.files.slice(0, store.settings.maxPlayers);
    if (!state.playingFiles || playingFiles.length !== state.playingFiles.length || playingFiles.find((e, i) => e !== state.playingFiles[i])) {
      state.playingFiles = playingFiles;
    }
    // if (!state.playingFiles
    //   || playingFiles.length !== state.playingFiles.length
    //   || playingFiles.find((e, i) => e !== state.playingFiles[i])
    // ) {
    //   console.log('changed because');
    //   console.log(!state.playingFiles, `!state.playingFiles`);
    //   console.log(playingFiles.length !== state.playingFiles.length, `playingFiles.length !== state.playingFiles.length`);
    //   console.log(playingFiles.find((e, i) => e !== state.playingFiles[i]), `playingFiles.find((e, i) => e !== state.playingFiles[i])`);
    //   state.playingFiles = playingFiles;
    // }
    // console.log('?');
    // dragula([this.base], {
    //   mirrorContainer: this.base,
    // });

    if (this.base && this.base.children && this.base.children.length) {
      // console.log(`this.base.children:`, this.base.children);

      /*
        1        100%
        2 3      50%
        4 5 6    33%
        7 8 9 10 25%

      */
      let i = 1;
      let j = 1;
      let k = 1;
      for (const child of this.base.children) {
        const width = 100 / k;
        // console.log(i, (width).toFixed(1), { j, k });
        child.style.width = `calc(${width}% - 1px)`;
        // child.style.maxHeight = `${child.offsetWidth * (10/16)}px`
        i++;
        j++;
        if (j > k) {
          k++;
          j = 1;
        }
      }
    }
    // console.log(`this:`, this);
    // console.log(`this.base:`, this.base);
    // console.log(`this.base.querySelector(''):`, this.base.querySelector(''));

    // for(const child of this.base.querySelector('')) {

    // }
  }

  render({ state }) {
    if (!state.files) return 'Please drop some videos';
    if (!state.playingFiles) return;
    // return `Playing ${state.playingFiles.length} files`
    const videos = state.playingFiles.map((file, i) => h(require('../video'), Object.assign({}, this.props, {
      file,
      i,
    })));
    // return h.ol.videos(videos.map(v => h.li(v)));
    return h.div.videos(videos);
    // return h.ol.videos(videos.map(video => h.li(video)));
    // return h.ol.videos(state.playingFiles.map((file, i) => h.li()));
  }
}
