/*
  2949 - ObjectFromEntries
  -------
  by jiangshan (@jiangshanmeta) #hard #object

  ### Question

  Implement the type version of ```Object.fromEntries```

  For example:

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }

  type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

  type result = ObjectFromEntries<ModelEntries> // expected to be Model
  ```

  > View on GitHub: https://tsch.js.org/2949
*/

/* _____________ Your Code Here _____________ */
import { UnionToIntersection } from './55-union-to-intersection';

type Merge<T> = {
  [K in keyof T]: T[K]
};

type ObjectFromEntries<T extends [string, unknown]> =
  Merge<UnionToIntersection<
    T extends unknown
    ? {
      [K in T[0]]: T[1]
    }
    : never
  >>;

// https://github.com/type-challenges/type-challenges/issues/23987
// type ObjectFromEntries<T extends [string, unknown]> = {
//   [Entry in T as Entry[0]]: Entry[1]
// }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2949/answer
  > View solutions: https://tsch.js.org/2949/solutions
  > More Challenges: https://tsch.js.org
*/
