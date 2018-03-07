
* View

  ☐ Best fit zoom level (ideal zoom level to fit all videos on screen)

  ☐ Display info/controls on video.

  ☐ 'play-visible' - A new mode to play only videos currently in the view

  ☐ When leaving the app in background, let the user choose to have the video(s) keep playing or pause. Currently it's to keep playing, the user can pause himself (use <kbd>Spacebar</kbd>) before leaving.

  ☐ Settings page/popup (to configure zoom, style, etc settings)

  ☐ Ability to search google for the specified file (maybe to look up lyrics for music files, or other details like original youtube page, etc.)

  🗹 When adjusting zoom, scroll back to current video

* Controls

  ☐ WASD equivalent zoom keys

  ☐ Option to play next after a video finishes. Currently it just loops

  ☐ Global hotkeys - play/pause/next.

    * 🗵 Turns out it's not possible, at least not in browser. Neither media keys (play/pause), nor global hotkeys.

    * ☐ It might be possible in Electron: https://github.com/electron/electron/blob/master/docs/api/global-shortcut.md

  🗹 spacebar play/pause when zoom = 1

  🗹 stop/play from beginning. <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>Left</kbd>/<kbd>Right</kbd>

  🗹 "Next" to switch to next video. <kbd>Tab</kbd> when zoom=1

  🗹 "Next/prev" to loop to beginning/end if on last/first video

* Files

  ☐ Ability to add more files, load new files at the top

  ☐ Ability to remove files

  ☐ Ability to re-arrange files

  ☐ Ability to star/favourite files to be moved to the top. It should remember those files and always place them before unrated files. Any new file being starred should then have a "priority" one higher than the highest.

* Core

  ☐ Make it a PWA that works offline, possibly be added to the desktop and opens without browser interface

  ☐ Or make it an Electron desktop app - with ability to do more file operations like opening directories and saving playlists

  ☐ Support more file formats - flv, avi

* Settings

  ☐ Make play-mode dynamic (currently that setting is saved). Make 'play-single' the default play mode when loading 30+ videos.

