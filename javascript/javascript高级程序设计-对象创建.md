### 理解对象

ECMAScript 对象有两种属性：数据属性和访问器属性。

### 数据属性


* [[Configurable]]: 能否删除、修改属性。 对于直接定义在对象上的属性，默认为 true
* [[Enumerable]]: 能否遍历 for-in。 对于直接定义在对象上的属性，默认为 true
* [[Writable]]: 能否修改属性的值
* [[Value]]: 包含这个属性的值
### 访问器属性

访问器属性不包含数据的值；包含一对 getter 和 setter 函数（非必要）。

读取访问器属性时调用 getter，返回有效值；写入访问器属性时调用 setter，传入新值。


* [[Configurable]]: 能否删除、修改属性。 对于直接定义在对象上的属性，默认为 true
* [[Enumerable]]: 能否遍历 for-in。 对于直接定义在对象上的属性，默认为 true
* [[Get]]: 默认值 undefined
* [[Set]]: 默认值 undefined
>访问器属性不能直接定义，需要使用 Object.defineProperty()。
### 创建对象

通过对象字面量和构造函数都能创建对象，但是创建很多对象会产生大量重复代码。由此出现工厂模式


1. 工厂模式
```
function createPerson(name, age) {
var o = new Object();
o.name = name;
o.age = age;
o.sayName = function() {
alert(this.name);
}
return o;
}

var person1 = createPerson('kulolo', 21)
var person2 = createPerson('jianfeng', 20)
```
工厂模式解决了重复代码的问题，但是没有解决识别对象的问题（instanceof）


1. 构造函数模式
```
function Person(name, age) {
this.name = name;
this.age = age;
this.sayName = function() {
alert(this.name)
}
}

var person1 = new Person('kulolo', 21)
var person2 = new Person('jianfeng', 20)
alert(person1 instanceof Person) // true
```
new 操作符实例化一个构造函数实际上经历了 4 个步骤：


* 创建新对象
* 将构造函数的作用域赋给新对象（因此 this 指向这个新对象）
* 执行构造函数的代码
* 返回新对象

构造函数也有缺点，每个方法 sayName 都要在示例上重新创建一遍


1. 原型模式
```
function Person() {
}

Person.prototype.name = 'kulolo';
Person.prototype.age = 21;

Person.prototype.sayName = function() {
alert(this.name);
}

var person1 = new Person()
alert(person1 instanceof Person) // true
```
更简单的写法：

```
function Person() {
}

Person.prototype = { // 注意重写了构造函数的原型对象
constructor: Person, // 人为指回构造函数
name: 'kulolo',
age: 21,
sayName: function() {
alert(this.name);
}
}

var person1 = new Person()
alert(person1 instanceof Person) // true
```
>重写整个原型对象，切断了构造函数与最初原型间的联系，所以不能先实例化再重写原型对象。

原型模式的缺点是无法传参，所有的实例都将获得相同的属性，但这不是最大的问题；最大的问题来自引用类型值。

```
function Person() {
}

Person.prototype = { // 注意重写了构造函数的原型对象
constructor: Person, // 人为指回构造函数
name: 'kulolo',
age: 21,
friends: ['kulolo', 'jianfeng.xu'],
sayName: function() {
alert(this.name);
}
}

var person1 = new Person();
person1.friends.push('lili'); // 直接修改了原型上的值
```
实例一般要有属于自己的所有属性，所以很少单独使用原型模式


1. 组合模式（构造函数+原型模式）

创建自定义类型的常用方式，构造函数定义实例属性，原型定义方法和共享属性。

```
function Person(name, age) {
this.name = name;
this.age = age;
this.friends = ['kulolo', 'jianfeng.xu'];
}

Person.prototype = {
constructor: Person,
sayName: function() {
alert(this.name);
}
}

var person1 = new Person();
```

1. 动态原型模式

动态原型模式将所有信息都封装在构造函数中，是一种较为完美的模式。

```
function Person(name, age) {
this.name = name;
this.age = age;
this.friends = ['kulolo', 'jianfeng.xu'];

if (typeof this.sayName !== 'function') {
Person.prototype.sayName = function() {
alert(this.name);
}
}
}

var person1 = new Person();
```

1. 寄生构造函数模式

当其他方法都不适用时，可以使用该模式。该模式与工厂模式一样，只是在调用构造函数时使用了 new。

```
function Person(name, age) {
var o = new Object();
o.name = name;
o.age = age;
o.sayName = function() {
alert(this.name);
}

return o;
}

var person1 = new Person('kulolo', 21);
```
该模式创建的实例与构造函数的原型没有关系，而是和构造函数中实例化的对象 o 关联，就像是 o 借用 Person 创建自己的对象（寄生）。


1. 稳妥构造函数模式

与寄生构造函数模式相似，但有两点不同，不使用 this，不使用 new

```
function Person(name, age) {
var o = new Object();
o.name = name;
o.age = age;
o.sayName = function() {
alert(name); // 除了sayName方法，没有任何方法可以访问name属性
}

return o;
}

var person1 = Person('kulolo', 21);
```
稳妥构造函数模式实例出来的对象也与构造函数没有关系，instanceof 操作是无意义的。

