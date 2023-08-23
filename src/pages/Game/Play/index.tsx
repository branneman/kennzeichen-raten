import { useParams } from 'react-router-dom'

export default function PlayGame() {
  const { difficulty } = useParams()

  return <>{difficulty}</>
}
