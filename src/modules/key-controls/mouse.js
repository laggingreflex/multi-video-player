module.exports = ({ store }) => {
  const mouse = {};
  let currentVideo;

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    let video;
    try {
      video = document.elementFromPoint(mouse.x, mouse.y);
      if (!video) throw new Error('No video');
      if (video.tagName !== 'VIDEO') throw new Error('Not a video');
      if (!video.pause) throw new Error('Not a video');
    } catch (error) {
      // console.log(`Couldn't get video under the pointer`, error.message);
    }
    if (!video) return;
    currentVideo = video;
    currentVideo.muted = false;
    currentVideo.controls = true;
    try {
      currentVideo.play().catch(() => {});
    } catch (error) {}
    if (!e.shiftKey) {
      Array.from(document.querySelectorAll('video')).filter(v => v !== currentVideo).forEach(others => {
        others.muted = true;
        others.controls = false;
        if (store.settings.playMode === 'play-single') {
          others.pause();
        } else if (store.settings.playMode === 'play-all' || store.settings.playMode === 'control-all') {
          others.muted = false;
        }
      });
    }
  });

  return {
    getMouse: () => mouse,
    getCurrentVideo: () => currentVideo,
  };
}
