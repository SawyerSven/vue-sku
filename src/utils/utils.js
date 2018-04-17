export function combine(arr) {
  let r = [];
  (function f(empty, array, length) {
    if (length == 0) return r.push(empty);
    for (let i = 0; i < array[length - 1].length; i++) {
      f(empty.concat(array[length - 1][i]), array, length - 1);
    }
  })([], arr, arr.length);
  return r;
}
