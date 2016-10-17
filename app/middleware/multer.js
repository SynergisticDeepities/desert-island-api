'use strict';

const multer = require('multer');
const storage = multer.memoryStorage(); // don't do this in production

module.exports = multer({ storage });
