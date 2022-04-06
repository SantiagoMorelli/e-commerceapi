//register and login

const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
//REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  //send to db
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).json('wrong credetials!');
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== req.body.password &&
      res.status(401).json('wrong credetials!');
    const { password, ...other } = user._doc;

    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
