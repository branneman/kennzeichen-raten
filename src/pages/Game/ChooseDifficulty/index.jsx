import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import { useTranslation } from '../../../hooks/translation'
import './index.css'

const LEVELS = ['easy', 'medium', 'hard']

export default function ChooseDifficulty() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('pages.Game.ChooseDifficulty.title')}</h2>
      <p>{t('pages.Game.ChooseDifficulty.description')}</p>
      <ol className="menu">
        {LEVELS.map((level) => (
          <li key={level} className="menu__item">
            <Link to={`/play/${level}`}>
              <Button>
                {t(
                  `pages.Game.ChooseDifficulty.difficulty-${level}`,
                )}
              </Button>
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}
