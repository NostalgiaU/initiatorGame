import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useStore } from '@src/hooks/data-hooks'
import { Slide } from './Slides/Slides'

function getBase64(img) {
  return new Promise((resolve, reject) => {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          resolve(reader.result)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const GameList: React.FC = () => {
  const { configData, setCurrentGameIndex, currentGameData } = useStore()
  const { games } = configData
  const [bgUrl, setBgUrl] = useState('')

  const imgCls = classNames(
    'shadow-lg w-full h-full objecFt-cover overflow-hidden rounded-md overflow-hiiden'
  )

  // const save = () => {
  //   window.electron.ipcRenderer.send('writeFile', JSON.stringify(data))
  // }

  useEffect(() => {
    getBase64(currentGameData?.bgUrl).then((res) => {
      setBgUrl(res as string)
    })
  })

  return (
    <div>
      <div className="items-center whitespace-nowrap overflow-auto no-scroll">
        <div className="ml-20">
          <Slide
            onChange={(index) => {
              setCurrentGameIndex(index)
            }}
          >
            {games.map((item) => {
              return <img className={imgCls} src={item.iconUrl} key={item.id} />
            })}
          </Slide>
        </div>
      </div>
      <div className="text-[40px] px-20 mt-6">{currentGameData?.name}</div>
      <div
        className="fixed left-0 top-0 w-[100vw] h-[100vh] -z-10 brightness-[40%]"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: '100% 100%',
          transform: 'translateZ(0)',
          transition: 'background-image 500ms'
        }}
      />
    </div>
  )
}
