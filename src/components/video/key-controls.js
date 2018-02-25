const mouse = {}
window.onmousemove = e => {
  mouse.clientX = e.clientX;
  mouse.clientY = e.clientY;
  const currentVideo = document.elementFromPoint(mouse.clientX, mouse.clientY);
  if (currentVideo && currentVideo.tagName === 'VIDEO') {
    const otherVideos = Array.from(document.querySelectorAll('video')).filter(v => v !== currentVideo);
    currentVideo.muted = false;
    currentVideo.controls = true;
    otherVideos.forEach(v => {
      v.muted = true;
      v.controls = false;
    });
  }
}
window.onkeydown = e => {
  const video = document.elementFromPoint(mouse.clientX, mouse.clientY);
  if (!(video && video.tagName === 'VIDEO')) return;
  if (['ArrowLeft', 'a'].map(s => s.toLowerCase()).includes(e.key.toLowerCase())) {
    video.currentTime -= video.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
    e.preventDefault();
  } else if (['ArrowRight', 'd'].map(s => s.toLowerCase()).includes(e.key.toLowerCase())) {
    video.currentTime += video.duration / (e.shiftKey ? 10 : e.ctrlKey ? 1000 : 100);
    e.preventDefault();
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
  }
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
