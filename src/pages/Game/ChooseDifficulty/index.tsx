import { Link } from 'react-router-dom'

export default function ChooseDifficulty() {
  return (
    <>
      <h2>Play Game</h2>
      <p>Choose difficulty:</p>
      <ol>
        <li>
          <Link to={`/play/easy`}>Easy</Link>
        </li>
        <li>
          <Link to={`/play/medium`}>Medium</Link>
        </li>
        <li>
          <Link to={`/play/hard`}>Hard</Link>
        </li>
      </ol>
    </>
  )
}
