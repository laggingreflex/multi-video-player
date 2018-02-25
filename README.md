
# Multi Video Player

Play multiple videos in a single player

https://multi-video-player.surge.sh/

[![screenshot](https://i.imgur.com/AFioixGm.jpg)](https://gfycat.com/SpiritedUglyIrrawaddydolphin)

## Usage

Open the player and just drop some files in it.

## Features

* Unlimited videos (limit is your browser/computer)

* Play/pause, seek, control volume, playback rate for individual or all videos

* Multiple styles - mason (efficient stacking), flat (equally spaced), funnel (decreasing video sizes)

* Zoom in (fewer, larger videos), zoom out (more, smaller videos)

* Multiple play modes - play-single, play-all-muted, play-all, control-all(experimental)

* Intuitive arrow keys & WSAD keys [keyboard shortcuts](#keyboard-shortcuts)

## Keyboard shortcuts

All keybindings work on the current video that's under the mouse pointer, unless mentioned otherwise.

| Key | What it does
| ---: |---
| <kbd>⬆</kbd> | Nothing (default behavior: scroll up)
| <kbd>⬇</kbd> | Nothing  (default behavior: scroll down)
||
| <kbd>Alt</kbd> + <kbd>⬆</kbd>/<kbd>W</kbd> | Volume Up
| <kbd>Alt</kbd> + <kbd>⬇</kbd>/<kbd>S</kbd> | Volume Down
||
| <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>⬆</kbd>/<kbd>W</kbd> | Full Volume
| <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>⬇</kbd>/<kbd>S</kbd> | Mute
||
| <kbd>Ctrl</kbd> + <kbd>⬆</kbd> | Increase playback rate by 0.25, or reset if < 1
| <kbd>Ctrl</kbd> + <kbd>⬇</kbd> | Decrease playback rate by 0.25, or reset if > 1
||
| <kbd>➡</kbd>/<kbd>D</kbd> | Skip forward 1% (of total duration)
| <kbd>Shift</kbd> + <kbd>➡</kbd>/<kbd>D</kbd> | Skip forward 10%
| <kbd>Ctrl</kbd> + <kbd>➡</kbd>/<kbd>D</kbd> | Skip forward 0.1%
||
| <kbd>⬅</kbd>/<kbd>A</kbd> | Go back 1% (of total duration)
| <kbd>Shift</kbd> + <kbd>⬅</kbd>/<kbd>A</kbd> | Go back 10%
| <kbd>Ctrl</kbd> + <kbd>⬅</kbd>/<kbd>A</kbd> | Go back 0.1%
||
| <kbd>Spacebar</kbd> | Nothing (default behavior: scroll down)
| <kbd>Ctrl</kbd> + <kbd>Spacebar</kbd> | Play/pause video (under the cursor)
| <kbd>Shift</kbd> + <kbd>Ctrl</kbd> + <kbd>Spacebar</kbd> | Play/pause all videos
||
| <kbd>+</kbd> | Zoom in (fewer, larger videos)
| <kbd>-</kbd> | Zoom Out (more, smaller videos)
||
| <kbd>*</kbd> | Toggle style - mason (efficient stacking), flat (equally spaced), funnel (decreasing video sizes)
||
| <kbd>P</kbd> | Toggle play mode - play-single, play-all-muted, play-all, control-all(experimental)

## Limitations

* Tested only on latest chrome, some issues in FF/Edge, untested in other browsers (safari, all mobile)

* Can only play videos supported by the web browser (mp4/ogg, <strike>flv/avi</strike>). This also makes it depend on the browser to use CPU/GPU for rendering videos. Firefox (at the time of testing) was extremely slow with 10+ videos.

* Depends on Web browser and its File API, can't read/write to disk directly (for example creating playlists, reading entire directories)
