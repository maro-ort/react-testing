import React, { FC, useCallback, useState } from 'react'

const Block: FC<{ value: number }> = ({ value }) => {
  return <div className="block">{value}</div>
}

const Blocks: FC<{
  quantity?: number
}> = ({ quantity = 0 }) => {
  const [blockQuantity, setBlockQuantity] = useState(quantity)

  const addBlock = useCallback(() => {
    setBlockQuantity(blockQuantity + 1)
  }, [blockQuantity, setBlockQuantity])

  const removeBlock = useCallback(() => {
    if (blockQuantity === 0) return
    setBlockQuantity(blockQuantity - 1)
  }, [blockQuantity, setBlockQuantity])

  return (
    <div id="blocks">
      <div className="buttons">
        <button className="add" onClick={addBlock}>
          Add
        </button>
        <button className="remove" onClick={removeBlock}>
          Remove
        </button>
      </div>
      <div className="grid">
        {[...new Array(blockQuantity)].map((_, i) => (
          <Block key={i} value={i + 1} />
        ))}
      </div>
    </div>
  )
}

export default Blocks
