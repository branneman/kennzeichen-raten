import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import { useTranslation } from '../../../hooks/translation'
import './index.css'

const LEVELS = ['easy', 'medium', 'hard']

export default function ChooseModeDifficulty() {
  const { t } = useTranslation()

  const [mode, setMode] = useState('guess-district')
  const [difficulty, setDifficulty] = useState('easy')
  const setOption = (fn) => (event) =>
    fn(event.target.value)

  return (
    <>
      <h2>{t('pages.Game.ChooseModeDifficulty.title')}</h2>

      <p>
        {t(
          'pages.Game.ChooseModeDifficulty.mode-description',
        )}
        :
      </p>
      <label className="choosemodedifficulty">
        <input
          type="radio"
          value="guess-district"
          checked={mode === 'guess-district'}
          onChange={setOption(setMode)}
        />
        <span>
          {t(
            `pages.Game.ChooseModeDifficulty.mode-guess-district`,
          )}
        </span>
      </label>
      <label className="choosemodedifficulty">
        <input
          type="radio"
          value="guess-code"
          checked={mode === 'guess-code'}
          onChange={setOption(setMode)}
        />
        <span>
          {t(
            `pages.Game.ChooseModeDifficulty.mode-guess-code`,
          )}
        </span>
      </label>

      <p>
        {t(
          'pages.Game.ChooseModeDifficulty.difficulty-description',
        )}
        :
      </p>
      {LEVELS.map((level) => (
        <label key={level} className="choosemodedifficulty">
          <input
            type="radio"
            value={level}
            checked={difficulty === level}
            onChange={setOption(setDifficulty)}
          />
          <span>
            {t(
              `pages.Game.ChooseModeDifficulty.difficulty-${level}`,
            )}
          </span>
        </label>
      ))}

      <p>
        <Link to={`/play/${mode}/${difficulty}`}>
          <Button>
            {t('pages.Game.ChooseModeDifficulty.play')}
          </Button>
        </Link>
      </p>
    </>
  )
}
