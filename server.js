const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// rest object
const app = express();

// .env config 
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

app.get('/', (res,req) => {
    res.status(200).send({
        message: "server running",
    })
})

const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});