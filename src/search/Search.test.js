/* eslint-disable testing-library/no-node-access */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import Search from './Search'

describe('Search component tests', () => {
  afterEach(() => {
    cleanup()
  })

  test('Component loads', () => {
    render(<Search />)
    expect(screen.getByTestId('search')).toBeInTheDocument()
    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByTestId('input')).toHaveValue('')
    expect(screen.getByTestId('results')).toBeInTheDocument()
    expect(screen.getByTestId('results').childNodes.length).toBe(0)
  })

  test('Input changes', () => {
    render(<Search />)
    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { value: 'Viborg'}})
    expect(input).toHaveValue('Viborg')

  })

  test('Searching', async () => {
    const apiData = ['a', 'aa', 'b', 'B', 'ca', 'zc', 'db']
    render(<Search apiData={apiData} />)

    const input = screen.getByTestId('input')
    const results = screen.getByTestId('results')

    expect(results.childNodes.length).toBe(0)
    fireEvent.change(input, { target: { value: 'aa' }})
    expect(results.childNodes.length).toBe(1)
    fireEvent.change(input, { target: { value: 'c' }})
    expect(results.childNodes.length).toBe(2)
    fireEvent.change(input, { target: { value: 'B' }})
    expect(results.childNodes.length).toBe(3)
    fireEvent.change(input, { target: { value: '' }})
    expect(results.childNodes.length).toBe(0)
  })

  test('Selecting option', () => {
    const apiData = ['a', 'aa', 'ba', 'B']
    render(<Search apiData={apiData} />)

    const input = screen.getByTestId('input')
    const results = screen.getByTestId('results')

    fireEvent.change(input, { target: { value: 'a' }})
    expect(results.childNodes.length).toBe(3)
    expect(results.lastChild).toHaveTextContent('ba')
    fireEvent.click(results.lastChild)
    expect(input).toHaveValue('ba')
  })
})