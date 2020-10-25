const { useState, useEffect } = require('react');
const { useKeyPress } = require('../hooks')
const { h } = require('./h');
const { db } = require('../store');
const Video = require('./video');

module.exports = Videos

function Videos({ files }) {
  const [loaded, updateLoaded] = useState([0]);
  const simultaneousPlay = db.simultaneousPlay || 1;

  useEffect(() => {
    updateLoaded(loaded.slice(0, simultaneousPlay));
  }, [simultaneousPlay]);

  useKeyPress((e, { down, up }) => {
    if (['INPUT'].includes(document.activeElement.tagName)) return;
    if (db.asideExpanded) return;
    if (e.key === 'Tab' && !e.altKey && down) {
      e.preventDefault();
    } else if (e.key === 'Tab' && !e.altKey && up) {
      e.preventDefault();
      if (e.shiftKey) {
        loadNext({ previous: true })
      } else {
        loadNext()
      }
    } else if (e.key === '`' && up) {
      db.fullScreen = !db.fullScreen;
    }
  });

  function loadNext({ previous = false } = {}) {
    const last = loaded[0];
    let next;
    if (previous) {
      // const last = loaded[loaded.length - 1];
      // const last = Math.min(...loaded);
      next = last - 1;
      if (next <= 0) next = files.length - 1;
    } else {
      // const last = loaded[0];
      // const last = Math.max(...loaded);
      next = last + 1;
      if (next >= files.length) next = 0;
    }
    const loadedNew = loaded.filter(e => e !== next);
    loadedNew.unshift(next);
    if (loadedNew.length > simultaneousPlay) loadedNew.length = simultaneousPlay;
    updateLoaded(loadedNew);
    // console.log(`loadedNew:`, loadedNew);
  }

  function onLoad(file, i) {
    const loadedNew = loaded.filter(e => e !== i);
    loadedNew.unshift(i);
    if (loadedNew.length > simultaneousPlay) loadedNew.length = simultaneousPlay;
    updateLoaded(loadedNew);
    // console.log(`loadedNew:`, loadedNew);
  }

  const shouldBeLoaded = (file, i) => {
    return loaded.includes(i);
    return i === 0;
    return true
    // console.log('shouldBeLoaded', { i, state });
    // if (i === state.loaded) return true;
    // if ((state.last || [0]).includes(i)) return true;
  }

  return h.div.videos({
    class: {
      fullScreen: Boolean(db.fullScreen),
    },
  }, files.map((file, i) => h(Video, {
    key: file.path,
    file,
    i,
    // loaded
    loaded: shouldBeLoaded(file, i),
    onLoad: () => onLoad(file, i),
  })));
}
