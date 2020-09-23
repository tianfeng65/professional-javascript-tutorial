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
- 假设字符串中的第一个字符是数值字符，parseInt()函数也能识别不同的整数格式（十进制、八进制、十六进制）。换句话说，如果字符串以"0x"开头，就会被解释为十六进制整数。__如果字符串以 "0"开头，(这里书上写的有问题，以下为正解)则可能使用八进制或者十进制进行解释，这取决于实现。ECMAScript 5 澄清了应该使用 十进制，但不是所有的浏览器都支持（比如IE8）。因此，在使用 parseInt 时，一定要指定一个第二个参数指定底数（进制数）。__（书上写得不对，勘误）

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

不同的数值格式很容易混淆，因此parseInt()也接收第二个参数，用于指定底数（进制数）。如果知道要解析的值是十六进制，那么可以传入16作为第二个参数，以便正确解析：

```javascript
const arr = [
    parseInt("0xf", 16), // 15
    parseInt("f", 16), // 15
    parseInt("2020", 8), // 1040
    parseInt("10", 2), // 2
    parseInt("10", 8), // 8
    parseInt("10", 10), // 10
    parseInt("10", 16) // 16
]
console.log(arr)
```