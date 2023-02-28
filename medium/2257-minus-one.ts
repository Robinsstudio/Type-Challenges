/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */
import { ToNumber } from '../hard/300-string-to-number';

type Reverse<T> = T extends `${infer First}${infer Rest}`
  ? `${Reverse<Rest>}${First}`
  : T;

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type PreviousDigit = {
  '0': '9'
  '1': '0',
  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
  '6': '5',
  '7': '6',
  '8': '7',
  '9': '8'
};

type ReversedMinusOne<T extends string> = T extends `${infer First extends Digit}${infer Rest}`
  ? First extends '0'
  ? `${PreviousDigit[First]}${ReversedMinusOne<Rest>}`
  : `${PreviousDigit[First]}${Rest}`
  : T;

type TrimLeadingZeroes<T> = T extends '0'
  ? T
  : T extends `0${infer Rest}`
  ? TrimLeadingZeroes<Rest>
  : T;

type MinusOne<T extends number> = T extends 0
  ? -1
  : ToNumber<TrimLeadingZeroes<Reverse<ReversedMinusOne<Reverse<`${T}`>>>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
