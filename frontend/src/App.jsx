import { useState } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState(null)
  const [err, setErr] = useState(null)
  const [city, setCity] = useState("")
  const [solarAngle, setSolarAngle] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  async function searchCity(event) {
    event.preventDefault()
    
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
    <main className="app">
      <section className="hero">
        <h1>SunAngle</h1>
        <p>
          Calculate the recommended solar panel angle for your location.
        </p>

        <form className="searchForm" onSubmit={searchCity}>
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Enter a city..."
            id="city"
          />
          <button
            type="submit"
            disabled={city.trim() === ""}
          >
            Calculate
          </button>
        </form>
      </section>
      
      {isLoading && (
        <section className="statusCard">
          <h3>Calculating...</h3>
        </section>
      )}

      {err && !isLoading && (
        <section className="errorCard">
          <h3>Error: {err.error}</h3>
        </section>
      )}
      
      {location && solarAngle && (
        <section className="resultCard">
          <p className="cityName">{location.city}</p>

          <div className="angleDisplay">
            <span>{solarAngle.angle}°</span>
          </div>
          <p className="angleLabel">
            Recommended panel angle
          </p>

          <div className="coordinates">
            <div>
              <span>Latitude</span>
              <p>{location.latitude}</p>
            </div>
            <div>
              <span>Longitude</span>
              <p>{location.longitude}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
