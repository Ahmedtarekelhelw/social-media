const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
const register = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

//login
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    //find the user
    const user = await User.findOne({ email });
    !user && res.status(404).json({ msg: "User not Register" });

    //check if the password is correct
    const auth = await bcrypt.compare(password, user.password);
    !auth && res.status(400).json({ msg: "Invalid password" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login };
