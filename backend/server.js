require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log("MongoDB Error:", err));

// ===============================
// Schemas
// ===============================

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);

// Prediction Schema
const predictionSchema = new mongoose.Schema({
  userId: String,
  disease: String,
  drug: String,
  score: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Prediction = mongoose.model(
  "Prediction",
  predictionSchema
);

// ===============================
// JWT Middleware
// ===============================
function authMiddleware(req, res, next) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No Token Provided"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid Token"
    });
  }
}

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
  res.send("AI PharmaX Backend Running");
});

// ===============================
// Register
// ===============================
app.post("/api/auth/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registered Successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// ===============================
// Login
// ===============================
app.post("/api/auth/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// ===============================
// Save Prediction
// ===============================
app.post(
  "/api/predictions/save",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        disease,
        drug,
        score
      } = req.body;

      const newPrediction =
        await Prediction.create({
          userId: req.user.id,
          disease,
          drug,
          score
        });

      res.json({
        message: "Prediction Saved",
        data: newPrediction
      });

    } catch (error) {
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

// ===============================
// Get My Predictions
// ===============================
app.get(
  "/api/predictions/my",
  authMiddleware,
  async (req, res) => {
    try {

      const data =
        await Prediction.find({
          userId: req.user.id
        }).sort({
          createdAt: -1
        });

      res.json(data);

    } catch (error) {
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

// ===============================
// PubMed API
// ===============================
app.get(
  "/api/research/pubmed/:query",
  async (req, res) => {
    try {

      const q = req.params.query;

      const url =
        "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&term=" +
        q;

      const response =
        await axios.get(url);

      res.json(response.data);

    } catch (error) {
      res.status(500).json({
        message: "PubMed Error"
      });
    }
  }
);

// ===============================
// OpenFDA API
// ===============================
app.get(
  "/api/research/fda/:drug",
  async (req, res) => {
    try {

      const drug = req.params.drug;

      const url =
        "https://api.fda.gov/drug/label.json?search=openfda.brand_name:" +
        drug;

      const response =
        await axios.get(url);

      res.json(response.data);

    } catch (error) {
      res.status(500).json({
        message: "OpenFDA Error"
      });
    }
  }
);

// ===============================
// Server Start
// ===============================
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});