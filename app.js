const express = require("express");
const cors = require("cors");
const db = require("./models");
const routes = require("./routes");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// Enable all CORS requests
app.use(cors());

// parses incoming requests with JSON payloads
app.use(express.json());

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// HTTP request logger middleware
app.use(morgan("tiny"));

db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello parka",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server`,
  });
});
