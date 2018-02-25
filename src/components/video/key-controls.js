const mouse = {}
window.onmousemove = e => {
  mouse.clientX = e.clientX;
  mouse.clientY = e.clientY;
  const currentVideo = document.elementFromPoint(mouse.clientX, mouse.clientY);
  if (currentVideo && currentVideo.tagName === 'VIDEO') {
    currentVideo.muted = false;
    currentVideo.controls = true;
    if (!e.shiftKey)
    Array.from(document.querySelectorAll('video')).filter(v => v !== currentVideo).forEach(others => {
      others.muted = true;
      others.controls = false;
    });
  }
}
window.onkeydown = e => {
  const video = document.elementFromPoint(mouse.clientX, mouse.clientY);
  if (!(video && video.tagName === 'VIDEO')) return;
  if (['ArrowLeft', 'a'].map(s => s.toLowerCase()).includes(e.key.toLowerCase())) {
    if (!e.altKey) {
      video.currentTime -= video.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
      e.preventDefault();
    }
  } else if (['ArrowRight', 'd'].map(s => s.toLowerCase()).includes(e.key.toLowerCase())) {
    if (!e.altKey) {
      video.currentTime += video.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
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
  console.log(`e.key:`, e.key);
}

window.onwheel = e => {
  const video = document.elementFromPoint(mouse.clientX, mouse.clientY);
  if (!(video && video.tagName === 'VIDEO')) return;
  if (e.deltaX) {
    video.currentTime -= video.duration / 100 * (e.deltaX > 0 ? 1 : -1);
    e.preventDefault();
  } else if (e.deltaY && e.shiftKey) {
    video.currentTime += video.duration / 100 * (e.deltaY > 0 ? 1 : -1);
    e.preventDefault();
  } else if (e.deltaY && e.ctrlKey) {
    // video.volume = e.altKey ? (e.deltaY > 0 ? 1 : 0) : Math.max(0, video.volume + (.1 * (e.deltaY > 0 ? 1 : -1)));
    // e.preventDefault();
  }
}
