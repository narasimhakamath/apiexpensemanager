const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
	let responseData = {statusCode: 401, success: "", message: "Authentication failed. You do not have permissions to perform this action."};

	if(request['headers']['authorization']) {
		const token = request['headers']['authorization'];
		try {
			const decodedData = jwt.verify(token, "secret", null);
			request['userData'] = decodedData;
			next();
		} catch(error) {
			return response.status(responseData.statusCode).json(responseData);
		}
	} else {
		return response.status(responseData.statusCode).json(responseData);
	}
}