require('dotenv-safe').config();
const {response} = require('express');
const Project = require('../models/Project');
var mongoose = require('mongoose');

//SHOW ALL USERS
const index = (req,res) => {
  Project.find().sort({createdAt:-1})
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

//STORE Team DETAILS
const store = (req,res) => {
  Project.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


//VIEW
const view = (req,res) => {


 Project.findById(req.params.id, (err,doc) => {
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
  Project.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}


const deleteuser = (req,res) => {

  Project.findByIdAndRemove(req.params.id, (err,doc) => {
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
