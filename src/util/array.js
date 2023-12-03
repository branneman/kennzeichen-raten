import {
  addIndex,
  chain,
  remove,
  compose,
  map,
  append,
} from 'ramda'

// Fisher–Yates shuffle
export function shuffle(xs) {
  let currentIndex = xs.length
  let randomIndex

  // While there remain elements to shuffle
  while (currentIndex > 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element
    ;[xs[currentIndex], xs[randomIndex]] = [
      xs[randomIndex],
      xs[currentIndex],
    ]
  }

  return xs
}

export const permutations = (n, tokens, subperms = [[]]) =>
  n < 1 || n > tokens.length
    ? subperms
    : addIndex(chain)(
        (token, idx) =>
          permutations(
            n - 1,
            remove(idx, 1, tokens),
            compose(map, append)(token)(subperms),
          ),
        tokens,
      )
