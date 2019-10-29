const router = require('express').Router();

const Posts = require('../db.js');

  //WORKING
  // | GET | /api/posts | Returns an array of all the post objects contained in the database. 
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

  //WORKING
  // | GET | /api/posts/:id | Returns the post object with the specified id.  
  router.get('/:id', (req, res) => {

    Posts.findById(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts with that ID ',
      });
    });
  });

  //WORKING
  // | GET | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id. 
  router.get('/:id/comments', (req, res) => {

    Posts.findPostComments(req.params.id)
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts with that ID ',
      });
    });
  });

  //WORKING
  // | POST | /api/posts | Creates a post using the information sent inside the `request body`.
  router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if( !title || !contents ){
        res.status(500).json({ error: "Post Requires Title and Contents"});
    } else {
        Posts.insert({ title, contents})
        .then(({ id }) => {
            Posts.findById(id)
            .then(post => {
                res.status(200).json(post);
            })
            .catch(err => {
                res.status(500).json({ err: "post info not found"});
            });
        })
        .catch(err => {
            res.status(500).json({ err: "error updating post"})
        })
    }
  });
                            
  //NOT working
  // | POST | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.  
  router.post('/:id/comments', (req, res) => {
    const { text } = req.body;
    if( !text ){
        res.status(500).json({ error: "Comments Requires Text"});
    } else {
        Posts.insertComment({ text })
        .then(({ id }) => {
            Posts.findPostComments(id)
            .then(comment => {
                res.status(200).json(comment);
            })
            .catch(err => {
                res.status(500).json({ err: "comment info not found"});
            });
        })
        .catch(err => {
            res.status(500).json({ err: "error adding comment"})
        })
    }
  });

  // | DELETE | /api/posts/:id | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |

  // | PUT | /api/posts/:id | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |


  module.exports = router;