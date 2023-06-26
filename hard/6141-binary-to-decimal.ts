/*
  6141 - Binary to Decimal
  -------
  by wotsushi (@wotsushi) #hard #math

  ### Question

  Implement `BinaryToDecimal<S>` which takes an exact string type `S` consisting 0 and 1 and returns an exact number type corresponding with `S` when `S` is regarded as a binary.
  You can assume that the length of `S` is equal to or less than 8 and `S` is not empty.

  ```ts
  type Res1 = BinaryToDecimal<'10'>; // expected to be 2
  type Res2 = BinaryToDecimal<'0011'>; // expected to be 3
  ```

  > View on GitHub: https://tsch.js.org/6141
*/

/* _____________ Your Code Here _____________ */

type Powers = {
  0: 1,
  1: 2,
  2: 4,
  3: 8,
  4: 16,
  5: 32,
  6: 64,
  7: 128
}

type ToArray<N, Output extends unknown[] = []> = Output['length'] extends N
  ? Output
  : ToArray<N, [...Output, unknown]>;

type Reverse<T> = T extends `${infer First}${infer Rest}`
  ? `${Reverse<Rest>}${First}`
  : T;

type ToDecimal<S extends string, Index extends unknown[] = [], Output extends unknown[] = []> = S extends `${infer First}${infer Rest}`
  ? ToDecimal<Rest, [...Index, unknown], [...Output, ...(First extends '1' ? ToArray<Powers[Extract<Index['length'], keyof Powers>]> : [])]>
  : Output['length'];

type BinaryToDecimal<S extends string> = ToDecimal<Reverse<S>>;

// https://github.com/type-challenges/type-challenges/issues/6349
// type BinaryToDecimal<
//   S extends string,
//   R extends any[] = []
// > =
//   S extends `${infer F}${infer L}`
//     ? F extends '0' ? BinaryToDecimal<L, [...R, ...R]> : BinaryToDecimal<L, [...R, ...R, 1]>
//     : R['length'];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6141/answer
  > View solutions: https://tsch.js.org/6141/solutions
  > More Challenges: https://tsch.js.org
*/
