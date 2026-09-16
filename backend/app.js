const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("sunAngle backend test! server is up and running!"))

app.get("/api/location", async (req, res) => {
    const city = req.query.city
    
    const encodedCity = encodeURIComponent(req.query.city)
    const APIURL = `https://nominatim.openstreetmap.org/search?q=${encodedCity}&format=jsonv2&limit=1`

    const response = await fetch(APIURL, {
        headers: {
            "User-Agent": "SunAngle/0.1"
        }
    })
    const data = await response.json()

    if(data.length === 0) {
        res.status(404).json({
            error: 404,
        })
    } else {
        const latitude = data[0].lat
        const longitude = data[0].lon

        res.json({
            city: `${city}`,
            longitude: `${longitude}`,
            latitude: `${latitude}`,
        })
    }    
})

app.get("/api/angle", async (req, res) => {
    const latitude = Number(req.query.lat)
    const angle = Math.abs(latitude)
    res.json({
        angle: `${angle.toFixed(2)}`
    })
})

const PORT = 3000

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server is up and running on port ${PORT}`)
})