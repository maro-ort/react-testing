import React, { useCallback, useContext, useState } from 'react'
import Ctx from '../Ctx.context'
import { s } from '../utils'

const Context = () => {
  const { ctxValue, setCtxValue, append2CtxValue, ctxProps } = useContext(Ctx)

  const [key, setKey] = useState('')
  const [value, setValue] = useState(0)

  const handleAppend = useCallback(() => {
    if (!key) return
    append2CtxValue(key, value)
  }, [key, value])

  return (
    <div>
      <pre data-testid="ctxPropsId">{s(ctxProps)}</pre>
      <pre data-testid="ctxValueId">{s(ctxValue)}</pre>

      <section>
        <input data-testid="keyId" onChange={e => setKey(e.currentTarget.value)} defaultValue={key} />
        <input
          data-testid="valueId"
          type="number"
          onChange={e => setValue(parseInt(e.currentTarget.value))}
          defaultValue={value}
        />
        <button data-testid="append2CtxValue" onClick={handleAppend} />
        <button data-testid="resetCtxValue" onClick={() => setCtxValue?.({})} />
      </section>
    </div>
  )
}

export default Context
