const User = require('../models/User');
const Story = require('../models/Story');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res, next) => {

   	Promise.all([
		User.find(),
		Story.find()
	])
	.then((users, stories) => {
		res.json({
			users, 
			stories
		});
	})
	.catch(err => {
		console.error('error:', err);
	});
}
