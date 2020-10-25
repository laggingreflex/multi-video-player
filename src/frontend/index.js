const { createElement: h } = require('react');
const { render } = require('react-dom');
const App = require('./components/app');
try { require('./style.css') } catch (error) {}

const root = document.getElementById('app') || (() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'app');
  root.innerText = 'Loading...';
  document.body.appendChild(root);
  return root;
})();

render(h(App), root);

if (typeof module !== 'undefined' && module.hot) module.hot.accept();

