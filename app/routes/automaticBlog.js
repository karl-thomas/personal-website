// const path = require('path');
const router = require('express').Router();

// get the serverside version of the api
const API = require('../scripts/automaticAPI').default;
// API Routes
router.route('/posts').get((req, res) => {
  API(process.env)
    .Server.Posts.all()
    .then(posts => {
      res.json(posts.data); // sending
    })
    .catch(() => res.status(400).send('Bad Request'));
});

router.route('/posts/:id').get((req, res) => {
  API(process.env)
    .Server.Posts.find(req.params.id)
    .then(posts => {
      res.json(posts.data);
    })
    .catch(() => res.status(400).send('Bad Request'));
});

router.use('/api/auto', router);

module.exports = router;
