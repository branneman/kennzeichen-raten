import { useState, useRef, useEffect } from 'react'
import {
  useNavigate,
  useLocation,
  Outlet,
} from 'react-router-dom'

import { makeTranslationValue } from '../../hooks/translation'
import { TranslationContext } from '../../context/translation'
import translations from '../../data/translations.json'
import { useKeySequenceDetector } from '../../hooks/dom'
import './index.css'
import Header from '../Header'

export default function App() {
  const [language, setLanguage] = useState('de')
  const translationContextValue = makeTranslationValue(
    translations,
    language,
    setLanguage,
  )
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const navigate = useNavigate()
  useKeySequenceDetector('debug', () => navigate('/debug'))
  const isDebugRoute = useLocation().pathname === '/debug'

  const refLoaderCover = useRef(null)
  const refMain = useRef(null)
  useEffect(() => {
    setTimeout(
      () => refMain.current.classList.remove('hidden'),
      500,
    )
  })
  const onAnimationEnd = () =>
    refLoaderCover.current.remove()

  return (
    <TranslationContext.Provider
      value={translationContextValue}
    >
      <div className="background" />
      <div
        ref={refLoaderCover}
        onAnimationEnd={onAnimationEnd}
        className="loader-cover animate"
      />

      <div
        ref={refMain}
        className={`main hidden ${isDebugRoute && 'debug'}`}
      >
        <>
          <Header />
          <Outlet />
        </>
      </div>
    </TranslationContext.Provider>
  )
}
