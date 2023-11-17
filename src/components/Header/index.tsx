import { Link } from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <h1>
      <Link to={`/`}>Kennzeichen-Raten</Link>
    </h1>
  )
}
