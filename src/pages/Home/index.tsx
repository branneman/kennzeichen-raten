import { Link } from 'react-router-dom'
import Howto from '../../components/Howto'
import Button from '../../components/Button'
import './index.css'

export default function Home() {
  return (
    <>
      <Howto />

      <ol className="mainmenu">
        <Link to="/play">
          <Button>Play the game</Button>
        </Link>
        <Link to="/database">
          <Button>Explore the database</Button>
        </Link>
      </ol>
    </>
  )
}
