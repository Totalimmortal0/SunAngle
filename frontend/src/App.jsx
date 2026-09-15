import { useState } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState(null)
  const [city, setCity] = useState("")

  async function searchCity() {
    const response = await fetch(`/api/test?city=${city}`)
    const data = await response.json()
    setLocation(data)
  }

  return (
    <>
      <h1>Vite React Front-End Test</h1><br/>

      <label htmlFor="city">Enter a City: </label>
      <input
        value={city}      
        onChange={(event) => setCity(event.target.value)}
        id="city"
      />
      <button onClick={searchCity}>Search</button>

      {location && (
        <><br/>
          <h3>City: {location.city}</h3>
          <h4>Longitude: {location.longitude}</h4>
          <h4>Latitude: {location.latitude}</h4>
        </>
      )}
    </>
  )
}

export default App
