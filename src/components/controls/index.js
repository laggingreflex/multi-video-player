const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });

module.exports = props => h.div([
  h.pre({ id: 'console' }),
  h.button({ id: 'play', title: 'play' }, ['▶️']),
]);
