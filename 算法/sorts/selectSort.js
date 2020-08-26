/**
 * 选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
 */

// 算法分析
// 最佳情况 O(n2)
// 最差情况 O(n2)
// 平均情况 O(n2)

/**
 * <1>在未排序数据中找到最小（最大）元素。存放到排序序列的起始位置
 * <2>从剩余未排序元素中继续寻找最小（最大元素），然后放到已排序序列的末尾
 * <3>重复2直到所有元素排序完成
 */
function selectSort(arr) {
  let length = arr.length;
  let minIndex;
  for (let i = 0; i < length - 1; i++) {
    minIndex = i; // 默认当前值最小
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // 寻找该轮循环最小值的索引
      }
    }
    if (minIndex !== i) {
      // 交换每轮起始位置的值与最小值
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

let arr = [2, 5, 10, 7, 10, 32, 90, 9, 11, 1, 1, 10];

console.log(selectSort(arr));
