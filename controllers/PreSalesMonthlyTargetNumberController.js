require('dotenv-safe').config();
const {response} = require('express');
const PreSalesMonthlyTargetNumber = require('../models/PreSalesMonthlyTargetNumber');

//SHOW ALL USERS
const index = (req,res) => {
  PreSalesMonthlyTargetNumber.find().populate('employee_id').sort({createdAt:-1})
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

//STORE PreSalesMonthlyTargetNumber DETAILS
const store = (req,res) => {
  PreSalesMonthlyTargetNumber.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


//VIEW
const view = (req,res) => {
 PreSalesMonthlyTargetNumber.findById(req.params.id, (err,doc) => {
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
  PreSalesMonthlyTargetNumber.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}


const deleteuser = (req,res) => {
  PreSalesMonthlyTargetNumber.findByIdAndRemove(req.params.id, (err,doc) => {
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
