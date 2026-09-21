const app = require("./app")

const PORT = 3000

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server is up and running on port ${PORT}`)
})