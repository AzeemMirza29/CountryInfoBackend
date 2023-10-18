const jwt = require("jsonwebtoken");
require("dotenv").config();

const hardcodedUsers = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

exports.login = (req, res) => {
  const { username, password } = req.body;
  try {
    if (validateUser(username, password)) {
      const token = generateToken(username);
      res.json({ message: "User login successfully", token: token, status: true });
    } else {
      res.status(400).json({ message: "Authentication failed", status: false });
    } 
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

function validateUser(username, password) {
  const user = hardcodedUsers.find((user) => user.username === username);

  if (!user) {
    return false;
  }

  return user.password === password;
}

function generateToken(username) {
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
