const { useRef } = require('react')
const { db, useState } = require('../store');
const { h } = require('./h');
const { useKeyPress } = require('../hooks')

module.exports = () => {
  const ref = useRef();
  const state = useState();
  useKeyPress((e, { down, up }) => {
    if (e.key === 'Escape' && db.asideExpanded) db.asideExpanded = false; 
    if (e.key === 'o' && !db.asideExpanded) db.asideExpanded = true; 
  });

  if (!db.asideExpanded) return h.aside.collapsed(h.button.expand({
    // style: {
    //   position: 'fixed',
    //   right: '1em',
    //   top: '1em',
    // },
    onClick: () => db.asideExpanded = true
  }, '☰'));

  const fieldStyle = {
    display: 'block',
    marginTop: '1em',
  }


  return h.aside.expanded({
      ref,
      // style: {
      //   position: 'fixed',
      //   right: 0,
      //   top: 0,
      //   height: '100%',
      //   padding: '1em',
      //   // border: '1px dotted',
      //   borderLeft: '1px solid',
      //   width: '20vw',
      //   background: 'rgba(255,255,255,.9)',
      // },
      onClick: (e) => {
        // if (e.target === ref.current)
        //   db.asideExpanded = false;
      },
    },
    h.h2('Options'),

    h.label({ style: fieldStyle }, h.input({
      type: 'checkbox',
      defaultChecked: db.fullScreen,
      onChange: e => db.fullScreen = e.target.checked,
    }), ' Fullscreen'),
    h.label({ style: fieldStyle }, h.input({
      type: 'checkbox',
      defaultChecked: db.loop,
      onChange: e => db.loop = e.target.checked,
    }), ' Loop'),

    h.label({ style: fieldStyle }, `Show: ${db.simultaneousLoad || 1} videos simultaneously`, h.input({
      type: 'range',
      min: 1,
      max: 10,
      defaultValue: db.simultaneousLoad || 1,
      onChange: e => db.simultaneousLoad = e.target.value,
    })),
    h.label({ style: fieldStyle }, `Play: ${db.simultaneousPlay || 1} videos simultaneously`, h.input({
      type: 'range',
      min: 1,
      max: 10,
      defaultValue: db.simultaneousPlay || 1,
      onChange: e => db.simultaneousPlay = e.target.value,
    })),

    h.label({ style: fieldStyle }, `Show N videos on one page: ${db.nVideos || 9}`, h.input({
      type: 'range',
      min: 1,
      max: 32,
      defaultValue: db.nVideos || 9,
      onChange: e => db.nVideos = e.target.value,
    })),

    h.div.buttons({
        style: {
          position: 'fixed',
          right: '1em',
          top: '1em',
          display: 'flex',
          alignItems: 'stretch',
        },
      },
      // h.button({
      //   onClick: () => db.asideSticky = !db.asideSticky,
      // }, h.div({
      //   style: {
      //     transform: `rotate(${db.asideSticky ? -45 : 0}deg)`
      //   },
      // }, '📌')),
      h.button({
        onClick: () => db.asideExpanded = false,
        // disabled: db.asideSticky,
      }, 'X'),
    ),
  )

}
