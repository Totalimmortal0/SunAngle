const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("sunAngle backend test! server is up and running!"))

app.get("/api/test", async (req, res) => {
    const city = encodeURIComponent(req.query.city)
    const APIURL = `https://nominatim.openstreetmap.org/search?q=${city}&format=jsonv2&limit=1`

    const response = await fetch(APIURL, {
        headers: {
            "User-Agent": "SunAngle/0.1"
        }
    })
    const data = await response.json()

    if(data.length === 0) {
        res.status(404).json({
            error: 404,
            message: "City not found (ERROR 404)"
        })
    } else {
        const latitude = data[0].lat
        const longitude = data[0].lon

        res.json({
            message: "hello from the server.",
            city: `${city}`,
            longitude: `${longitude}`,
            latitude: `${latitude}`,
        })
    }    
})

const PORT = 3000

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server is up and running on port ${PORT}`)
})