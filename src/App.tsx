import React from 'react'
import Context from './context/Context'
import { CtxProvider } from './Ctx.context'
import SliderTest from './Slider/SliderTest'

function App() {
  return (
    <div className="App">
      {/* <CtxProvider>
        <Context />
      </CtxProvider> */}
      <SliderTest value={50} />
    </div>
  )
}

export default App
