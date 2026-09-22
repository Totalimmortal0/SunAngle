const express = require("express");
const locationRouter = require("./routes/locationRoutes")
const angleRouter = require("./routes/angleRoutes")
const app = express();

app.get("/", (req, res) => res.send("sunAngle backend! server is up and running!"))

app.use("/api/location", locationRouter)
app.use("/api/angle", angleRouter)

module.exports = app