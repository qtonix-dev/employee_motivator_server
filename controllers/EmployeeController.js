require('dotenv-safe').config();
const {response} = require('express');
const Employee = require('../models/Employee');

//SHOW ALL USERS
const index = (req,res) => {
  Employee.find().sort({createdAt:-1})
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

//STORE Employee DETAILS
const store = (req,res) => {
  Employee.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


//VIEW
const view = (req,res) => {
 Employee.findById(req.params.id, (err,doc) => {
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
  Employee.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}


const deleteuser = (req,res) => {
  Employee.findByIdAndRemove(req.params.id, (err,doc) => {
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
