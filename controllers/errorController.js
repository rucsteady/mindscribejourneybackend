import httpStatus from "http-status-codes";

export const respondNoResourceFound = (req, res) => {
	const errorCode = httpStatus.NOT_FOUND;
	res.status(errorCode).json({
		success: false,
		message: "Resource not found.",
	});
};

export const respondInternalError = (error, req, res, next) => {
	const errorCode = httpStatus.INTERNAL_SERVER_ERROR;
	res.status(errorCode).json({
		success: false,
		message: error.message || "Internal Server Error",
	});
};
