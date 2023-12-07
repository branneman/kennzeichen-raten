import { randomString, randomNumber } from './random'

// https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Germany#Serial_letters_and_digits
// Todo:
// - Letters have Prohibited combinations

const ALPHABET_LETTERS = 'ABCDEFGHIJKLMOPQRSTUVWXYZ'
const ALPHABET_DIGITS = '0123456789'

export const COLORS = {
  braun: { startYear: 1974, ral: '8004', rgb: '8d4931' },
  rosa: { startYear: 1975, ral: '3015', rgb: 'd8a0a6' },
  grün: { startYear: 1976, ral: '6018', rgb: '61993b' },
  orange: { startYear: 1977, ral: '2000', rgb: 'da6e00' },
  blau: { startYear: 1978, ral: '5015', rgb: '007cb0' },
  gelb: { startYear: 1979, ral: '1012', rgb: 'ddaf27' },
}

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

export const yearToSealColor = (year) => {
  const colors = Object.entries(COLORS)
  for (const [color, { startYear }] of colors) {
    if ((year - startYear) % 6 === 0) return color
  }
}
