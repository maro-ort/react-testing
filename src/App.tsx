import React from 'react'
import Context from './context/Context'
import { CtxProvider } from './Ctx.context'
import Search from './search/Search'
import SliderTest from './Slider/SliderTest'

function App() {
  return (
    <div className="App">
      {/* <CtxProvider>
        <Context />
      </CtxProvider> */}
      <Search apiData={['a', 'ba', 'c']} />
    </div>
  )
}

export default App
