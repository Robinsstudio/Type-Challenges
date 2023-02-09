/*
  17 - Currying 1
  -------
  by Anthony Fu (@antfu) #hard #array

  ### Question

  > TypeScript 4.0 is recommended in this challenge

  [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

  For example:

  ```ts
  const add = (a: number, b: number) => a + b
  const three = add(1, 2)

  const curriedAdd = Currying(add)
  const five = curriedAdd(2)(3)
  ```

  The function passed to `Currying` may have multiple arguments, you need to correctly type it.

  In this challenge, the curried function only accept one argument at a time. Once all the argument is assigned, it should return its result.

  > View on GitHub: https://tsch.js.org/17
*/

/* _____________ Your Code Here _____________ */

type Unwrap<F> = F extends (...args: infer Args) => infer R
  ? Args extends [infer First, ...infer Rest]
  ? (arg: First) => Unwrap<(...args: Rest) => R>
  : R
  : never;

type CurryingFn<F> = F extends () => unknown ? F : Unwrap<F>;

// https://github.com/type-challenges/type-challenges/issues/20092
// type CurryingFn<F> =
//   F extends (...args: [infer First, ...infer Rest]) => infer Return
//   ? Rest extends []
//   ? F
//   : (arg: First) => CurryingFn<(...args: Rest) => Return>
//   : never

declare function Currying<F>(fn: F): CurryingFn<F>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/17/answer
  > View solutions: https://tsch.js.org/17/solutions
  > More Challenges: https://tsch.js.org
*/
