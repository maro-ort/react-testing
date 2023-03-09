import React from 'react'
import Context from './context/Context'
import { CtxProvider } from './Ctx.context'

function App() {
  return (
    <div className="App">
      <CtxProvider>
        <Context />
      </CtxProvider>
    </div>
  )
}

export default App
