
exports.toggleList = list => existing => {
  const index = list.indexOf(existing);
  if (index == -1) return list[0];
  const next = index + 1;
  if (next >= list.length) return list[0];
  return list[next];
};
