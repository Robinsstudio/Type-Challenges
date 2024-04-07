/*
  9155 - ValidDate
  -------
  by ch3cknull (@ch3cknull) #hard

  ### Question

  Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.

  **Leap year is not considered**

  Good Luck!

  ```ts
  ValidDate<'0102'> // true
  ValidDate<'0131'> // true
  ValidDate<'1231'> // true
  ValidDate<'0229'> // false
  ValidDate<'0100'> // false
  ValidDate<'0132'> // false
  ValidDate<'1301'> // false
  ```

  > View on GitHub: https://tsch.js.org/9155
*/

/* _____________ Your Code Here _____________ */
import { TrimLeadingZeroes } from '../medium/2257-minus-one';
import { LengthOfString } from '../medium/298-length-of-string';
import { ConstructTuple } from '../medium/7544-construct-tuple';
import { ToNumber } from './300-string-to-number';

type Parse<T> = T extends `${infer A}${infer B}${infer Rest}`
  ? [ToNumber<TrimLeadingZeroes<`${A}${B}`>>, ...Parse<Rest>]
  : [];

type ShorterThan<T, U> = [T, U] extends [[], [unknown, ...unknown[]]] | [[], []]
  ? true
  : [T, U] extends [[unknown, ...unknown[]], []]
  ? false
  : [T, U] extends [[unknown, ...infer RestA], [unknown, ...infer RestB]]
  ? ShorterThan<RestA, RestB>
  : never;

type LessThan<T extends number, U extends number> = ShorterThan<ConstructTuple<T>, ConstructTuple<U>>;

type ValidDay<D extends number, M> = D extends 0
  ? false
  : M extends 1 | 3 | 5 | 7 | 8 | 10 | 12
  ? LessThan<D, 31>
  : M extends 4 | 6 | 9 | 11
  ? LessThan<D, 30>
  : M extends 2
  ? LessThan<D, 28>
  : false;

type ValidDate<T extends string> = LengthOfString<T> extends 4
  ? Parse<T> extends [infer Month extends number, infer Day extends number]
  ? true extends LessThan<Month, 12> & ValidDay<Day, Month>
  ? true
  : false
  : false
  : false;

// https://github.com/type-challenges/type-challenges/issues/9174
// type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

// type MM = `0${Num}` | `1${0 | 1 | 2}`

// type AllDate =
//   | `${MM}${`${0}${Num}` | `${1}${0 | Num}` | `2${0 | Exclude<Num, 9>}`}`
//   | `${Exclude<MM, '02'>}${29 | 30}`
//   | `${Exclude<MM, '02' | '04' | '06' | '09' | '11'>}${31}`


// type ValidDate<T extends string> = T extends AllDate ? true : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9155/answer
  > View solutions: https://tsch.js.org/9155/solutions
  > More Challenges: https://tsch.js.org
*/
