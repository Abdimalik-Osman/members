const express = require('express');
const members = require('../../Members');
const uuid = require('uuid');
const router = express.Router();

// get all members 
router.get('/',(req,res)=>{
    res.json(members);
})

// get single member
router.get('/:id',(req,res)=>{
    const found =  members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg: `not found a member with id of ${req.params.id}`})
    }
})

// create member 
router.post('/',(req,res)=>{
    const newMember = {
        id: members.length + 1,
        name: req.body.name,
        status: req.body.status
    }

    if(!newMember.name){
        res.status(400).json({msg:'please enter a name..'});
    }
    members.push(newMember);
    res.json(members);
    // res.redirect('/')
})


// update member
router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updatedMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.status = updatedMember.status ? updatedMember.status : member.status;

                res.json({msg:'Member is Updated', member})
            }
        })
    }
    else{
        res.status(400).json({msg:'no member with the id of '+req.params.id});
    }
})

// Delete Member
router.delete('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({msg:'member is deleted..',members:members.filter(member => member.id !== parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg:'no member with the id of '+req.params.id})
    }
})
module.exports = router;