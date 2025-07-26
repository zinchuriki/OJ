const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
DBConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.get("/", (req, res) => {
  res.send("hello,world!");
});

app.post("/register", async (req, res) => {
 try {
   const { firstname, lastname, email, password } = req.body;

  if (!(firstname && lastname && email && password)) {
    return res.status(400).send("Please enter all the details");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send("User already exists with the same email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token=jwt.sign({id: user._id,email},process.env.SECRET_KEY,{
    expiresIn: '1h',
  })

  user.token=token;
  res.status(200).json({ message: 'you have successfully registered',user});
 } catch (error) {
    console.log(error);
 }
});

app.listen(5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}!`);
});
