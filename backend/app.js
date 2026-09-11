const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("sunAngle backend test! server is up and running!"))
app.get("/api/test", (req, res) => {
    res.json({
        message: "hello from express"
    })
})

const PORT = 3000

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server is up and running on port ${PORT}`)
})