const h = require('hyperchain/text')();

module.exports = () =>
  h.html({ lang: 'en' }, [
    h.head([
      h.title `Multi Video Player`,
      h.meta({ charset: 'UTF-8' }),
      h.meta({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      h.meta({ 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' }),
    ]),
    h.body([
      h.div.loading({ id: 'app' }),
    ])
  ]);
