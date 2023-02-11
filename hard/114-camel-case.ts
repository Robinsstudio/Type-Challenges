/*
  114 - CamelCase
  -------
  by Anthony Fu (@antfu) #hard #template-literal

  ### Question

  Implement `CamelCase<T>` which converts `snake_case` string to `camelCase`.

  For example

  ```ts
  type camelCase1 = CamelCase<'hello_world_with_types'> // expected to be 'helloWorldWithTypes'
  type camelCase2 = CamelCase<'HELLO_WORLD_WITH_TYPES'> // expected to be same as previous one
  ```

  > View on GitHub: https://tsch.js.org/114
*/

/* _____________ Your Code Here _____________ */

type ToCamelCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends '_'
  ? `${ToCamelCase<Capitalize<Rest>>}`
  : `${First}${ToCamelCase<Rest>}`
  : S;

type CamelCase<S extends string> = ToCamelCase<Lowercase<S>>;

// https://github.com/type-challenges/type-challenges/issues/20442
// type CamelCase<S extends string> = S extends `${infer A}_${infer B}`
//   ? `${Lowercase<A>}${Capitalize<CamelCase<B>>}`
//   : Lowercase<S>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/114/answer
  > View solutions: https://tsch.js.org/114/solutions
  > More Challenges: https://tsch.js.org
*/
