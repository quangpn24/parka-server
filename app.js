const express = require("express");
const cors = require("cors");
const db = require("./models");
const routes = require("./routes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
