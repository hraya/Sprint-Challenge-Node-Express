const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const projectRouter = require('./routers/project_router.js');
const actionRouter = require('./routers/action_router.js');

const server = express();
const PORT = 5050;

server.use(
    express.json(),
    cors(),
    helmet(),
    morgan('tiny')
);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}!`)
})