const interactjs = require('interactjs');

module.exports = e => interactjs(e).draggable({
  inertia: true,
  restrict: {
    restriction: 'parent',
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },
  // enable autoScroll
  autoScroll: true,
  onmove,
}).resizable({
  edges: { left: true, right: true, bottom: true, top: true },
  restrictEdges: {
    outer: 'parent',
    endOnly: true,
  },
  inertia: true,
}).on('resizemove', onresizemove);

function onresizemove(e) {
  e.target.style.width = `${e.rect.width}px`;
  e.target.style.height = `${e.rect.height}px`;
  const x = (parseFloat(e.target.getAttribute('data-x')) || 0) + e.deltaRect.left;
  const y = (parseFloat(e.target.getAttribute('data-y')) || 0) + e.deltaRect.top;
  e.target.style.transform = `translate(${x}px, ${y}px)`;
  e.target.setAttribute('data-x', x);
  e.target.setAttribute('data-y', y);
}

function onmove(e) {
  const x = (parseFloat(e.target.getAttribute('data-x')) || 0) + e.dx;
  const y = (parseFloat(e.target.getAttribute('data-y')) || 0) + e.dy;
  e.target.style.transform = `translate(${x}px, ${y}px)`;
  e.target.setAttribute('data-x', x);
  e.target.setAttribute('data-y', y);
}
