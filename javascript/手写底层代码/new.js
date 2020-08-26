const myNew = function () {
  const Constructor = [].shift.call(arguments);
  const obj = {};
  obj.__proto__ = Constructor.prototype; // obj的实例指向传入的构造函数的原型
  const res = Constructor.apply(obj, arguments);
  return res instanceof Object ? res : obj;
};

function Student(name, age) {
  this.name = name;
  this.age = age;
}

console.log(myNew(Student, 'jianfeng', 22));
