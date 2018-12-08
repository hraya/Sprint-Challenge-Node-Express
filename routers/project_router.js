const express = require('express');

const project = require('../data/helpers/projectModel.js');
const router = express.Router();

router.get('/', (req, res)=>{
    project.get()
    .then(projects =>{
        res.status(200).json(projects)
    }).catch(err =>{
        res.status(500).json({error:"The information could not be retrieved "})
    })
})

router.get('/:id', (req, res)=>{
    const { id } = req.params;
    project.get(id)
    .then(project =>{
        if(project){
            res.status(200).json(project)
        }else{
            res.status(404).json({message:"The user with the specified ID does not exist."})
        }
    }).catch(err =>{
        res.status(500).json({error:"the project information could not be retrieved"})
    })
})

router.get('/:id/posts', (req, res)=>{
    const { id } = req.params;
    project.getProjectActions(id)
    .then(projects=>{
        if(projects.length > 0){
            res.status(201).json(projects)
        }else{
            res.status(404).json({message:"the project with specified id does not exist"})
        }
    }).catch(err=>{
        res.status(500).json({error:"Could not retrieve the posts!"})
    })
})

router.post('/', (req, res)=>{
    const data = req.body;
    if(!data.name || !data.description){res.status(400).json({message:"Please provide name and description!"})}
    project.insert(data)
    .then(post =>{
        res.status(201).json(post)
    }).catch(err =>{
        res.status(500).json({error:"There was an error while saving the project to the database."})
    })
})

router.put('/:id', (req, res)=>{
    const { id } = req.params;
    const data = req.body;
    if(data.name && data.description){
        project.update( id, data).then(count =>{
            if(count){
                project.get(id).then(project =>{
                    res.json(project)
                }).catch(err=>{
                    res.status(500).json({message:"Could not return the project"})
                })
            }else{
                res.status(404)
                .json({message:"The project with the specified id does not exist!"})
            }
        }).catch(err=>{
            res.status(500).json({message:"Error updating the project!"})
        })
    }else{
        res.status(400).json({message:"Missing valid name and description"})
    }
})

router.delete('/:id', (req, res)=>{
    const { id } = req.params;
    project.remove(id)
    .then(removed =>{
        if(removed){
            res.status(200).json({message:`${removed} project was removed!`})
        }else{
            res.status(500).json({message:"The project with the specified id does not exist!"})
        }
    }).catch(err=>{
        res.status(500).json({error:"The project could not be removed"})
    })
})

module.exports = router