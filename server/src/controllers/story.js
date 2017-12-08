const Story = require('../models/Story');
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const fs = require('fs');

/**
 * GET /story
 * Form to add a story
 */
exports.index = (req, res, next) => {
	res.json({
		title: 'Add a new Story!'
	});
};

/**
 * POST /story
 * Add the story in the database
 */
exports.createStory = (req, res, next) => { 

    req.assert('username', 'Username cannot be empty').notEmpty();
    const errors = req.validationErrors();
    
    if (errors) {
        return res.json({
            code: 400,
            status: 'error',
            message: 'username cannot be empty!'
        });
    }
    
    let str = req.body.hashtag ? req.body.hashtag : '';
    let hashtag = str.length > 0 ? str.match(/(#[^\s#]+)/g) : null;
    let path = req.protocol + '://'+ req.get('host') + '/story/embed/' + req.file.filename; 
    
    let story = new Story({
        username: req.body.username,
        info: {
            description: req.body.description,
            hashtag: hashtag,
            filename: req.file.filename,
            path: path,
        }
    });

    story.save().then(err => {
        res.status(201).json({
            code: 201,
            status: 'success',
            message: 'Story created!'
        });
    })
    .catch(err => {
        return next(err);
    });
};

/**
 * GET /story/:id
 * Get a story by id
 */
exports.getStoryById = (req, res, next) => {
    
    let id = req.params.id;

   	Story.findOne({_id: new ObjectId(id)}).then(story => {
		res.json({ 
			story
		});
	})
	.catch(err => {
		return next(err);
	});
};

/**
 * PUT /story/:id
 * Edit a story by id from the database
 */
exports.editStoryById = (req, res, next) => {
    
    let id = req.params.id;
    Story.findOne({_id: new ObjectId(id)}).then(story => {

        const params = req.body;
        const POSSIBLE_KEYS = ['description', 'hashtag'];
        
        let queryArgs = {
            info: {
            }
        };
        
        for (key in params) {
            if (~POSSIBLE_KEYS.indexOf(key)) {
                if (key === 'hashtag') {
                    let str = params[key] ? params[key] : '';
                    let hashtag = str.length > 0 ? str.match(/(#[^\s#]+)/g) : null;
                    queryArgs.info.hashtag = hashtag;
                } else {
                    queryArgs.info[key] = params[key];
                }
            }
        }
        console;
        
        if (!queryArgs) {
            let err = new Error('Bad request');
            err.status = 400;
            return Promise.reject(err);
        }
        
        Story.update({_id: new ObjectId(id)}, {$set: queryArgs}).exec().then(err => {
            res.json({
                code: 200,
                status: 'success',
                message: 'Story edited'
            });
        })
        .catch(err => {
            return next(err);
        });
    })
    .catch(err => {
		return next(err);
	});
};

/**
 * DELETE /story/:id
 * Delete a story by id from the database
 */
exports.deleteStoryById = (req, res, next) => {
    
    let id = req.params.id;
    Story.findOne({_id: new ObjectId(id)}).then(story => {

        fs.unlink('./uploads/'+story.info.filename, err => {
            if (err) { console.error('Error: ', err);}
            console.log(`Story deleted ${story.info.filename}`);
        });
        
        Story.remove({_id: new ObjectId(id)}).then(err => {
            res.json({
                code: 200,
                status: 'success',
                message: 'Story deleted!'
            });
        })
        .catch(err => {
            return next(err);
        });
    })
    .catch(err => {
		return next(err);
	});
};