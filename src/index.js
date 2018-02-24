const { render, h } = require('preact');
const getStore = require('./store');
const App = require('./components/app');

const div = document.getElementById('app');
const renderApp = props => render(h(App, props), div, div.lastChild);

getStore({ onChange: renderApp });

if (module.hot) { module.hot.accept(); }
