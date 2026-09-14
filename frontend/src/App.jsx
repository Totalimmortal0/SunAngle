import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/test")
      .then(response => response.json())
      .then(data => {
          console.log(data)
          setMessage(data.message)
      })
  }, [])

  return (
    <>
      <h1>Vite React Front-End Test</h1>
      <h3>server response: {message}</h3>
    </>
  )
}

export default App
