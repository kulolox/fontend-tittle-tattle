Function.prototype.call2 = function (context) {
  // node环境中为global，浏览器为window
  context = context ? Object(context) : global;
  context.fn = this;
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }
  let res = eval(`context.fn(${args})`);
  delete context.fn;
  return res;
};

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call2(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5));
