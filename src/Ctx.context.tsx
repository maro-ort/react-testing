import React, { createContext, FC, useCallback, useState } from 'react'

type Props = {
  ctxProps?: any
  children: React.ReactNode
}

const Ctx = createContext<{
  ctxValue: Record<string, number>
  setCtxValue?: React.Dispatch<React.SetStateAction<Record<string, number>>>
  append2CtxValue: (key: string, value: number) => void
  ctxProps?: Props['ctxProps']
}>({
  ctxValue: {},
  append2CtxValue: () => ({}),
})

const CtxProvider: FC<Props> = ({ ctxProps, children }) => {
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
    ctxProps,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export { CtxProvider }
export default Ctx
