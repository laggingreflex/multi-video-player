const h = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });
const _ = require('../../utils');

module.exports = class {
  render() {
    const { store } = this.props;
    const files = store.files || [];
    return h.ol({}, Array.from(files).map(file => h.li({}, [file.name])));
  }
}
