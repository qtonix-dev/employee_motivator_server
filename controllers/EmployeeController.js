require('dotenv-safe').config();
const {response} = require('express');
const Employee = require('../models/Employee');

//SHOW ALL USERS
const index = (req,res) => {
  Employee.find().populate('department_id',['_id', 'name']).populate('designation_id',['name']).populate('reporting_to',['name']).populate('team',['name']).sort({createdAt:-1})
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
  Employee.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      Employee.create(req.body)
      .then(response=>{
        res.json({
          response:true
        })
      })
    }else{
      res.json({
        response:false,
        message:'Email already exist.'
      })
    }
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


//EMPLOYEE NAME SEARCH
const employeenamesearch = (req,res) => {


  Employee.find({'name' : new RegExp(req.params.name, 'i')}, function(err, docs){
    res.json({
      response:true,
      datas:docs
    })
  });


}



// **MODULE EXPORTS**
module.exports = {index,store,view,update,deleteuser,employeenamesearch}
