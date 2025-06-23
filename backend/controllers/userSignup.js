const path = require("path");
const db = require("../utils/db-connection");
const { connect } = require("http2");

const sentSignForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

const userSignup = (req, res) => {
  const { name, email, password } = req.body;

  const checkEmailQuery = `SELECT email FROM user WHERE email = ?`;

  db.execute(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.log("Error checking email:", err);
      return res.status(500).json("Server error");
    }

    if (results.length > 0) {
      // Email already exists
      return res.status(409).json("Email already registered");
    }

    // ✅ Only insert if email does NOT exist
    const insertQuery = `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`;

    db.execute(insertQuery, [name, email, password], (err) => {
      if (err) {
        console.log("Error inserting user:", err);
        return res.status(500).json("Could not create user");
      }

      console.log("User added:", name);
      return res.status(200).json(`User with name ${name} has been added`);
    });
  });
};


const sentLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};

const userLogin = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT id, name, email, password FROM user WHERE email = ?`;

  db.execute(query, [email], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ message: `Welcome ${user.name}` });
  });
};

module.exports = { userSignup, sentSignForm, sentLoginPage, userLogin };
