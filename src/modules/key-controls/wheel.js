module.exports = ({ store, state, sharedData }) => {
  window.onwheel = e => {
    const { currentVideo } = sharedData;
    if (!currentVideo) return;
    if (e.deltaX) {
      currentVideo.currentTime -= currentVideo.duration / 100 * (e.deltaX > 0 ? 1 : -1);
      e.preventDefault();
    } else if (e.deltaY && e.shiftKey) {
      currentVideo.currentTime += currentVideo.duration / 100 * (e.deltaY > 0 ? 1 : -1);
      e.preventDefault();
    } else if (e.deltaY && e.ctrlKey) {
      // video.volume = e.altKey ? (e.deltaY > 0 ? 1 : 0) : Math.max(0, video.volume + (.1 * (e.deltaY > 0 ? 1 : -1)));
      // e.preventDefault();
    }
  }
};
