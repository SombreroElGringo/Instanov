const User = require('../models/User');
const Story = require('../models/Story');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res, next) => {
    
    
    Promise.all([
		User.find({'profile.username': req.params.username}),
		Story.find({username: req.params.username}).sort('-date')
	])
	.then(data => {
        const user = {...data[0][0]._doc};

		res.json({ 
			user: {
				_id: user._id,
                username: user.profile.username,
                name: user.profile.name || '',
                description: user.profile.description || '',
			},
			stories: data[1],
		});
	})
	.catch(err => {
		return res.status(404).json({
			code: 404,
			status: 'error',
			message: `Not found!\n ${err}`,
		});
	});
};
