/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */

type NumberToTuple<T extends number, U extends unknown[] = []> = U['length'] extends T
  ? U
  : NumberToTuple<T, [...U, unknown]>;

type TupleFibonacci<T extends unknown[]> = T extends [unknown, unknown, ...infer Rest]
  ? [...TupleFibonacci<Rest>, ...TupleFibonacci<[unknown, ...Rest]>]
  : T extends [unknown]
  ? [unknown]
  : [];

type Fibonacci<T extends number> = TupleFibonacci<NumberToTuple<T>>['length'];

// https://github.com/type-challenges/type-challenges/issues/22205
// type Fibonacci<
//   T extends number,
//   A extends any[] = [unknown],
//   B extends any[] = [],
//   Count extends any[] = [unknown]
// > = T extends Count["length"]
//   ? [...A, ...B]["length"]
//   : Fibonacci<T, B, [...A, ...B], [unknown, ...Count]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
