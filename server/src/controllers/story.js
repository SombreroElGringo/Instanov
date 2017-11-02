const Story = require('../models/Story');
const path = require('path');

/**
 * GET /story
 * Form to add a story
 */
exports.index = (req, res, next) => {
    upload.single('myFile');
	res.json({ 
		title: 'Add a new Story!'
	});
}

/**
 * POST /story
 * Add the story in the database
 */
exports.createStory = (req, res, next) => { 
    console.log(req.file.filename); // TODO: Implemente the file save
    req.assert('username', 'Username cannot be empty').notEmpty();
    const errors = req.validationErrors();
    
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/story');
    }
    
    let str = req.body.hashtag;
    let hashtag = str.match(/#\S+/g); 

    let story = new Story({
        username: req.body.username,
        info: {
            description: req.body.description,
            hashtag: hashtag,
            path: path,
        }
    });
}


/**
 * GET /story/:id
 * Get a story by id
 */
exports.getStoryById = (req, res, next) => {
    
    let id = req.params.id

   	Story.find({_id: id}).then(story => {
		res.json({ 
			story
		});
	})
	.catch(err => {
		console.error('error:', err);
	});
}

