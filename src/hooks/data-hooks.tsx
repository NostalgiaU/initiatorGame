import { atom, useAtom } from 'jotai'
import { ConfigData } from '../types'
import { useCallback, useMemo, useState } from 'react'

const animeAtom = atom<ConfigData>({ games: [] })

export const useStore = () => {
  const [configData, setConfigData] = useAtom(animeAtom)
  const [currentGameIndex, setCurrentGameIndex] = useState(0)

  const setData = useCallback((data: ConfigData) => setConfigData(data), [])

  const currentGameData = useMemo(() => {
    const data = configData.games?.[currentGameIndex]
    return data
  }, [configData, currentGameIndex])

  return {
    configData,
    setConfigData,
    setData,
    setCurrentGameIndex,
    currentGameData
  }
}
