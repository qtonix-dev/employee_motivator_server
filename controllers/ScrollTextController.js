require('dotenv-safe').config();
const {response} = require('express');
const ScrollText = require('../models/ScrollText');
const ScrollTextSpeed = require('../models/ScrollTextSpeed');

var mongoose = require('mongoose');

//SHOW ALL USERS
const index = (req,res) => {
  ScrollText.find().sort({order:1})
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


const get_text_speed = (req,res) => {
  ScrollTextSpeed.findById('63bbbdecd9eac3696c6807fc')
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}

const update_text_speed = (req,res) => {
  ScrollTextSpeed.findByIdAndUpdate('63bbbdecd9eac3696c6807fc',req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

//STORE DETAILS
const store = (req,res) => {

  var data=req.body;
  ScrollText.find({})
  .then(leng=>{

    data.order=leng.length;
    ScrollText.create(data)
    .then(response=>{
      res.json({
        response:true
      })
    })

  })



}


const editdata = (req,res) => {
  ScrollText.findByIdAndUpdate(req.params.id,req.body)
  .then(response=>{
    res.json({
      response:true,
    })
  })
}

const deletedata = (req,res) => {
  ScrollText.findByIdAndDelete(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const chnage_status = (req,res) => {
  ScrollText.findByIdAndUpdate(req.body.id,{$set:{status:req.body.status}})
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const update_sorting = (req,res) => {


  var datas=req.body;

  console.log(datas)
  datas.forEach((item, i) => {
    ScrollText.findByIdAndUpdate(item._id,{$set:{order:item.order}})
    .then(resp=>{
      console.log('done')
    })
  });



  res.json({
    response:true
  })
}


// **MODULE EXPORTS**
module.exports = {index,get_text_speed,update_text_speed,store,editdata,deletedata,chnage_status,update_sorting}
