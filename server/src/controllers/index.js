const User = require('../models/User');
const Story = require('../models/Story');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res, next) => {

   	Promise.all([
		User.find({}, '_id profile.username'),
		Story.find().sort('-date')
	])
	.then(data => {
		res.json({ 
			user: {
				_id: res.locals.user._id,
				username: res.locals.user.profile.username,
			},
			users: data[0],
			stories: data[1],
		});
	})
	.catch(err => {
		return res.status(404).json({
			code: 404,
			status: 'error',
			message: `Bad Request!\n ${err}`,
		});
	});
};
