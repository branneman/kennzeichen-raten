import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <ol>
        <li>
          <Link to={`/database`}>Explore the database</Link>
        </li>
        <li>
          <Link to={`/play`}>Play the game</Link>
        </li>
      </ol>
    </>
  )
}
