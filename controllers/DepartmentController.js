require('dotenv-safe').config();
const {response} = require('express');
const Department = require('../models/Department');
const Employee = require('../models/Employee');
var mongoose = require('mongoose');


//SHOW ALL USERS
const index = (req,res) => {
  // Department.find().populate('teamleader').sort({createdAt:-1})
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     datas:response
  //   })
  // })
  // .catch({
  //   response:false
  // })


  Department.aggregate([
    {$lookup:{
      from:'employees',
      localField:'_id',
      foreignField:'department_id',
      as:'employees'
    }}
  ]).exec((err, response) => {
      res.json({
        response:true,
        datas:response
      })
    })


}

//STORE Department DETAILS
const store = (req,res) => {
  Department.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


//VIEW
const view = (req,res) => {

  Department.findById(req.params.id).populate('department_head')
  .then(data=>{
    res.json({
      response:true,
      data:data
    })
  })

 // Department.findById(req.params.id, (err,doc) => {
 //   if(!err){
 //     res.json({
 //       response:true,
 //       data:doc
 //     })
 //   }else{
 //     res.json({
 //       response:false,
 //     })
 //   }
 // })

 // Department.aggregate([
 //     {$match: { "_id": mongoose.Types.ObjectId(req.params.id) }},
 //     // {$lookup:{
 //     //     from:'employees',
 //     //     localField:'_id',
 //     //     foreignField:'department_id',
 //     //     as:'employee_list'
 //     // }},
 //     {$lookup:{
 //         from:'employees',
 //         localField:'_id',
 //         foreignField:'department_head',
 //         as:'department_head'
 //     }}
 // ]).exec((err, doc) => {
 //   // console.log(err)
 //   //  console.log(response)
 //   res.json({
 //     response:true,
 //     data:doc[0]
 //   })
 // })


}

//UPDATE
const update = (req,res) => {

  Department.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then(response=>{
    Department.findById(req.params.id).populate('department_head')
    .then(data=>{
      res.json({
        response:true,
        data:data
      })
    })
  })
}


const deleteuser = (req,res) => {
  //set NULL in departmane field in employee section
  Employee.find({team:req.params.id}).distinct('_id')
  .then(idsarray=>{
    console.log(idsarray.length>0)
    if(idsarray.length>0){
      Employee.update({_id: {$in: idsarray}},{team: null},{multi: true})
      .then(response=>{
        console.log('Successfully updated')
        // console.log(response)
      })
    }
  })

  //remove department
  Department.findByIdAndRemove(req.params.id, (err,doc) => {
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
