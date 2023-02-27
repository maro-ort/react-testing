import React, { useCallback, useState } from 'react'

const Basic = () => {
  const [currentValue, setCurrentValue] = useState(0)

  const addOne = useCallback(() => {
    setCurrentValue(currentValue + 1)
  }, [currentValue, setCurrentValue])

  return (
    <div className="basic-component">
      <div>Basic component value: {currentValue}</div>
      <button onClick={addOne}>Add</button>
    </div>
  )
}

export default Basic
