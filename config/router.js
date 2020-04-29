const router = require('express').Router();
const scores = require('../controllers/scores');

router.route('/scores')
  .get(scores.index)
  .post(scores.create);

module.exports = router;
