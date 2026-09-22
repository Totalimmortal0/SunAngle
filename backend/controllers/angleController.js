function getAngle(req, res) {
    if (req.query.lat === undefined || req.query.lat === "") {
        return res.status(400).json({error: 400})
    }

    const latitude = Number(req.query.lat)
    const angle = Math.abs(latitude)
    
    res.json({
        angle: `${angle.toFixed(2)}`
    })
}

module.exports = {
    getAngle
}