'use strict';

const controller = require('lib/wiring/controller');
const multer = require('app/middleware').multer;

const fileType = require('file-type');

const models = require('app/models');
const Upload = models.upload;
const User = models.user;

// require the upload module for use in uploading new files to AWS S3
const uploader = require('lib/aws-s3-upload');

// require the authenticate module for create, update & destroy actions
const authenticate = require('./concerns/authenticate');

// define global constants for limiting size and type of an upload
const SIZE_LIMIT = 10000000;
const ACCEPTED_FILE_TYPES = ['png', 'gif', 'jpg', 'jpeg'];

// Find all uploads in database and attach them to the response
const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({ uploads }))
    .catch(err => next(err));
};

// Find upload with matching id and attach it to the response
const show = (req, res, next) => {
  Upload.findById(req.params.id)
    .then(upload => upload ? res.json({ upload }) : next())
    .catch(err => next(err));
};

// Create new upload from request body, store in database, and send to client
const create = (req, res, next) => {
  // define variables that will be used in validation
  let ext = (fileType(req.file.buffer)).ext;
  let numUploads = req.currentUser.uploads.length;
  let typeAllowed = ACCEPTED_FILE_TYPES.indexOf(ext);
  // if the current user has fewer than 5 uploads, and the upload is of
  // an accepted size and type, proceed with the upload
  if (numUploads < 5 &&
      req.file.buffer.byteLength < SIZE_LIMIT  &&
      typeAllowed >= 0
      ) {
    uploader.awsUpload(req.file.buffer)
    .then((response) => {
      // return an object containing the necessary values for a new upload
      return {
        title: req.body.upload.title,
        description: req.body.upload.description,
        location: response.Location,
        key: response.key,
        _owner: req.currentUser._id,
      };
    })
    .then((upload) => {
      // create the new upload, passing in the object with the input values
      return Upload.create(upload);
    })
    .then((upload) => {
      // store a reference to the new upload in the user's uploads array
      let search = { _id: req.currentUser._id};
      User.findOne(search, (err, user)=>{
        user.uploads.push(upload._id);
        user.save();
      });
      // return the new upload so it can be rendered in the response
      return upload;
    })
    // attach the new upload to the response object
    .then(upload => res.json({ upload }))
    .catch(err => next(err));
  } else {
    // if the file failed one or more validations, forbid the request
    res.sendStatus(403);
  }
};

// Update an upload based on request body and save it to the database
const update = (req, res, next) => {
  // define search parameters based on upload ID and the current user's ID
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Upload.findOne(search)
    .then(upload => {
      // make sure a match was found
      if (!upload) {
        return next();
      }
      // if match is found, proceed with the update
      delete req.body._owner;  // disallow owner reassignment.
      // update the upload record with content from the request body
      return upload.update(req.body.upload)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

// Delete an upload and remove its owner's reference to it
const destroy = (req, res, next) => {
  // store a reference to the current user's ID
  let userId = req.currentUser._id;
  // search for an upload with matching _id and _owner properties
  let search = { _id: req.params.id, _owner: userId };
  Upload.findOne(search)
  .then((upload) => {
    // make sure a match was found
    if (!upload) {
      return next();
    }
    // find the upload's owner and remove their reference to this upload
    User.findById(userId)
    .then((user) => {
      // save a reference to the user's array of uploads
      let userUploads = user.uploads;
      // get the index of the upload to be removed
      let imageIndex = userUploads.indexOf(upload._id);
      // remove reference to the specified upload
      userUploads.splice(imageIndex, 1);
      // save the updated user document to the database
      user.save();
    });
    // return the upload so it can be used by the next handler
    return upload;
  })
  .then((upload) => {
    // remove the upload record from the database
    return upload.remove()
      // send a success response to the client
      .then(() => res.sendStatus(204));
  })
  .catch(err => next(err));
  };

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  // require token authentication to create, update, or destroy an upload
  { method: authenticate, except: ['index', 'show'] },
  // before create, call multer to add a body and a file to the request object
  { method: multer.single('upload[file]'), only: ['create'] },
], });
