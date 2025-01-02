//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { ResumeBuilder } from './components/resume'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='flex justify-center items-center w-screen '>

      <ResumeBuilder/>
    </div>
  )
}

export default App
