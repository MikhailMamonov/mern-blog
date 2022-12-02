require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");

//Constants
const PORT = process.env.PORT || 5000;
const app = express();
//Middlewares
app.use(cors());
app.use(express.json()); //parse requests of content-type - application/json
app.use("/api", router);
//routes
//http//localhost:8080
app.get("/", (req, res) => {
  res.end("<H1>Home Page</H1>");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
