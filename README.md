# 学习JS高级程序设计（第四版）
```
Hello，欢迎你。这里是小狮子65记录自己学习JS高程（第四版）的地方。

这里我会将此书中较为重要的地方以讲解和代码结合的方式进行记录。
```

# 一、类型转换

## 1、其他类型 => 布尔类型

 - 显示触发：调用Boolean方法。
 - 隐式触发：if else、&&、||

|  数据类型   | 转换为true  | 转换为false |
|  ----  | ----  | ----|
| String  | 非空字符串 |  "" |
| Number  | 非零数字 | 0、-0、+0、NaN |
| Undefined | 无 | undefined |
| Object | 任何对象 | null |
| Symbol | 全部 | 无 |

```javascript
//1、其他类型 => 布尔类型
/**
 * 以下是其他类型转换为布尔类型结果为false的所有情况，
 * **除此之外所有的其他类型转换为布尔类型结果都是true**
 */
Boolean('')            // false
Boolean(0)           //false
Boolean(+0)        // false
Boolean(-0)         // false
Boolean(NaN)     // false
Boolean(null)      // false
Boolean(undefined)     // false
Boolean(false)    // false
```

## 2、其他类型 => 数值类型

有3个函数可以将非数值转换为数值：Number()、parseInt()和parseFloat()。

 - Number()是转型函数，可用于任何数据类型。(一元加操作符与Number()函数遵循相同的转换规则。)
 - parseInt()和parseFloat()两个函数主要用于将字符串转换为数值。对于同样的参数，这3个函数执行的操作也不同。

### 2.1、Number()

- 布尔值，true转换为1，false转换为0。
- 数值，直接返回。
- null，返回0。
- undefined，返回NaN。
- 字符串，应用以下规则。
    - 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。因此，Number("1")返回1，Number("123")返回123，Number("011")返回11（忽略前面的零）。
    - 如果字符串包含有效的浮点值格式如"1.1"，则会转换为相应的浮点值（同样，忽略前面的零）。
    - 如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整数值。
    - 如果是空字符串（不包含字符），则返回0。
    - 如果字符串包含除上述情况之外的其他字符，则返回NaN。
- 对象，应用以下规则。(这里书上写的有问题，以下为正解)
  - 第一步，调用对象自身的valueOf方法。如果返回原始类型的值，则直接对该值使用Number函数，不再进行后续步骤。

  - 第二步，如果valueOf方法返回的还是对象，则改为调用对象自身的toString方法。如果toString方法返回原始类型的值，则对该值使用Number函数，不再进行后续步骤。

  - 第三步，如果toString方法返回的是对象，就报错。
```javascript
const obj = {
    a: 1,
    valueOf() {
        console.log("执行了valueOf方法")
        return {}
    },
    toString() {
        console.log("执行了toString方法")
        return "123"
    }
}

const arr = [
    Number(true),   // 1
    Number(false),  // 0 
    Number(null),   // 0
    Number(undefined),  // NaN
    Number(""), // 0
    Number("012.34"),   // 12.34
    Number("-12.34"),   // -12.34
    Number("0o70"),     // 56
    Number("0x16"),     // 22
    +"0x16",    // 22
    Number(obj) // 123 在其中先执行了valueOf方法，然后执行了toString方法
]

console.log(arr)
```

### 2.2、parseInt()

parseInt()函数更专注于字符串是否包含数值模式。
- 字符串最前面的空格会被忽略，从第一个非空格字符开始转换。如果第一个字符不是数值字符、加号或减号，parseInt()立即返回NaN。这意味着空字符串也会返回NaN（这一点跟Number()不一样，它返回0）。
- 如果第一个字符是数值字符、加号或减号，则继续依次检测每个字符，直到字符串末尾，或碰到非数值字符。比如，"1234blue"会被转换为1234，因为"blue"会被完全忽略。类似地，"22.5"会被转换为22，因为小数点不是有效的整数字符。
- 假设字符串中的第一个字符是数值字符，parseInt()函数也能识别不同的整数格式（十进制、八进制、十六进制）。
  - 如果字符串以"0x"开头，就会被解释为十六进制整数。
  - __如果字符串以 "0"开头，则可能使用八进制或者十进制进行解释，这取决于实现。ECMAScript 5 澄清了应该使用 十进制，但不是所有的浏览器都支持（比如IE8）。因此，在使用 parseInt 时，一定要指定一个第二个参数指定底数（进制数）。__（这里书上写的有问题，以上为正解）

```javascript
const arr = [
    parseInt(""), // NaN
    parseInt("  asd"), // NaN
    parseInt(" +123.45"), // 123
    parseInt("02020"), // 2020, 解释为十进制
    parseInt("0x16") // 22，解释为十六进制整数
]
console.log(arr)
```

不同的数值格式很容易混淆，因此parseInt()也接收第二个参数，用于指定底数（进制数）。如果知道要解析的值是十六进制，那么可以传入16作为第二个参数，以便正确解析。：

