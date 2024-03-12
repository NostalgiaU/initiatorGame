import { GameList } from '@renderer/components/GameList'
import { Header } from '@renderer/components/Header'
import { Tabs } from '@renderer/components/Tabs'
import AButton from '../assets/a.svg'
import XButton from '../assets/x.svg'
import YButton from '../assets/y.svg'
import { EGamepadButtons, useGamepad } from '@renderer/hooks/action-hooks'
import { useEffect } from 'react'
import { useStore } from '@src/hooks/data-hooks'
import { ConfigData } from '@src/types'

export const Home: React.FC = () => {
  const { setData } = useStore()

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

  useEffect(() => {
    window.electron.ipcRenderer.send('readFile')
    window.electron.ipcRenderer.on('checkPerlReply', (_, res) => {
      console.log('useEffect', res)
      setData(res ? (JSON.parse(res) as ConfigData) : [])
    })
  }, [])

  return (
    <div className="text-white">
      <Header />
      <div>
        <Tabs />
        <GameList />
      </div>
      <div className="flex gap-10 px-20 absolute bottom-10">
        <div className="flex items-center text-[20px] gap-2">
          <img
            className="bg-white rounded-full w-6 h-6 box-border p-[2px] text-center text-xs"
            src={AButton}
            alt=""
          />
          <span>Play</span>
        </div>
        <div className="flex items-center text-[20px] gap-2">
          <img
            className="bg-white rounded-full w-6 h-6 box-border p-[2px] text-center text-xs"
            src={XButton}
            alt=""
          />
          <span>Search</span>
        </div>
        <div className="flex items-center text-[20px] gap-2">
          <img
            className="bg-white rounded-full w-6 h-6 box-border p-[2px] text-center text-xs"
            src={YButton}
          />
          <span>Options</span>
        </div>
      </div>
    </div>
  )
}
