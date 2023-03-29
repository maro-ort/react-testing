import React, { FC, useCallback, useState } from 'react'
import cx from 'classnames'

const Accordion: FC<{
  content: Array<{ title: string; text: string }>
}> = ({ content }) => {
  const [openCard, setOpenCard] = useState<number | null>(null)

  const handleClick = useCallback(
    (i: number) => {
      setOpenCard(i === openCard ? null : i)
    },
    [openCard, setOpenCard]
  )

  return (
    <div data-testid="accordion">
      {content.length === 0 ? (
        <p>No elements to display</p>
      ) : (
        content.map(({ title, text }, i) => (
          <div key={i}>
            <div className="title" onClick={() => handleClick(i)}>
              {title}
            </div>
            <div className={cx('content', { '--open': i === openCard })}>{text}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default Accordion
