module.exports = {
	getIndex: (req, res) => {
		res.render("index");
	},
	getShirts: (req, res) => {
		res.render("shirts");
	},
	create: (req, res, next) => {
		const likeParams = getLikeParams(req.body);
		Like.create(likeParams)
			.then((like) => {
				res.locals.redirect = "/likes";
				res.locals.like = like;
				next();
			})
			.catch((error) => {
				console.log(`Error saving like:${error.message}`);
				next(error);
			});
	},
	redirectView: (req, res, next) => {
		const redirectPath = res.locals.redirect;
		if (redirectPath) res.redirect(redirectPath);
		else next();
	},
	chat: (req, res) => {
		res.render("chat");
	},
};
