const express = require('express');
const cors = require('cors');

const projectRouter = require('./routers/project_router.js');
const actionRouter = require('./routers/action_router.js');

const server = express();
const PORT = 5050;

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req,res)=>{
    res.status(200).json({message:"we are live"})
})


server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}!`)
})