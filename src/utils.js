const $ = exports.$ = q => {
  const e = document.querySelectorAll(q);
  if (e.length > 1) return e;
  else return e[0];
};

const once = exports.once = (element, event, timeoutDuration = 1000) => {
  const once = new Promise(_ => element.addEventListener(event, _, { once: true }))
  const timeout = new Promise(_ => setTimeout(_, timeoutDuration));
  return Promise.race([once, timeout]);
};

const arrify = exports.arrify = e => e ? e.length ? e : [e] : [];

const stylize = exports.stylize = (element, styles) => {
  for (const key in styles) {
    element.style[key] = styles[key]
  }
  return (_element = element) => {
    for (const key in styles) {
      element.style[key] = null;
    }
  }
};
