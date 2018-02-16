// const path = require('path');
const router = require('express').Router();

// get the serverside version of the api
const API = require('../scripts/writtenAPI').default;
// API Routes
router.route('/posts').get((req, res) => {
  API(process.env)
    .Server.Posts.all()
    .then(posts => {
      res.json(posts.data); // sending
    })
    .catch(() => res.status(400).send('Bad Request'));
});

router.route('/posts/:slug').get((req, res) => {
  API(process.env)
    .Server.Posts.find(req.params.slug)
    .then(posts => {
      res.json(posts.data);
    })
    .catch(() => res.status(400).send('Bad Request'));
});

router.use('/api/written', router);

module.exports = router;
