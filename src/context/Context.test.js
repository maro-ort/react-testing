import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { CtxProvider } from '../Ctx.context'
import Context from './Context'
import { s } from '../utils'

describe('Basic context management', () => {
  afterEach(() => {
    cleanup()
  })

  // ctxProps === undefined renders empty
  // default ctxValue === {}
  test('Default context with no props', () => {
    render(<CtxProvider><Context /></CtxProvider>)
    const ctxPropsEl = screen.getByTestId('ctxPropsId')
    const ctxValueEl = screen.getByTestId('ctxValueId')

    expect(ctxPropsEl).toBeEmptyDOMElement('')
    expect(ctxValueEl).toHaveTextContent('{}')
  })

  test('Context with props', () => {
    const ctxProps = {
      arrayProp: [1,2,3,4],
      objectProp: {},
      numberProp: 2,
      stringProp: 'a string',
    }
    render(<CtxProvider ctxProps={ctxProps}><Context /></CtxProvider>)
    const ctxPropsEl = screen.getByTestId('ctxPropsId')
    expect(ctxPropsEl).toHaveTextContent(s(ctxProps))
  })

  test('Ctx management', () => {
    render(<CtxProvider><Context /></CtxProvider>)

    const ctxValueOutput = screen.getByTestId('ctxValueId')
    const keyInput = screen.getByTestId('keyId')
    const valueInput = screen.getByTestId('valueId')
    const appendButton = screen.getByTestId('append2CtxValue')
    const resetButton = screen.getByTestId('resetCtxValue')

    // Key is empty
    fireEvent.click(appendButton)
    expect(ctxValueOutput).toHaveTextContent('{}')

    // Add new key with default number
    const defaultKey = 'defaultKey'
    expect(valueInput).toHaveValue(0)
    fireEvent.change(keyInput, { target: { value: defaultKey } })
    expect(keyInput).toHaveValue(defaultKey)
    fireEvent.click(appendButton)
    expect(ctxValueOutput).toHaveTextContent(s({ [defaultKey] : 0}))

    // Reset ctxValue
    fireEvent.click(resetButton)
    expect(ctxValueOutput).toHaveTextContent(s({}))

    // Add new key with number
    const newKey = 'newKey'
    const newValue = 42
    fireEvent.change(keyInput, { target: { value: newKey } })
    fireEvent.change(valueInput, { target: { value: newValue } })
    expect(valueInput).toHaveValue(newValue)

    fireEvent.click(appendButton)
    expect(ctxValueOutput).toHaveTextContent(s({ [newKey] : newValue}))
    fireEvent.click(resetButton)

    // Override key
    const overrideKey = 'overrideKey'
    const overrideNewValue = 1001
    fireEvent.change(keyInput, { target: { value: overrideKey } })
    fireEvent.change(valueInput, { target: { value: newValue } })
    fireEvent.click(appendButton)
    expect(ctxValueOutput).toHaveTextContent(s({ [overrideKey] : newValue}))
    fireEvent.change(keyInput, { target: { value: overrideKey } })
    fireEvent.change(valueInput, { target: { value: overrideNewValue } })
    fireEvent.click(appendButton)
    expect(ctxValueOutput).toHaveTextContent(s({ [overrideKey] : overrideNewValue}))
  })

})