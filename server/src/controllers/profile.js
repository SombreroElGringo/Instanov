const User = require('../models/User');
const Story = require('../models/Story');

/** 
 *  Get all the stories of the current user
 * @function index
 * @name /profiles/:username
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.index = (req, res, next) => {
	
	const username = req.params.username;

    Promise.all([
		User.find({'profile.username': username}),
		Story.find({username: username}).sort('-date')
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
