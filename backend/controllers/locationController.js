async function getLocation(req, res) {
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
        const cityName = data[0].name
        const latitude = data[0].lat
        const longitude = data[0].lon

        res.json({
            city: `${cityName}`,
            longitude: `${longitude}`,
            latitude: `${latitude}`,
        })
    }
}

module.exports = {
    getLocation
}