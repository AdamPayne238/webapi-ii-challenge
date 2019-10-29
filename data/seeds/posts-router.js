const router = require('express').Router();

const Posts = require('../db.js');

  router.get('/', (req, res) => {

    Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
  });



  

  module.exports = router;