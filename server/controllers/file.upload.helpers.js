const keys = JSON.parse(process.env.KEYS)
const adminSDK = JSON.parse(process.env.FIREBASE_ADMIN_SDK)
const path = require('path');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: keys.firebaseConfig.projectId,
    credentials: adminSDK,
});

exports.uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 6 * 1024 * 1024, // keep images size < 6 MB
    },
});

exports.bucket = storage.bucket(keys.firebaseConfig.storageBucket);