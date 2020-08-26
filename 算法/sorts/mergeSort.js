/**
 * 归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。
 */

// 算法分析
// 最佳情况 O(n)
// 最差情况 O(nlog n)
// 平均情况 O(nlog n)

function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr; // 递归退出条件
  }
  // 将数据分成两个部分，
  const middle = Math.floor(len / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

let arr = [2, 5, 10, 7, 10, 32, 90, 9, 11, 1, 0, 10, 5];

console.log(mergeSort(arr));
