const router = require('express').Router();

const Comments = require('../db.js');

  router.get('/', (req, res) => {

    Comments.find(req.query)
    .then(posts => {
      res.status(200).json(Comments);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the comments',
      });
    });
  });

  module.exports = router;