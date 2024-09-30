const httpStatus = require("http-status-codes");

module.exports = {
	respondNoResourceFound: (req, res) => {
		const errorCode = httpStatus.NOT_FOUND;
		res.status(errorCode);
		res.render("error");
	},
	respondInternalError: (error, req, res, next) => {
		const errorCode = httpStatus.INTERNAL_SERVER_ERROR;
		res.status(errorCode);
		res.render("error");
	},
};
