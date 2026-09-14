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


    console.log(city)
    console.log(APIURL)
    console.log(data)


    res.json({
        message: "hello from the server"
    })
})

const PORT = 3000

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server is up and running on port ${PORT}`)
})