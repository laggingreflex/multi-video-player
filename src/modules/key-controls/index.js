const mouse = require('./mouse');
const wheel = require('./wheel');
const keyboard = require('./keyboard');

module.exports = ({ store, state }) => {
  const { getMouse, getVideo } = mouse({ store });
  wheel({ getVideo });
  keyboard({ store, getVideo });
};
