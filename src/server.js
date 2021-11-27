const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const ejs = require("ejs");

const viewEngine = require("./configs/viewEngine");
const initRoute = require("./routes/web");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config views engine
viewEngine(app);
//init route
initRoute(app);

app.listen(port, () => {
  console.log(`Server is listening http://localhost:${port}`);
});
