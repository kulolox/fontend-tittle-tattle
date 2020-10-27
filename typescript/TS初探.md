## TypeScript

### 类型注解

TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式。

```
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];
greeter(user) // ts编译会报错，函数参数被约束为string类型，但传入值为array
```

#### 基础类型

```
// 布尔值
let isDone: boolean = true;
// 数字
let count: number = 6;
// 字符串
let name: string = 'jianfeng.xu'
// 数组有两种方式可以定义数组。
// 第一种，可以在元素类型后面接上 [];
// 第二种方式是使用数组泛型，Array<元素类型>
let list: number[] = [1,2,3];
let list: Array<number> = [1,2,3]
// 元组
let x: [string, number];
x = ['hello', 10]
// 枚举
enum Color {Red,Green,Bule}
let c:Color = Color.green;
// any，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型
let notSure: any = 4
// Void， 它表示没有任何类型，常见场景为函数无返回值得情况
function warnUser(): void {
  console.log(123)
}
// null和undefined使用场景少
// Never类型表示的是那些永不存在的值的类型
function error(message: string): never {
    throw new Error(message);
}
// Object表示非原始类型，就是除number,string,boolean,symbol,null,undefined之外的类型
declare function create(o: object | null): void;
```

### 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

类型断言有两种形式。 其一是“尖括号”语法：

```
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
```

另一个为 as 语法：

```
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

> 两种语法是等价的，但在 ts 中使用 jsx 时，只有 as 语法是被允许的。

### 变量声明

使用 let,const 进行变量声明；不要使用 var。

### 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。

```
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

greeter(user)
```

#### 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。
带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。

```
interface SquareConfig {
  color?: string;
  width?: number;
}
```

#### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly 来指定只读属性:

```
interface Point {
    readonly x: number;
    readonly y: number;
}
```

### 函数类型

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型

```
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

### 类

```
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

greeter(user);
```
