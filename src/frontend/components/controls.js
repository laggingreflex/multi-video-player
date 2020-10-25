const { db, useState } = require('../store');
const { h } = require('./h');

module.exports = () => {

  return h.div.controls(
    h.button.play({ onClick: play }, '▶'),
    h.button.pause({ onClick: pause }, '⏸'),
    h.button.forward({ onClick: forward }, '⏩'),
    h.button.reverse({ onClick: reverse }, '⏪'),
    h.button.next({ onClick: next }, '⏭'),
    h.button.last({ onClick: last }, '⏮'),
  )

}

function play() {}
function pause() {}
function forward() {}
function reverse() {}
function next() {}
function last() {}
