module.exports = ({ mouse }) => {
  window.onwheel = e => {
    if (!mouse) return;
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
};
