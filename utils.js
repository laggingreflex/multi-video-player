export const $ = q => {
  const e = document.querySelectorAll(q);
  if (e.length > 1) return e;
  else return e[0];
};

export const once = (element, event, timeoutDuration = 1000) => {
  const once = new Promise(_ => element.addEventListener(event, _, { once: true }))
  const timeout = new Promise(_ => setTimeout(_, timeoutDuration));
  return Promise.race([once, timeout]);
}

export const arrify = e => e ? e.length ? e : [e] : [];

export const stylize = (element, styles) => {
  for (const key in styles) {
    element.style[key] = styles[key]
  }
  return (_element = element) => {
    for (const key in styles) {
      element.style[key] = null;
    }
  }
}
