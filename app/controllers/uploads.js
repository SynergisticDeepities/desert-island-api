'use strict';

const controller = require('lib/wiring/controller');
const multer = require('app/middleware').multer;

const fileType = require('file-type');

const models = require('app/models');
const Upload = models.upload;
const User = models.user;

const uploader = require('lib/aws-s3-upload');

const authenticate = require('./concerns/authenticate');

const SIZE_LIMIT = 10000000;
const ACCEPTED_FILE_TYPES = ['png', 'gif', 'jpg', 'jpeg'];

const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({ uploads }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Upload.findById(req.params.id)
    .then(upload => upload ? res.json({ upload }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let ext = (fileType(req.file.buffer)).ext;
  let numUploads = req.currentUser.uploads.length;
  let typeAllowed = ACCEPTED_FILE_TYPES.indexOf(ext);
  if (numUploads < 5 &&
      req.file.buffer.byteLength < SIZE_LIMIT  &&
      typeAllowed >= 0
      ) {
    uploader.awsUpload(req.file.buffer)
    .then((response) => {
      return {
        title: req.body.upload.title,
        description: req.body.upload.description,
        location: response.Location,
        key: response.key,
        _owner: req.currentUser._id,
      };
    })
    .then((upload) => {
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
    .then(upload => res.json({ upload }))
    .catch(err => next(err));
  } else {
    res.sendStatus(403);
  }
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Upload.findOne(search)
    .then(upload => {
      if (!upload) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return upload.update(req.body.upload)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let userId = req.currentUser._id;
  let search = { _id: req.params.id, _owner: userId };
  Upload.findOne(search)
  .then((upload) => {
    // make sure an upload was returned
    if (!upload) {
      return next();
    }
    // find the upload's owner and remove reference from their uploads
    User.findById(userId)
    .then((user) => {
      let userUploads = user.uploads;
      let imageIndex = userUploads.indexOf(upload._id);
      userUploads.splice(imageIndex, 1);
      user.save();
    });
    // return the upload so it can be used later in the promise chain
    return upload;
  })
  .then((upload) => {
    return upload.remove()
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
  { method: authenticate, except: ['index', 'show'] },
  { method: multer.single('upload[file]'), only: ['create'] },
], });
