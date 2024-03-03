import Game1 from '../assets/example/game1.jpg'
import Game2 from '../assets/example/game2.jpg'
import Game3 from '../assets/example/game3.jpg'
import Game4 from '../assets/example/game4.jpg'
import Game5 from '../assets/example/game5.jpg'
import Game6 from '../assets/example/game6.jpg'
import Game7 from '../assets/example/game7.jpg'
import Game8 from '../assets/example/game8.jpg'
import Game9 from '../assets/example/game9.jpg'
import Game10 from '../assets/example/game10.jpg'
import classNames from 'classnames'

export const GameList: React.FC = () => {
  const gameItems = [Game1, Game2, Game3, Game4, Game5, Game6, Game7, Game8, Game9, Game10]
  const itemCls = classNames(
    'inline-block mr-4 w-[250px] h-[250px] rounded-md box-border overflow-hiiden'
  )
  const imgCls = classNames(
    'shadow-lg w-full h-full object-cover overflow-hidden rounded-md overflow-hiiden'
  )

  return (
    <div className="-ml-[185px] h-[300px] items-center whitespace-nowrap overflow-auto no-scroll">
      {gameItems.map((item, index) => {
        return (
          <div
            className={classNames(itemCls, {
              'p-2 rounded-2 border-[2px] border-solid border-blue-600 w-[300px] h-[300px] -mb-[25px]':
                index === 1
            })}
            key={item}
          >
            <img className={imgCls} src={item} />
          </div>
        )
      })}
    </div>
  )
}
