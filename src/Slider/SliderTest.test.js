import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import SliderTest from './SliderTest'

describe('Slider interactions', () => {
  afterEach(() => {
    cleanup()
  })

  test('Slider default props', () => {
    render(<SliderTest value={0} />)

    const precentage = screen.getByTestId('percent')
    const value = screen.getByTestId('value')
    const slider = screen.getByTestId('slider')

    expect(precentage).toHaveTextContent('0%')
    expect(value).toHaveTextContent('0')

    const [slider__track] = slider.getElementsByClassName('slider__track')
    const [slider__thumb] = slider.getElementsByClassName('slider__thumb')

    expect(slider__track).toHaveStyle('width: 0%')
    expect(slider__thumb).toHaveStyle('left: 0%')
  })

  test('Slider with props', () => {
    const sliderProps = {
      max: 384,
      value: 256
    }
    const percentValue = sliderProps.value * 100 / sliderProps.max
    render(<SliderTest {...sliderProps}/>)

    const percent = screen.getByTestId('percent')
    const value = screen.getByTestId('value')
    const slider = screen.getByTestId('slider')

    expect(value).toHaveTextContent(sliderProps.value)
    expect(percent).toHaveTextContent(Math.round(percentValue))

    const [slider__track] = slider.getElementsByClassName('slider__track')
    const [slider__thumb] = slider.getElementsByClassName('slider__thumb')

    expect(slider__track).toHaveStyle(`width: ${percentValue}%`)
    expect(slider__thumb).toHaveStyle(`left: ${percentValue}%`)
  })

  // Unable to perform as getBoundingClientRect seems to be not completely implemented
  // https://www.reddit.com/r/reactjs/comments/buck2k/how_would_you_test_this/
  test('Slider click interaction', () => {
    render(<SliderTest value={50} />)

    const value = screen.getByTestId('value')
    const wrapper = screen.getByTestId('slider')
    wrapper.style.width = "100px"
    const slider = screen.getByTestId('slider').getElementsByClassName('slider')[0]


    const sliderRect = slider.getBoundingClientRect()
    console.log({ sliderRect });

    // fireEvent.click(slider, { clientX: 50 })
    // expect(value).toHaveTextContent(50)
  })

})
