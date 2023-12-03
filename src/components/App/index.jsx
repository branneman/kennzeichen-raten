import { useRef, useEffect } from 'react'
import {
  useNavigate,
  useLocation,
  Outlet,
} from 'react-router-dom'

import Header from '../Header'
import {
  createTranslationContext,
  createTranslationState,
} from '../../hooks/translation'
import translations from '../../data/translations.json'
import { useKeySequenceDetector } from '../../hooks/dom'
import './index.css'

export default function App() {
  const TranslationContext = createTranslationContext()
  const translationState =
    createTranslationState(translations)

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
  const onAnimationEnd = () => {
    refLoaderCover.current.remove()
  }

  return (
    <TranslationContext.Provider value={translationState}>
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
