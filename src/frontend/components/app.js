const { h } = require('./h');
const FileDrop = require('./file-drop');
const { useState, useRef, useEffect } = require('react');
const Videos = require('./videos');
const Aside = require('./aside');
const Controls = require('./controls');
const { connectDb } = require('../store');

// module.exports = connectDb(connectUrl((App)));
module.exports = connectDb(App);

function App() {
  const [files, updateFiles] = useState([]);
  console.log(`files:`, files);

  return h.div.app({}, h(FileDrop, {
    full: !files.length,
    onDrop: filesAdded => {
      // const all = [...filesAdded, ...files];
      const all = [...files, ...filesAdded];
      const paths = all.map(f => f.path);
      const set = new Set(paths);
      const deDuped = Array.from(set);
      const final = deDuped.map(path => all.find(f => f.path === path));
      updateFiles(final);
    },
  }), h(Videos, { files }), h(Controls), h(Aside));

  return 'Welcome!';
}
