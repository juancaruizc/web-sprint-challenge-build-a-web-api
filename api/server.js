const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file

const morgan = require('morgan');
const helmet = require('helmet');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');
// const middleware = require('./middleware/middleware');

server.use(helmet());
server.use(express.json(), morgan('dev'));

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send('Hello world from Mars :)');
});

module.exports = server;
