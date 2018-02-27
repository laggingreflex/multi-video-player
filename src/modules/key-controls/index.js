const mouse = require('./mouse');
const wheel = require('./wheel');
const keyboard = require('./keyboard');

module.exports = ({ store, state }) => {
  const { getMouse, getCurrentVideo } = mouse({ store });
  wheel({ getCurrentVideo });
  keyboard({ store, getCurrentVideo });
};
