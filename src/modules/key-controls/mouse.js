module.exports = ({ store }) => {
  const mouse = {};

  window.addEventListener('mousemove', e => {
    mouse.clientX = e.clientX;
    mouse.clientY = e.clientY;
    const currentVideo = document.elementFromPoint(mouse.clientX, mouse.clientY);
    if (currentVideo && currentVideo.tagName === 'VIDEO') {
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
    }
  });

  return { mouse };
}
