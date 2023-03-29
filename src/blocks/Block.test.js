/* eslint-disable testing-library/no-node-access */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Blocks from './Blocks'

describe('Block component tests', () => {
  afterEach(() => {
    cleanup()
  })

  test('Starts with the right amount of blocks', () => {
    const quantity = 10
    render(<Blocks quantity={quantity} />)
    const container = screen.getByTestId('blocks')

    const blocks = container.querySelectorAll('.block')
    expect(blocks.length).toBe(quantity)
    expect(blocks[blocks.length - 1]).toHaveTextContent(quantity)
  })

  test('Can add and remove blocks', () => {
    render(<Blocks />)
    const container = screen.getByTestId('blocks')
    const blocks = container.getElementsByClassName('block')
    const [addButton] = container.getElementsByClassName('add')
    const [removeButton] = container.getElementsByClassName('remove')

    expect(blocks.length).toBe(0)
    fireEvent.click(addButton)
    expect(blocks.length).toBe(1)
    expect(blocks[blocks.length - 1]).toHaveTextContent(1)
    fireEvent.click(removeButton)
    expect(blocks.length).toBe(0)
    fireEvent.click(removeButton)
    expect(blocks.length).toBe(0)
    fireEvent.click(addButton)
    fireEvent.click(addButton)
    expect(blocks[blocks.length - 1]).toHaveTextContent(2)

  })
})