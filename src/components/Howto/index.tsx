import LicensePlate from '../LicensePlate'
import './index.css'

export default function Howto() {
  return (
    <div className="howto">
      <h2>German license plates</h2>
      <p>
        The first 1-3 letters (before the green seal) are
        the district code.
      </p>
      <LicensePlate prefix="M" code="KL 8136" />
      <div>
        <div className="howto__arrow"></div>
        <div className="howto__text">
          M stands for München
        </div>
      </div>
    </div>
  )
}
