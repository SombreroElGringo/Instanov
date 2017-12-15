const Story = require('../models/Story');
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const fs = require('fs');
const _ = require('lodash');


/** 
 *  Add a story in the database
 * @function createStory
 * @name /story
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.createStory = (req, res, next) => { 
    const username = res.locals.user.profile.username;

    if (!username) {
        return res.status(400)
            .json({
            code: 400,
            status: 'error',
            message: 'Username cannot be empty!'
        });
    }
    
    let str = req.body.hashtag ? req.body.hashtag : '';
    let hashtag = str.length > 0 ? str.match(/(#[^\s#]+)/g) : null;
    let path = req.protocol + '://'+ req.get('host') + '/story/embed/' + req.file.filename; 
    
    const story = new Story({
        username: username,
        info: {
            description: req.body.description,
            hashtag: hashtag,
            filename: req.file.filename,
            path: path,
        }
    });

    story.save().then(err => {
        return res.status(201)
            .json({
            code: 201,
            status: 'success',
            message: 'Story created!'
        });
    })
    .catch(err => {
        return next(err);
    });
}

/** 
 *  Get a story by id
 * @function getStoryById
 * @name /story/:id
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.getStoryById = (req, res, next) => {
    
    const id = req.params.id;

   	Story.findOne({_id: new ObjectId(id)}).then(story => {
		res.json({ 
			story
		});
	})
	.catch(err => {
		return res.status(404)
            .json({
            code: 404,
            status: 'error',
            message: 'Story not found!',
        });
	});
}

/** 
 *  Edit a story in the database
 * @function editStoryById
 * @name /story/:id
 * @method PUT
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.editStoryById = (req, res, next) => {
    
    const id = req.params.id;

    Story.findOne({_id: new ObjectId(id)}).then(story => {

        if(!story) {
            return res.status(404)
                .json({
                code: 404,
                status: 'error',
                message: 'Story not found!',
            });
        }

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
        
        if (!queryArgs) {
            let err = new Error('Bad request');
            err.status = 400;
            return Promise.reject(err);
        }
        
        Story.update({_id: new ObjectId(id)}, {$set: queryArgs}).exec().then(err => {
            res.json({
                code: 200,
                status: 'success',
                message: 'Story edited',
            });
        })
        .catch(err => {
            return next(err);
        });
    })
    .catch(err => {
		return res.status(404)
            .json({
            code: 404,
            status: 'error',
            message: 'Story not found!',
        });
	});
}

/** 
 *  Delete a story in the database
 * @function deleteStoryById
 * @name /story/:id
 * @method DELETE
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.deleteStoryById = (req, res, next) => {
    
    const id = req.params.id
    const uploadsPath = __dirname+'/../../uploads/';

    Story.findOne({_id: new ObjectId(id)}).then(story => {

        fs.unlink(uploadsPath+story.info.filename, err => {
            if (err) { console.error('Error: ', err);}
            console.log(`Story deleted ${story.info.filename}`);
        });
        
        Story.remove({_id: new ObjectId(id)}).then(err => {
            res.json({
                code: 200,
                status: 'success',
                message: 'Story deleted!',
            });
        })
        .catch(err => {
            return next(err);
        });
    })
    .catch(err => {
		return res.status(404)
            .json({
            code: 404,
            status: 'error',
            message: 'Story not found!',
        });
	});
}

/** 
 *  Like or unlike a story if already liked
 * @function likeStoryById
 * @name /story/:id/like/:username
 * @method PUT||POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.likeStoryById = (req, res, next) => {
    
    const id = req.params.id;
    const username = req.params.username;

    Story.findOne({_id: new ObjectId(id)})
        .then(story => {
           
            const action = _.indexOf(story.likes, username) === -1 ? {$push: {likes: username}} : {$pull: {likes: username}};
            const action_type = _.indexOf(story.likes, username) === -1 ? 'liked' : 'unliked';

            Story.update({_id: new ObjectId(id)}, action)
                .exec()
                .then(err => {
                res.json({
                    code: 200,
                    status: 'success',
                    message: `Story ${action_type}!`,
                });
            })
            .catch(err => {
                return next(err);
            });
    })
    .catch(err =>{
        return res.status(404)
            .json({
            code: 404,
            status: 'error',
            message: 'Story not found!',
        });
    });
}


/** 
 * Return all the storiesLiked
 * @function storiesLikedByUser
 * @name /story/liked/:username
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.storiesLikedByUser = (req, res, next) => {
    
    const username = req.params.username;

    Story.find({likes: username})
        .sort('-date')
        .then(stories => {

        res.json({ 
            stories
        });
    })
    .catch(err => {
        return res.status(404)
            .json({
            code: 404,
            status: 'error',
            message: 'Story not found!',
        });
    });
}