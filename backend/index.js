const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const dbConfig = require('./database/db');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(` The server has started on port: ${PORT}`))


// for online atlas 
// const uri = process.env.MONGODB_CONNECTION_STRING

//For local 
const uri = dbConfig.db
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (err) => {
    if(err) throw err;
    console.log("MongoDB Connection established")
  }
);

app.use("/users", require("./routes/users"));
// app.use("/todos", require("./routes/todo"));