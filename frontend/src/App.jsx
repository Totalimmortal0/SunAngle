import { useState } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState(null)
  const [err, setErr] = useState(null)
  const [city, setCity] = useState("")
  const [solarAngle, setSolarAngle] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  async function searchCity() {
    setisLoading(true)
    setLocation(null)

    const response = await fetch(`/api/location?city=${city.trim()}`)
    const data = await response.json()

    if (!response.ok) {
      setErr(data)
    } else {
      setLocation(data)
      getAngle(data.latitude)
      setErr(null)
    }
    setisLoading(false)
  }

  async function getAngle(latitude) {
    const response = await fetch(`/api/angle?lat=${latitude}`)
    const data = await response.json()
    setSolarAngle(data)
  }

  return (
    <>
      <h1>SunAngle</h1><br/>
      <label htmlFor="city">Enter a City: </label>
      <input
        value={city}      
        onChange={(event) => setCity(event.target.value)}
        id="city"
      />
      <button onClick={searchCity} disabled={city.trim() === ""}>Search</button>

      {isLoading &&(
        <h3>Loading...</h3>
      )}
      
      {location &&(
        <>
          <h3>City: {location.city}</h3>
          {solarAngle && (
            <>
              <h4>Your Best Angle is: {solarAngle.angle}°</h4>
              <h4>Longitude: {location.longitude}</h4>
              <h4>Latitude: {location.latitude}</h4>
            </>
          )}
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
