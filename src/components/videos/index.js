const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });

module.exports = class {

  // componentDidMount() { this.updateVideos() }
  // componentDidUpdate() { this.updateVideos() }
  // updateVideos() {
  //   const { store } = this.props;
  //   const { files } = store;
  // }

  render() {
    const { store } = this.props;
    const { files } = store;
    if (!files) return 'Please drop some videos';
    const videosToPlay = files.slice(0, store.concurrentVideos);
    return h.div.videos(videosToPlay.map((file, i) => h(require('../video'), Object.assign({}, this.props, {
      file,
      i,
    }))));
  }
}
