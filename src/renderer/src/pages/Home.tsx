import { GameList } from '@renderer/components/GameList'
import { Header } from '@renderer/components/Header'
import { Tabs } from '@renderer/components/Tabs'
import { EGamepadButtons, useGamepad } from '@renderer/hooks/action-hooks'
import { ButtonMode, GamepadButtons } from '@renderer/components/GamepadButtons'
import { useStore } from '@src/hooks/data-hooks'

export const Home: React.FC = () => {
  const { currentGameData } = useStore()

  useGamepad(EGamepadButtons.A, () => {
    console.log('click A')
  })
  useGamepad(EGamepadButtons.B, () => {
    console.log('click B')
  })
  useGamepad(EGamepadButtons.X, () => {
    console.log('click X')
  })
  useGamepad(EGamepadButtons.Y, () => {
    console.log('click Y')
  })
  useGamepad(
    EGamepadButtons.RB,
    () => {
      console.log('click RB')
    },
    { time: 200 }
  )
  useGamepad(
    EGamepadButtons.LB,
    () => {
      console.log('click LT')
    },
    { time: 200 }
  )

  return (
    <div className="text-white">
      <Header />
      <div>
        <Tabs />
        <GameList />
      </div>
      <GamepadButtons
        buttons={[ButtonMode.Play]}
        onChange={() => {
          window.electron.ipcRenderer.send('openExternalApp', JSON.stringify(currentGameData?.gameUrl))
        }}
      />
    </div>
  )
}
