const { store, state } = require('../../db');

window.onkeypress = e => {
  if (e.key === '+') {
    store.settings.zoom = Math.max(1, (store.settings.zoom || 1) - 1)
    e.preventDefault();
  } else if (e.key === '-') {
    store.settings.zoom = Math.min(10, (store.settings.zoom || 1) + 1)
    e.preventDefault();
  }
}
