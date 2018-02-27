module.exports = ({ store, mouse }) => {

  window.onkeydown = e => {
    if (!mouse) return;
    const video = document.elementFromPoint(mouse.clientX, mouse.clientY);
    if (!(video && video.tagName === 'VIDEO')) return;
    if (['ArrowLeft', 'a'].map(s => s.toLowerCase()).includes(e.key.toLowerCase())) {
      if (!e.altKey) {
        const v = v => v.currentTime -= v.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
        if (store.settings.playMode === 'control-all') {
          Array.from(document.querySelectorAll('video')).map(v);
        } else {
          v(video)
        }
        e.preventDefault();
      }
    } else if (['ArrowRight', 'd'].map(s => s.toLowerCase()).includes(e.key.toLowerCase())) {
      if (!e.altKey) {
        const v = v => v.currentTime += v.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
        if (store.settings.playMode === 'control-all') {
          Array.from(document.querySelectorAll('video')).map(v);
        } else {
          v(video)
        }
        e.preventDefault();
      }
    } else if (['ArrowUp', 'w'].map(s => s.toLowerCase()).includes(e.key.toLowerCase())) {
      if (e.ctrlKey) {
        if (video.playbackRate < 1) {
          video.playbackRate = 1
        } else {
          video.playbackRate += 0.25;
        }
        e.preventDefault();
      } else if (e.altKey) {
        video.volume = e.shiftKey ? 1 : Math.min(1, video.volume + .1);
        e.preventDefault();
      }
    } else if (['ArrowDown', 's'].map(s => s.toLowerCase()).includes(e.key.toLowerCase())) {
      if (e.ctrlKey) {
        if (video.playbackRate > 1) {
          video.playbackRate = 1
        } else {
          video.playbackRate -= 0.25;
        }
        e.preventDefault();
      } else if (e.altKey) {
        video.volume = e.shiftKey ? 0 : Math.max(0, video.volume - .1);
        e.preventDefault();
      }
    } else if ([' '].map(s => s.toLowerCase()).includes(e.key.toLowerCase())) {
      if (e.ctrlKey) {
        if (video.paused) {
          video.play();
          if (e.shiftKey) {
            for (const others of video.parentElement.querySelectorAll('video')) {
              others.play();
            }
          }
        } else {
          video.pause();
          if (e.shiftKey) {
            for (const others of video.parentElement.querySelectorAll('video')) {
              others.pause();
            }
          }
        }
        e.preventDefault();
      }
    }
    // console.log(`e.key:`, e.key);
  }

  window.onkeypress = e => {
    if (matchKey('+')(e.key)) {
      store.settings.zoom = Math.max(1, (store.settings.zoom || 1) - 1)
      e.preventDefault();
    } else if (matchKey('-')(e.key)) {
      store.settings.zoom = Math.min(10, (store.settings.zoom || 1) + 1)
      e.preventDefault();
    } else if (matchKey('*')(e.key)) {
      store.settings.styleToggle();
      // store.settings.style = oneOf(styles)(store.settings.style);
      console.log(`store.settings.style:`, store.settings.style);
      e.preventDefault();
    } else if (matchKey('p')(e.key)) {
      store.settings.playModeToggle();
      // store.settings.playMode = oneOf(playModes)(store.settings.playMode);
      console.log(`store.settings.playMode:`, store.settings.playMode);
      if (store.settings.playMode === 'play-single') {
        for (const video of document.querySelectorAll('video')) {
          try {
            video.pause().catch(() => {});
          } catch (error) {}
        }
      } else if (store.settings.playMode === 'play-all-muted') {
        for (const video of document.querySelectorAll('video')) {
          video.play().catch(() => {});
          video.muted = true;
          // video.volume = 0;
        }
      } else if (store.settings.playMode === 'play-all' || store.settings.playMode === 'control-all') {
        for (const video of document.querySelectorAll('video')) {
          try {
            video.play().catch(() => {});
            video.muted = false;
          } catch (error) {}
          // video.volume = 1;
        }
      }
      e.preventDefault();
    }
  }


};

function matchKey(...keys) {
  keys = keys.map(_ => _.toLowerCase());
  return key => keys.includes(key.toLowerCase());
}
