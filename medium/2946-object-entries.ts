/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > View on GitHub: https://tsch.js.org/2946
*/

/* _____________ Your Code Here _____________ */

type ObjectEntriesInternal<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T];


type MyRequired<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]-?: T[K]
};

type ObjectEntries<T> = ObjectEntriesInternal<MyRequired<T> & Record<Exclude<keyof T, keyof MyRequired<T>>, undefined>>;

// https://github.com/type-challenges/type-challenges/issues/24147
// type ObjectEntries<T> = {
//   [Key in keyof T]-?: [Key, T[Key] extends infer L | undefined ? L : T[Key]]
// }[keyof T]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2946/answer
  > View solutions: https://tsch.js.org/2946/solutions
  > More Challenges: https://tsch.js.org
*/
