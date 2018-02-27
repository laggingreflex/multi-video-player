module.exports = ({ store }) => {
  const mouse = {};
  let currentVideo;
  let lastVideo;

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    try {
      currentVideo = mouse.currentVideo = document.elementFromPoint(mouse.x, mouse.y);
    } catch (error) {
      lastVideo = currentVideo;
      currentVideo = null;
      console.log(`Couldn't get video under the pointer`, error.message);
    }
    if (!(currentVideo && currentVideo.tagName === 'VIDEO')) return;
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
    getVideo: () => ({ currentVideo, lastVideo }),
  };
}
