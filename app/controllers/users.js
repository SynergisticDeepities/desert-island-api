'use strict';

const debug = require('debug')('desert-island-api:users');

const controller = require('lib/wiring/controller');
const models = require('app/models');
const User = models.user;

const crypto = require('crypto');

const authenticate = require('./concerns/authenticate');

const HttpError = require('lib/wiring/http-error');

const MessageVerifier = require('lib/wiring/message-verifier');

const encodeToken = (token) => {
  const mv = new MessageVerifier('secure-token', process.env.SECRET_KEY);
  return mv.generate(token);
};

const getToken = () =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, data) =>
      err ? reject(err) : resolve(data.toString('base64'))
    )
  );

const userFilter = { passwordDigest: 0, token: 0 };

// Find all users in the database and attach then to the response
const index = (req, res, next) => {
  User.find({}, userFilter)
    .then(users => res.json({ users }))
    .catch(err => next(err));
};

// Find user with matching ID, populate its uploads, and send user to client
const show = (req, res, next) => {
  // populate the user's uploads array, replacing references to
  // the user's uploads with the upload records theselves
  User.findById(req.params.id, userFilter)
    .populate('uploads')
    .exec(function (err, user) {
      if (err) {
        next(err);
      } else {
        // if successful, return the user to it can be attached to the response
        return user;
      }
    })
    .then(user => user ? res.json({ user }) : next())
    .catch(err => next(err));
};

const makeErrorHandler = (res, next) =>
  error =>
    error && error.name && error.name === 'ValidationError' ?
      res.status(400).json({ error }) :
    next(error);

// create a new user record with userName, email, and password from request body
const signup = (req, res, next) => {
  let credentials = req.body.credentials;
  let user = { userName: credentials.userName, email: credentials.email, password: credentials.password };
  getToken().then(token =>
    user.token = token
  ).then(() =>
    new User(user).save()
  ).then(newUser => {
    let user = newUser.toObject();
    delete user.token;
    delete user.passwordDigest;
    res.json({ user });
  }).catch(makeErrorHandler(res, next));
};

// Sign a user in
const signin = (req, res, next) => {
  let credentials = req.body.credentials;
  // use email as search parameter, since unique email was required for signup
  let search = { email: credentials.email };
  User.findOne(search)
  // populate the user's uploads array, replacing references to
  // the user's uploads with the upload records theselves
  .populate('uploads')
  .exec(function (err, user) {
    if (err) {
      next(err);
    } else {
      // if successful, return the user to it can be used in the next method
      return user;
    }
  })
  .then(user =>
    user ? user.comparePassword(credentials.password) :
          Promise.reject(new HttpError(404))
  ).then(user =>
    getToken().then(token => {
      user.token = token;
      return user.save();
    })
  ).then(user => {
    user = user.toObject();
    delete user.passwordDigest;
    user.token = encodeToken(user.token);
    res.json({ user });
  }).catch(makeErrorHandler(res, next));
};

// Sign a user out
const signout = (req, res, next) => {
  getToken().then(token =>
    User.findOneAndUpdate({
      _id: req.params.id,
      token: req.currentUser.token,
    }, {
      token,
    })
  ).then((user) =>
    user ? res.sendStatus(200) : next()
  ).catch(next);
};

// Change a user's password
const changepw = (req, res, next) => {
  debug('Changing password');
  User.findOne({
    _id: req.params.id,
    token: req.currentUser.token,
  }).then(user =>
    user ? user.comparePassword(req.body.passwords.old) :
      Promise.reject(new HttpError(404))
  ).then(user => {
    user.password = req.body.passwords.new;
    return user.save();
  }).then((/* user */) =>
    res.sendStatus(200)
  ).catch(makeErrorHandler(res, next));
};

module.exports = controller({
  index,
  show,
  signup,
  signin,
  signout,
  changepw,
}, { before: [
  // require token authentication before all actions except signup and signin
  { method: authenticate, except: ['signup', 'signin'] },
], });
