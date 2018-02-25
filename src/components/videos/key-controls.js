const { store, state } = require('../../db');

const playModes = [
  'play-single',
  'play-all-muted',
  'play-all',
  // 'control-all',
];

const styles = ['mason', 'flat', 'funnel'];

const oneOf = list => existing => {
  const index = list.indexOf(existing);
  if (index == -1) return list[0];
  const next = index + 1;
  if (next >= list.length) return list[0];
  return list[next];
};

window.onkeypress = e => {
  if (matchKey('+')(e.key)) {
    store.settings.zoom = Math.max(1, (store.settings.zoom || 1) - 1)
    e.preventDefault();
  } else if (matchKey('-')(e.key)) {
    store.settings.zoom = Math.min(10, (store.settings.zoom || 1) + 1)
    e.preventDefault();
  } else if (matchKey('*')(e.key)) {
    store.settings.style = oneOf(styles)(store.settings.style);
    console.log(`store.settings.style:`, store.settings.style);
    e.preventDefault();
  } else if (matchKey('p')(e.key)) {
    store.settings.playMode = oneOf(playModes)(store.settings.playMode);
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

function matchKey(...keys) {
  keys = keys.map(_ => _.toLowerCase());
  return key => keys.includes(key.toLowerCase());
}
