require('dotenv-safe').config();
const {response} = require('express');
const Project = require('../models/Project');
const ProjectWebsiteDetails = require('../models/ProjectWebsiteDetails');
const ProjectSeoKeywords = require('../models/ProjectSeoKeywords');




var mongoose = require('mongoose');
const { uuid } = require('uuidv4');


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

  var datas=req.body;
  datas.id=uuid();
  datas.project=uuid();

  Project.create(datas)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


//VIEW
const view = (req,res) => {

 // Project.findById(req.params.id, (err,doc) => {
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

   Project.aggregate([
       {$match: { "_id": mongoose.Types.ObjectId(req.params.id) }},
       {$lookup:{
         from:'employees',
         localField:'reporting_manager',
         foreignField:'_id',
         as:'reporting_manager_info',
       }},
       {$lookup:{
         from:'employees',
         localField:'team_members',
         foreignField:'_id',
         as:'team_members_info',
       }},
       // {$lookup:{
       //     from:'teams',
       //     localField:'_id',
       //     foreignField:'department_id',
       //     as:'teams',
       //     pipeline:[
       //       {$lookup:{
       //         from:'employees',
       //         localField:'team_head',
       //         foreignField:'_id',
       //         as:'team_head'
       //       }},
       //       {$lookup:{
       //         from:'employees',
       //         localField:'team_members',
       //         foreignField:'_id',
       //         as:'team_members'
       //       }}
       //     ]
       // }}
     ]).exec((err, doc) => {
       res.json({
         response:true,
         data:doc[0]
       })
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


const update_project_status = (req,res) => {
  Project.findByIdAndUpdate(req.body.id,{$set:{status:req.body.status}})
  .then(response=>{
    res.json({
      response:true
    })
  })
}


const add_website_details = (req,res) => {

  ProjectWebsiteDetails.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })


}


const get_website_details = (req,res) => {
  ProjectWebsiteDetails.find({project_id:req.params.id})
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  })
}


const update_website_details = (req,res) => {
  ProjectWebsiteDetails.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true,
    })
  })
}

const delete_website_details = (req,res) => {
  ProjectWebsiteDetails.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true,
    })
  })
}


const add_seo_keywords = (req,res) => {

  req.body.keywords.reverse().forEach((item, i) => {
    var tmpData={
      project_id:req.body.project_id,
      name:item
    }
    ProjectSeoKeywords.create(tmpData)
    .then(response=>{
      if(req.body.keywords.length===i+1){
        res.json({
          response:true
        })
      }
    })

  });

}



const get_seo_keywords = (req,res) => {
  ProjectSeoKeywords.find({project_id:req.params.id})
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  })
}


const delete_seo_keywords = (req,res) => {
  ProjectSeoKeywords.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


const update_seo_keywords = (req,res) => {



  ProjectSeoKeywords.findByIdAndUpdate(req.body.id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


// **MODULE EXPORTS**
module.exports = {index,store,view,update,deleteuser,update_project_status,add_website_details,get_website_details,update_website_details,delete_website_details,add_seo_keywords,get_seo_keywords,delete_seo_keywords,update_seo_keywords}
