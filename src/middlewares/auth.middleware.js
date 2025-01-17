const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../config');

function Auth (req, res, next) {
	const token = req.headers.authorization?.split(' ')[1];
	if(!token) return res.status(401).json({
		message: 'Unauthorized'
	});

	try {
		const jwtPayload = jwt.verify(token, JWT_KEY);
		
		if(!jwtPayload) return res.status(403).json({
			message: 'Invalid token'
		});

		next();
	} catch (_) {
		return res.status(403).json({
			message: 'Invalid token'
		});
	}
}

module.exports = {
	Auth
}