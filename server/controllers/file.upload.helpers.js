const keys = require('../config/keys')
const path = require('path');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: keys.firebaseConfig.projectId,
    keyFilename: path.join(__dirname, '../config/social-network-storage-firebase-adminsdk-pdrtl-9a449ec5e3.json'),
});
exports.bucket = storage.bucket(keys.firebaseConfig.storageBucket);

exports.uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
});
