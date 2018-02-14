// const path = require('path');
const router = require('express').Router();

// get the serverside version of the api
const API = require('../scripts/writtenAPI').Server;
// API Routes
router.route('/api/posts').get((req, res) => {
  API.Posts
    .all()
    .then(posts => {
      res.json(posts); // sending
    })
    .catch(err => res.error(err));
});

module.exports = router;
