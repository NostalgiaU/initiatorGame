import { Route, HashRouter, Routes } from 'react-router-dom'
import { Home } from './pages/Home'

function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </HashRouter>
  )
}

export default App
