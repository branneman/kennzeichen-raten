import './index.css'

export default function LicensePlate(props) {
  const { prefix, code } = props

  return (
    <div className="license-plate">
      <span className="license-plate__flag-country">D</span>
      <span className="license-plate__district">
        {prefix}
      </span>
      <span className="license-plate__seals"></span>
      <span className="license-plate__code">{code}</span>
    </div>
  )
}
