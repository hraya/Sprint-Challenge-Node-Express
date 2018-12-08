const express = require('express');

const action = require('../data/helpers/actionModel.js');
const router = express.Router();


router.get('/', (req, res)=>{
    action.get()
    .then(actions =>{
        res.status(200).json(actions)
    }).catch(err =>{
        res.status(500).json({error:"The information could not be retrieved "})
    })
})

router.get('/:id', (req, res)=>{
    const { id } = req.params;
    action.get(id)
    .then(action =>{
        if(action){
            res.status(200).json(action)
        }else{
            res.status(404).json({message:"The user with the specified ID does not exist."})
        }
    }).catch(err =>{
        res.status(500).json({error:"the action information could not be retrieved"})
    })
})

router.post('/', (req, res)=>{
    const data = req.body;
    if(!data.project_id || !data.description || !data.notes){res.status(400).json({message:"Please provide project_id, description, and notes!"})}
    action.insert(data)
    .then(post =>{
        res.status(201).json(post)
    }).catch(err =>{
        res.status(500).json({error:"There was an error while saving the action to the database."})
    })
})

router.put('/:id', (req, res)=>{
    const { id } = req.params;
    const data = req.body;
    if(data.project_id && data.description && data.notes){
        action.update( id, data).then(count =>{
            if(count){
                action.get(id).then(action =>{
                    res.json(action)
                }).catch(err=>{
                    res.status(500).json({message:"Could not return the action"})
                })
            }else{
                res.status(404)
                .json({message:"The action with the specified id does not exist!"})
            }
        }).catch(err=>{
            res.status(500).json({message:"Error updating the action!"})
        })
    }else{
        res.status(400).json({message:"Missing valid project_id, description, and notes"})
    }
})

router.delete('/:id', (req, res)=>{
    const { id } = req.params;
    action.remove(id)
    .then(removed =>{
        if(removed){
            res.status(200).json({message:`${removed} action was removed!`})
        }else{
            res.status(500).json({message:"The action with the specified id does not exist!"})
        }
    }).catch(err=>{
        res.status(500).json({error:"The action could not be removed"})
    })
})

module.exports = router