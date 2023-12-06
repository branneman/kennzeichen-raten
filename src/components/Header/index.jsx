import { Link } from 'react-router-dom'

import { useTranslation } from '../../hooks/translation'
import './index.css'

export default function Header() {
  const { t, language, setLanguage } = useTranslation()
  const otherLanguage = language === 'de' ? 'en' : 'de'

  return (
    <header className="header">
      <h1>
        <Link to={`/`}>Kennzeichen-Raten</Link>
      </h1>
      <div className="header__nav">
        <Link to={`/`}>{t('components.Header.home')}</Link>
        <p
          className="header__switchlanguage"
          onClick={() => setLanguage(otherLanguage)}
        >
          {t('components.Header.switch-language')}
        </p>
      </div>
    </header>
  )
}
