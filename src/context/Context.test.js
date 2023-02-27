import { cleanup, fireEvent, render } from '@testing-library/react'
import { CtxProvider } from '../Ctx.context'
import Context from './Context'

describe('Block component tests', () => {
  afterEach(() => {
    cleanup()
  })

  test('If Ctx not available', () => {
    const { container } = render(<Context />)
    const [ pre ] = container.getElementsByTagName('pre')
    const [ prop ] = container.getElementsByClassName('prop')
    expect(pre).toHaveTextContent('{}')
    expect(prop).toHaveTextContent('')
  })

  test('Can fetch Ctx prop', () => {
    const { container } = render(<CtxProvider prop="testing"><Context prop='testing' /></CtxProvider>)
    const [ pre ] = container.getElementsByTagName('pre')
    const [ prop ] = container.getElementsByClassName('prop')
    expect(pre).toHaveTextContent('{}')
    expect(prop).toHaveTextContent('testing')
  })

  test('Can append to Ctx', () => {
    const { container } = render(<CtxProvider prop="testing"><Context prop='testing' /></CtxProvider>)
    const [ button ] = container.getElementsByTagName('button')
    const [ pre ] = container.getElementsByTagName('pre')
    const [ prop ] = container.getElementsByClassName('prop')
    const [ key, value ] = container.getElementsByTagName('input')
    expect(pre).toHaveTextContent('{}')
    expect(prop).toHaveTextContent('testing')

    // Key is empty
    fireEvent.click(button)
    expect(pre).toHaveTextContent('{}')

    fireEvent.change(key, { target: { value: 'newKey' } })
    expect(key).toHaveValue('newKey')
    fireEvent.click(button)
    expect(pre).toHaveTextContent('"newKey": 0')

    fireEvent.change(key, { target: { value: 'second key' } })
    fireEvent.change(value, { target: { value: 99 } })
    fireEvent.click(button)
    expect(pre).toHaveTextContent('"second key": 99')

  })
})