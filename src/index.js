const { render, h } = require('preact');
const { onChange } = require('./db');
const App = require('./components/app');

const div = document.getElementById('app');
const renderApp = props => render(h(App, props), div, div.lastChild);

onChange(renderApp);

if (module.hot) { module.hot.accept(); }
