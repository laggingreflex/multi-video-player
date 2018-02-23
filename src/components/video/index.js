const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });

module.exports = class {
  componentWillMount() {
    const { store, file, i } = this.props;
    this.url = URL.createObjectURL(file);
  }
  componentWillUnmount() {
    const { store, file, i } = this.props;
    URL.revokeObjectURL(this.url);
  }
  render() {
    const { store, file, i } = this.props;
    const vidProps = {
      muted: true,
      // controls: false,
      controls: true,
      src: this.url,
      autoplay: true,
      style: {
        // width: '300px'
      },
      draggable: true,
      resizeable: true,
    };
    'onmouseenter,onmouseleave'.split(/,/g).forEach(m => vidProps[m] = this[m].bind(this));
    return h.video(vidProps);
  }
  async onmouseenter(e) {
    const video = this.base;
    video.muted = false;
    video.controls = true;
    // this.style({
    //   position: 'absolute',
    //   top: '0px',
    //   left: '0px',
    //   width: '100%',
    //   height: '100%',
    // })
  }
  async onmouseleave(e) {
    const video = this.base;
    video.muted = true;
    video.controls = false;
    this.unStyle();
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
