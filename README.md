
# Multi Video Player

Play multiple videos in a single player

https://multi-video-player.surge.sh/

[![screenshot](https://i.imgur.com/AFioixGm.jpg)](https://gfycat.com/SpiritedUglyIrrawaddydolphin)

## Usage

Open the player and just drop some files in it.

All videos play at once, but muted. Only which you hover over plays the audio.

<sup>If you want all videos to play audio, hold <kbd>Shift</kbd> and hover over all of them.</sup>

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
| <kbd>+</kbd> | Zoom in (fewer, larger videos)
| <kbd>-</kbd> | Zoom Out (more, smaller videos)
||
| <kbd>/</kbd> | Flat style (equally spaced)
| <kbd>*</kbd> | Mason style (efficient stacking)
||
| <kbd>Spacebar</kbd> | Nothing (default behavior: scroll down)
| <kbd>Ctrl</kbd> + <kbd>Spacebar</kbd> | Play/pause video (under the cursor)
| <kbd>Shift</kbd> + <kbd>Ctrl</kbd> + <kbd>Spacebar</kbd> | Play/pause all videos


## Limitations

* Tested only on latest chrome, some issues in FF/Edge, untested in other browsers (safari, all mobile)

* Can only play videos supported by the web browser (mp4/ogg, <strike>flv/avi</strike>)