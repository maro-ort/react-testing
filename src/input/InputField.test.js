/* eslint-disable testing-library/no-node-access */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import InputField from './InputField'

describe('Input component tests', () => {
  afterEach(() => {
    cleanup()
  })

  test('default props', () => {
    const props = { name: 'input-name' }
    render(<InputField {...props} />)
    const container = screen.getByTestId('input-field')

    const [input] = container.getElementsByTagName('input')
    expect(input).toHaveAttribute('name', 'input-name')
    expect(input).toHaveValue('')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).not.toHaveAttribute('required')
    expect(input).not.toHaveAttribute('readonly')

    const [title] = container.getElementsByClassName('input-title')
    expect(title).not.toBeTruthy()
  })

  test('all props', () => {
    const props = {
      name: 'input-name',
      type: 'number',
      title: 'Example title',
      value: '0',
      readOnly: true,
      required: true
    }
    render(<InputField {...props} />)
    const container = screen.getByTestId('input-field')

    const [input] = container.getElementsByTagName('input')
    expect(input).toHaveAttribute('name', 'input-name')
    expect(input).toHaveValue(0)
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('required')
    expect(input).toHaveAttribute('readonly')

    const [title] = container.getElementsByClassName('input-title')
    expect(title).toHaveTextContent('Example title')
  })

  test('change handling', () => {
    let result = ''
    const props = {
      name: 'input-name',
      onChange: (e) => {
        const value = e.currentTarget.value
        result = value
      }
    }

    render(<InputField {...props} />)
    const container = screen.getByTestId('input-field')

    const [input] = container.getElementsByTagName('input')
    expect(input).toHaveValue('')
    expect(result).toBe('')

    fireEvent.change(input, { target: { value: 'new value' }})
    expect(input).toHaveValue('new value')
    expect(result).toBe('new value')
  })

  test('change handling if readonly', () => {
    let result = ''
    const props = {
      name: 'input-name',
      readOnly: true,
      onChange: (e) => {
        const value = e.currentTarget.value
        result = value
      }
    }

    render(<InputField {...props} />)
    const container = screen.getByTestId('input-field')

    const [input] = container.getElementsByTagName('input')
    expect(input).toHaveValue('')
    expect(result).toBe('')

    fireEvent.change(input, { target: { value: 'new value' }})
    expect(input).toHaveValue('new value')
    expect(result).not.toBe('new value')
    expect(result).toBe('')
  })
})
