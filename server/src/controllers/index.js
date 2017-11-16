const User = require('../models/User');
const Story = require('../models/Story');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res, next) => {

   	Promise.all([
		User.find(),
		Story.find().sort('-date')
	])
	.then(data => {
		res.json({ 
			users: data[0],
			stories: data[1],
		});
	})
	.catch(err => {
		console.error('error:', err);
	});
}
