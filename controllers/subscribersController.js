import Subscriber from "../models/subscriber.js";

const getSubscriberParams = (body) => {
	return {
		name: body.name,
		email: body.email,
		zipCode: Number.parseInt(body.zipCode),
	};
};

export function index(req, res, next) {
	Subscriber.find()
		.then((subscribers) => {
			res.status(200).json({
				success: true,
				data: subscribers,
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error fetching subscribers: ${error.message}`,
			});
		});
}

export function edit(req, res, next) {
	const subscriberId = req.params.id;
	Subscriber.findById(subscriberId)
		.then((subscriber) => {
			if (subscriber) {
				res.status(200).json({
					success: true,
					data: subscriber,
				});
			} else {
				res.status(404).json({
					success: false,
					message: "Subscriber not found",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error fetching subscriber by ID: ${error.message}`,
			});
		});
}

export function create(req, res, next) {
	const subscriberParams = getSubscriberParams(req.body);
	Subscriber.create(subscriberParams)
		.then((subscriber) => {
			res.status(201).json({
				success: true,
				data: subscriber,
				message: "Subscriber created successfully",
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error saving subscriber: ${error.message}`,
			});
		});
}

export function show(req, res, next) {
	const subscriberId = req.params.id;
	Subscriber.findById(subscriberId)
		.then((subscriber) => {
			if (subscriber) {
				res.status(200).json({
					success: true,
					data: subscriber,
				});
			} else {
				res.status(404).json({
					success: false,
					message: "Subscriber not found",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error fetching subscriber by ID: ${error.message}`,
			});
		});
}

export function update(req, res, next) {
	const subscriberId = req.params.id;
	const subscriberParams = getSubscriberParams(req.body);
	Subscriber.findByIdAndUpdate(
		subscriberId,
		{ $set: subscriberParams },
		{ new: true },
	)
		.then((subscriber) => {
			if (subscriber) {
				res.status(200).json({
					success: true,
					data: subscriber,
					message: "Subscriber updated successfully",
				});
			} else {
				res.status(404).json({
					success: false,
					message: "Subscriber not found",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error updating subscriber by ID: ${error.message}`,
			});
		});
}

// Subscriber löschen
export function deleteSubscriber(req, res, next) {
	const subscriberId = req.params.id;
	Subscriber.findByIdAndRemove(subscriberId)
		.then(() => {
			res.status(200).json({
				success: true,
				message: "Subscriber deleted successfully",
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error deleting subscriber by ID: ${error.message}`,
			});
		});
}
