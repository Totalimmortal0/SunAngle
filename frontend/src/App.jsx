import { useState } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState(null)
  const [err, setErr] = useState(null)
  const [city, setCity] = useState("")

  async function searchCity() {
    const response = await fetch(`/api/location?city=${city}`)
    const data = await response.json()

    if (!response.ok) {
      setErr(data)
      setLocation(null)
    } else {
      setLocation(data)
      setErr(null)
    }
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
      <button onClick={searchCity} disabled={city === ""}>Search</button>

      {location &&(
        <>
          <h3>City: {location.city}</h3>
          <h4>Longitude: {location.longitude}</h4>
          <h4>Latitude: {location.latitude}</h4>
        </>
      )}

      {err &&(
        <>
          <h3>Error: {err.error}</h3>
        </>
      )}
    </>
  )
}

export default App
