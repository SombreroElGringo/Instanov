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
	.then((users, stories) => {
		res.json({
			users: users, 
			stories: stories,
		});
	})
	.catch(err => {
		console.error('error:', err);
	});
}
