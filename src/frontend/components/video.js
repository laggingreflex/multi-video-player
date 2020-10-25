const { h } = require('./h');
const { useRef, useEffect, useState } = require('react');
const { useKeyPress } = require('../hooks');
const _ = require('../utils');
const { db } = require('../store');

module.exports = Video;

function Video({ file, i, loaded, onLoad, onUnload }) {
  const [src, update] = useState()
  const { current: data } = useRef({});
  const { ref: saveLoadTimeRef } = saveLoadTime();
  const getVideElement = () => data.ref?.querySelector?.('video');

  function scrollIntoView() {
    const video = getVideElement();
    if (!video) return;
    if (video.scrollIntoViewIfNeeded) {
      video.scrollIntoViewIfNeeded();
    } else if (video.scrollIntoView) {
      video.scrollIntoView();
    }
  }

  useEffect(() => {
    if (loaded) {
      load();
    } else {
      unload();
    }
  }, [loaded]);
  useEffect(() => {
    if (loaded) scrollIntoView();
  }, [db.fullScreen]);

  useKeyPress((e, { down, up }) => {
    if (['INPUT'].includes(document.activeElement.tagName)) return;
    if (db.asideExpanded) return;
    // console.log(`document.activeElement:`, document.activeElement);
    if (loaded) {
      const video = getVideElement();
      if ((['ArrowRight', 'd'].includes(e.key)) && down) {
        e.preventDefault();
        let newTime = video.currentTime;
        // newTime += 10;
        newTime += video.duration / 10;
        if (newTime > video.duration) newTime = 0;
        if (video.fastSeek) {
          video.fastSeek(newTime);
        } else {
          video.currentTime = newTime;
        }
      } else if ((['ArrowLeft', 'a'].includes(e.key)) && down) {
        e.preventDefault();
        let newTime = video.currentTime;
        newTime -= video.duration / 10;
        if (newTime <= 0) newTime = video.duration;
        if (video.fastSeek) {
          video.fastSeek(newTime);
        } else {
          video.currentTime = newTime;
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        if (up) {
          if (video.paused)
            video.play();
          else video.pause();
        }
      }
    }
  });


  function load({ unloadTimeout = null } = {}) {
    if (src) return;
    const newSrc = URL.createObjectURL(file);
    update(newSrc);
    onLoad?.();
    clearTimeout(data.unloadTimeout);
    // console.log(`videElement():`, getVideElement());
    // getVideElement()?.focus?.();
    // console.log(`document.activeElement:`, document.activeElement);
    // data.ref?.scrollIntoViewIfNeeded?.(true) 
    // ??
    // data.ref?.scrollIntoView?.(true);
    scrollIntoView()

  }

  function unload({ unloadTimeout = null } = {}) {
    if (!src) return;
    URL.revokeObjectURL(src)
    update('');
    onUnload?.();
  }

  function onMouseEnter() {
    load();
    if (ref.ref.scrollIntoViewIfNeeded) ref.ref.scrollIntoViewIfNeeded(true);
    else if (ref.ref.scrollIntoView) ref.ref.scrollIntoView(true);
  }



  return h.div.video({
      ref: _.multiRef(saveLoadTimeRef, r => {
        data.ref = r || data.ref;
      }),
    },
    h.div.meta({},
      h.h2(file.path),
    ),
    // h.div.debug({
    // }, JSON.stringify({ isNext: false })),
    h.video({
      // controls: true,
      muted: true,
      autoPlay: true,
      src,
    })
  );


}

function saveLoadTime() {
  const { current: data } = useRef({});
  return { ref, ...data };

  function ref(r) {
    if (!r) return;
    data.removeEventListener?.();
    let videoElement = r;
    if (videoElement.tagName !== 'VIDEO') videoElement = videoElement.querySelector('video');
    videoElement.currentTime = data.currentTime ?? 0;
    const saveTime = () => data.currentTime = videoElement.currentTime;
    videoElement.addEventListener('timeupdate', saveTime);
    data.removeEventListener = () => videoElement.removeEventListener('timeupdate', saveTime);
  }
}


function onMouseEnter() {
  load();
  clearTimeout(ref.timeout);
  if (ref.removeEventListener) ref.removeEventListener();
  // ref.ref.addEventListener('timeupdate', onTimeUpdate);
  // ref.removeEventListener = () => ref.ref.removeEventListener('timeupdate', onTimeUpdate);
  ref.ref.dataset.current = true;
  if (onMouseEnterProp) onMouseEnterProp();
  if (ref.ref.scrollIntoViewIfNeeded) ref.ref.scrollIntoViewIfNeeded(true);
  else if (ref.ref.scrollIntoView) ref.ref.scrollIntoView(true);
}

function onTimeUpdate(e) {
  ref.time = e.target.currentTime;
}

function onMouseLeave() {
  // console.log(`window.performance.memory:`, window.performance.memory);
  // console.log('onMouseLeave');
  ref.ref.dataset.current = '';
  ref.timeout = setTimeout(() => {
    URL.revokeObjectURL(src)
    // logMemory();
    update('');
    if (ref.removeEventListener) ref.removeEventListener();
  }, 1000);
  if (onMouseLeaveProp) onMouseLeaveProp();
}

function onKeyUp(e) {
  if (e.key === 'Tab') {
    console.log('Tab pressed');
    e.preventDefault();
    if (ref.ref.src) onMouseLeave();
    else {
      const previous = ref.ref.previousSibling
      console.log(previous);
      if (previous?.src) {
        // onMouseEnter();
        setTimeout(onMouseEnter, 100)
      }
    }
  }
}
