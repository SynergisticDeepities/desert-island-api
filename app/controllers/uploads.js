'use strict';

const controller = require('lib/wiring/controller');
const multer = require('app/middleware').multer;

const models = require('app/models');
const Upload = models.upload;

const uploader = require('lib/aws-s3-upload');

// const authenticate = require('./concerns/authenticate');

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
  uploader.awsUpload(req.file.buffer)
  .then((response) => {
    return {
      title: req.body.upload.title,
      description: req.body.upload.description,
      location: response.Location,
    };
  })
  .then((upload) => {
    return Upload.create(upload);
  })
  .then(upload => res.json({ upload }))
  .catch(err => next(err));
};

const update = (req, res, next) => {
  let id = req.params.id;
  let update = {
                title: req.body.upload.title,
                description: req.body.upload.description,
               };
  let options = {
                  new: true,
                  runValidators: false,
                };

  Upload.findByIdAndUpdate(id, update, options)
  .then(upload => res.json({ upload }))
  .catch(err => next(err))
  ;
};


module.exports = controller({
  index,
  show,
  create,
  update,
}, { before: [
  // { method: authenticate, except: ['index', 'show'] },
  { method: multer.single('upload[file]'), only: ['create'] },
], });
