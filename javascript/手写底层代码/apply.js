Function.prototype.apply2 = function (context, args) {
  // node环境中为global，浏览器为window
  context = context ? Object(context) : global;
  // 提取函数
  context.fn = this;

  if (!args) {
    return context.fn();
  }
  // 执行函数
  let res = eval('context.fn(' + args + ')');
  delete context.fn;
  return res;
};

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply2(null, numbers);

console.log(max);
