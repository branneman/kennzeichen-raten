import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'

import App from './components/App'
import Home from './pages/Home'
import Debug from './pages/Debug'
import Database from './pages/Database'
import GameChooseDifficulty from './pages/Game/ChooseDifficulty'
import PlayGame from './pages/Game/Play'

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="debug" element={<Debug />} />
          <Route path="database" element={<Database />} />
          <Route
            path="play"
            element={<GameChooseDifficulty />}
          />
          <Route
            path="play/:difficulty"
            element={<PlayGame />}
          />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
