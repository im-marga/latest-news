import { useState } from 'react'
import LatestNews from './components/LatestNews'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <LatestNews/>
    </>
  )
}

export default App
