/**
 * 在一个数组中找出出现次数最多的那个元素的数值
 *
 * @param {array} arr
 */
function s2_4(arr) {
  // 借用map或object
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }
  let val_max = -1;
  let time_max = 0;

  for (let key of map.keys()) {
    if (map.get(key) > time_max) {
      time_max = map.get(key);
      val_max = key;
    }
  }
  return val_max;
}

const arr = [1, 2, 3, 4, 4, 4, 5, 5, 6];

console.log(s2_4(arr));
