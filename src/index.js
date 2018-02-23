const { render, h } = require('preact');
const getStore = require('./store');
const App = require('./components/app');

const div = document.getElementById('app');

/* Re-usable wrapper */
const renderApp = (props) =>
  /* Main render function  */
  render(h(App, props), div, div.lastChild);

getStore({ onChange: (store) => renderApp({ store }) });

if (module.hot) { module.hot.accept(); }
