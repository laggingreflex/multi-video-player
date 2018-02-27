const { render, h } = require('preact');
const { store, state, onChange } = require('./db');
const App = require('./components/app');
const initKeyControls = require('./modules/key-controls');

const div = document.getElementById('app');
const renderApp = props => render(h(App, props), div, div.lastChild);

onChange(renderApp);
initKeyControls({ store, state });

if (module.hot) { module.hot.accept(); }
