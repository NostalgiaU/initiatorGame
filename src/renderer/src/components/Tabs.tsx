import classNames from 'classnames'
import { Link } from 'react-router-dom'

export const Tabs: React.FC = () => {
  const tabs = [
    {
      name: '我的游戏',
      link: '/'
    },
    // {
    //   name: 'Store'
    // },
    {
      name: '设置',
      link: '/setting'
    }
  ]

  const tabItemCls = classNames(
    'text-[18px] text-white font-semibold py-2 px-4 rounded-full hover:bg-opacity-50"'
  )
  const spanCls = classNames(
    'bg-opacity-25 backdrop-filter backdrop-blur-sm shadow-md bg-white text-[11px] px-[6px] rounded-[2px]'
  )

  return (
    <div className="flex items-center gap-8 px-20 py-10">
      <span className={classNames(spanCls, 'rounded-tl-lg')}>LB</span>
      {tabs.map((i, index) => (
        <Link key={i.name} to={i.link}>
          <div
            className={classNames(tabItemCls, {
              'bg-opacity-25 backdrop-filter backdrop-blur-sm shadow-md bg-white': index === 0
            })}
            onClick={() => {}}
          >
            {i.name}
          </div>
        </Link>
      ))}
      <span className={classNames(spanCls, 'rounded-tr-lg')}>RB</span>
    </div>
  )
}
