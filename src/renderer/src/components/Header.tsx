import { useCallback, useEffect, useState } from 'react'
import PhotoImg from '../assets/photo.jpg'

const useTime = (): { time: string } => {
  const [time, setTime] = useState('')
  const getTime = useCallback(() => {
    const date = new Date()
    let hours = date.getHours()
    let minutes: number | string = date.getMinutes()
    // let seconds: number | string = date.getSeconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    // seconds = seconds < 10 ? '0' + seconds : seconds
    const strTime = hours + ':' + minutes + ' ' + ampm

    return strTime
  }, [])

  useEffect(() => {
    setInterval(() => {
      setTime(getTime())
    }, 1000)
  }, [])

  return { time }
}

export const Header: React.FC = () => {
  const { time } = useTime()

  return (
    <div className="flex items-center justify-between py-10 px-20">
      <div className="flex items-center gap-3">
        <img className="w-12 h-12 rounded-full" src={PhotoImg} alt="" />
        <div className="text-lg">Hero</div>
      </div>
      <div className="text-[20px]">{time}</div>
    </div>
  )
}
