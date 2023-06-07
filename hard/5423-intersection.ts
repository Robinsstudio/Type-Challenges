/*
  5423 - Intersection
  -------
  by Pineapple (@Pineapple0919) #hard #union #array

  ### Question

  Implement the type version of Lodash.intersection with a little difference. Intersection<T> takes an Array T containing several arrays or any type element including the union type, and returns a new union containing all intersection elements.

  ```ts
  type Res = Intersection<[[1, 2], [2, 3], [2, 2]]>; // expected to be 2
  type Res1 = Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>; // expected to be 2 | 3
  type Res2 = Intersection<[[1, 2], [3, 4], [5, 6]]>; // expected to be never
  type Res3 = Intersection<[[1, 2, 3], [2, 3, 4], 3]>; // expected to be 3
  type Res4 = Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>; // expected to be 2 | 3
  type Res5 = Intersection<[[1, 2, 3], 2, 3]>; // expected to be never
  ```

  > View on GitHub: https://tsch.js.org/5423
*/

/* _____________ Your Code Here _____________ */

type Intersection<T> = T extends [infer First, ...infer Rest]
  ? Intersection<Rest> & (
    First extends unknown[]
      ? First[number]
      : First
  )
  : unknown;

// Another interesting approach, but one test doesn't pass...
//
// import { Includes } from '../easy/898-includes';

// type BiIntersection<T, U extends unknown[], Output extends unknown[] = []> = T extends [infer First, ...infer Rest]
//   ? Includes<U, First> extends true
//   ? BiIntersection<Rest, U, [...Output, First]>
//   : BiIntersection<Rest, U, Output>
//   : Output;

// type MultiIntersection<T, Output> = T extends [infer First, ...infer Rest]
//   ? MultiIntersection<Rest, BiIntersection<Output, First extends unknown[] ? First : [First]>>
//   : Output;

// type Intersection<T extends unknown[]> = MultiIntersection<T, T[0]> extends infer List extends unknown[]
//   ? List[number]
//   : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5423/answer
  > View solutions: https://tsch.js.org/5423/solutions
  > More Challenges: https://tsch.js.org
*/
