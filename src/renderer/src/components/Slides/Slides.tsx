import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

const SLIDE_ITEM_WIDTH = 250

export const Slide: React.FC<{ children: ReactNode[]; onChange: (index: number) => void }> = ({
  children,
  onChange
}) => {
  const container = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const [transformX, setTransformX] = useState(0)

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  // 剩余最后几个时不滚动
  const scrolleble = useMemo(() => {
    const containerWidth = container.current?.clientWidth || 0
    const oddLength = children.length + 2 - currentPage
    if (containerWidth && containerWidth / SLIDE_ITEM_WIDTH >= oddLength) return false
    return true
  }, [container.current?.clientWidth, children, currentPage])

  useEffect(() => {
    if (scrolleble) setTransformX(currentPage * (SLIDE_ITEM_WIDTH - 10) + currentPage * 28)
  }, [currentPage, scrolleble])

  useEffect(() => {
    onChange(currentPage)
  }, [currentPage])

  return (
    <>
      <div ref={container} className="relative py-8">
        <div
          className="transition-transform"
          style={{
            transform: `translateX(-${transformX}px)`
          }}
        >
          {children.map((i, index) => {
            return (
              <SlideItem
                children={i}
                key={index}
                active={currentPage === index}
                onClick={() => setCurrentPage(index)}
              />
            )
          })}
        </div>
        {/* <div className="absolute bottom-0 left-0">
          <button onClick={handlePrev} disabled={currentPage === 0}>
            Previous
          </button>
          <button onClick={handleNext} disabled={currentPage === children.length - 1}>
            Next
          </button>
        </div> */}
      </div>
    </>
  )
}

export const SlideItem: React.FC<{ children: ReactNode; active: boolean; onClick: () => void }> = ({
  children,
  active,
  onClick
}) => {
  const itemCls = classNames(
    `inline-block mr-5 w-[250px] h-[250px] rounded-md box-border overflow-hiiden transition-transform cursor-pointer`
  )
  return (
    <div
      className={classNames(itemCls, {
        'p-1 rounded-2 border-[3px] border-solid border-blue-600 scale-[120%] mx-5 mr-9': active
      })}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
