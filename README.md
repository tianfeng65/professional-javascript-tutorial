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
 * 除此之外所有的其他类型转换为布尔类型结果都是true
 */
Boolean('')            // false
Boolean(0)           // false
Boolean(+0)        // false
Boolean(-0)         // false
Boolean(NaN)     // false
Boolean(null)      // false
Boolean(undefined)     // false
Boolean(false)    // false
```

