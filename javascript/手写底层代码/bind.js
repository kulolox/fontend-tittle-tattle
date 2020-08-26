Function.prototype.bind = function (context) {
  let that = this;
  let bindArgs = [].slice(arguments, 1);
  function Fn() {}
  function fBound() {
    let args = [].slice.call(arguments);
    return that.apply(this instanceof fBind ? this : context, bindArgs.concat(args));
  }
  Fn.prototype = this.prototype;
  fBound.prototype = new Fn();
  return fBound;
};
