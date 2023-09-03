import { randomString } from './random'

// https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Germany#Serial_letters_and_digits
// Todo:
// - Only 26 latin letters allowed? So no ÄÖÜẞ ?
// - Letters have Prohibited combinations
// - Digits can not lead with 0

const MAX_LENGTH = 8 // including 1 space in the second part
const ALPHABET_LETTERS = 'ABCDEFGHIJKLMOPQRSTUVWXYZ'
const ALPHABET_DIGITS = '0123456789'

export const randomLicensePlate = (prefix: string) => {
  // 1 to 2 letters
  const lettersLength = Math.ceil(Math.random() * 2)
  const letters = randomString(
    lettersLength,
    ALPHABET_LETTERS,
  )

  // 2 to 5 digits
  const digitsLength =
    MAX_LENGTH - 1 - prefix.length - lettersLength
  const digits = randomString(digitsLength, ALPHABET_DIGITS)

  const code = letters + ' ' + digits

  return { prefix, code }
}
