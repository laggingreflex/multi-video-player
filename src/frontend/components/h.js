const _H = require('hyperchain/react');

const H = (opts = {}) => _H({
  dashifyClassnames: true,
  tagClass: true,
  filterFalseyChildren: true,
  stylePreserveNames: true,
  // elementMap: { _: Fragment },
  styleOmitUnused: false,
  ...opts,
});

const style = (baseStyle, baseOpts) => (opts = {}) => H({ ...baseOpts, ...opts, style: [baseStyle, opts.style].filter(Boolean) });

const h = H();

module.exports = { H, H_: H, h, style };
