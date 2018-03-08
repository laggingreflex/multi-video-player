const { matchKey } = require('./utils');

module.exports = ({ store, state, sharedData }) => {

  window.onkeydown = e => {
    const { currentVideo } = sharedData;
    if (!currentVideo) return;
    if (matchKey('ArrowLeft', 'a')(e.key)) {
      if (!e.altKey) {
        if (e.shiftKey && e.ctrlKey) {
          currentVideo.currentTime = 0;
        } else {
          const v = v => v.currentTime -= v.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
          if (store.settings.playMode === 'control-all') {
            Array.from(document.querySelectorAll('video')).map(v);
          } else {
            v(currentVideo)
          }
        }
        e.preventDefault();
      }
    } else if (matchKey('ArrowRight', 'd')(e.key)) {
      if (!e.altKey) {
        if (e.shiftKey && e.ctrlKey) {
          currentVideo.currentTime = 0;
          currentVideo.pause();
        } else {
          const v = v => v.currentTime += v.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
          if (store.settings.playMode === 'control-all') {
            Array.from(document.querySelectorAll('video')).map(v);
          } else {
            v(currentVideo)
          }
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
      if (e.ctrlKey || store.settings.zoom === 1) {
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
    } else if (matchKey('Tab')(e.key)) {
      if (store.settings.zoom === 1 || true) {
        let nextVideo;
        if (e.shiftKey) {
          nextVideo = currentVideo.previousElementSibling;
          if (!nextVideo) {
            nextVideo = currentVideo.parentElement.lastElementChild;
          }
        } else {
          nextVideo = currentVideo.nextElementSibling;
          if (!nextVideo) {
            nextVideo = currentVideo.parentElement.firstChild;
          }
        }
        if (nextVideo) {
          currentVideo.pause();
          // state.currentVideo = currentVideo.nextElementSibling;
          nextVideo.play();
          nextVideo.muted = false;
          // nextVideo.scrollIntoView(store.settings.zoom === 1);
          nextVideo.scrollIntoView({});
          sharedData.currentVideo = nextVideo;
        }
        e.preventDefault();
      }
    } else if (matchKey('Delete')(e.key)) {
      console.log(`e.key:`, e.key);
    } else {
      // console.log(`e.key:`, e.key);
    }
  }

  window.onkeypress = e => {
    const { currentVideo } = sharedData;
    // const currentVideo = getCurrentVideo();
    const scrollIntoView = () => setTimeout(() => {
      if (!currentVideo) return;
      currentVideo.scrollIntoView(true);
    }, 100);
    if (matchKey('.')(e.key)) {
      // currentVideo.pause();
      // currentVideo.currentTime = 0;
    } else if (matchKey('+')(e.key)) {
      if (e.shiftKey) {
        store.settings.lastZoom = store.settings.zoom;
        store.settings.zoom = 1;
      } else {
        store.settings.zoom = store.settings.lastZoom = Math.max(1, (store.settings.zoom || 1) - 1);
      }
      e.preventDefault();
      scrollIntoView();
    } else if (matchKey('-')(e.key)) {
      if (e.shiftKey) {
        if (store.settings.zoom == store.settings.lastZoom) {
          store.settings.zoom = 10
        } else {
          store.settings.zoom = store.settings.lastZoom || 10
        }
      } else {
        store.settings.zoom = store.settings.lastZoom = Math.min(10, (store.settings.zoom || 1) + 1)
      }
      e.preventDefault();
      scrollIntoView();
    } else if (matchKey('*')(e.key)) {

    } else if (matchKey('`')(e.key)) {
      if (store.settings.zoom === 1) {
        store.settings.zoom = store.settings.lastZoom || 4;
      } else {
        store.settings.lastZoom = store.settings.zoom;
        store.settings.zoom = 1
      }
      console.log('store.settings.zoom', store.settings.zoom);
      e.preventDefault();
      scrollIntoView();
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
