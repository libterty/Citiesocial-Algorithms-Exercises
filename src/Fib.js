// Rules
// Assume you have n int input in the function
// finding the logic presents in each int

// Example 1: By giving two int which will be 4 14
// you can assume next 10 outputs will be a sequence of the following int input

// Example 2: By giving three int which will 4 14 34
// you can assume next 10 outputs will be a sequence of the following int input

// same logic like fibonacci series but difference is suming by each int difference

// 解題：
// 利用sequence裡數字與數字的差異判斷下個數字
// 1. 如果陣列長度為0回返數列為10個0
// 2. 如果陣列長度為1，input為n (int)，則回返數列為10個int n
// 3. 如果陣列長度為2，input為n個int，則回返數列等差數列 (不預期下個數字行為)
// 4. 如果陣列長度大於>2，input為n個int，則回返數列可能為費氏數列，等比數列，等差數列，高階等差數列
// 依照param的陣列去判斷需使用何種算法
// 5. 如果陣列長大大於>2，且input超過2個0，回反錯誤

/**
 * @param {array} fn
 */
export default function fib(n) {
  // 回返的陣列
  const result = [];
  // 計數器
  let i = 0;

  // edge case 當input沒有值時 return 10組 0
  if (n.length === 0) {
    while (i < 10) {
      result.push(0);
      i++;
    }
  }

  // 如果input Arr超過1個0，無法判斷下個數字邏輯
  if (n.join().match(/0 */gi)) {
    if (n.join().match(/0 */gi).length > 1) {
      return new Error("不合法陣列");
    }
  }

  // 當input只有一個int時 return 10組 input int
  if (n.length === 1) {
    while (i < 10) {
      result.push(n[0]);
      i++;
    }
  }

  // 當input Array只有包含兩個int時，為等差數列。
  // 當input Array大於兩個int時，可能為等差，多階等差，等比或費氏數列。
  if (n.length <= 2) {
    // 當input陣列只有兩組Int時，必為等差數列 (題目解釋)，否則可為等差或費式數列
    while (i < 10) {
      result.length === 0
        ? result.push(n[1] + (n[1] - n[0]))
        : result.push(result[result.length - 1] + (n[1] - n[0]));
      i++;
    }
  } else {
    const last = n[n.length - 1];
    const next = n[n.length - 2];
    const start = n[n.length - 3];

    // 費式數列
    if (n[0] === 0 && n[1] === n[2]) {
      while (i < 10) {
        result.length === 0
          ? result.push(last + next)
          : result.length === 1
          ? result.push(result[0] + last)
          : result.push(result[result.length - 1] + result[result.length - 2]);
        i++;
      }
    }

    // 等比數列
    if (last === next * next && last - next !== next - start) {
      while (i < 10) {
        result.length === 0
          ? result.push(last * last)
          : result.push(result[result.length - 1] * result[result.length - 1]);
        i++;
      }
    }

    // 等差數列
    if (last - next === next - start) {
      while (i < 10) {
        result.length === 0
          ? result.push(last + (next - start))
          : result.push(result[result.length - 1] + (next - start));
        i++;
      }
    }

    // 多階等差數列
    if ((last - next) % (next - start) !== 0) {
      console.log("check");
      while (i < 10) {
        const diff = last - next - (next - start);
        result.length === 0
          ? result.push(last + (last - next) + diff)
          : result.length === 1
          ? result.push(result[0] + (result[0] - last) + diff)
          : result.length === 2
          ? result.push(result[1] + (result[1] - result[0]) + diff)
          : result.push(
              result[result.length - 1] +
                (result[result.length - 1] - result[result.length - 2]) +
                diff
            );
        i++;
      }
    }

    // 多階等差數列
    if (
      (last - next) / (next - start) > 1 &&
      (last - next) % (next - start) === 0
    ) {
      while (i < 10) {
        result.length === 0
          ? result.push(last + ((last - next) / (next - start)) * (last - next))
          : result.length === 1
          ? result.push(
              result[0] +
                ((result[0] - last) / (last - next)) * (result[0] - last)
            )
          : result.length === 2
          ? result.push(
              result[result.length - 1] +
                ((result[result.length - 1] - result[result.length - 2]) /
                  (result[result.length - 2] - last)) *
                  (result[result.length - 1] - result[result.length - 2])
            )
          : result.push(
              result[result.length - 1] +
                ((result[result.length - 1] - result[result.length - 2]) /
                  (result[result.length - 2] - result[result.length - 3])) *
                  (result[result.length - 1] - result[result.length - 2])
            );
        i++;
      }
    }
  }
  return result;
}

// debug use
// console.log('沒有輸入數值', fib([]));
// console.log('只有輸入一組數值', fib([2]));
// console.log('只有輸入兩組數值(一題目描述必為等差數列))', fib([4, 14]));
// console.log('輸入多組數值但為等差數列', fib([4, 14, 24]));
// console.log('輸入多組數值但為等差數列 (edge case))', fib([0, 2, 4]));
// console.log('----------------------------------------------');
// console.log('輸入多組數值但為高階等差數列', fib([2, 6, 12]));
// console.log('輸入多組數值但為高階等差數列', fib([4, 14, 34, 74]));
// console.log('輸入多組數值但為等比數列', fib([3, 9, 81]));
// console.log('輸入多組數值但為等比數列', fib([3, 9, 81, 6561]));
// console.log('輸入多組數值但為費式數列', fib([0, 2, 2]));
// console.log('輸入多組數值但為費式數列', fib([0, 1, 1, 2]));
// console.log('不合法陣列', fib([0, 0, 1, 2]));
// console.log(fib([2, 4, 6]));
