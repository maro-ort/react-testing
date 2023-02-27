import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import Basic from './Basic'

describe('Basic component tests', () => {

  afterEach(() => {
    cleanup()
  })

  test('Has correct class', () => {
    const { container } = render(<Basic />)
    expect(container.firstChild).toHaveClass('basic-component')
  })

  test('Has correct content', () => {
    const { container } = render(<Basic />)
    expect(container.firstChild).toHaveTextContent('Basic component value: 0')
  })

  test('Can update value', () => {
    const { container } = render(<Basic />)
    const [button] = container.getElementsByTagName('button')
    expect(container.firstChild).toHaveTextContent('Basic component value: 0')

    fireEvent.click(button)
    expect(container.firstChild).toHaveTextContent('Basic component value: 1')

    fireEvent.click(button)
    expect(container.firstChild).toHaveTextContent('Basic component value: 2')

  })
})