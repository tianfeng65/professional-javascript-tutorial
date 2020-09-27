// 1、其他类型 => 布尔类型
/**
 * 以下是其他类型转换为布尔类型结果为false的所有情况，
 * 除此之外所有的其他类型转换为布尔类型结果都是true
 */
Boolean(''); // false
Boolean(0); // false
Boolean(+0); // false
Boolean(-0); // false
Boolean(NaN); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean(false); // false

// 2、其他类型 =>数值类型
/**
 * 有3个函数可以将非数值转换为数值：Number()、parseInt()和parseFloat()。
 * 2.1、Number()
 */
const obj = {
  a: 1,
  valueOf() {
    console.log('执行了valueOf方法');
    return {};
  },
  toString() {
    console.log('执行了toString方法');
    return '123';
  },
};

const arr = [
  Number(true), // 1
  Number(false), // 0
  Number(null), // 0
  Number(undefined), // NaN
  Number(''), // 0
  Number('012.34'), // 12.34
  Number('-12.34'), // -12.34
  Number('0o70'), // 56
  Number('0x16'), // 22
  +'0x16', // 22
  Number(obj), // 123 在其中先执行了valueOf方法，然后执行了toString方法
];

console.log(arr);

/**
 * 有3个函数可以将非数值转换为数值：Number()、parseInt()和parseFloat()。
 * 2.2、parseInt()
 */
const arr2 = [
  parseInt(''), // NaN
  parseInt('  asd'), // NaN
  parseInt(' +123.45'), // 123
  parseInt('02020'), // 2020, 解释为十进制
  parseInt('0x16'), // 22，解释为十六进制整数
  parseInt('0xf', 16), // 15
  0xf, // 15
  0o2020, // 1040
  0b10, // 2
  0o10, // 8
  parseInt('10', 10), // 10
  0x10, // 16
];
console.log(arr2);

/**
 * 有3个函数可以将非数值转换为数值：Number()、parseInt()和parseFloat()。
 * 2.3、parseFloat()
 */
const arr3 = [
  parseFloat('1234blue'), // 1234，按整数解析
  parseFloat('0xA'), // 0
  parseFloat('22.5'), // 22.5
  parseFloat('22.34.5'), // 22.34
  parseFloat('0908.5'), // 908.5
  parseFloat('3.125e7'), // 31250000
];
console.log(arr3);
