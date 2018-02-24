const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils')

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
    }, [h.div.pre(), video]);
  }
  componentDidMount() {
    this.resize();
    this.base.addEventListener('timeupdate', () => this.resize(), { once: true });
    // this.base.addEventListener('timeupdate', () => this.props.rendered(), { once: true });
  }
  componentDidUpdate() {
    this.resize();
  }
  resize() {
    // this.base.style.width = `calc(99%/${Math.ceil(Math.sqrt(this.props.state.playingFiles.length))})`;
    return;
    const video = this.base;
    const { videoWidth, videoHeight, offsetWidth } = video;
    if (videoWidth) {
      const aspectRatio = document.body.clientWidth / document.body.clientHeight;
      const shouldBeHeight = offsetWidth / aspectRatio;
      video.style.height = `${shouldBeHeight}px`;
    } else {
      video.style.height = `${offsetWidth}px`;
    }
  }

  async onmouseenter(e) {
    const video = e.target;
    video.muted = false;
    video.controls = true;
    return
    const screenWidth = document.body.clientWidth;
    const elementWidth = video.offsetWidth;
    const scaleFactor = .95 * (screenWidth / elementWidth);
    const scaleCss = `scale3d(${scaleFactor}, ${scaleFactor}, ${scaleFactor})`;

    // const trans
    const elementLeft =
      video.offsetLeft
    // - video.scrollLeft
    // + video.clientLeft
    ;

    const elementsLeftFromLeft = video.offsetLeft;
    const elementsCenterFromLeft =
      elementsLeftFromLeft
      + (elementWidth / 2);

    const screenCenterFromLeft = screenWidth / 2;



    // const translateCss = `translate(-${elementLeft/2}px)`;
    // const translateCss = `translate(50vw)`;
    const translateCss = `translate(${screenCenterFromLeft-elementsCenterFromLeft}px)`;


    // const transformCss = `${scaleCss} ${translateCss}`;
    const transformCss = `${translateCss} ${scaleCss}`;
    // const transformCss = `${translateCss}`;
    console.log(`transformCss:`, transformCss);

    style(e.target, {
      zIndex: 1,
      // position: 'relative',
      // top: '0px',
      // transform: 'rotate(0.5turn)',
      transform: transformCss,

      // left: '0px',
      // width: '100%',
      // height: '100%',
      // width: '75%',
      // height: '75%',
    })
  }
  async onmouseleave(e) {
    const video = e.target;
    video.muted = true;
    video.controls = false;
    const unStyle = e.target['data-unStyle'];
    if (unStyle) {
      unStyle();
    }
    // unStyle(e);
  }
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
