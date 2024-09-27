require("dotenv").config();
const app = require("./AraDictImproved");

const port = process.env.PORT || "3000";

console.log(`Server Running on port: ${port}`);

app.listen(port);
