/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

  > View on GitHub: https://tsch.js.org/4518
*/

/* _____________ Your Code Here _____________ */

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Output extends unknown[] = [],
  Filling extends boolean = false
> = T extends [infer First, ...infer Rest]
  ? Output['length'] extends End
  ? Fill<Rest, N, Start, End, [...Output, First], false>
  : Output['length'] extends Start
  ? Fill<Rest, N, Start, End, [...Output, N], true>
  : Fill<Rest, N, Start, End, [...Output, Filling extends true ? N : First], Filling>
  : Output;

// https://github.com/type-challenges/type-challenges/issues/21772
// type Fill<
//   T extends unknown[],
//   N,
//   Start extends number = 0,
//   End extends number = T['length'],
//   R extends any[] = []
// > = R['length'] extends End
//   ? [...R, ...T]
//   : T extends [infer A, ... infer B]
//   ? Start extends 0 | R['length']
//   ? Fill<B, N, 0, End, [...R, N]>
//   : Fill<B, N, Start, End, [...R, A]>
//   : R;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4518/answer
  > View solutions: https://tsch.js.org/4518/solutions
  > More Challenges: https://tsch.js.org
*/