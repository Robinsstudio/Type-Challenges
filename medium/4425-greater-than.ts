/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

enum Order {
  LESS,
  EQUAL,
  GREATER
}

type Digits = '0123456789';

type CompareDigits<T extends string, U extends string> = T extends U
  ? Order.EQUAL
  : Digits extends `${string}${T}${string}${U}${string}`
  ? Order.LESS
  : Digits extends `${string}${U}${string}${T}${string}`
  ? Order.GREATER
  : never;

type IsShorter<T extends string, U extends string> = [T, U] extends [`${string}${infer Rest1}`, `${string}${infer Rest2}`]
  ? IsShorter<Rest1, Rest2>
  : T extends `${string}${infer _}`
  ? false
  : U extends `${string}${infer _}`
  ? true
  : never;

type CompareNumbers<T extends string, U extends string> = [LengthOfString<T>, T, U] extends [LengthOfString<U>, `${infer First1}${infer Rest1}`, `${infer First2}${infer Rest2}`]
  ? CompareDigits<First1, First2> extends Order.EQUAL
  ? CompareNumbers<Rest1, Rest2>
  : CompareDigits<First1, First2>
  : IsShorter<T, U> extends true
  ? Order.LESS
  : Order.GREATER;

type GreaterThan<T extends number, U extends number> = CompareNumbers<`${T}`, `${U}`> extends Order.LESS ? false : true;

// https://github.com/type-challenges/type-challenges/issues/21191
// type LargerDigits = {
//   "9": never;
//   "8": "9";
//   "7": "8" | "9";
//   "6": "7" | "8" | "9";
//   "5": "6" | "7" | "8" | "9";
//   "4": "5" | "6" | "7" | "8" | "9";
//   "3": "4" | "5" | "6" | "7" | "8" | "9";
//   "2": "3" | "4" | "5" | "6" | "7" | "8" | "9";
//   "1": "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
//   "0": "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
// };

// type GreaterThan<
//   T extends number | string, U extends number | string, PossibleAnswer extends boolean = false
// > =
//   `${T}` extends `${infer TFirst}${infer TRemainder}`
//   ? `${U}` extends `${infer UFirst extends keyof LargerDigits}${infer URemainder}`
//   ? GreaterThan<
//     TRemainder, URemainder, TFirst extends LargerDigits[UFirst] ? true : PossibleAnswer
//   > : true
//   : `${U}` extends "" ? PossibleAnswer : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'
import { LengthOfString } from './298-length-of-string';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
