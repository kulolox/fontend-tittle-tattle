function foo(a) {
  console.log('1:', a);

  var a = 2;
  console.log('2:', a);
}

foo(1);
