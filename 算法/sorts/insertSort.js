/**
 * 插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。
 */

// 算法分析
// 最佳情况 O(n)
// 最差情况 O(n2)
// 平均情况 O(n2)

/**
 * <1>从第一个元素开始，该元素可以被认定为已排序
 * <2>取出下一个元素，在已经排序的元素序列中从后向前扫描
 * <3>如果该元素大于新元素，该元素移动到下一位置
 * <4>重复步骤3,直到找到已排序的元素小于或者等于新元素的位置
 * <5>将新元素插入到该位置
 * <6>重复步骤2-5
 *
 */
function insertSort1(arr) {
  let length = arr.length;
  let current;
  for (let i = 1; i < length; i++) {
    current = arr[i]; // 取出当前值
    let j = i; // j为当前值，并且从后往前遍历
    while (j > 0) {
      // 当前值依次与前一个值进行比较，注意我们设定当前值前面的数组已经有序，则当前值大于前一个值表示找到了需要插入的位置
      if (current >= arr[j - 1]) {
        break;
      }
      // 当前值被取出了，留下了空位，将排序的数组依次向后移动一位，流出插入位置
      arr[j] = arr[j - 1];
      j--;
    }
    // 一次比较完成，插入取出的值，准备进入下次循环
    arr[j] = current;
  }
  return arr;
}

// 插入排序优化（折半插入）
/**
 * 插入排序，默认待插入数的前面是有序的，然后去寻找要插入的位置（查找）
 * 则我们利用二分查找的原理查找插入位置
 */

function insertSort2(arr) {
  let length = arr.length;

  let current, low, high, mid;
  for (let i = 1; i < length; i++) {
    // 确定有序数组的上限和下限
    low = 0;
    high = i - 1;
    current = arr[i]; // 取出当前值

    // 二分查找，找到插入位置
    while (low <= high) {
      mid = ((high - low) >> 1) + low; // 中间值
      if (current >= arr[mid]) {
        low = mid + 1; // 查询右半区
      } else {
        high = mid - 1; // 查询左半区
      }
    }

    // 插入位置之后的元素都向后移动一位
    for (let j = i; j > low; j--) {
      arr[j] = arr[j - 1];
    }

    arr[low] = current; // 当前值插入
  }
  return arr;
}

let arr = [2, 5, 10, 7, 10, 32, 90, 9, 11, 1, 1, 10];

console.log(insertSort2(arr));
