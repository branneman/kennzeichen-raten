import { Link } from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <header className="header">
      <h1>
        <Link to={`/`}>Kennzeichen-Raten</Link>
      </h1>
    </header>
  )
}
