import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import './index.css'

const LEVELS = [
  ['easy', 'Easy'],
  ['medium', 'Medium'],
  ['hard', 'Hard'],
]

export default function ChooseDifficulty() {
  return (
    <>
      <h2>Play Game</h2>
      <p>Choose difficulty:</p>
      <ol className="menu">
        {LEVELS.map(([key, title]) => (
          <li key={key} className="menu__item">
            <Link to={`/play/${key}`}>
              <Button>{title}</Button>
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}
