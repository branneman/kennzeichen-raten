import { randomLicensePlate } from '../../util/license-plate'
import './index.css'

export default function LicensePlate(props: {
  prefix: string
}) {
  const { prefix } = props
  const plate = randomLicensePlate(prefix)
  plate

  return (
    <div className="license-plate">
      <span className="license-plate__flag-country">D</span>
      <span className="license-plate__district">
        {plate.prefix}
      </span>
      <span className="license-plate__seals"></span>
      <span className="license-plate__code">
        {plate.code}
      </span>
    </div>
  )
}
