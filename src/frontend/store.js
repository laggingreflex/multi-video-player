const undb = require('undb');
const connector = require('undb/browser/connect');
const { useState, createUseState } = require('undb/browser/hooks');

const volatile = createState();

const persistent = createState({
  path: 'v0.0.0',
  clear: true,
  initial: {},
});

onChange((...args) => {
  // console.debug('onChange', ...args);
})

function onChange(onChange) {
  persistent.onChange(onChange);
  volatile.onChange(onChange);
}

function connect(Component) {
  return persistent.connect(volatile.connect(Component));
}

function createState(opts) {
  const [state, onChange, link] = undb(opts);
  const connect = connector(onChange);
  const useState = createUseState(onChange);
  return { state, connect, useState, onChange, link };
}

module.exports = {
  persistent,
  volatile,
  db: persistent.state,
  store: persistent.state,
  state: volatile.state,
  onChangeDb: persistent.onChange,
  onChangeState: volatile.onChange,
  connectDb: persistent.connect,
  connectState: volatile.connect,
  onChange,
  connect,
  createState,
  useState,
};
