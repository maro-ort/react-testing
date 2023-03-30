import React, { FC, useCallback, useState } from 'react'

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
    <div id="accordion" data-testid="accordion">
      {content.length === 0 ? (
        <p>No elements to display</p>
      ) : (
        content.map(({ title, text }, i) => (
          <div key={i}>
            <div className="title" onClick={() => handleClick(i)}>
              {title}
            </div>
            <div className="content" style={{ display: i === openCard ? 'block' : 'none' }}>
              {text}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Accordion
