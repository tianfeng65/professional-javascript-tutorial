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