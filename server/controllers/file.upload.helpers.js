const keys = JSON.parse(process.env.KEYS)
const path = require('path');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: keys.firebaseConfig.projectId,
    keyFilename: process.env.FIREBASE_ADMIN_SDK,
});
exports.bucket = storage.bucket(keys.firebaseConfig.storageBucket);

exports.uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
});
