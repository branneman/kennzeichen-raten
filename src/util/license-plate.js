import { randomString, randomNumber } from './random'

// https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Germany#Serial_letters_and_digits
// Todo:
// - Letters have Prohibited combinations

const ALPHABET_LETTERS = 'ABCDEFGHIJKLMOPQRSTUVWXYZ'
const ALPHABET_DIGITS = '0123456789'

// [A-ZÄÖÜ]{1,3} [A-Z]{1,2} [0-9]{2,4}
export const randomLicensePlate = (prefix) => {
  const lettersLength = randomNumber(1, 2)
  const letters = randomString(
    lettersLength,
    ALPHABET_LETTERS,
  )

  let digitsLength
  if (prefix.length === 3 && letters.length === 2) {
    digitsLength = randomNumber(2, 3)
  } else {
    digitsLength = randomNumber(2, 4)
  }
  let digits = randomString(digitsLength, ALPHABET_DIGITS)

  if (digits[0] === '0') {
    digits =
      randomString(1, '123456789') + digits.substring(1)
  }

  const code = letters + ' ' + digits

  return { prefix, code }
}
