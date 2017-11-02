'use strict';
const mongoose = require('mongoose');

const storySchema = new  mongoose.Schema({

    username: { type: String, required: true },

    info: {
        description: String,
        hashtag: [{type: String}],
        path: String,
    },
    likes: [{type: String}] // Array of username
    
}, { timestamps: true });


const Story = mongoose.model('stories', storySchema);

module.exports = Story;