require('dotenv-safe').config();
const {response} = require('express');
var moment = require('moment');
var mongoose = require('mongoose');
const WebPreview = require('../models/WebPreview');


//SHOW ALL USERS
const index = (req,res) => {

  WebPreview.find().sort({order:1})
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  })
  .catch({
    response:false
  })

  // var datas=[
  //   {
  //     section_name:'welcome',
  //     name:'Welcome',
  //     status:true,
  //     order:1
  //   },
  //   {
  //     section_name:'newemployee',
  //     name:'New Employee',
  //     status:true,
  //     order:2
  //   },
  //   {
  //     section_name:'specialannouncement',
  //     name:'Special Announcement',
  //     status:true,
  //     order:3
  //   },
  //   {
  //     section_name:'holidaylist',
  //     name:'Holiday List',
  //     status:true,
  //     order:4
  //   },
  //   {
  //     section_name:'newemployee',
  //     name:'New Employee',
  //     status:true,
  //     order:5
  //   },
  //   {
  //     section_name:'birthday',
  //     name:'Birthday List',
  //     status:true,
  //     order:6
  //   },
  //   {
  //     section_name:'employeeofmonth',
  //     name:'Employee of Month',
  //     status:true,
  //     order:7
  //   },
  //   {
  //     section_name:'workanniversary',
  //     name:'Work Anniversary',
  //     status:true,
  //     order:8
  //   },
  // ]
  //
  // WebPreview.create(datas)
  // .then(response=>{
  //   res.json({
  //     response:true
  //   })
  // })


}



const update_sorting = (req,res) => {
  var datas=req.body;

  datas.forEach((item, i) => {
    WebPreview.findByIdAndUpdate(item._id,{$set:{order:item.order}})
    .then(resp=>{
      console.log('done')
    })
  });

  res.json({
    response:true
  })
}

const chnage_status = (req,res) => {
  WebPreview.findByIdAndUpdate(req.body.id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


// **MODULE EXPORTS**
module.exports = {index,update_sorting,chnage_status}
