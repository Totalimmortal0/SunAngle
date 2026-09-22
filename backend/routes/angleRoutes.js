const { Router } = require("express")
const { getAngle } = require("../controllers/angleController")

const router = Router()

router.get("/", getAngle)

module.exports = router