```javascript
const arr2 = [
    parseInt("0xf", 16), // 15
    parseInt("f", 16), // 15
    parseInt("2020", 8), // 1040
    parseInt("10", 2), // 2
    parseInt("10", 8), // 8
    parseInt("10", 10), // 10
    parseInt("10", 16) // 16
]
console.log(arr2)
```
题外话，在我配置了Airbnb的Eslint规范后，我发现Airbnb强制ParseInt要传入第二个参数，也禁止使用ParseInt解析二进制、八进制、十六进制，进而在编码规范上规避JS的一些诡异特性。

### 2.3、parseFloat()

parseFloat()函数的工作方式跟parseInt()函数类似，都是从位置0开始检测每个字符。同样，它也是解析到字符串末尾或者解析到一个无效的浮点数值字符为止。这意味着第一次出现的小数点是有效的，但第二次出现的小数点就无效了，此时字符串的剩余字符都会被忽略。因此，"22.34.5"将转换成22.34。

parseFloat()函数的另一个不同之处在于，它始终忽略字符串开头的零。这个函数能识别前面讨论的所有浮点格式，以及十进制格式（开头的零始终被忽略）。十六进制数值始终会返回0。因为parseFloat()只解析十进制值，因此不能指定底数。最后，如果字符串表示整数（没有小数点或者小数点后面只有一个零），则parseFloat()返回整数。下面是几个示例：
```javascript
const arr3 = [
  parseFloat('1234blue'), // 1234，按整数解析
  parseFloat('0xA'), // 0
  parseFloat('22.5'), // 22.5
  parseFloat('22.34.5'), // 22.34
  parseFloat('0908.5'), // 908.5
  parseFloat('3.125e7'), // 31250000
];
console.log(arr3);
```

## 3、其他类型 => 字符串类型

### 3.1、toString

  - 除了null和undefined，其他所有值都有toString()方法。这个方法唯一的用途就是返回当前值的字符串等价物。
  - 在对数值调用这个方法时，toString()可以接收一个底数参数，即以什么底数来输出数值的字符串表示。默认情况下，toString()返回数值的十进制字符串表示。而通过传入参数，可以得到数值的二进制、八进制、十六进制，或者其他任何有效基数的字符串表示。

```javascript
const arr4 = [
  11,
  true,
];
arr4.forEach((item) => console.log(item.toString())); // "11", "true"
const num = 10;
console.log(num.toString()); // "10"
console.log(num.toString(2)); // "1010"
console.log(num.toString(8)); // "12"
console.log(num.toString(10)); // "10"
console.log(num.toString(16)); // "a"
```

### 3.2、String()

如果你不确定一个值是不是null或undefined，可以使用String()转型函数，它始终会返回表示相应类型值的字符串。String()函数遵循如下规则。
  - 如果值有toString()方法，则调用该方法（不传参数）并返回结果；
  - 如果值是null，返回"null"；
  - 如果值是undefined，返回"undefined"。
```javascript
const arr5 = [10, true, null, undefined];
arr5.forEach((item) => console.log(String(item)));// "10", "true", "null", "undefined"
```
  
# 二、RegExp

ECMAScript通过RegExp类型支持正则表达式。正则表达式使用类似Perl的简洁语法来创建：

```javascript
let expression = /pattern/flags;
```

这个正则表达式的pattern（模式）可以是任何简单或复杂的正则表达式，包括字符类、限定符、分组、向前查找和反向引用。每个正则表达式可以带零个或多个flags（标记），用于控制正则表达式的行为。下面给出了表示匹配模式的标记。
  - g: 全局模式，表示查找字符串的全部内容，而不是找到第一个就停止。
  - i: 不区分大小写，表示在查找匹配时忽略pattern和字符串的大小写。
  - m: 多行模式，表示查找到一行文本末尾时会继续查找。?
  - y: 粘附模式，表示只查找从lastIndex开始及之后的字符串。?
  - u: Unicode模式，启用Unicode匹配。?
  - s: dotAll模式，表示元字符.匹配任何字符（包括\n或\r）。?

使用不同的模式和标记可以创建出各种正则表达式：
```javascript
// 匹配字符串中的所有"at"
let pattern1 = /at/g;

// 匹配第一个"bat"或"cat"，忽略大小写
let pattern2 = /[bc]at/i;

// 匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi;复制
```

因为元字符在正则表达式中有着特殊的含义，所以如果要匹配元字符本身，就需要使用反斜杠进行转译，这些元字符包括：

```
( [ { \ ^ $ | ) ] } ? * + .
```
例如：
```javascript
// 匹配第一个"bat"或"cat"，忽略大小写
let pattern1 = /[bc]at/i;

// 匹配第一个"[bc]at"，忽略大小写
let pattern2 = /\[bc\]at/i;

// 匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi;

// 匹配所有".at"，忽略大小写
let pattern4 = /\.at/gi;
```

## 2.1、RegExp实例方法

### exec()
这个方法只接收一个参数，即要应用模式的字符串。如果找到了匹配项，则返回包含第一个匹配信息的数组；如果没找到匹配项，则返回null。返回的数组虽然是Array的实例，但包含两个额外的属性：index和input。index是字符串中匹配模式的起始位置，input是要查找的字符串。这个数组的第一个元素是匹配整个模式的字符串，其他元素是与表达式中的捕获组匹配的字符串。如果模式中没有捕获组，则数组只包含一个元素。来看下面的例子：




