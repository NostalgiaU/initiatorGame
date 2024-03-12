import { atom, useAtom } from 'jotai'
import { ConfigData } from '../types'
import { useCallback, useMemo, useState } from 'react'

const animeAtom = atom<ConfigData>({ games: [] })

export const useStore = () => {
  const [configData, setConfigData] = useAtom(animeAtom)
  const [currentGameId, setCurrentGameId] = useState(0)

  const setData = useCallback((data: ConfigData) => setConfigData(data), [])

  const currentGameData = useMemo(() => {
    const data = configData.games.find((i) => i.id === currentGameId)
    return data
  }, [configData, currentGameId])

  return {
    configData,
    setConfigData,
    setData,
    setCurrentGameId,
    currentGameData
  }
}
