import {
	find,
	create as _create,
	findById,
	findByIdAndUpdate,
	findByIdAndRemove,
} from "../models/subscriber";
const getSubscriberParams = (body) => {
	return {
		name: body.name,
		email: body.email,
		zipCode: Number.parseInt(body.zipCode),
	};
};
export function index(req, res, next) {
	find()
		.then((subscribers) => {
			res.locals.subscribers = subscribers;
			next();
		})
		.catch((error) => {
			console.log(`Error fetching subscribers: ${error.message}`);
			next(error);
		});
}
export function indexView(req, res) {
	res.render("subscribers/index");
}
export function newSubscriber(req, res) {
	res.render("subscribers/new");
}
export function create(req, res, next) {
	const subscriberParams = getSubscriberParams(req.body);
	_create(subscriberParams)
		.then((subscriber) => {
			res.locals.redirect = "/subscribers";
			res.locals.subscriber = subscriber;
			next();
		})
		.catch((error) => {
			console.log(`Error saving subscriber:${error.message}`);
			next(error);
		});
}
export function redirectView(req, res, next) {
	const redirectPath = res.locals.redirect;
	if (redirectPath) res.redirect(redirectPath);
	else next();
}
export function show(req, res, next) {
	const subscriberId = req.params.id;
	findById(subscriberId)
		.then((subscriber) => {
			res.locals.subscriber = subscriber;
			next();
		})
		.catch((error) => {
			console.log(`Error fetching subscriber by ID:
         ${error.message}`);
			next(error);
		});
}
export function showView(req, res) {
	res.render("subscribers/show");
}
export function edit(req, res, next) {
	const subscriberId = req.params.id;
	findById(subscriberId)
		.then((subscriber) => {
			res.render("subscribers/edit", {
				subscriber: subscriber,
			});
		})
		.catch((error) => {
			console.log(`Error fetching subscriber by ID: ${error.message}`);
			next(error);
		});
}
export function update(req, res, next) {
	const subscriberId = req.params.id;
	const subscriberParams = getSubscriberParams(req.body);
	findByIdAndUpdate(subscriberId, {
		$set: subscriberParams,
	})
		.then((subscriber) => {
			res.locals.redirect = `/subscribers/${subscriberId}`;
			res.locals.subscriber = subscriber;
			next();
		})
		.catch((error) => {
			console.log(`Error updating subscriber by ID:
                     ${error.message}`);
			next(error);
		});
}
export function deleteSubscriber(req, res, next) {
	const subscriberId = req.params.id;
	findByIdAndRemove(subscriberId)
		.then(() => {
			res.locals.redirect = "/subscribers";
			next();
		})
		.catch((error) => {
			console.log(`Error deleting subscriber by ID:
                     ${error.message}`);
			next();
		});
}
