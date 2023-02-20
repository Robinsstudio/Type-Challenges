/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #hard #template-literal

  ### Question

  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.

  For example

  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```

  > View on GitHub: https://tsch.js.org/112
*/

/* _____________ Your Code Here _____________ */

export type IsLetter<T extends string> = T extends `${infer First}${infer Rest}`
  ? Uppercase<First> extends Lowercase<First>
  ? false
  : Rest extends ''
  ? true
  : false
  : false;

type Split<T extends string, Words extends string[] = [], CurrentWord extends string = ''> = T extends `${infer First}${infer Rest}`
  ? IsLetter<First> extends true
  ? Split<Rest, Words, `${CurrentWord}${First}`>
  : Split<Rest, [...Words, CurrentWord, First], ''>
  : [...Words, CurrentWord];

type JoinCapitalized<T extends string[]> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? `${Capitalize<First>}${JoinCapitalized<Rest>}`
  : '';

type CapitalizeWords<T extends string> = JoinCapitalized<Split<T>>;

// https://github.com/type-challenges/type-challenges/issues/23015
// type NotLetter<T extends string> = Uppercase<T> extends Lowercase<T> ? true : false;

// type CapitalizeWords<
//   S extends string,
//   U extends string = "",
//   Cap = true
// > = S extends `${infer F}${infer R}`
//   ? Cap extends true
//   ? CapitalizeWords<R, `${U}${Capitalize<F>}`, NotLetter<F>>
//   : CapitalizeWords<R, `${U}${F}`, NotLetter<F>>
//   : U;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/112/answer
  > View solutions: https://tsch.js.org/112/solutions
  > More Challenges: https://tsch.js.org
*/
