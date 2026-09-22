const { Router } = require("express")
const { getLocation } = require("../controllers/locationController")

const router = Router()

router.get("/", getLocation)

module.exports = router