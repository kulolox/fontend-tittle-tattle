/**
 * js为单线程编程语言，js的‘多线程’都是用单线程模拟出来的
 * js任务类型可分为同步任务和异步任务，两种任务类型的处理机制是不同的
 * js任务机制可见‘js任务机制.jpg’
 * js任务除了同步任务和异步任务，还有更精细的定义：
 * 1. 宏任务：包括整体代码script、setTimeout、setInterval
 * 2. 微任务：Promiise异步部分、process.nextTick
 * 详见‘Event Loop机制.jpg’
 * 简单来说，先执行script主体，遇到宏任务，就推入宏任务队列，遇到微任务就推入微任务队列，代码主体执行完毕，检查微任务队列，依次执行队列中的微任务；清空微任务队列时，检查宏任务队列，继续上面的循环。直到两个队列都清空。
 * 注意Promise主体部分直接执行，异步部分为微任务
 */
(function () {
  console.log('1');

  setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
      console.log('3');
    });
    new Promise(function (resolve) {
      console.log('4');
      resolve();
    }).then(function () {
      console.log('5');
    });
  });
  process.nextTick(function () {
    console.log('6');
  });
  new Promise(function (resolve) {
    console.log('7');
    resolve();
  }).then(function () {
    console.log('8');
  });

  setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
      console.log('10');
    });
    new Promise(function (resolve) {
      console.log('11');
      resolve();
    }).then(function () {
      console.log('12');
    });
  });
})();

/**
 * 解析
 * 第一轮事件循环：
 * 1. 整体script作为第一个宏任务进入主线程，遇到console.log，输出1
 * 2. 遇到setTimeout，其回调函数被分发到宏任务队列，暂且记为setTimeout1
 * 3. 遇到process.nextTick，其回调被分发到微任务队列，记为process1
 * 4. 遇到Promise，Promise主体直接执行，输出7，then被分发到微任务队列，记为then1
 * 5. 遇到setTimeout，其回调函数被分发到宏任务队列，暂且记为setTimeout2
 * 第一轮宏任务结束，此时检查微任务队列，发现【process1，then1】
 * 6. 执行process1，输出6
 * 7. 执行then1，输出8
 * 第一轮事件循环结束，此时宏任务队列【setTimeout1,setTimeout2】，第二轮事件循环从setTimeout1开始。
 * 第二轮事件循环：
 * 1. 遇到console.log，输出2
 * 2. 遇到process.nextTick，其回调被分发到微任务队列，记为process1
 * 3. 遇到Promise，Promise主体直接执行，输出4，then被分发到微任务队列，记为then1
 * 第二轮宏任务结束，此时检查微任务队列，发现【process1，then1】
 * 4. 执行process1，输出3
 * 5. 执行process1，输出5
 * 第二轮事件循环结束，此时宏任务队列【setTimeout2】，第三轮事件循环从setTimeout2开始。
 * 1. 遇到console.log，输出9
 * 2. 遇到process.nextTick，其回调被分发到微任务队列，记为process1
 * 3. 遇到Promise，Promise主体直接执行，输出11，then被分发到微任务队列，记为then1
 * 第三轮宏任务结束，此时检查微任务队列，发现【process1，then1】
 * 4. 执行process1，输出3
 * 5. 执行process1，输出5
 * 第三轮事件循环结束，宏任务队列为空，事件结束。输出结果为1,7,6,8,2,4,3,5,9,11,10,12（node环境）
 */
