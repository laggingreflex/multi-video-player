const { store, state } = require('../../db');

const playModes = [
  'play-single',
  'play-all-muted',
  'play-all',
  // 'control-all',
]

window.onkeypress = e => {
  if (matchKey('+')(e.key)) {
    store.settings.zoom = Math.max(1, (store.settings.zoom || 1) - 1)
    e.preventDefault();
  } else if (matchKey('-')(e.key)) {
    store.settings.zoom = Math.min(10, (store.settings.zoom || 1) + 1)
    e.preventDefault();
  } else if (matchKey('*')(e.key)) {
    store.settings.style = 'mason'
    e.preventDefault();
  } else if (matchKey('/')(e.key)) {
    store.settings.style = 'flat'
    e.preventDefault();
  } else if (matchKey('p')(e.key)) {
    let newIndex;
    if (store.settings.playMode) {
      const index = playModes.indexOf(store.settings.playMode);
      if (index === -1) {
        newIndex = 0;
      } else {
        newIndex = index + 1;
        if (newIndex >= playModes.length) {
          newIndex = 0;
        }
      }
    } else {
      newIndex = 0;
    }
    store.settings.playMode = playModes[newIndex];
    // console.log(`store.settings.playMode:`, store.settings.playMode);
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

function matchKey(...keys) {
  keys = keys.map(_ => _.toLowerCase());
  return key => keys.includes(key.toLowerCase());
}
