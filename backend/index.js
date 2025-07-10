const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");
const User = require("./models/User")

DBConnection();
app.get("/", (req, res) => {
  res.send("hello,world!");
});

app.post("/register", async(req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!(firstname && lastname && email && password)) {
    return res.status(400).send("Please enter all the details");
  }

const existingUser=await User.findOne({email});

if(existingUser){
  return res.status(400).send("User already exists with the same email")
}




});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
