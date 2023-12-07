import { yearToSealColor } from '../../util/license-plate'
import './index.css'

export default function LicensePlate(props) {
  const { prefix, code } = props

  const currentYear = new Date().getFullYear()
  const sealColor = yearToSealColor(currentYear)

  return (
    <div className="license-plate">
      <span className="license-plate__flag-country">D</span>
      <span className="license-plate__district">
        {prefix}
      </span>
      <span
        className={`license-plate__seals license-plate__seals--${sealColor}`}
      ></span>
      <span className="license-plate__code">{code}</span>
    </div>
  )
}
