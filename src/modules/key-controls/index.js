const initMouse = require('./mouse');
const initWheel = require('./wheel');
const initKeyboard = require('./keyboard');

module.exports = ({ store, state }) => {
  const { mouse } = initMouse({ store });
  initWheel({ mouse });
  initKeyboard({ store, mouse });
};
