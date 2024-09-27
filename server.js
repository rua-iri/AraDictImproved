require("dotenv").config()
const cors = require("cors")
const app = require("./AraDictImproved");

const port = process.env.PORT || "3000";

app.use(cors())

console.log(`Server Running on port: ${port}`)

app.listen(port);
