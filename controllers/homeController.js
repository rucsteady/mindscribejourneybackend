export const getIndex = (req, res) => {
	res.status(200).json({
		success: true,
		message: "Welcome to the API!",
	});
};
