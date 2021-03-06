const Score = require('../models/Score');

// index route

function index(req, res) {
  Score
    .find()
    .then((scores) => res.status(200).json(scores))
    .catch((err) => console.log(err));
}

// create route

function create(req, res, next) {
  // req.body.user = req.currentUser
  Score
    .create(req.body)
    .then((score) => res.status(201).json(score))
    .catch(next);
}

module.exports = {
  index,
  create,
};
