const express = require('express');

//Add posts router
const postsRouter = require('./data/seeds/posts-router');
//Add comments router
const commentsRouter = require('./data/seeds/comments-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
});

// Use Posts Router
server.use('/api/posts', postsRouter);
// Use Comments Router
server.use('/api/comments', commentsRouter);

server.listen(9000, () => {
});