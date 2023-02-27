import React, { createContext, FC, useCallback, useState } from 'react'

const Ctx = createContext<{
  ctxValue: Record<string, number>
  setCtxValue?: React.Dispatch<React.SetStateAction<Record<string, number>>>
  append2CtxValue: (key: string, value: number) => void
  prop: string
}>({
  ctxValue: {},
  append2CtxValue: () => ({}),
  prop: '',
})

const CtxProvider: FC<{ prop: string; children: React.ReactNode }> = ({ prop, children }) => {
  const [ctxValue, setCtxValue] = useState<Record<string, number>>({})

  const append2CtxValue = useCallback(
    (key: string, value: number) => {
      if (!key) return
      setCtxValue({
        ...ctxValue,
        [key]: value,
      })
    },
    [ctxValue, setCtxValue]
  )

  const value = {
    ctxValue,
    setCtxValue,
    append2CtxValue,
    prop,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export { CtxProvider }
export default Ctx
