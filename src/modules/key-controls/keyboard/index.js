const { matchKey } = require('./utils');

module.exports = ({ store, getVideo }) => {

  window.onkeydown = e => {
    const { currentVideo } = getVideo();
    if (matchKey('ArrowLeft', 'a')(e.key)) {
      if (!e.altKey) {
        const v = v => v.currentTime -= v.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
        if (store.settings.playMode === 'control-all') {
          Array.from(document.querySelectorAll('video')).map(v);
        } else {
          v(currentVideo)
        }
        e.preventDefault();
      }
    } else if (matchKey('ArrowRight', 'd')(e.key)) {
      if (!e.altKey) {
        const v = v => v.currentTime += v.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
        if (store.settings.playMode === 'control-all') {
          Array.from(document.querySelectorAll('video')).map(v);
        } else {
          v(currentVideo)
        }
        e.preventDefault();
      }
    } else if (matchKey('ArrowUp', 'w')(e.key)) {
      if (e.ctrlKey) {
        if (currentVideo.playbackRate < 1) {
          currentVideo.playbackRate = 1
        } else {
          currentVideo.playbackRate += 0.25;
        }
        e.preventDefault();
      } else if (e.altKey) {
        currentVideo.volume = e.shiftKey ? 1 : Math.min(1, currentVideo.volume + .1);
        e.preventDefault();
      }
    } else if (matchKey('ArrowDown', 's')(e.key)) {
      if (e.ctrlKey) {
        if (currentVideo.playbackRate > 1) {
          currentVideo.playbackRate = 1
        } else {
          currentVideo.playbackRate -= 0.25;
        }
        e.preventDefault();
      } else if (e.altKey) {
        currentVideo.volume = e.shiftKey ? 0 : Math.max(0, currentVideo.volume - .1);
        e.preventDefault();
      }
    } else if (matchKey(' ')(e.key)) {
      if (e.ctrlKey) {
        if (currentVideo.paused) {
          currentVideo.play();
          if (e.shiftKey) {
            for (const others of currentVideo.parentElement.querySelectorAll('video')) {
              others.play();
            }
          }
        } else {
          currentVideo.pause();
          if (e.shiftKey) {
            for (const others of currentVideo.parentElement.querySelectorAll('video')) {
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
