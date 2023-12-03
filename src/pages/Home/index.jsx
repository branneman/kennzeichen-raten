import { Link } from 'react-router-dom'
import Howto from '../../components/Howto'
import Button from '../../components/Button'
import { useTranslation } from '../../hooks/translation'
import './index.css'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Howto />

      <ol className="mainmenu">
        <Link to="/play">
          <Button>{t('pages.Home.play-the-game')}</Button>
        </Link>
        <Link to="/database">
          <Button>
            {t('pages.Home.explore-the-database')}
          </Button>
        </Link>
      </ol>
    </>
  )
}
