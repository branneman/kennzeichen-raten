import { useRef } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header'
import { useAllImagesLoaded } from '../../util/dom'
import './index.css'

export default function App() {
  const refLoaderCover = useRef<HTMLDivElement>(null)
  const refMain = useRef<HTMLDivElement>(null)
  useAllImagesLoaded(() => {
    refLoaderCover.current!.classList.add('animate')
    setTimeout(() => {
      refMain.current!.classList.remove('hidden')
    }, 500)
  })
  const onAnimationEnd = () => {
    refLoaderCover.current!.remove()
  }

  return (
    <>
      <div className="background" />
      <div
        ref={refLoaderCover}
        onAnimationEnd={onAnimationEnd}
        className="loader-cover"
      />

      <div ref={refMain} className="main hidden">
        <Header />
        <Outlet />
      </div>
    </>
  )
}
