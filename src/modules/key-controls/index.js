const mouse = require('./mouse');
const wheel = require('./wheel');
const keyboard = require('./keyboard');

module.exports = ({ store, state }) => {
  const sharedData = {};
  mouse({ store, state, sharedData });
  wheel({ store, state, sharedData });
  keyboard({ store, state, sharedData });
};
