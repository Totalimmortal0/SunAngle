import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    fetch("/api/test?city=Fortaleza")
      .then(response => response.json())
      .then(data => {
          console.log(data)
          setLocation(data)
      })
  }, [])

  return (
    <>
      <h1>Vite React Front-End Test</h1>
      {location ? (
        <>
          <h3>City: {location.city}</h3>
          <h4>Longitude: {location.longitude}</h4>
          <h4>Latitude: {location.latitude}</h4>
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  )
}

export default App
