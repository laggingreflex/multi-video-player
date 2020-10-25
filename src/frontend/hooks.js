const { useState, useEffect } = require('react')

const keyPressCallbacks = new Set;
window.addEventListener('keydown', downHandler);
window.addEventListener('keyup', upHandler);

function downHandler(e) {
  // console.log(`e.key:`, e.key);
  for (const down of keyPressCallbacks) {
    down(e, { down: true });
  }
}

function upHandler(e) {
  // console.log(`e.key:`, e.key);
  for (const up of keyPressCallbacks) {
    up(e, { up: true });
  }
}


module.exports = { useKeyPress };

function useKeyPress(callback, changeWhen = [callback]) {
  useEffect(() => {
    keyPressCallbacks.add(callback);
    return () => keyPressCallbacks.delete(callback);
  }, changeWhen);
}


function useKeyPress1(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
  return keyPressed;
}
