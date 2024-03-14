import React, { useCallback } from 'react'
import AButton from '../assets/a.svg'
import BButton from '../assets/b.svg'
import XButton from '../assets/x.svg'
import YButton from '../assets/y.svg'
import classNames from 'classnames'

export enum ButtonMode {
  Back = 'Back',
  Play = 'Play',
  Apply = 'apply',
  Search = 'Search',
  Option = 'Option'
}
export interface GamepadButtonsProps {
  buttons: ButtonMode[]
  onChange?: (event: ButtonMode) => void
}
export const GamepadButtons: React.FC<GamepadButtonsProps> = ({ buttons = [], onChange }) => {
  const buttonCls = classNames(
    'px-2 py-1 flex items-center text-[20px] gap-2 cursor-pointer hover:bg-slate-100 hover:bg-opacity-30 rounded-sm'
  )

  const imgUrl = useCallback((key: ButtonMode) => {
    switch (key) {
      case ButtonMode.Apply:
        return AButton
      case ButtonMode.Play:
        return AButton
      case ButtonMode.Back:
        return BButton
      case ButtonMode.Search:
        return XButton
      case ButtonMode.Option:
        return YButton
      default:
        return ''
    }
  }, [])

  return (
    <div className="flex gap-10 px-20 absolute bottom-10">
      {buttons.map((i) => (
        <div className={buttonCls} key={i} onClick={() => onChange?.(i)}>
          <img
            className="bg-white rounded-full w-6 h-6 box-border p-[2px] text-center text-xs"
            src={imgUrl(i)}
          />
          <span>{ButtonMode[i]}</span>
        </div>
      ))}
      {/* <div className={buttonCls}>
        <img
          className="bg-white rounded-full w-6 h-6 box-border p-[2px] text-center text-xs"
          src={AButton}
        />
        <span>Play</span>
      </div>
      <div className={buttonCls}>
        <img
          className="bg-white rounded-full w-6 h-6 box-border p-[2px] text-center text-xs"
          src={XButton}
        />
        <span>Search</span>
      </div>
      <div className={buttonCls}>
        <img
          className="bg-white rounded-full w-6 h-6 box-border p-[2px] text-center text-xs"
          src={YButton}
        />
        <span>Options</span>
      </div> */}
    </div>
  )
}
