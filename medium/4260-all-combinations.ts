/*
  4260 - AllCombinations
  -------
  by 蛭子屋双六 (@sugoroku-y) #medium #template-literal #infer #union

  ### Question

  Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

  For example:

  ```ts
  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > View on GitHub: https://tsch.js.org/4260
*/

/* _____________ Your Code Here _____________ */
import { LengthOfString } from './298-length-of-string';
import { StringToUnion } from './531-string-to-union';

type Extends<T, U> = T extends U ? true : false;

type PermutationDepth<
  S extends string,
  D extends number,
  A extends unknown[] = [],
  T extends string = S
> = [Extends<S, never>, Extends<A['length'], D>] extends [false, false]
  ? S extends unknown
  ? `${S}${PermutationDepth<Exclude<T, S>, D, [...A, unknown]>}`
  : never
  : '';

type AllCombinations<S extends string, T extends string = S> = T extends `${string}${infer Rest}`
  ? PermutationDepth<StringToUnion<S>, LengthOfString<T>> | AllCombinations<S, Rest>
  : '';

// https://github.com/type-challenges/type-challenges/issues/22887
// type Combinations<T extends string, U = T> = U extends T
//   ? U | `${U}${Combinations<Exclude<T, U>>}`
//   : never;

// type AllCombinations<S extends string> = Combinations<StringToUnion<S>> | '';

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils';

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4260/answer
  > View solutions: https://tsch.js.org/4260/solutions
  > More Challenges: https://tsch.js.org
*/
