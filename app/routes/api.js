// const path = require('path');
const router = require('express').Router();

// get the serverside version of the api
const API = require('../scripts/writtenAPI').default;
// API Routes
router.route('/api/posts').get((req, res) => {
  console.log(API);
  API.Server.Posts
    .all()
    .then(posts => {
      console.log(posts);
      res.json(posts.data); // sending
    })
    .catch(() => res.status(400).send('Bad Request'));
});

module.exports = router;
