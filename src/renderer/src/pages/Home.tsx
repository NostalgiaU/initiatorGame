import { GameList } from '@renderer/components/GameList'
import { Header } from '@renderer/components/Header'
import { Tabs } from '@renderer/components/Tabs'
import AButton from '../assets/a.svg'
import XButton from '../assets/x.svg'
import YButton from '../assets/y.svg'

export const Home: React.FC = () => {
  return (
    <div className="text-white">
      <Header />
      <div>
        <Tabs />
        <GameList />
        <div className="text-[40px] px-20 mt-6">女神异闻录 5：皇家版</div>
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
