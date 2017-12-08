const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

/** 
 * Get the storage
 * @function getStorage
 * @return {Data} storage - Storage
 */
exports.getStorage = () => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            let filename = crypto.createHmac('sha256', file.fieldname + '-' + Date.now())
                                .update(process.env.HASH_KEY)
                                .digest('hex');
            cb(null, filename+ this.getExtension(file));
        }
    });
    return storage;
}

/** 
 * Get the extension of a file
 * @function getExtension
 * @param {Data} file - File
 * @return {string} result - File's extension
 */
exports.getExtension = (file) => {
    let result = '';
    if (file.mimetype === 'image/jpeg') result = '.jpg';
    if (file.mimetype === 'image/png') result = '.png';
    return result;
}