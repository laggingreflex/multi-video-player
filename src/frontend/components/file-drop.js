const { h } = require('./h');
const { useCallback } = require('react');
const { useDropzone } = require('react-dropzone');

module.exports = ({ onDrop, full = true, style }) => {

  // const onDrop = useCallback(files => {
  //   onDropProp(files);
  // });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return h.div.fileDrop({
      ...getRootProps(),
      style: {
        ...style,
        // border: '1px dotted',
        // width: full ? '100%' : 'auto',
        // height: full ? 'calc(100vh - 1em)' : 'auto',
        // boxSizing: 'border-box',
        // gridColumn: '1 / -1',
      },
    }, h.input({
      ...getInputProps(),
    }),
    isDragActive
    ? h.p('Drop file here...')
    : h.p(`Drag 'n' drop some files here, or click to select files`)
  );
}
