
# Multi Video Player

Play multiple videos in a single player

https://multi-video-player.surge.sh, https://laggingreflex.github.io/multi-video-player

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
| <kbd>Alt</kbd> <kbd>⬆</kbd>/<kbd>W</kbd> | Volume Up
| <kbd>Alt</kbd> <kbd>⬇</kbd>/<kbd>S</kbd> | Volume Down
||
| <kbd>Shift</kbd> <kbd>Alt</kbd> <kbd>⬆</kbd>/<kbd>W</kbd> | Full Volume
| <kbd>Shift</kbd> <kbd>Alt</kbd> <kbd>⬇</kbd>/<kbd>S</kbd> | Mute
||
| <kbd>Ctrl</kbd> <kbd>⬆</kbd> | Increase playback rate by 0.25, or reset if < 1
| <kbd>Ctrl</kbd> <kbd>⬇</kbd> | Decrease playback rate by 0.25, or reset if > 1
||
| <kbd>➡</kbd>/<kbd>D</kbd> | Skip forward 1% (of total duration)
| <kbd>⬅</kbd>/<kbd>A</kbd> | Go back 1% (of total duration)
||
| <kbd>Shift</kbd> <kbd>➡</kbd>/<kbd>D</kbd> | Skip forward 10%
| <kbd>Shift</kbd> <kbd>⬅</kbd>/<kbd>A</kbd> | Go back 10%
||
| <kbd>Ctrl</kbd> <kbd>➡</kbd>/<kbd>D</kbd> | Skip forward 0.1%
| <kbd>Ctrl</kbd> <kbd>⬅</kbd>/<kbd>A</kbd> | Go back 0.1%
||
| <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>➡</kbd>/<kbd>D</kbd> | Stop (goto beginning and pause)
| <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>⬅</kbd>/<kbd>D</kbd> | Restart (goto beginning and resume)
||
| <kbd>Spacebar</kbd> | Nothing (default behavior: scroll down)
| <kbd>Spacebar</kbd> | (when `zoom=1`) Play/pause current (full-width) video
| <kbd>Ctrl</kbd> <kbd>Spacebar</kbd> | Play/pause video (under the cursor)
| <kbd>Shift</kbd> <kbd>Ctrl</kbd> <kbd>Spacebar</kbd> | Play/pause all videos
||
| <kbd>+</kbd> | Zoom in (fewer, larger videos)
| <kbd>-</kbd> | Zoom out (more, smaller videos)
| <kbd>Shift</kbd> <kbd>+</kbd> | Max zoom level (single full-width video)
| <kbd>Shift</kbd> <kbd>-</kbd> | Reset to previous zoom level (from max zoom), or lowest
||
| <kbd>*</kbd> | Toggle style - mason (efficient stacking), flat (equally spaced), funnel (decreasing video sizes)
||
| <kbd>P</kbd> | Toggle play mode - play-single, play-all-muted, play-all, control-all(experimental)
||
| <kbd>Tab</kbd> | (when `zoom=1`) Focus next video
| <kbd>Shift</kbd> <kbd>Tab</kbd> | (when `zoom=1`) Focus previous video

## Limitations

* Tested only on latest chrome, some issues in FF/Edge, untested in other browsers (safari, all mobile)

* Can only play videos supported by the web browser (mp4/ogg, <strike>flv/avi</strike>). This also makes it depend on the browser to use CPU/GPU for rendering videos. Firefox (at the time of testing) was extremely slow with 10+ videos.

* Depends on Web browser and its File API, can't read/write to disk directly (for example creating playlists, reading entire directories)
