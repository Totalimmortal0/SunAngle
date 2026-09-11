import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    fetch("/api/test")
      .then(response => response.json())
      .then(data => {
          console.log(data)
      })
  }, [])

  return (
    <>
      <h1>Vite React Front-End Test</h1>
    </>
  )
}

export default App
