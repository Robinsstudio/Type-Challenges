// Queries all challenges numbers from the badges in the README file and sorts them
[...document.querySelectorAll('p[dir=auto] a[href]')]
  .map(e => e.href.match(/(?<number>\d{1,5})\/play/)?.groups.number)
  .filter(e => e).map(e => parseInt(e))
  .sort((a, b) => a - b);

// Replaces all challenges links with links to their respective TypeScript playgrounds
'<a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00013-warm-hello-world/README.md"></a>'
  .replace(/<a href="\.\/questions\/(\d{5}).*?"/g, (_, number) => `<a href="https://tsch.js.org/${parseInt(number)}/play"`);