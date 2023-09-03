import { randomLicensePlate } from '../../util/license-plate'

export default function LicensePlate(props: {
  prefix: string
}) {
  const { prefix } = props
  const plate = randomLicensePlate(prefix)

  return plate.prefix + ' ' + plate.code
}
