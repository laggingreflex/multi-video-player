const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true }); const _ = require('../../utils')

module.exports = class {
  componentWillMount() {
    this.url = URL.createObjectURL(this.props.file);
  }
  componentWillUnmount() {
    URL.revokeObjectURL(this.url);
  }
  render({ state }) {
    // return h.div.wrapper('video')
    const video = h.video({
      muted: true,
      // controls: false,
      controls: false,
      src: this.url,
      autoplay: true,
      loop: true,
      // 'data-width': `${Math.ceil(Math.sqrt(state.playingFiles.length || 1))}p1x`,
      // style: {
      //   // width: '300px'
      //   width: `calc(90%/${Math.ceil(Math.sqrt(state.playingFiles.length))})`,
      // },
      // draggable: true,
      // resizeable: true,
      onmouseenter: this.onmouseenter,
      onmouseleave: this.onmouseleave,
    });
    return video
    return h.div.wrapper({
      // style: {
      //   // width: '300px'
      //   // width: `calc(95%/${Math.ceil(Math.sqrt(state.playingFiles.length))})`,
      // },
    }, [video]);
  }
  componentDidMount() {
    this.resize();
  }
  componentDidUpdate(){
    this.resize();
  }
  resize(){
    // this.base.style.width = `calc(99%/${Math.ceil(Math.sqrt(this.props.state.playingFiles.length))})`;
  }

  async onmouseenter(e) {
    const video = e.target;
    video.muted = false;
    // video.controls = true;
    // this.style({
    //   position: 'absolute',
    //   top: '0px',
    //   left: '0px',
    //   width: '100%',
    //   height: '100%',
    // })
  }
  async onmouseleave(e) {
    const video = e.target;
    video.muted = true;
    video.controls = false;
    // this.unStyle();
  }
  style(styles) {
    const video = this.base;
    this.styles = styles;
    for (const prop in styles) {
      video.style[prop] = styles[prop];
    }
  }
  unStyle() {
    const video = this.base;
    if (!this.styles) return;
    for (const prop in this.styles) {
      video.style[prop] = null;
    }
  }
}
