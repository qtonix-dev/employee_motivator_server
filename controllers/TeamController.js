require('dotenv-safe').config();
const {response} = require('express');
const Team = require('../models/Team');
const Employee = require('../models/Employee');
var mongoose = require('mongoose');

//SHOW ALL USERS
const index = (req,res) => {
  // Team.find().sort({createdAt:-1})
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     datas:response
  //   })
  // })
  // .catch({
  //   response:false
  // })


  Team.aggregate([
    {$lookup:{
      from:'employees',
      localField:'_id',
      foreignField:'team',
      as:'employees'
    }}
  ]).exec((err, response) => {
      res.json({
        response:true,
        datas:response
      })
    })

}

//STORE Team DETAILS
const store = (req,res) => {
  Team.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


//VIEW
const view = (req,res) => {


  Team.findById(req.params.id).populate('team_head').populate('team_members').populate('department_id')
  .then(data=>{
    res.json({
      response:true,
      data:data
    })
  })


  // Team.aggregate([
  //     {$match: { "_id": mongoose.Types.ObjectId(req.params.id) }},
  //     {$lookup:{
  //         from:'employees',
  //         localField:'_id',
  //         foreignField:'team',
  //         as:'employee_list'
  //     }}
  // ]).exec((err, doc) => {
  //   // console.log(err)
  //   //  console.log(response)
  //   res.json({
  //     response:true,
  //     data:doc
  //   })
  // })




 // Team.findById(req.params.id, (err,doc) => {
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


 // Team.aggregate([
 //   {$match:{'_id':req.params.id}},
 //   // {$lookup:{
 //   //   from:'employees',
 //   //   localField:req.params.id,
 //   //   foreignField:'team',
 //   //   as:'employees'
 //   // }}
 // ]).exec((err, response) => {
 //    console.log(response)
 //   })





}

//UPDATE
const update = (req,res) => {

  Team.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then(response=>{
    Team.findById(req.params.id).populate('team_head')
    .then(data=>{
      res.json({
        response:true,
        data:data
      })
    })
  })


  // Team.findByIdAndUpdate(req.params.id, {$set: req.body})
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     data:response
  //   })
  // })
}


const deleteuser = (req,res) => {
  //set NULL in team field in employee section
  Employee.find({department_id:req.params.id}).distinct('_id')
  .then(idsarray=>{
    console.log(idsarray.length>0)
    if(idsarray.length>0){
      Employee.update({_id: {$in: idsarray}},{department_id: null},{multi: true})
      .then(response=>{
        console.log('Successfully updated')
        // console.log(response)
      })
    }
  })


  Team.findByIdAndRemove(req.params.id, (err,doc) => {
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



//Update Team Leader
const update_team_members = (req,res) => {


    // console.log(req.body)

    Team.findByIdAndUpdate(req.body._id,{$set:{team_members:req.body.team_members}})
    .then(response=>{
      res.json({
        response:true
      })
    })

}



//Remove Team Member
const remove_team_member = (req,res) => {

  Team.update({ _id: req.body.team_id }, { $pull: { team_members: { $in: req.body.member_id } }}, { safe: true, multi:true }, function(err, obj) {

    if(err){
      console.log(err)
      res.json({
        response:false,
      })
    }else{
      res.json({
        response:true
      })
    }

  });


}


// **MODULE EXPORTS**
module.exports = {index,store,view,update,deleteuser,update_team_members,remove_team_member}
