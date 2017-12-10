'use strict';

const express = require('express');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const _ = require('lodash');
const moment = require('moment');
const mongoose = require('mongoose');
const Story = require('./models/Story');


const story = {
    clean : () => {
        // Each hour
        new CronJob('0 * * * *', () => {
            
            Story.find()
            .sort('-date')
            .then(stories => {
                const uploadsPath = __dirname+'/../uploads/';
                let storiesFilenames = [];
                let filenamesInFolder = [];

                stories.map(story => {
                    storiesFilenames.push(story.info.filename);
                });
                
                fs.readdirSync(uploadsPath)
                    .forEach(file => {
                    filenamesInFolder.push(file);
                });
                
                const filesToDelete = _.differenceWith(filenamesInFolder, storiesFilenames, _.isEqual);

                filesToDelete.forEach(filename => {
                    fs.unlink(uploadsPath+filename, err => {
                        if (err) { console.error('Error: ', err);}
                    });
                })
                console.log(`[CRON] Story.Clean : ${filesToDelete.length} files deleted `);
            });

        }, null, true, 'Europe/Paris');
    }
}


module.exports = {
    init: () => {
        return story.clean();
    }
}