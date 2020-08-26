/**
 * 快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。
 */

// 算法分析
// 最佳情况 O(nlog n)
// 最差情况 O(n2)
// 平均情况 O(nlog n)

// 快排1
function quickSort1(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort1(left).concat([pivot], quickSort1(right));
}

// 快排2
/**
 *
 * @param {*} A 数组
 * @param {*} p 起始下标
 * @param {*} r 结束下标 + 1
 */
function quickSort2(A, p = 0, r) {
  r = r || A.length;
  if (p < r - 1) {
    const q = divide(A, p, r);
    quickSort2(A, p, q);
    quickSort2(A, q + 1, r);
  }
  return A;
}

/**
 *
 * @param {*} A 数组
 * @param {*} p 起始下标
 * @param {*} r 结束下标 + 1
 */
function divide(A, p, r) {
  const x = A[r - 1];
  let i = p - 1;
  for (let j = p; j < r - 1; j++) {
    if (A[j] <= x) {
      i++;
      swap(A, i, j);
    }
  }
  swap(A, i + 1, r - 1);
  return i + 1;
}

// 数组位置交换
function swap(A, i, j) {
  [A[i], A[j]] = [A[j], A[i]];
}

let arr = Array.from({ length: 10000 }, () => parseFloat(Math.random().toFixed(6)));

console.log(quickSort2(arr));
