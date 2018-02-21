import * as _ from './utils.js';

const { $ } = _;
$ `#input`.addEventListener('change', handleFileSelect, false);
$ `#play`.addEventListener('click', handlePlay, false);
$ `#pause`.addEventListener('click', handlePause, false);

console.log('Ready');

let fsTimeout;
async function handleFileSelect(e) {
  const files = e.target.files;
  let i = 1;
  for (const file of files) {
    $ `#console`.innerHTML = `Loading ${i++}/${files.length} ${file.name}`;
    try {
      const video = document.createElement('video');
      const onerror = _.once(video, 'error').then(e => { throw video.error });
      video['data-file'] = file;
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.addEventListener('mouseenter', () => {
        video.muted = false;
        video.controls = true;
        for (const others of $ `video`) {
          if (others === video) continue;
          others.muted = true;
          others.controls = false;
        }

        video['data-restore-styles'] = _.stylize(video, {
          zIndex: 1,
          position: 'relative',
          top: `-${.9*video.offsetTop}px`,
          left: `-${.9*video.offsetLeft}px`,
          width: `${.9*window.innerWidth}px`,
          maxWidth: 'none',
        });

      });

      video.addEventListener('mouseleave', () => {
        video['data-restore-styles']();
      });
      video.addEventListener('wheel', (e) => {
        if (e.deltaY) return;
        e.preventDefault();
        video.currentTime -= (1 * e.deltaX);
      });
      await Promise.race([_.once(video, 'canplay'), onerror]);
      $ `#videos`.appendChild(video);
      // console.log('Loaded', video.src);
    } catch (error) {
      console.error(file.name, 'cannot load', error.message || error);
    }
  }
  $ `#console`.innerHTML = '';
  resizeGrid();
}

async function handlePlay() {
  let i = 1;
  const videos = $ `#videos video`;
  for (const video of _.arrify(videos)) {
    const file = video['data-file'];
    $ `#console`.innerHTML = `Starting ${i++}/${videos.length} ${file.name}`;
    try {
      await video.play();
      await _.once(video, 'timeupdate');
    } catch (error) {
      console.error(file.name, 'cannot play', error.message || error);
    }
  }
  $ `#console`.innerHTML = '';
}

async function handlePause() {
  await Promise.all(Array.from($ `#videos video`).map(v => v.pause()));
}

function resizeGrid() {
  const { length } = _.arrify($ `#videos video`);
  const { style } = $ `#videos`;
  // const width = w => style.width = w;
  const width = w => Array.from($ `#videos video`).forEach(v => v.style.width = w);
  // const col = c => style.gridTemplateColumns = `repeat(${c}, 1fr)`;
  // const row = r => style.gridTemplateRows = `repeat(${r}, 1fr)`;
  width('100%');
  // col(1);
  // row(1);
  if (length <= 1) {
    //
  } else if (length <= 4) {
    col(2);
    row(2);
  } else if (length <= 6) {
    col(2);
    row(3);
  } else if (length <= 9) {
    col(3);
    row(3);
  } else if (length <= 12) {
    col(4);
    row(3);
  } else {
    col(4);
    row(Math.ceil(length / 4));
  }
  // console.log(`style:`, style);
}
