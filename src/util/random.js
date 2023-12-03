export function randomString(
  length,
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
) {
  let result = ''
  const alphabetLength = alphabet.length

  let counter = 0
  while (counter < length) {
    result += alphabet.charAt(
      Math.floor(Math.random() * alphabetLength),
    )
    counter += 1
  }
  return result
}

export const randomNumber = (min, max) => {
  return min + Math.ceil(Math.random() * (max - min))
}
