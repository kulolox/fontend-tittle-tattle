/**
 * 单插入排序的改进版；它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序
 */

// 希尔排序是基于插入排序的两点性质提出的
// 1. 插入排序对几乎已经排序的数据操作时效率高
// 2. 插入排序是低效的，每次只能将数据移动一位

// 算法分析
// 最佳情况 O(nlog2 n)
// 最差情况 O(nlog2 n)
// 平均情况 O(nlog n)

function shellSort(arr) {
  let len = arr.length;
  let current;
  let gap = 1;
  // 根据数据规模设定增量
  while (gap < len / 5) {
    gap = gap * 5 + 1;
  }

  // 最外层控制步长
  for (; gap > 0; gap = Math.floor(gap / 5)) {
    for (let i = gap; i < len; i++) {
      current = arr[i];
      let j = i - gap;
      while (j >= 0 && arr[j] > current) {
        arr[j + gap] = arr[j];
        j -= gap;
      }
      arr[j + gap] = current;
    }
  }
  return arr;
}

let arr = Array.from({ length: 1000000 }, () => parseFloat(Math.random().toFixed(6)));

console.log(shellSort(arr));
