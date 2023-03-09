import React, { FC, useState } from 'react'

import Slider from './Slider'

import './slider.scss'

const CEILING = 384 // 256 -> 100%, 384 -> 150%

const SliderTest: FC<{ value: number; max?: number }> = ({ value, max }) => {
  const [currentValue, setCurrentValue] = useState(value)
  const [percent, setPercent] = useState((value * 100) / (max || 100))

  return (
    <>
      <pre data-testid="percent">{Math.round(percent)}%</pre>
      <pre data-testid="value">{currentValue}</pre>
      <div data-testid="slider">
        <Slider
          onChange={(pos: number) => {
            if (!pos) return
            setCurrentValue(((max || 100) * pos) / 100)
            setPercent(pos)
          }}
          value={currentValue}
          max={max}
        />
      </div>
    </>
  )
}

export default SliderTest
