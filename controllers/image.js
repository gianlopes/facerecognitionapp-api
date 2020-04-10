const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: '70d84aafaa964d558402c72853d3696f'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(400).json('unable to work with api');
			console.log(err);
		});
};

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
