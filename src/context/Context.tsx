import React, { useCallback, useContext, useState } from 'react'
import Ctx from '../Ctx.context'

const Context = () => {
  const { ctxValue, setCtxValue, append2CtxValue, prop } = useContext(Ctx)

  const [key, setKey] = useState('')
  const [value, setValue] = useState(0)

  const append = useCallback(() => {
    append2CtxValue(key, value)
  }, [key, value])

  return (
    <div>
      <input name="key" onChange={e => setKey(e.currentTarget.value)} defaultValue={key} />
      <input
        type="number"
        name="value"
        onChange={e => setValue(parseInt(e.currentTarget.value))}
        defaultValue={value}
      />
      <button onClick={append}>Add</button>
      <div className="prop">{prop}</div>
      <pre>{JSON.stringify(ctxValue, null, 2)}</pre>
    </div>
  )
}

export default Context
