const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello,world!");
});

app.post("/register", (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if(!(firstname && lastname && email && password)){
    return res.status(400).send("Please enter all the details")
  }

  

});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
