const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];

	if (token) {
		const accessToken = token.split(" ")[1];
		jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, decoded) => {
			if (err) {
				res.status(403).json("Token is not valid!");
			}
			req.id = decoded.id;
			next();
		});
	} else {
		res.status(401).json(`You're not authentication`);
	}
};
module.exports = verifyToken;
