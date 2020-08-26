/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。有效字符串需满足：左括号必须与相同类型的右括号匹配，左括号必须以正确的顺序匹配。
 */

function s5_1(str) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const curr = str.charAt(i);
    if (isLeft(curr) === 1) {
      stack.push(curr);
    } else {
      if (stack.length === 0) {
        return '非法';
      }
      const p = stack.pop();
      if (isPair(p, curr) === 0) {
        return '非法';
      }
    }
  }

  if (stack.length === 0) {
    return '合法';
  } else {
    return '非法';
  }
}

function isLeft(c) {
  if (c === '{' || c === '[' || c === '(') {
    return 1;
  }

  return 2;
}

function isPair(p, curr) {
  if ((p === '{' && curr === '}') || (p === '[' && curr === ']') || (p === '(' && curr === ')')) {
    return 1;
  }

  return 0;
}

const str = '{[()()]}';

console.log(s5_1(str));
