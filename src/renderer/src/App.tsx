import { Route, HashRouter, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import Setting from './pages/Setting'
import { useEffect } from 'react'
import { useStore } from '@src/hooks/data-hooks'
import { ThemeProvider } from './components/ui/theme-provider'
import { Toaster } from './components/ui/toaster'

function App(): JSX.Element {
  const { setData } = useStore()
  useEffect(() => {
    window.electron.ipcRenderer.send('readFile')
    window.electron.ipcRenderer.on('checkPerlReply', (_, res) => {
      console.log('useEffect', res)
      setData(res ? JSON.parse(res) : [])
    })
  }, [])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/setting" Component={Setting} />
        </Routes>
      </HashRouter>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
