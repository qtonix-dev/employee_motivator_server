require('dotenv-safe').config();
const {response} = require('express');
const Designation = require('../models/Designation');

//SHOW ALL USERS
const index = (req,res) => {
  Designation.find().populate('teamleader').sort({createdAt:-1})
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  })
  .catch({
    response:false
  })
}

//STORE Designation DETAILS
const store = (req,res) => {
  Designation.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


//VIEW
const view = (req,res) => {
 Designation.findById(req.params.id, (err,doc) => {
   if(!err){
     res.json({
       response:true,
       data:doc
     })
   }else{
     res.json({
       response:false,
     })
   }
 })
}

//UPDATE
const update = (req,res) => {
  Designation.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}


const deleteuser = (req,res) => {
  Designation.findByIdAndRemove(req.params.id, (err,doc) => {
    if(!err){
      res.json({
        response:true
      })
    }else{
      res.json({
        response:false
      })
    }
  })
}


// **MODULE EXPORTS**
module.exports = {index,store,view,update,deleteuser}
