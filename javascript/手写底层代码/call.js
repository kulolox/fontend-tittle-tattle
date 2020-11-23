Function.prototype.call2 = function (context) {
  // node环境中为global，浏览器为window
  context = context ? Object(context) : global;
  // 提取绑定函数
  context.fn = this;
  // 提取传递参数
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  // 执行函数
  const result = eval('context.fn(' + args + ')');
  // 删除函数
  delete context.fn;
  return result;
};

const obj = {
  value: 2
};

function test(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  };
}

test.call(obj);
