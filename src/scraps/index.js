/*
1        100%
2 3      50%
4 5 6    33%
7 8 9 10 25%

*/
let i = 1;
let j = 1;
let k = 1;
for (const child of this.base.children) {
  const width = 100 / k;
  // console.log(i, (width).toFixed(1), { j, k });
  child.style.width = `calc(${width}% - 1px)`;
  // child.style.maxHeight = `${child.offsetWidth * (10/16)}px`
  i++;
  j++;
  if (j > k) {
    k++;
    j = 1;
  }
}
